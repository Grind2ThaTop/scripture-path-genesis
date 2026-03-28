import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SEARCH_QUERIES = [
  "Christian debate viral",
  "end times prophecy 2026",
  "Bible truth controversy",
  "church exposed false teaching",
  "rapture debate",
  "mark of the beast AI",
  "Jesus coming back signs",
  "pastor controversy sermon",
  "Gino Jennings truth",
  "prosperity gospel exposed",
  "Israel prophecy fulfillment",
  "AI antichrist theory",
];

const SCRIPTURE_BANK: Record<string, { ref: string; text: string }[]> = {
  endtimes: [
    { ref: "Matthew 24:4-5", text: "Take heed that no man deceive you. For many shall come in my name, saying, I am Christ; and shall deceive many." },
    { ref: "Matthew 24:24", text: "For there shall arise false Christs, and false prophets, and shall shew great signs and wonders; insomuch that, if it were possible, they shall deceive the very elect." },
  ],
  falseteaching: [
    { ref: "2 Timothy 4:3-4", text: "For the time will come when they will not endure sound doctrine; but after their own lusts shall they heap to themselves teachers, having itching ears." },
    { ref: "Jeremiah 23:16", text: "Thus saith the LORD of hosts, Hearken not unto the words of the prophets that prophesy unto you: they make you vain: they speak a vision of their own heart, and not out of the mouth of the LORD." },
  ],
  control: [
    { ref: "Revelation 13:16-17", text: "And he causeth all, both small and great, rich and poor, free and bond, to receive a mark in their right hand, or in their foreheads: And that no man might buy or sell, save he that had the mark." },
    { ref: "Daniel 7:25", text: "And he shall speak great words against the most High, and shall wear out the saints of the most High, and think to change times and laws." },
  ],
  moraldecline: [
    { ref: "2 Timothy 3:1-5", text: "This know also, that in the last days perilous times shall come. For men shall be lovers of their own selves, covetous, boasters, proud, blasphemers." },
    { ref: "Isaiah 5:20", text: "Woe unto them that call evil good, and good evil; that put darkness for light, and light for darkness." },
  ],
  deception: [
    { ref: "2 Corinthians 11:14-15", text: "And no marvel; for Satan himself is transformed into an angel of light. Therefore it is no great thing if his ministers also be transformed as the ministers of righteousness." },
    { ref: "Colossians 2:8", text: "Beware lest any man spoil you through philosophy and vain deceit, after the tradition of men, after the rudiments of the world, and not after Christ." },
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) throw new Error("FIRECRAWL_API_KEY not configured");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify admin
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data: claims } = await supabase.auth.getClaims(token);
      if (claims?.claims?.sub) {
        const { data: isAdmin } = await supabase.rpc("has_role", {
          _user_id: claims.claims.sub,
          _role: "admin",
        });
        if (!isAdmin) {
          return new Response(JSON.stringify({ error: "Admin only" }), {
            status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // Pick 2 random search queries
    const shuffled = SEARCH_QUERIES.sort(() => 0.5 - Math.random());
    const queries = shuffled.slice(0, 2);

    const allResults: any[] = [];

    for (const query of queries) {
      console.log("Searching:", query);
      const resp = await fetch("https://api.firecrawl.dev/v1/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          limit: 5,
          tbs: "qdr:w", // last week
          scrapeOptions: { formats: ["markdown"] },
        }),
      });

      if (!resp.ok) {
        console.error("Firecrawl error:", resp.status, await resp.text());
        continue;
      }

      const data = await resp.json();
      if (data.data) allResults.push(...data.data);
    }

    console.log(`Found ${allResults.length} total results`);
    if (!allResults.length) {
      return new Response(JSON.stringify({ success: true, generated: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Process top results through AI
    const generated: any[] = [];

    for (const result of allResults.slice(0, 4)) {
      const title = result.title || "Unknown";
      const content = (result.markdown || result.description || "").slice(0, 1000);

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
              content: `You are a content strategist for "Truth Cuts Deep" — a biblical authority media brand. You analyze viral religious content and create powerful reinterpretations through scripture.

Your job:
1. Identify WHY this content is going viral (emotional trigger, controversy, confusion)
2. Categorize the core topic: endtimes, falseteaching, control, moraldecline, deception
3. Create a BIBLICAL ANGLE — not copying, REINTERPRETING through scripture
4. Write 3 ready-to-post content pieces:

A) TikTok/Reels script (30-60 seconds):
- Hook: "Everybody talking about this right now…" or similar
- Show the topic briefly
- Flip it: "But here's what they not telling you…"
- Scripture tie-in
- Close: "This ain't random… this was already written."

B) Instagram caption (punchy, with line breaks, emojis)

C) YouTube Short script (45-90 seconds, more depth)

Speak with AUTHORITY. Not academic. Not preachy. REAL. Like you're telling truth in the barbershop.`,
            },
            {
              role: "user",
              content: `Viral content:\nTitle: ${title}\n\nContent: ${content}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "create_viral_content",
                description: "Generate viral content package from trending topic",
                parameters: {
                  type: "object",
                  properties: {
                    emotional_trigger: { type: "string", description: "Why this is going viral" },
                    controversy: { type: "string", description: "The controversial element" },
                    core_topic: { type: "string", enum: ["endtimes", "falseteaching", "control", "moraldecline", "deception"] },
                    biblical_angle: { type: "string", description: "Your biblical reinterpretation angle" },
                    tiktok_script: { type: "string", description: "30-60s TikTok/Reels script" },
                    ig_caption: { type: "string", description: "Instagram caption with emojis" },
                    youtube_short_script: { type: "string", description: "45-90s YouTube Short script" },
                  },
                  required: ["emotional_trigger", "controversy", "core_topic", "biblical_angle", "tiktok_script", "ig_caption", "youtube_short_script"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "create_viral_content" } },
        }),
      });

      if (!aiResp.ok) {
        console.error("AI error:", aiResp.status);
        if (aiResp.status === 429 || aiResp.status === 402) continue;
        continue;
      }

      const aiData = await aiResp.json();
      let parsed: any;
      try {
        const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
        parsed = JSON.parse(toolCall.function.arguments);
      } catch {
        console.error("Parse failed");
        continue;
      }

      // Get matching scripture
      const scriptures = SCRIPTURE_BANK[parsed.core_topic] || SCRIPTURE_BANK.deception;
      const scripture = scriptures[Math.floor(Math.random() * scriptures.length)];

      const { error } = await supabase.from("viral_content").insert({
        source_platform: "web",
        source_url: result.url || null,
        source_title: title,
        source_description: (result.description || "").slice(0, 500),
        emotional_trigger: parsed.emotional_trigger,
        controversy: parsed.controversy,
        core_topic: parsed.core_topic,
        biblical_angle: parsed.biblical_angle,
        scripture_reference: scripture.ref,
        scripture_text: scripture.text,
        tiktok_script: parsed.tiktok_script,
        ig_caption: parsed.ig_caption,
        youtube_short_script: parsed.youtube_short_script,
        tags: [parsed.core_topic, "viral", "truth-cuts-deep"],
        status: "published",
      });

      if (error) {
        console.error("Insert error:", error);
        continue;
      }

      generated.push({ title, topic: parsed.core_topic, scripture: scripture.ref });
    }

    return new Response(
      JSON.stringify({ success: true, generated: generated.length, items: generated }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("viral-engine error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
