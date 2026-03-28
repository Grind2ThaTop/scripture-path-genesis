import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, verse_reference, verse_text, duration, tone, style, cta } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const sceneCount = duration <= 15 ? 4 : duration <= 30 ? 6 : 8;

    const systemPrompt = `You are a cinematic Bible truth short-form video scriptwriter. You create hard-hitting, scripture-centered, emotionally powerful scripts for YouTube Shorts. No cheesy church language. Modern, direct, urgent, cinematic feel. Target audience: Black community. All image prompts MUST feature Black people — Black men, Black women, Black families. Urban, relatable, real. Think hood truth, not church cringe.`;

    const userPrompt = `Create a ${duration}-second Bible truth short for YouTube Shorts.

Topic: ${topic}
Core verse: ${verse_reference}${verse_text ? ` — "${verse_text}"` : ''}
Tone: ${tone}
Visual style: ${style}
CTA: ${cta}
Number of scenes: ${sceneCount}

Requirements:
- Start with a HARD hook in the first 2 seconds
- Use simple, strong, direct language
- Keep total narration under ${duration} seconds when read aloud
- Include 1 main scripture and 1 supporting line
- End with a direct call to action
- Make it feel cinematic, urgent, and true
- Avoid corny church language
- Each scene needs narration, on-screen caption, and image prompt

Return the result using the generate_short_script function.`;

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
        tools: [
          {
            type: "function",
            function: {
              name: "generate_short_script",
              description: "Generate a structured short-form video script with scenes",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Video title" },
                  hook: { type: "string", description: "Opening hook line (first 2 seconds)" },
                  youtube_title: { type: "string", description: "YouTube Shorts title (under 100 chars)" },
                  youtube_description: { type: "string", description: "YouTube description (under 500 chars)" },
                  hashtags: { type: "array", items: { type: "string" }, description: "5-8 hashtags" },
                  scenes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        scene_order: { type: "number" },
                        narration_text: { type: "string", description: "What the narrator says" },
                        caption_text: { type: "string", description: "Short punchy on-screen text (under 10 words)" },
                        verse_reference: { type: "string", description: "Scripture reference if applicable" },
                        image_prompt: { type: "string", description: "Cinematic vertical image prompt for AI generation. MUST feature Black people (Black man, Black woman, Black family, etc). Style: modern cinematic, dramatic lighting, high contrast, realistic, emotionally powerful, 9:16 vertical, urban/modern setting. Avoid: cartoon, cheesy church stock art, text artifacts, generic stock photos." },
                        motion_type: { type: "string", enum: ["ken-burns", "zoom-in", "zoom-out", "pan-left", "pan-right", "parallax", "static"] },
                        duration_ms: { type: "number", description: "Duration in milliseconds" },
                      },
                      required: ["scene_order", "narration_text", "caption_text", "image_prompt", "duration_ms"],
                    },
                  },
                },
                required: ["title", "hook", "youtube_title", "youtube_description", "hashtags", "scenes"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_short_script" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI error:", status, text);
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No script generated");

    const script = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ success: true, script }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("shorts-script error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
