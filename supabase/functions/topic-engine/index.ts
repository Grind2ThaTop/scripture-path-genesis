import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) throw new Error("FIRECRAWL_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Check if we already generated today
    const { data: existing } = await supabase
      .from("daily_topics")
      .select("id")
      .eq("date", today)
      .gt("priority", 50); // AI-generated topics have priority > 50

    if (existing && existing.length >= 3) {
      return new Response(
        JSON.stringify({ success: true, message: "Already generated today", count: existing.length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Scrape latest trending religious content
    const trendingQueries = [
      "trending Christian controversy today",
      "viral Bible debate this week",
      "end times news today 2026",
    ];

    const query = trendingQueries[Math.floor(Math.random() * trendingQueries.length)];

    const searchResp = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit: 5,
        tbs: "qdr:d", // last 24 hours
      }),
    });

    let trendingContext = "";
    if (searchResp.ok) {
      const searchData = await searchResp.json();
      const results = searchData.data || [];
      trendingContext = results
        .slice(0, 3)
        .map((r: any) => `- ${r.title}: ${r.description || ""}`)
        .join("\n");
    }

    // Use AI to generate 3 fresh daily topics
    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `You are the content engine for "Truth Cuts Deep" — a biblical authority media brand based in Philly. Generate 3 FRESH daily content topics.

Each topic needs:
- category: controversy | prophecy | reaction | wakeup | expose | endtimes | local
- hook: The main topic statement (punchy, direct)
- angle: How to approach it biblically (2-3 sentences)
- scripture_refs: 1-3 specific KJV scripture references
- content_type: controversy | current_event | reaction | wakeup | expose | endtimes | local
- tiktok_hook: A scroll-stopping opening line for TikTok (under 15 words)
- philly_angle: Optional local Philly connection (null if not applicable)

Mix it up: 1 controversy/reaction, 1 current event/prophecy, 1 wakeup/expose.
Make them SPECIFIC to what's happening RIGHT NOW. No generic topics.
Speak with barbershop authority — real, direct, no religious fluff.`,
          },
          {
            role: "user",
            content: `Today's date: ${today}\n\nTrending religious content right now:\n${trendingContext || "No trending data available — generate based on evergreen biblical topics that hit hard."}\n\nGenerate 3 fresh topics for today.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_daily_topics",
              description: "Generate 3 daily content topics",
              parameters: {
                type: "object",
                properties: {
                  topics: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string", enum: ["controversy", "prophecy", "reaction", "wakeup", "expose", "endtimes", "local"] },
                        hook: { type: "string" },
                        angle: { type: "string" },
                        scripture_refs: { type: "array", items: { type: "string" } },
                        content_type: { type: "string" },
                        tiktok_hook: { type: "string" },
                        philly_angle: { type: "string" },
                      },
                      required: ["category", "hook", "angle", "scripture_refs", "content_type", "tiktok_hook"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["topics"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_daily_topics" } },
      }),
    });

    if (!aiResp.ok) {
      const status = aiResp.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limited, try again later" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "Credits exhausted" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI error: ${status}`);
    }

    const aiData = await aiResp.json();
    let parsed: { topics: any[] };
    try {
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      throw new Error("Failed to parse AI response");
    }

    // Insert generated topics
    const inserts = parsed.topics.map((t) => ({
      date: today,
      category: t.category,
      hook: t.hook,
      angle: t.angle,
      scripture_refs: t.scripture_refs,
      content_type: t.content_type,
      tiktok_hook: t.tiktok_hook,
      philly_angle: t.philly_angle || null,
      priority: 100, // AI-generated = high priority
    }));

    const { error } = await supabase.from("daily_topics").insert(inserts);
    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, generated: inserts.length, topics: inserts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("topic-engine error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
