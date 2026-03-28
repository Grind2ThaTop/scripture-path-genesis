import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Scripture mapping: event category → relevant scriptures
const SCRIPTURE_MAP: Record<string, { ref: string; text: string }[]> = {
  war: [
    { ref: "Matthew 24:6-7", text: "And ye shall hear of wars and rumours of wars: see that ye be not troubled: for all these things must come to pass, but the end is not yet. For nation shall rise against nation, and kingdom against kingdom." },
    { ref: "Revelation 6:4", text: "And there went out another horse that was red: and power was given to him that sat thereon to take peace from the earth, and that they should kill one another: and there was given unto him a great sword." },
    { ref: "Joel 3:9-10", text: "Proclaim ye this among the Gentiles; Prepare war, wake up the mighty men, let all the men of war draw near; let them come up." },
  ],
  government: [
    { ref: "Revelation 13:16-17", text: "And he causeth all, both small and great, rich and poor, free and bond, to receive a mark in their right hand, or in their foreheads: And that no man might buy or sell, save he that had the mark." },
    { ref: "Daniel 7:23", text: "The fourth beast shall be the fourth kingdom upon earth, which shall be diverse from all kingdoms, and shall devour the whole earth, and shall tread it down, and break it in pieces." },
    { ref: "Revelation 17:12-13", text: "And the ten horns which thou sawest are ten kings, which have received no kingdom as yet; but receive power as kings one hour with the beast." },
  ],
  economy: [
    { ref: "Revelation 6:5-6", text: "And when he had opened the third seal, I heard the third beast say, Come and see. And I beheld, and lo a black horse; and he that sat on him had a pair of balances in his hand." },
    { ref: "James 5:1-3", text: "Go to now, ye rich men, weep and howl for your miseries that shall come upon you. Your riches are corrupted, and your garments are motheaten." },
    { ref: "Ezekiel 7:19", text: "They shall cast their silver in the streets, and their gold shall be removed: their silver and their gold shall not be able to deliver them in the day of the wrath of the LORD." },
  ],
  technology: [
    { ref: "Daniel 12:4", text: "But thou, O Daniel, shut up the words, and seal the book, even to the time of the end: many shall run to and fro, and knowledge shall be increased." },
    { ref: "Revelation 13:15", text: "And he had power to give life unto the image of the beast, that the image of the beast should both speak, and cause that as many as would not worship the image of the beast should be killed." },
    { ref: "Nahum 2:4", text: "The chariots shall rage in the streets, they shall jostle one against another in the broad ways: they shall seem like torches, they shall run like the lightnings." },
  ],
  disaster: [
    { ref: "Matthew 24:7", text: "For nation shall rise against nation, and kingdom against kingdom: and there shall be famines, and pestilences, and earthquakes, in divers places." },
    { ref: "Luke 21:25-26", text: "And there shall be signs in the sun, and in the moon, and in the stars; and upon the earth distress of nations, with perplexity; the sea and the waves roaring." },
    { ref: "Revelation 8:7", text: "The first angel sounded, and there followed hail and fire mingled with blood, and they were cast upon the earth." },
  ],
  deception: [
    { ref: "Matthew 24:24", text: "For there shall arise false Christs, and false prophets, and shall shew great signs and wonders; insomuch that, if it were possible, they shall deceive the very elect." },
    { ref: "2 Timothy 4:3-4", text: "For the time will come when they will not endure sound doctrine; but after their own lusts shall they heap to themselves teachers, having itching ears." },
    { ref: "2 Thessalonians 2:9-10", text: "Even him, whose coming is after the working of Satan with all power and signs and lying wonders, And with all deceivableness of unrighteousness in them that perish." },
  ],
  moraldecline: [
    { ref: "2 Timothy 3:1-5", text: "This know also, that in the last days perilous times shall come. For men shall be lovers of their own selves, covetous, boasters, proud, blasphemers, disobedient to parents, unthankful, unholy." },
    { ref: "Romans 1:28-29", text: "And even as they did not like to retain God in their knowledge, God gave them over to a reprobate mind, to do those things which are not convenient." },
    { ref: "Isaiah 5:20", text: "Woe unto them that call evil good, and good evil; that put darkness for light, and light for darkness; that put bitter for sweet, and sweet for bitter!" },
  ],
  israel: [
    { ref: "Zechariah 12:3", text: "And in that day will I make Jerusalem a burdensome stone for all people: all that burden themselves with it shall be cut in pieces, though all the people of the earth be gathered together against it." },
    { ref: "Ezekiel 37:21-22", text: "Thus saith the Lord GOD; Behold, I will take the children of Israel from among the heathen, and will gather them on every side, and bring them into their own land." },
    { ref: "Romans 11:25-26", text: "For I would not, brethren, that ye should be ignorant of this mystery, lest ye should be wise in your own conceits; that blindness in part is happened to Israel, until the fulness of the Gentiles be come in." },
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) {
      return new Response(JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Step 1: Scrape news using Firecrawl search
    const searchQueries = [
      "world war conflict military 2026",
      "government surveillance control digital ID",
      "economy collapse inflation crisis 2026",
      "artificial intelligence AI danger",
      "natural disaster earthquake flood 2026",
      "Israel Jerusalem Middle East",
    ];

    const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];

    console.log("Searching news:", randomQuery);

    const searchResponse = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: randomQuery,
        limit: 5,
        scrapeOptions: { formats: ["markdown"] },
      }),
    });

    if (!searchResponse.ok) {
      const errText = await searchResponse.text();
      console.error("Firecrawl error:", searchResponse.status, errText);
      return new Response(JSON.stringify({ error: "Failed to scrape news", details: errText }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const searchData = await searchResponse.json();
    const results = searchData.data || [];
    console.log(`Got ${results.length} results`);

    if (results.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "No news found", generated: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Categorize and match to scripture via AI
    const generated: any[] = [];

    for (const result of results.slice(0, 3)) {
      const headline = result.title || "Unknown headline";
      const snippet = (result.markdown || result.description || "").slice(0, 800);

      // Use AI to categorize and interpret
      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
              content: `You are a biblical scholar for "Truth Cuts Deep" — a prophetic analysis ministry. Your job:

1. Categorize this news into ONE category: war, government, economy, technology, disaster, deception, moraldecline, israel
2. Write a powerful 3-4 paragraph interpretation connecting this event to biblical prophecy
3. Do NOT claim certainty — use language like "this aligns with what scripture warned about" or "this echoes the patterns described in..."
4. Be authoritative but grounded. No fear-mongering. Just truth.
5. Reference specific scripture in your interpretation.

Respond in JSON format:
{
  "category": "war|government|economy|technology|disaster|deception|moraldecline|israel",
  "interpretation": "Your 3-4 paragraph breakdown..."
}`,
            },
            {
              role: "user",
              content: `Headline: ${headline}\n\nContent: ${snippet}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "categorize_and_interpret",
                description: "Categorize news and provide biblical interpretation",
                parameters: {
                  type: "object",
                  properties: {
                    category: {
                      type: "string",
                      enum: ["war", "government", "economy", "technology", "disaster", "deception", "moraldecline", "israel"],
                    },
                    interpretation: { type: "string" },
                  },
                  required: ["category", "interpretation"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "categorize_and_interpret" } },
        }),
      });

      if (!aiResponse.ok) {
        if (aiResponse.status === 429) {
          console.warn("Rate limited, skipping...");
          continue;
        }
        if (aiResponse.status === 402) {
          console.warn("Credits exhausted");
          continue;
        }
        console.error("AI error:", aiResponse.status);
        continue;
      }

      const aiData = await aiResponse.json();
      let parsed: { category: string; interpretation: string };

      try {
        const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
        parsed = JSON.parse(toolCall.function.arguments);
      } catch {
        console.error("Failed to parse AI response");
        continue;
      }

      // Pick scripture from our map
      const scriptures = SCRIPTURE_MAP[parsed.category] || SCRIPTURE_MAP.deception;
      const scripture = scriptures[Math.floor(Math.random() * scriptures.length)];

      // Step 3: Store in database
      const { error: insertError } = await supabase.from("prophecy_content").insert({
        headline,
        source_url: result.url || null,
        source_name: new URL(result.url || "https://unknown.com").hostname,
        category: parsed.category,
        scripture_reference: scripture.ref,
        scripture_text: scripture.text,
        ai_interpretation: parsed.interpretation,
        content_type: "news",
        tags: [parsed.category, "prophecy", "current-events"],
      });

      if (insertError) {
        console.error("Insert error:", insertError);
        continue;
      }

      generated.push({ headline, category: parsed.category, scripture: scripture.ref });
    }

    return new Response(
      JSON.stringify({ success: true, generated: generated.length, items: generated }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("prophecy-engine error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
