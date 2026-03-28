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
      const ttsModel = model || "openai/tts-1";
      const ttsVoice = voice || "onyx";

      const response = await fetch("https://api.aimlapi.com/v1/tts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AIMLAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: ttsModel,
          text: text,
          voice: ttsVoice,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("AIMLAPI TTS error:", response.status, errText);
        throw new Error(`TTS generation failed: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      
      if (contentType.includes("application/json")) {
        // AIMLAPI returns JSON with audio URL
        const data = await response.json();
        const audioUrl = data.url || data.audio_url || data.output || data?.audio?.url;
        
        if (audioUrl) {
          // Fetch the actual audio and convert to base64
          const audioResp = await fetch(audioUrl);
          const audioBuffer = await audioResp.arrayBuffer();
          const uint8 = new Uint8Array(audioBuffer);
          let binary = "";
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          const base64Audio = btoa(binary);
          return new Response(JSON.stringify({ success: true, audio_base64: base64Audio, audio_url: audioUrl, format: "mp3" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        return new Response(JSON.stringify({ success: true, raw: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        // Direct audio binary response
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
    }

    if (action === "generate_music") {
      // Step 1: Submit music generation request
      const musicModel = model || "minimax-music";
      const musicPrompt = prompt || "dark trap beat, 808 bass, hard hitting drums, cinematic, aggressive, hood energy";
      
      const submitResponse = await fetch("https://api.aimlapi.com/v2/generate/audio", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AIMLAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: musicModel,
          prompt: musicPrompt,
          duration_seconds: 30,
        }),
      });

      if (!submitResponse.ok) {
        const errText = await submitResponse.text();
        console.error("AIMLAPI music submit error:", submitResponse.status, errText);
        throw new Error(`Music generation submit failed: ${submitResponse.status} - ${errText}`);
      }

      const submitData = await submitResponse.json();
      console.log("Music submit response:", JSON.stringify(submitData));
      
      // The API returns a generation_id for async polling
      const generationId = submitData.id || submitData.generation_id || submitData.task_id;
      
      if (!generationId) {
        // Some models return audio directly
        const directUrl = submitData.audio_url || submitData.url || submitData?.data?.[0]?.url || submitData?.output;
        if (directUrl) {
          return new Response(JSON.stringify({ success: true, audio_url: directUrl, status: "completed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ success: true, raw: submitData, status: "unknown" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Step 2: Poll for completion (up to 60 seconds)
      for (let attempt = 0; attempt < 20; attempt++) {
        await new Promise(r => setTimeout(r, 3000));
        
        const pollResponse = await fetch(`https://api.aimlapi.com/v2/generate/audio?generation_id=${generationId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${AIMLAPI_API_KEY}`,
          },
        });

        if (!pollResponse.ok) {
          console.error("Poll error:", pollResponse.status);
          continue;
        }

        const pollData = await pollResponse.json();
        console.log("Poll response:", JSON.stringify(pollData));
        
        const status = pollData.status || pollData.state;
        
        if (status === "completed" || status === "succeeded" || status === "done") {
          const audioUrl = pollData.audio_url || pollData.url || pollData?.audio?.url || pollData?.output || pollData?.audio_file?.url;
          return new Response(JSON.stringify({ success: true, audio_url: audioUrl, status: "completed", raw: pollData }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        if (status === "failed" || status === "error") {
          throw new Error(`Music generation failed: ${JSON.stringify(pollData)}`);
        }
      }

      // Return the generation_id so client can poll manually
      return new Response(JSON.stringify({ success: true, generation_id: generationId, status: "processing", message: "Still generating. Try polling later." }), {
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
