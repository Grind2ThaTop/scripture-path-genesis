// Restores the sacred names in Bible text
// Replaces traditional church renderings with original/restored names

const replacements: [RegExp, string][] = [
  // ===== MULTI-WORD PATTERNS FIRST =====

  // "the LORD God" → "Yahweh Elohim" (the is absorbed — Yahweh is a name, no article)
  [/\b[Tt]he LORD God\b/g, 'Yahweh Elohim'],
  [/\bTHE LORD GOD\b/g, 'YAHWEH ELOHIM'],

  // "the Lord GOD" → "Master Yahweh" (Adonai YHWH)
  [/\b[Tt]he Lord GOD\b/g, 'Master Yahweh'],

  // "the LORD of hosts" → "Yahweh of hosts" (absorb article)
  [/\b[Tt]he LORD of hosts\b/g, 'Yahweh of hosts'],
  [/\bLORD of hosts\b/g, 'Yahweh of hosts'],

  // "the LORD" alone → "Yahweh" (absorb "the" — Yahweh is a proper name, never takes an article)
  [/\b[Tt]he LORD\b/g, 'Yahweh'],

  // Holy Spirit / Ghost → Set-apart Spirit
  [/\bHoly Spirit\b/g, 'Set-apart Spirit'],
  [/\bHoly Ghost\b/g, 'Set-apart Spirit'],
  [/\bholy spirit\b/g, 'set-apart spirit'],
  [/\bholy ghost\b/g, 'set-apart spirit'],
  [/\bHoly One\b/g, 'Set-apart One'],
  [/\bholy one\b/g, 'set-apart one'],

  // Yahshua / Messiah
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

  // LORD (all caps = YHWH in KJV convention) — standalone
  [/\bLORD'[Ss]\b/g, "Yahweh's"],
  [/\bLORD\b/g, 'Yahweh'],

  // GOD (all caps in KJV = YHWH in certain passages, e.g. Psalm 68:20)
  [/\bthe GOD\b/g, 'Elohim'],
  [/\bGOD\b/g, 'Elohim'],

  // "the Lord" (mixed case = Adonai) — absorb article since it reads better as just "Master"
  // But keep "the" in contexts like "the Lord said" → "the Master said" to preserve grammar
  [/\b[Tt]he Lord\b/g, 'the Master'],

  // Standalone "Lord" → Master
  [/\bLord's\b/g, "Master's"],
  [/\bLord\b/g, 'Master'],

  // "God" → Elohim
  // "the God" → just "Elohim" (Hebrew doesn't use articles with Elohim the same way)
  [/\bthe God of\b/g, 'Elohim of'],
  [/\bThe God of\b/g, 'Elohim of'],
  [/\bthe God\b/g, 'Elohim'],
  [/\bGod's\b/g, "Elohim's"],
  [/\bGod\b/g, 'Elohim'],

  // Church → assembly/congregation
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

// Post-processing: clean up any artifacts like "the Yahweh" that slip through
const postCleanup: [RegExp, string][] = [
  [/\bthe Yahweh\b/g, 'Yahweh'],
  [/\bThe Yahweh\b/g, 'Yahweh'],
  [/\bthe the Master\b/gi, 'the Master'],
];

export function restoreNames(text: string): string {
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  // Safety pass — catch any "the Yahweh" that slipped through edge cases
  for (const [pattern, replacement] of postCleanup) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
