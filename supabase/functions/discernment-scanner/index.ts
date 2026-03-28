const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const LOVABLE_API_URL = "https://api.lovable.dev/v1/chat/completions";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { statement } = await req.json();

    if (!statement || typeof statement !== "string" || statement.trim().length < 5) {
      return new Response(JSON.stringify({ error: "Please provide a statement to analyze." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a biblical discernment analyzer. Your job is to evaluate statements, teachings, or claims against scripture.

For every statement analyzed, respond with this exact format:

⚠️ VERDICT: [TRUTH / DECEPTION / MIXED — HANDLE WITH CARE]

📋 WHAT WAS SAID:
[Restate the claim clearly]

📖 WHAT SCRIPTURE SAYS:
[2-3 relevant scriptures with references that directly address this claim]

🔍 ANALYSIS:
[2-3 sentences explaining why this is true, false, or mixed — based purely on scripture, not opinion]

🛡️ HOW TO RESPOND:
[1-2 sentences on what the person should do with this information]

Rules:
- Be sharp, clear, and direct — not emotional or preachy
- Always cite specific scripture references
- If it's a half-truth, explain WHAT part is true and WHERE the twist happens
- Use KJV language and references
- Keep it concise — no more than 200 words total`;

    const response = await fetch(LOVABLE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this statement for deception:\n\n"${statement.trim()}"` },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error("Failed to analyze statement");
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
