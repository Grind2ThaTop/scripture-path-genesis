import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { verse_ref, verse_text, testament, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "explain") {
      systemPrompt = `You are a deep scripture scholar and teacher. You understand Hebrew, Greek, and Aramaic. You focus on TRUTH and the ORIGINAL TEXT — no denominational bias, no religious tradition. Use the names Yahweh, Elohim, Yahshua, and Set-apart Spirit. Never say "God" or "the LORD" — always use the original names.

When explaining a verse, provide ALL of the following sections using these exact markdown headers:

## Plain Meaning
The simple, surface-level meaning anyone can understand.

## Deeper Meaning  
The contextual, historical, and prophetic significance. What's really being said beneath the surface.

## Original Language Insight
Break down key Hebrew or Greek words. Show the original word, transliteration, Strong's number if known, and what it REALLY means vs how it's commonly translated.

## Law / Command / Principle
What Torah principle, command, or spiritual law is embedded in this verse? What does Yahweh require?

## Real-Life Application
How does this apply to someone's actual life TODAY? Make it practical and powerful.

Be thorough but concise. No fluff. Every word should carry weight.`;

      userPrompt = `Explain this verse deeply:\n\n**${verse_ref}**\n"${verse_text}"\n\nTestament: ${testament === 'OT' ? 'Old Testament (Hebrew)' : 'New Testament (Greek)'}`;
    } else if (mode === "word_study") {
      systemPrompt = `You are a biblical language expert specializing in Hebrew and Greek word studies. Use the names Yahweh, Elohim, Yahshua. Provide detailed word-by-word analysis.

For each significant word, provide:
- Original word (Hebrew or Greek script)
- Transliteration  
- Strong's number
- Root meaning
- How it's used in this context
- Other notable verses where this word appears

Format as clean markdown with the original script prominently displayed.`;

      userPrompt = `Provide a complete word-by-word study of:\n\n**${verse_ref}**\n"${verse_text}"\n\nTestament: ${testament === 'OT' ? 'Old Testament (Hebrew)' : 'New Testament (Greek)'}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits needed. Add funds in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI engine error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("verse-study error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
