export interface DoctrineScripture {
  ref: string;
  text: string;
}

export interface DebatePoint {
  verse: string;
  text: string;
  commonClaim: string;
  counterPoint: string;
}

export interface DoctrineLesson {
  id: string;
  order: number;
  title: string;
  icon: string;
  category: 'foundation' | 'identity' | 'spirit' | 'history' | 'debate';
  summary: string;
  breakdown: string[];
  keyPoint: string;
  scriptures: DoctrineScripture[];
  debatePoints?: DebatePoint[];
}

export const doctrineLessons: DoctrineLesson[] = [
  {
    id: 'yahweh-is-one',
    order: 1,
    title: 'Yahweh Is One — Absolute Unity',
    icon: '🧠',
    category: 'foundation',
    summary: 'Yahweh clearly declares He is ONE — no equal, no partner, no shared identity. This is strict unity, not a three-in-one structure.',
    breakdown: [
      'The Shema (Deuteronomy 6:4) is the foundational declaration of who God is',
      'Yahweh states there is no God beside Him — not "no God beside Us"',
      '"One" in Hebrew is "echad" — used for a single, unified entity',
      'This is the core statement of all scripture — everything flows from it',
    ],
    keyPoint: 'Yahweh declares absolute unity — not a compound, shared, or multi-person identity.',
    scriptures: [
      { ref: 'Deuteronomy 6:4', text: 'Hear, O Israel: The LORD our God is one LORD.' },
      { ref: 'Isaiah 45:5', text: 'I am the LORD, and there is none else, there is no God beside me.' },
      { ref: 'Isaiah 44:6', text: 'Thus saith the LORD the King of Israel, and his redeemer the LORD of hosts; I am the first, and I am the last; and beside me there is no God.' },
      { ref: 'Isaiah 46:9', text: 'I am God, and there is none else; I am God, and there is none like me.' },
      { ref: 'Mark 12:29', text: 'The first of all the commandments is, Hear, O Israel; The Lord our God is one Lord.' },
    ],
  },
  {
    id: 'yahshua-calls-father-only-god',
    order: 2,
    title: 'Yahshua Calls the Father "The Only True God"',
    icon: '⚔️',
    category: 'identity',
    summary: 'Yahshua himself makes a clear separation — the Father is "the only true God" and he is "the one sent." Two distinct identities, not one being.',
    breakdown: [
      'Yahshua prays TO the Father — you don\'t pray to yourself',
      'He calls the Father "the only true God" — excluding himself from that identity',
      'He identifies himself as "the one you have sent" — a messenger, not the sender',
      'If Yahshua IS God, calling the Father "the only true God" would be a contradiction',
    ],
    keyPoint: 'Yahshua separates himself from the Father\'s identity as "the only true God" — he is the sent one, not the sender.',
    scriptures: [
      { ref: 'John 17:3', text: 'And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.' },
      { ref: 'John 5:30', text: 'I can of mine own self do nothing: as I hear, I judge: and my judgment is just; because I seek not mine own will, but the will of the Father which hath sent me.' },
      { ref: 'John 7:16', text: 'My doctrine is not mine, but his that sent me.' },
    ],
  },
  {
    id: 'father-greater-than-son',
    order: 3,
    title: 'The Father Is Greater Than Yahshua',
    icon: '👑',
    category: 'identity',
    summary: 'Scripture establishes a clear hierarchy — the Father is above, Yahshua is under authority. That\'s hierarchy, not equality.',
    breakdown: [
      'Yahshua directly states "the Father is greater than I" — plain language',
      'Paul confirms "the head of Christ is God" — a chain of authority',
      'At the end, even the Son will be subject to the Father',
      'This is consistent from beginning to end — order, not equality',
    ],
    keyPoint: 'The order is clear: God → above, Messiah → under authority. That\'s hierarchy, not equality.',
    scriptures: [
      { ref: 'John 14:28', text: 'Ye have heard how I said unto you, I go away, and come again unto you. If ye loved me, ye would rejoice, because I said, I go unto the Father: for my Father is greater than I.' },
      { ref: '1 Corinthians 11:3', text: 'But I would have you know, that the head of every man is Christ; and the head of the woman is the man; and the head of Christ is God.' },
      { ref: '1 Corinthians 15:27-28', text: 'For he hath put all things under his feet. But when he saith all things are put under him, it is manifest that he is excepted, which did put all things under him. And when all things shall be subdued unto him, then shall the Son also himself be subject unto him that put all things under him, that God may be all in all.' },
    ],
  },
  {
    id: 'yahshua-has-a-god',
    order: 4,
    title: 'Yahshua Has a God',
    icon: '🧬',
    category: 'identity',
    summary: 'Yahshua directly says "my God" — multiple times, even after the resurrection. God does not have a God. So Yahshua is not God.',
    breakdown: [
      'After the resurrection, Yahshua says "I ascend to my God and your God"',
      'In Revelation, Yahshua repeatedly says "my God" — four times in one verse',
      'If Yahshua IS God, saying "my God" makes no sense',
      'This is post-resurrection language — not "before he was glorified"',
    ],
    keyPoint: 'God does not have a God. Yahshua does. Therefore Yahshua is not God.',
    scriptures: [
      { ref: 'John 20:17', text: 'Jesus saith unto her, Touch me not; for I am not yet ascended to my Father: but go to my brethren, and say unto them, I ascend unto my Father, and your Father; and to my God, and your God.' },
      { ref: 'Revelation 3:12', text: 'Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out: and I will write upon him the name of my God, and the name of the city of my God, which is new Jerusalem, which cometh down out of heaven from my God.' },
      { ref: 'Ephesians 1:17', text: 'That the God of our Lord Jesus Christ, the Father of glory, may give unto you the spirit of wisdom and revelation in the knowledge of him.' },
    ],
  },
  {
    id: 'son-not-father',
    order: 5,
    title: 'The Son Is Not the Father',
    icon: '🧠',
    category: 'identity',
    summary: 'The Father speaks FROM heaven. The Son is ON earth. Two distinct identities — not one being in different modes.',
    breakdown: [
      'At baptism, the Father speaks from heaven while Yahshua is in the water',
      'Yahshua was conceived by the power of the Most High — he had a beginning',
      'A father and son are never the same person — basic logic',
      'Scripture never says "God became a man" — it says God SENT His Son',
    ],
    keyPoint: 'Two distinct identities — not one being in different modes.',
    scriptures: [
      { ref: 'Matthew 3:17', text: 'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.' },
      { ref: 'Luke 1:35', text: 'And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God.' },
      { ref: 'Hebrews 1:5', text: 'For unto which of the angels said he at any time, Thou art my Son, this day have I begotten thee?' },
    ],
  },
  {
    id: 'word-became-flesh',
    order: 6,
    title: 'The Word Became Flesh — Not God Became Himself',
    icon: '⚡',
    category: 'foundation',
    summary: '"The Word" = God\'s plan, will, and command. Yahshua is that Word expressed physically — not God turning into Himself.',
    breakdown: [
      '"Word" (logos) in Hebrew thought = God\'s expressed will, command, creative power',
      'God spoke the world into existence — His word has always had power',
      'Yahshua is the physical expression of God\'s will and purpose',
      'This is not "God becoming a man" — it\'s God\'s plan taking human form',
      'The word was WITH God — indicating distinction, not identity',
    ],
    keyPoint: 'The Word is God\'s will expressed through a man — not God transforming into Himself.',
    scriptures: [
      { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { ref: 'John 1:14', text: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.' },
      { ref: 'Genesis 1:3', text: 'And God said, Let there be light: and there was light.' },
      { ref: 'Psalm 33:6', text: 'By the word of the LORD were the heavens made; and all the host of them by the breath of his mouth.' },
    ],
  },
  {
    id: 'holy-spirit-gods-spirit',
    order: 7,
    title: 'The Set-apart Spirit = God\'s Spirit',
    icon: '🌬️',
    category: 'spirit',
    summary: 'The Spirit is God\'s presence, power, and action — not introduced anywhere in scripture as a separate being with independent identity, will, or name.',
    breakdown: [
      '"The Spirit of God" — possessive, not a separate person',
      'In Luke 1:35 the angel equates "Holy Spirit" with "power of the Most High"',
      'The Spirit has no separate name, no separate throne, no separate prayers directed to it',
      'In the OT, it\'s always "the Spirit of Yahweh" — His spirit, not another being',
      'God\'s spirit is how He acts, moves, and indwells — like your spirit is part of you',
    ],
    keyPoint: 'The Spirit is God\'s own presence and power — not a third person with independent identity.',
    scriptures: [
      { ref: 'Genesis 1:2', text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.' },
      { ref: 'Luke 1:35', text: 'The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee.' },
      { ref: 'Isaiah 63:10-11', text: 'But they rebelled, and vexed his holy Spirit... Where is he that put his holy Spirit within him?' },
      { ref: '1 Corinthians 2:11', text: 'For what man knoweth the things of a man, save the spirit of man which is in him? even so the things of God knoweth no man, but the Spirit of God.' },
    ],
  },
  {
    id: 'trinity-origin',
    order: 8,
    title: 'The Trinity — Origin & Problem',
    icon: '⚔️',
    category: 'history',
    summary: 'The word "Trinity" is not in scripture. The doctrine was formalized through church councils, influenced by Greek philosophy — not from direct teaching of Yahshua or the apostles.',
    breakdown: [
      'The word "Trinity" does not appear anywhere in the Bible',
      'The Council of Nicaea (325 AD) formalized ideas about the Messiah\'s nature',
      'Greek philosophical terms like "essence," "substance," "co-equal" were imported',
      'Early believers did not use trinitarian language',
      'The doctrine developed over centuries through political and theological debate',
      'The Messiah and apostles never taught a three-person God',
    ],
    keyPoint: 'The doctrine came from councils and philosophy — not from direct scripture or the words of Yahshua.',
    scriptures: [
      { ref: '1 Timothy 2:5', text: 'For there is one God, and one mediator between God and men, the man Christ Jesus.' },
      { ref: 'Deuteronomy 4:35', text: 'Unto thee it was shewed, that thou mightest know that the LORD he is God; there is none else beside him.' },
      { ref: 'Mark 12:32', text: 'Well, Master, thou hast said the truth: for there is one God; and there is none other but he.' },
    ],
  },
  {
    id: 'trinity-proof-texts',
    order: 9,
    title: 'Verses Used to Support the Trinity — And Why They\'re Debated',
    icon: '🚨',
    category: 'debate',
    summary: 'These are the main scriptures used to support the Trinity doctrine. Each has legitimate debate around translation, grammar, and context.',
    breakdown: [
      'These verses are commonly cited but have alternative readings supported by grammar and context',
      'The goal is not to dismiss them — but to let the text speak for itself',
      'Honest study requires looking at ALL the evidence, not just one side',
      'Many scholars across history have debated these exact passages',
    ],
    keyPoint: 'Let the text speak clean. Don\'t force it. Don\'t twist it. Examine every verse in full context.',
    scriptures: [
      { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { ref: 'John 10:30', text: 'I and my Father are one.' },
      { ref: 'John 20:28', text: 'And Thomas answered and said unto him, My Lord and my God.' },
      { ref: 'Colossians 2:9', text: 'For in him dwelleth all the fulness of the Godhead bodily.' },
    ],
    debatePoints: [
      {
        verse: 'John 1:1',
        text: '"The Word was God"',
        commonClaim: 'This proves Jesus IS God — identical in being.',
        counterPoint: 'The Word was WITH God — indicating distinction. "God" here may describe divine nature/quality, not identity. In Greek, the absence of the article ("theos" vs "ho theos") is debated as qualitative — "the Word was divine" vs "the Word was THE God."',
      },
      {
        verse: 'John 10:30',
        text: '"I and the Father are one"',
        commonClaim: 'Jesus and the Father are the same being.',
        counterPoint: 'The same unity language is used for believers in John 17:21-22 — "that they may be one, even as we are one." Unity of purpose and will ≠ same being.',
      },
      {
        verse: 'John 20:28',
        text: '"My Lord and my God"',
        commonClaim: 'Thomas called Jesus God, proving he IS God.',
        counterPoint: 'This could be a declaration of authority and exaltation — similar to how judges are called "elohim" in Psalm 82:6. It may also be an exclamation directed at the Father through the Son.',
      },
      {
        verse: 'Colossians 2:9',
        text: '"The fullness of deity dwells in him bodily"',
        commonClaim: 'All of God literally lives inside Jesus — so he IS God.',
        counterPoint: 'God fully working THROUGH someone is not the same as them BEING God. Ephesians 3:19 says believers can also be "filled with all the fullness of God" — same language, clearly not making believers God.',
      },
    ],
  },
];

export const DOCTRINE_CATEGORIES = [
  { id: 'foundation', label: '🧠 Foundation', description: 'Yahweh is One — the absolute starting point' },
  { id: 'identity', label: '👑 Identity of the Son', description: 'Who Yahshua is — and who he is not' },
  { id: 'spirit', label: '🌬️ The Spirit', description: 'Understanding the Set-apart Spirit' },
  { id: 'history', label: '📜 Historical Context', description: 'Where the Trinity doctrine came from' },
  { id: 'debate', label: '⚔️ Verse-by-Verse Debate', description: 'Examining the proof texts honestly' },
] as const;

export const DOCTRINE_SUMMARY = {
  father: { title: 'Yahweh (The Father)', points: ['The one true God', 'Source of all', 'No equal, no partner'] },
  son: { title: 'Yahshua (The Son)', points: ['Sent by God', 'Messiah', 'Under authority of God', 'Not the Father'] },
  spirit: { title: 'Set-apart Spirit', points: ['Spirit of God', 'Power of God', 'Not a separate identity'] },
};
