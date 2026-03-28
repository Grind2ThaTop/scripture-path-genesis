const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");

async function scrapeUrl(url: string): Promise<string> {
  if (!FIRECRAWL_API_KEY) throw new Error("Firecrawl not configured");

  const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: true,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error("Firecrawl error:", err);
    throw new Error("Could not scrape that link. Try pasting the content directly.");
  }

  const data = await resp.json();
  const markdown = data?.data?.markdown || "";
  // Limit to ~3000 chars to keep prompt reasonable
  return markdown.slice(0, 3000);
}

function isUrl(text: string): boolean {
  return /^https?:\/\//i.test(text.trim());
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { statement, inputType } = await req.json();

    if (!statement || typeof statement !== "string" || statement.trim().length < 5) {
      return new Response(JSON.stringify({ error: "Please provide content to analyze." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let contentToAnalyze = statement.trim();
    let sourceLabel = "statement";

    // If it's a URL or user indicated it's a link, scrape it
    if (inputType === "link" || isUrl(contentToAnalyze)) {
      sourceLabel = "content from link";
      try {
        const scraped = await scrapeUrl(contentToAnalyze);
        if (!scraped || scraped.length < 20) {
          throw new Error("Could not extract meaningful content from that link.");
        }
        contentToAnalyze = scraped;
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message || "Failed to scrape link" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const systemPrompt = `You are a biblical discernment analyzer. Your job is to evaluate statements, teachings, claims, video transcripts, social media posts, articles, or any content against scripture.

For every piece of content analyzed, respond with this exact format:

⚠️ VERDICT: [TRUTH / DECEPTION / MIXED — HANDLE WITH CARE]

📋 WHAT WAS SAID:
[Summarize the main claims or messaging in 2-3 sentences]

📖 WHAT SCRIPTURE SAYS:
[2-4 relevant scriptures with references that directly address these claims]

🔍 ANALYSIS:
[3-5 sentences explaining why this is true, false, or mixed — based purely on scripture, not opinion. If it's a half-truth, explain WHAT part is true and WHERE the twist happens]

🛡️ HOW TO RESPOND:
[2-3 sentences on what the person should do with this information]

Rules:
- Be sharp, clear, and direct — not emotional or preachy
- Always cite specific scripture references (KJV)
- If content is from a video or social post, analyze the MESSAGING and THEMES, not just surface words
- If it's a topic with talking points, address each point
- If it's a half-truth, that's the MOST DANGEROUS kind — break down exactly where the twist is
- Keep it under 300 words total`;

    const response = await fetch(AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this ${sourceLabel} for deception:\n\n"${contentToAnalyze}"` },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Wait a moment and try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error("Failed to analyze content");
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Unable to analyze. Try again.";

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Scanner error:", error);
    return new Response(JSON.stringify({ error: error.message || "Scanner failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
