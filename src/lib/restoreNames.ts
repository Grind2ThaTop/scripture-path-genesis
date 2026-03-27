// Restores the sacred names in Bible text
// Replaces traditional church renderings with original/restored names
// RULE: When Scripture says "God" or "Lord" referring to the Most High, use His NAME — Yahweh.

const replacements: [RegExp, string][] = [
  // ===== MULTI-WORD PATTERNS FIRST =====

  // "the LORD God" → "Yahweh Elohim"
  [/\b[Tt]he LORD God\b/g, 'Yahweh Elohim'],
  [/\bTHE LORD GOD\b/g, 'YAHWEH ELOHIM'],

  // "the Lord GOD" → "Yahweh" (Adonai YHWH in Hebrew — both refer to the Most High)
  [/\b[Tt]he Lord GOD\b/g, 'Yahweh Elohim'],

  // "the LORD of hosts" → "Yahweh of hosts"
  [/\b[Tt]he LORD of hosts\b/g, 'Yahweh of hosts'],
  [/\bLORD of hosts\b/g, 'Yahweh of hosts'],

  // "the LORD" → "Yahweh"
  [/\b[Tt]he LORD\b/g, 'Yahweh'],

  // Holy Spirit / Ghost → Set-apart Spirit
  [/\bHoly Spirit\b/g, 'Set-apart Spirit'],
  [/\bHoly Ghost\b/g, 'Set-apart Spirit'],
  [/\bholy spirit\b/g, 'set-apart spirit'],
  [/\bholy ghost\b/g, 'set-apart spirit'],
  [/\bHoly One\b/g, 'Set-apart One'],
  [/\bholy one\b/g, 'set-apart one'],

  // Yahshua / Messiah (do these BEFORE "Lord" replacements)
  [/\bLord Jesus Christ\b/g, 'Yahshua Messiah'],
  [/\bLord Jesus\b/g, 'Yahshua'],
  [/\bJesus Christ\b/g, 'Yahshua Messiah'],
  [/\bJESUS CHRIST\b/g, 'YAHSHUA MESSIAH'],
  [/\bChrist Jesus\b/g, 'Messiah Yahshua'],
  [/\bthe Christ\b/g, 'the Messiah'],
  [/\bJesus'\b/g, "Yahshua's"],
  [/\bJesus\b/g, 'Yahshua'],
  [/\bJESUS\b/g, 'YAHSHUA'],
  [/\bChrist's\b/g, "Messiah's"],
  [/\bChrist\b/g, 'Messiah'],
  [/\bCHRIST\b/g, 'MESSIAH'],

  // LORD (all caps = YHWH in KJV) — standalone
  [/\bLORD'[Ss]\b/g, "Yahweh's"],
  [/\bLORD\b/g, 'Yahweh'],

  // GOD (all caps in KJV = YHWH in certain passages)
  [/\bthe GOD\b/g, 'Elohim'],
  [/\bGOD\b/g, 'Elohim'],

  // "the Lord" (mixed case) — In Scripture this almost always refers to Yahweh or Yahshua.
  // OT: "the Lord" = Adonai, used for Yahweh → render as Yahweh
  // NT: "the Lord" = Kurios, used for Yahshua → render as Master Yahshua or Yahweh depending on context
  // Since we can't do semantic analysis, default to Yahweh (the Most High) — it's almost always Him.
  [/\b[Tt]he Lord your God\b/g, 'Yahweh your Elohim'],
  [/\b[Tt]he Lord our God\b/g, 'Yahweh our Elohim'],
  [/\b[Tt]he Lord my God\b/g, 'Yahweh my Elohim'],
  [/\b[Tt]he Lord his God\b/g, 'Yahweh his Elohim'],
  [/\b[Tt]he Lord their God\b/g, 'Yahweh their Elohim'],
  [/\b[Tt]he Lord thy God\b/g, 'Yahweh thy Elohim'],
  [/\b[Tt]he Lord God\b/g, 'Yahweh Elohim'],
  [/\b[Tt]he Lord of\b/g, 'Yahweh of'],
  [/\b[Tt]he Lord hath\b/g, 'Yahweh hath'],
  [/\b[Tt]he Lord shall\b/g, 'Yahweh shall'],
  [/\b[Tt]he Lord will\b/g, 'Yahweh will'],
  [/\b[Tt]he Lord is\b/g, 'Yahweh is'],
  [/\b[Tt]he Lord said\b/g, 'Yahweh said'],
  [/\b[Tt]he Lord spake\b/g, 'Yahweh spake'],
  [/\b[Tt]he Lord came\b/g, 'Yahweh came'],
  [/\b[Tt]he Lord made\b/g, 'Yahweh made'],
  [/\b[Tt]he Lord gave\b/g, 'Yahweh gave'],
  [/\b[Tt]he Lord brought\b/g, 'Yahweh brought'],
  [/\b[Tt]he Lord sent\b/g, 'Yahweh sent'],
  [/\b[Tt]he Lord was\b/g, 'Yahweh was'],
  // Catch-all: remaining "the Lord" → Yahweh
  [/\b[Tt]he Lord\b/g, 'Yahweh'],

  // Standalone "Lord" — context dependent:
  // "Lord" at start of sentence or standalone in Scripture = usually the Most High
  [/\bLord's\b/g, "Yahweh's"],
  [/\bLord\b/g, 'Yahweh'],

  // "God" → Elohim (His title, not a name — but correct)
  [/\bthe God of\b/g, 'Elohim of'],
  [/\bThe God of\b/g, 'Elohim of'],
  [/\bthe God\b/g, 'Elohim'],
  [/\bGod's\b/g, "Elohim's"],
  [/\bGod\b/g, 'Elohim'],

  // Assembly
  [/\bchurches\b/g, 'assemblies'],
  [/\bChurches\b/g, 'Assemblies'],
  [/\bchurch\b/g, 'assembly'],
  [/\bChurch\b/g, 'Assembly'],

  // Names
  [/\bSimon Peter\b/g, "Shim'on Kepha"],
  [/\bPeter\b/g, 'Kepha'],
  [/\bJames\b/g, "Ya'aqob"],
  [/\bPaul\b/g, "Sha'ul"],
  [/\bMoses\b/g, 'Mosheh'],
  [/\bIsrael\b/g, "Yisra'el"],
  [/\bISRAEL\b/g, "YISRA'EL"],
  [/\bJerusalem\b/g, 'Yerushalayim'],
  [/\bsabbath\b/g, 'shabbat'],
  [/\bSabbath\b/g, 'Shabbat'],
];

// Post-processing cleanup
const postCleanup: [RegExp, string][] = [
  [/\bthe Yahweh\b/g, 'Yahweh'],
  [/\bThe Yahweh\b/g, 'Yahweh'],
  [/\bYahweh Yahweh\b/g, 'Yahweh'],
  [/\bthe the\b/gi, 'the'],
];

export function restoreNames(text: string): string {
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  for (const [pattern, replacement] of postCleanup) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
