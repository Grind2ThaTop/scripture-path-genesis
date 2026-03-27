// Restores the sacred names in Bible text
// Replaces traditional church renderings with original/restored names

const replacements: [RegExp, string][] = [
  // Must do multi-word patterns first
  [/\bthe LORD God\b/g, 'Yahweh Elohim'],
  [/\bThe LORD God\b/g, 'Yahweh Elohim'],
  [/\bTHE LORD GOD\b/g, 'YAHWEH ELOHIM'],
  [/\bthe Lord GOD\b/g, 'the Master Yahweh'],
  [/\bthe LORD of hosts\b/g, 'Yahweh of hosts'],
  [/\bThe LORD of hosts\b/g, 'Yahweh of hosts'],
  [/\bLORD of hosts\b/g, 'Yahweh of hosts'],
  [/\bHoly Spirit\b/g, 'Set-apart Spirit'],
  [/\bHoly Ghost\b/g, 'Set-apart Spirit'],
  [/\bholy spirit\b/g, 'set-apart spirit'],
  [/\bholy ghost\b/g, 'set-apart spirit'],
  [/\bHoly One\b/g, 'Set-apart One'],
  [/\bholy one\b/g, 'set-apart one'],
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
  // LORD (all caps = YHWH in KJV convention)
  [/\bLORD'S\b/g, "Yahweh's"],
  [/\bLORD's\b/g, "Yahweh's"],
  [/\bLORD\b/g, 'Yahweh'],
  // GOD (all caps = YHWH in some KJV passages)
  [/\bGOD\b/g, 'Elohim'],
  // "the Lord" (not all caps) = Adonai
  [/\bthe Lord\b/g, 'the Master'],
  [/\bThe Lord\b/g, 'The Master'],
  // Standalone "Lord" (context: usually Adonai or Kurios)
  [/\bLord\b/g, 'Master'],
  // "God" → Elohim
  [/\bGod's\b/g, "Elohim's"],
  [/\bGod\b/g, 'Elohim'],
  // Church → assembly/congregation
  [/\bchurches\b/g, 'assemblies'],
  [/\bChurches\b/g, 'Assemblies'],
  [/\bchurch\b/g, 'assembly'],
  [/\bChurch\b/g, 'Assembly'],
  // Cross → stake/execution stake (optional, common in HRM)
  // [/\bcross\b/g, 'stake'],
  // [/\bCross\b/g, 'Stake'],
  // James → Ya'akov
  [/\bJames\b/g, "Ya'aqob"],
  // John → Yochanan (careful — only when it's the person, not the book reference)
  // We skip this to avoid breaking book names
  // Peter → Kepha
  [/\bSimon Peter\b/g, "Shim'on Kepha"],
  [/\bPeter\b/g, 'Kepha'],
  // Paul → Sha'ul (he used both names)
  [/\bPaul\b/g, "Sha'ul"],
  // Moses → Mosheh
  [/\bMoses\b/g, 'Mosheh'],
  // Abraham stays Abraham (already Hebrew)
  // Israel → Yisra'el
  [/\bIsrael\b/g, "Yisra'el"],
  [/\bISRAEL\b/g, "YISRA'EL"],
  // Jerusalem → Yerushalayim
  [/\bJerusalem\b/g, 'Yerushalayim'],
  // Sabbath → Shabbat
  [/\bsabbath\b/g, 'shabbat'],
  [/\bSabbath\b/g, 'Shabbat'],
  // Satan stays Satan (already from Hebrew)
];

export function restoreNames(text: string): string {
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
