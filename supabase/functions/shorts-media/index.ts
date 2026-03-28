import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const AIMLAPI_API_KEY = Deno.env.get("AIMLAPI_API_KEY");
    if (!AIMLAPI_API_KEY) throw new Error("AIMLAPI_API_KEY not configured");

    const { action, prompt, scene_id, project_id, model, text, voice } = await req.json();

    if (action === "generate_image") {
      const imageModel = model || "flux/schnell";
      
      const response = await fetch("https://api.aimlapi.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AIMLAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: imageModel,
          prompt: prompt,
          image_size: "portrait_16_9",
          num_images: 1,
        }),
      });

      if (response.status === 404) {
        console.error("Model not found, trying fallback...");
        // Fallback to flux-pro
        const fallback = await fetch("https://api.aimlapi.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${AIMLAPI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "flux-pro",
            prompt: prompt,
            image_size: "portrait_16_9",
            num_images: 1,
          }),
        });
        if (!fallback.ok) {
          const errText = await fallback.text();
          console.error("Fallback also failed:", fallback.status, errText);
          throw new Error(`Image generation failed: ${fallback.status}`);
        }
        const fallbackData = await fallback.json();
        const url = fallbackData?.data?.[0]?.url || fallbackData?.images?.[0]?.url || null;
        return new Response(JSON.stringify({ success: true, image_url: url, raw: fallbackData }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error("AIMLAPI image error:", response.status, errText);
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const data = await response.json();
      
      // AIMLAPI returns { data: [{ url, b64_json }] } or { images: [{ url }] }
      let imageUrl = null;
      
      if (data.data && data.data.length > 0) {
        imageUrl = data.data[0].url || null;
      } else if (data.images && data.images.length > 0) {
        imageUrl = data.images[0].url;
      } else if (data.output && data.output.length > 0) {
        imageUrl = data.output[0];
      }

      return new Response(JSON.stringify({ success: true, image_url: imageUrl, raw: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "generate_tts") {
      // Text-to-speech via AIMLAPI
      const ttsModel = model || "openai/tts-1";
      const ttsVoice = voice || "alloy";

      const response = await fetch("https://api.aimlapi.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AIMLAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: ttsModel,
          input: text,
          voice: ttsVoice,
          response_format: "mp3",
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("AIMLAPI TTS error:", response.status, errText);
        throw new Error(`TTS generation failed: ${response.status}`);
      }

      // Return audio as base64
      const audioBuffer = await response.arrayBuffer();
      const uint8 = new Uint8Array(audioBuffer);
      let binary = "";
      for (let i = 0; i < uint8.length; i++) {
        binary += String.fromCharCode(uint8[i]);
      }
      const base64Audio = btoa(binary);

      return new Response(JSON.stringify({ success: true, audio_base64: base64Audio, format: "mp3" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (e) {
    console.error("shorts-media error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
