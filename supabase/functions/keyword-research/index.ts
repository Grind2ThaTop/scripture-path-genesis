import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, topic, category } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    if (action === "trending") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a Bible content strategist specializing in viral, controversial, truth-based content for the Black community. You understand what drives engagement on YouTube Shorts, TikTok, and Instagram Reels. You know the intersection of scripture, culture, urban life, and spiritual awakening. Focus on topics that make people STOP scrolling. No weak church content. Hard truth. Restored names (Yahweh, Yahshua). Real talk.`,
            },
            {
              role: "user",
              content: `Generate 5 TRENDING controversial Bible topics${category ? ` in the category "${category}"` : ""}${topic ? ` related to "${topic}"` : ""} that would go VIRAL right now on social media.

Requirements:
- Each topic should be highly searchable and controversial
- Include a hard hook that makes people stop scrolling  
- Include the biblical angle with specific scripture references
- Rate the controversy level (1-10) and viral potential (1-10)
- Include suggested hashtags
- Target audience: Black community, ages 18-35, urban, truth-seekers
- Use restored names (Yahweh, Yahshua)
- Think: barbershop debates, hood conversations, social media arguments

Return using the generate_trending_topics function.`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_trending_topics",
                description: "Generate trending controversial Bible topics",
                parameters: {
                  type: "object",
                  properties: {
                    topics: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          topic: { type: "string" },
                          hook: { type: "string", description: "Hard-hitting scroll-stopping hook" },
                          angle: { type: "string", description: "The controversial biblical angle" },
                          scriptures: { type: "array", items: { type: "string" } },
                          controversy_level: { type: "number", description: "1-10" },
                          viral_potential: { type: "number", description: "1-10" },
                          hashtags: { type: "array", items: { type: "string" } },
                          audience_trigger: { type: "string", description: "What emotional trigger does this hit?" },
                          shorts_script_idea: { type: "string", description: "Brief concept for a 30-sec short" },
                        },
                        required: ["topic", "hook", "angle", "scriptures", "controversy_level", "viral_potential", "hashtags"],
                      },
                    },
                  },
                  required: ["topics"],
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "generate_trending_topics" } },
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited. Try again in a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI error: ${status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) throw new Error("No topics generated");
      const result = JSON.parse(toolCall.function.arguments);

      return new Response(JSON.stringify({ success: true, ...result }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "expand") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a viral Bible content strategist. Given a topic, generate multiple content angles, hooks, and script ideas optimized for maximum engagement. Target: Black community, urban, real talk, no church cringe. Use restored names (Yahweh, Yahshua).`,
            },
            {
              role: "user",
              content: `Expand the topic "${topic}" into 5 unique content angles for YouTube Shorts.
Each angle should have:
- A unique hook (first 2 seconds)
- A different emotional angle
- Specific scripture references
- A brief 30-second script outline
Return using the expand_topic function.`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "expand_topic",
                description: "Expand a topic into multiple content angles",
                parameters: {
                  type: "object",
                  properties: {
                    original_topic: { type: "string" },
                    angles: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          hook: { type: "string" },
                          emotional_angle: { type: "string" },
                          scriptures: { type: "array", items: { type: "string" } },
                          script_outline: { type: "string" },
                          estimated_viral_score: { type: "number" },
                        },
                        required: ["title", "hook", "emotional_angle", "scriptures", "script_outline"],
                      },
                    },
                  },
                  required: ["original_topic", "angles"],
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "expand_topic" } },
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI error: ${status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) throw new Error("No expansion generated");
      const result = JSON.parse(toolCall.function.arguments);

      return new Response(JSON.stringify({ success: true, ...result }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (e) {
    console.error("keyword-research error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
