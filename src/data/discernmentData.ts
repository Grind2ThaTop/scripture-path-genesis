export interface DiscernmentScripture {
  ref: string;
  text: string;
}

export interface TruthVsLie {
  lie: string;
  truth: string;
  scripture: string;
}

export interface SpotDeception {
  statement: string;
  isDeception: boolean;
  explanation: string;
}

export interface DiscernmentLesson {
  id: string;
  title: string;
  icon: string;
  section: 'cultural' | 'religious' | 'spiritual' | 'advanced' | 'foundations';
  whatItIs: string;
  whyPeopleFall: string[];
  conflictWithScripture: string[];
  hiddenDangers: string[];
  pullAwayMechanism: string[];
  howToAvoid: string[];
  scriptures: DiscernmentScripture[];
  truthVsLies: TruthVsLie[];
  spotDeception: SpotDeception[];
}

export const discernmentLessons: DiscernmentLesson[] = [
  // === FOUNDATIONS ===
  {
    id: 'foundations-discernment',
    title: 'What Is Discernment?',
    icon: '🛡️',
    section: 'foundations',
    whatItIs: 'Discernment is the ability to distinguish truth from deception using scripture as the standard — not feelings, not culture, not popularity. It is the spiritual immune system Yah gave His people.',
    whyPeopleFall: [
      'Never trained to test what they hear',
      'Trust titles and positions over scripture',
      'Emotional attachment to traditions',
      'Spiritual laziness — not studying for themselves',
    ],
    conflictWithScripture: [
      'Scripture commands us to TEST everything (1 Thessalonians 5:21)',
      'We are told to be wise as serpents, harmless as doves (Matthew 10:16)',
      'False prophets were the BIGGEST warning in the Bible, not atheism',
    ],
    hiddenDangers: [
      'Without discernment, you accept anything that "sounds right"',
      'Half-truths are more dangerous than full lies',
      'Comfort replaces correction',
    ],
    pullAwayMechanism: [
      'Makes you dependent on teachers instead of scripture',
      'Creates passive believers instead of active students',
    ],
    howToAvoid: [
      'Study scripture daily — not just devotionals',
      'Test EVERY teaching against the full counsel of scripture',
      'Ask: Does this align with what Yah said, or what man says?',
    ],
    scriptures: [
      { ref: '1 John 4:1', text: 'Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world.' },
      { ref: '1 Thessalonians 5:21', text: 'Prove all things; hold fast that which is good.' },
      { ref: 'Proverbs 14:12', text: 'There is a way which seemeth right unto a man, but the end thereof are the ways of death.' },
      { ref: 'Matthew 7:15', text: 'Beware of false prophets, which come to you in sheep\'s clothing, but inwardly they are ravening wolves.' },
    ],
    truthVsLies: [
      { lie: 'Just trust your pastor', truth: 'Study to show YOURSELF approved (2 Timothy 2:15)', scripture: '2 Timothy 2:15' },
      { lie: 'If it feels right, it must be from God', truth: 'The heart is deceitful above all things (Jeremiah 17:9)', scripture: 'Jeremiah 17:9' },
    ],
    spotDeception: [
      { statement: 'You don\'t need to read the Bible yourself — just listen to the sermon.', isDeception: true, explanation: 'Scripture commands personal study. Acts 17:11 praises the Bereans for searching the scriptures DAILY to verify what they were taught.' },
      { statement: 'Test every teaching against scripture before accepting it.', isDeception: false, explanation: 'This is exactly what 1 Thessalonians 5:21 commands — prove all things.' },
    ],
  },

  // === CULTURAL DECEPTIONS ===
  {
    id: 'rap-entertainment',
    title: 'The Dangers of Rap / Entertainment Culture',
    icon: '🎤',
    section: 'cultural',
    whatItIs: 'Entertainment culture — especially rap, hip-hop, and mainstream media — normalizes sin through repetition. Money worship, sexual immorality, violence, and rebellion are celebrated as aspirational lifestyles.',
    whyPeopleFall: [
      'The beats are good — people separate the music from the message',
      '"It\'s just entertainment" — the denial defense',
      'Cultural identity tied to the music',
      'Repetition makes sin feel normal',
    ],
    conflictWithScripture: [
      'What you consume shapes your mind (Romans 12:2)',
      'Corrupt communication corrupts good character (1 Corinthians 15:33)',
      'Love not the world, neither the things in the world (1 John 2:15)',
    ],
    hiddenDangers: [
      'Words are spiritual — they program your mind and spirit',
      'You start identifying with the lifestyle without realizing it',
      'Creates a tolerance for sin that grows over time',
      'Children absorb it even faster',
    ],
    pullAwayMechanism: [
      'Makes sin look cool and obedience look boring',
      'Replaces worship of Yah with worship of wealth and fame',
      'Creates identity around flesh instead of spirit',
    ],
    howToAvoid: [
      'Audit what you listen to — does it glorify Yah or the flesh?',
      'Replace with truth-based content',
      'Guard your gates — eyes and ears are entry points',
    ],
    scriptures: [
      { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind.' },
      { ref: 'Philippians 4:8', text: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.' },
      { ref: 'Ephesians 5:11', text: 'And have no fellowship with the unfruitful works of darkness, but rather reprove them.' },
      { ref: '1 John 2:15-16', text: 'Love not the world, neither the things that are in the world. If any man love the world, the love of the Father is not in him.' },
    ],
    truthVsLies: [
      { lie: 'It\'s just music, it doesn\'t affect me', truth: 'What enters your ears enters your spirit. Guard your gates.', scripture: 'Proverbs 4:23' },
      { lie: 'I can listen to anything and still stay right with Yah', truth: 'Bad company corrupts good character', scripture: '1 Corinthians 15:33' },
    ],
    spotDeception: [
      { statement: 'Music is just entertainment — it has no spiritual impact.', isDeception: true, explanation: 'Words carry power. Proverbs 18:21 says death and life are in the power of the tongue. What you repeatedly hear shapes what you believe.' },
      { statement: 'I should be mindful of what I consume because it shapes my thinking.', isDeception: false, explanation: 'Correct. Romans 12:2 calls us to renew our minds, not conform to the world.' },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Programming',
    icon: '📱',
    section: 'cultural',
    whatItIs: 'Social media platforms are engineered to capture attention through dopamine loops, outrage cycles, and trend-chasing. They shape beliefs, values, and identity — often without users realizing it.',
    whyPeopleFall: [
      'Dopamine addiction — the scroll is designed to be compulsive',
      'Influencers become trusted authorities without qualification',
      'Trends replace truth — what\'s popular becomes what\'s "right"',
      'Echo chambers reinforce existing beliefs without challenge',
    ],
    conflictWithScripture: [
      'Following the crowd is warned against (Exodus 23:2)',
      'Seeking man\'s approval over Yah\'s (Galatians 1:10)',
      'Being led by trends instead of truth (Ephesians 4:14)',
    ],
    hiddenDangers: [
      'Influencers become modern false prophets — no accountability',
      'Comparison culture breeds discontentment and envy',
      'Algorithms feed you what keeps you engaged, not what\'s true',
      'You become a consumer of opinions instead of a student of truth',
    ],
    pullAwayMechanism: [
      'Replaces prayer time with scroll time',
      'Replaces study with content consumption',
      'Creates anxiety that blocks spiritual peace',
    ],
    howToAvoid: [
      'Set boundaries — limit screen time for spiritual discipline',
      'Test everything you see against scripture',
      'Follow truth-speakers, not trend-chasers',
      'Fast from social media periodically',
    ],
    scriptures: [
      { ref: 'Exodus 23:2', text: 'Thou shalt not follow a multitude to do evil.' },
      { ref: 'Galatians 1:10', text: 'For do I now persuade men, or God? or do I seek to please men? for if I yet pleased men, I should not be the servant of Christ.' },
      { ref: 'Colossians 3:2', text: 'Set your affection on things above, not on things on the earth.' },
    ],
    truthVsLies: [
      { lie: 'If it\'s trending, it must be true', truth: 'The majority is usually wrong — the path is narrow (Matthew 7:14)', scripture: 'Matthew 7:14' },
      { lie: 'Influencers know what they\'re talking about', truth: 'Test every spirit (1 John 4:1)', scripture: '1 John 4:1' },
    ],
    spotDeception: [
      { statement: 'This influencer has millions of followers, so their spiritual advice must be trustworthy.', isDeception: true, explanation: 'Popularity has nothing to do with truth. Matthew 7:13-14 says the broad way leads to destruction and MANY go there.' },
      { statement: 'I should verify what I hear online against scripture before accepting it.', isDeception: false, explanation: 'This is the Berean approach (Acts 17:11) — always verify.' },
    ],
  },
  {
    id: 'money-hustle',
    title: 'Money, Hustle Culture, and Idolatry',
    icon: '💰',
    section: 'cultural',
    whatItIs: 'Modern hustle culture has turned the pursuit of money into a religion. "Get rich or die trying" isn\'t just a slogan — it\'s a doctrine. Flex culture glorifies materialism as the measure of success.',
    whyPeopleFall: [
      'Financial pressure is real — the grind feels necessary',
      'Society measures worth by net worth',
      'Prosperity preachers validate the chase',
      '"Providing for family" becomes the excuse for obsession',
    ],
    conflictWithScripture: [
      'The love of money is the root of all evil (1 Timothy 6:10)',
      'You cannot serve both Yah and mammon (Matthew 6:24)',
      'What does it profit a man to gain the world and lose his soul? (Mark 8:36)',
    ],
    hiddenDangers: [
      'Money becomes the functional god — every decision revolves around it',
      'Spiritual life gets sacrificed for the hustle',
      'Pride replaces humility',
      'Generosity dies when accumulation is the goal',
    ],
    pullAwayMechanism: [
      'Too busy hustling to study, pray, or serve',
      'Wealth creates false security — you stop depending on Yah',
      'Flex culture feeds ego, which opposes the Spirit',
    ],
    howToAvoid: [
      'Work hard but keep Yah first — seek the Kingdom first (Matthew 6:33)',
      'Practice generosity as a discipline',
      'Audit your priorities weekly',
      'Remember: provision comes from Yah, not your hustle alone',
    ],
    scriptures: [
      { ref: '1 Timothy 6:10', text: 'For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.' },
      { ref: 'Matthew 6:24', text: 'No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.' },
      { ref: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.' },
    ],
    truthVsLies: [
      { lie: 'Money is the measure of blessing', truth: 'Obedience is the measure of blessing (Deuteronomy 28:1)', scripture: 'Deuteronomy 28:1' },
      { lie: 'Grind 24/7 — sleep when you\'re dead', truth: 'Rest is commanded — even Yah rested (Exodus 20:8-11)', scripture: 'Exodus 20:8-11' },
    ],
    spotDeception: [
      { statement: 'If you\'re truly blessed by God, you\'ll be wealthy.', isDeception: true, explanation: 'Many righteous people in scripture were persecuted and poor. Wealth ≠ righteousness.' },
      { statement: 'Work hard, but keep Yah as your first priority over money.', isDeception: false, explanation: 'Correct — Matthew 6:33 says seek the Kingdom FIRST.' },
    ],
  },
  {
    id: 'entertainment-warfare',
    title: 'Entertainment as Spiritual Warfare',
    icon: '🎭',
    section: 'cultural',
    whatItIs: 'Movies, TV shows, video games, and music carry spiritual messaging — symbols, themes, and narratives that normalize sin, mock holiness, and subtly reshape worldviews. This isn\'t theory — it\'s observable.',
    whyPeopleFall: [
      '"It\'s just a movie" — the passive consumption mindset',
      'Emotional investment in characters overrides discernment',
      'Repetition normalizes what was once shocking',
      'Kids absorb it before they can filter',
    ],
    conflictWithScripture: [
      'Have no fellowship with darkness (Ephesians 5:11)',
      'Guard your heart — it\'s the wellspring of life (Proverbs 4:23)',
      'Whatever is pure, think on these things (Philippians 4:8)',
    ],
    hiddenDangers: [
      'Symbols and themes desensitize over time',
      'Heroes in fiction often embody rebellion against authority',
      'Mockery of holiness becomes normalized humor',
      'Children learn values from screens before parents teach them',
    ],
    pullAwayMechanism: [
      'Hours of entertainment replace hours of study',
      'Fiction shapes worldview more than scripture',
      'Makes the spiritual life seem boring by comparison',
    ],
    howToAvoid: [
      'Audit your entertainment — what themes does it promote?',
      'Set boundaries on screen time',
      'Replace entertainment hours with study and fellowship',
      'Watch with discernment — identify messaging instead of passively absorbing',
    ],
    scriptures: [
      { ref: 'Ephesians 5:11', text: 'And have no fellowship with the unfruitful works of darkness, but rather reprove them.' },
      { ref: 'Proverbs 4:23', text: 'Keep thy heart with all diligence; for out of it are the issues of life.' },
      { ref: 'Psalm 101:3', text: 'I will set no wicked thing before mine eyes.' },
    ],
    truthVsLies: [
      { lie: 'It\'s fiction — it can\'t affect my spirit', truth: 'What enters your eyes enters your heart (Psalm 101:3)', scripture: 'Psalm 101:3' },
      { lie: 'Watching dark content doesn\'t change who I am', truth: 'You become what you behold (2 Corinthians 3:18)', scripture: '2 Corinthians 3:18' },
    ],
    spotDeception: [
      { statement: 'This show has witchcraft in it, but it\'s fiction so it\'s fine.', isDeception: true, explanation: 'Deuteronomy 18:10-12 doesn\'t make exceptions for fiction. Normalizing it in any form erodes discernment.' },
      { statement: 'I should evaluate what I watch against scripture.', isDeception: false, explanation: 'Correct approach — Philippians 4:8 gives the standard for what we should set before our minds.' },
    ],
  },

  // === SPIRITUAL DECEPTIONS ===
  {
    id: 'new-age',
    title: 'The Dangers of New Age / Spirituality',
    icon: '🔮',
    section: 'spiritual',
    whatItIs: 'New Age spirituality replaces Yah with "energy," "the universe," or self-power. Manifestation, law of attraction, chakras, crystals, and astrology are repackaged paganism dressed in modern language.',
    whyPeopleFall: [
      'Feels empowering — "you are god"',
      'No accountability — no sin, no judgment',
      'Sounds peaceful and positive',
      'Celebrities and influencers promote it heavily',
    ],
    conflictWithScripture: [
      'Worship belongs to Yah alone (Exodus 20:3)',
      'No other spiritual authority is permitted (Deuteronomy 18:10-12)',
      '"You shall be as gods" was the ORIGINAL deception (Genesis 3:5)',
    ],
    hiddenDangers: [
      'Looks positive but leads away from the true Creator',
      'Opens doors to spiritual deception',
      'Self-worship is the oldest sin — "ye shall be as gods"',
      'Replaces prayer with rituals and manifestation',
    ],
    pullAwayMechanism: [
      'Replaces prayer with manifestation',
      'Replaces obedience with "vibes" and "energy"',
      'Replaces scripture with self-affirming philosophy',
    ],
    howToAvoid: [
      'Test everything against scripture',
      'Reject anything that replaces Yah with self or "the universe"',
      'Understand the original deception in Genesis 3',
      'Pray for discernment — ask Yah to reveal hidden deceptions',
    ],
    scriptures: [
      { ref: 'Genesis 3:5', text: 'For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.' },
      { ref: 'Exodus 20:3', text: 'Thou shalt have no other gods before me.' },
      { ref: 'Deuteronomy 18:10-12', text: 'There shall not be found among you any one that maketh his son or his daughter to pass through the fire, or that useth divination, or an observer of times, or an enchanter, or a witch.' },
      { ref: 'Isaiah 8:19', text: 'And when they shall say unto you, Seek unto them that have familiar spirits, and unto wizards that peep, and that mutter: should not a people seek unto their God?' },
    ],
    truthVsLies: [
      { lie: 'The universe will give you what you want', truth: 'Yah alone provides according to His will (Matthew 6:33)', scripture: 'Matthew 6:33' },
      { lie: 'You are god', truth: 'This was the serpent\'s original lie (Genesis 3:5)', scripture: 'Genesis 3:5' },
      { lie: 'Crystals have healing power', truth: 'Healing comes from Yah alone (Exodus 15:26)', scripture: 'Exodus 15:26' },
    ],
    spotDeception: [
      { statement: 'I don\'t pray to God — I just put my intentions into the universe.', isDeception: true, explanation: '"The universe" is not a being with ears. Prayer goes to Yah — the Creator. Replacing Him with a concept is idolatry.' },
      { statement: 'Astrology is harmless fun.', isDeception: true, explanation: 'Deuteronomy 18:10-12 explicitly forbids observing times (astrology). It\'s not harmless — it redirects trust from Yah to stars.' },
    ],
  },
  {
    id: 'witchcraft',
    title: 'Witchcraft — Hidden & Obvious',
    icon: '🧿',
    section: 'spiritual',
    whatItIs: 'Witchcraft isn\'t just cauldrons and spells. It\'s any attempt to control outcomes, people, or spiritual forces outside of Yah\'s authority. This includes tarot, manifestation rituals, sage cleansing, crystals, horoscopes, and much of modern "self-help."',
    whyPeopleFall: [
      'Repackaged as "wellness" and "self-care"',
      '"Everyone does it" normalization',
      'Seems harmless — sage, crystals, zodiac',
      'Desire for control over life circumstances',
    ],
    conflictWithScripture: [
      'All forms of sorcery are explicitly forbidden (Galatians 5:20)',
      'Witchcraft = rebellion (1 Samuel 15:23)',
      'No divination or enchantment among Yah\'s people (Deuteronomy 18:10-12)',
    ],
    hiddenDangers: [
      'A lot of it is packaged as "self-help" or "spiritual wellness"',
      'Witchcraft = seeking control outside Yah\'s authority',
      'Even subtle forms open spiritual doors',
      'Rebellion is compared directly to witchcraft in scripture',
    ],
    pullAwayMechanism: [
      'Trust shifts from Yah to rituals and objects',
      'Prayer is replaced with spells/affirmations/rituals',
      'Creates dependence on created things instead of the Creator',
    ],
    howToAvoid: [
      'If it promises spiritual power outside of Yah, reject it',
      'Test every practice — does scripture support this?',
      'Throw out any items associated with these practices',
      'Repent and turn from any past involvement',
    ],
    scriptures: [
      { ref: '1 Samuel 15:23', text: 'For rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry.' },
      { ref: 'Galatians 5:20', text: 'Idolatry, witchcraft, hatred, variance, emulations, wrath, strife, seditions, heresies.' },
      { ref: 'Acts 19:19', text: 'Many of them also which used curious arts brought their books together, and burned them before all men.' },
    ],
    truthVsLies: [
      { lie: 'Burning sage cleanses your space spiritually', truth: 'Only the blood of the Lamb and prayer to Yah cleanses (1 John 1:7)', scripture: '1 John 1:7' },
      { lie: 'Manifesting is just positive thinking', truth: 'It\'s attempting to control reality apart from Yah — witchcraft', scripture: '1 Samuel 15:23' },
    ],
    spotDeception: [
      { statement: 'I check my horoscope every morning for guidance.', isDeception: true, explanation: 'Seeking guidance from the stars instead of Yah is divination — explicitly forbidden in Deuteronomy 18:10-12.' },
      { statement: 'I seek Yah through prayer and scripture for direction in my life.', isDeception: false, explanation: 'This is the correct approach — Proverbs 3:5-6 says trust in Yah, not other sources.' },
    ],
  },
  {
    id: 'identity-self-worship',
    title: 'Identity Confusion & Self-Worship',
    icon: '🧬',
    section: 'spiritual',
    whatItIs: 'Modern culture teaches "be your own god," "define your own truth," and "self-love above all." This ego-driven self-worship removes Yah from the throne and puts self in His place — the oldest sin in existence.',
    whyPeopleFall: [
      'Feels empowering and freeing',
      'Culture celebrates self-expression as the highest value',
      '"Self-love" sounds healthy and positive',
      'Nobody wants to submit to authority',
    ],
    conflictWithScripture: [
      'Deny yourself, take up your cross (Matthew 16:24)',
      'Pride goes before destruction (Proverbs 16:18)',
      'The serpent\'s promise: "ye shall be as gods" (Genesis 3:5)',
    ],
    hiddenDangers: [
      'Self becomes the idol without you realizing it',
      'Every boundary Yah sets feels like oppression',
      'Accountability is rejected as "toxic"',
      'Humility dies — and without humility, Yah opposes you (James 4:6)',
    ],
    pullAwayMechanism: [
      'Replaces submission to Yah with self-determination',
      'Makes obedience feel like weakness',
      'Turns correction into an attack on your "identity"',
    ],
    howToAvoid: [
      'Practice daily humility — prayer on your knees',
      'Submit to Yah\'s word even when it contradicts your feelings',
      'Surround yourself with people who challenge you, not just affirm you',
    ],
    scriptures: [
      { ref: 'Matthew 16:24', text: 'Then said Jesus unto his disciples, If any man will come after me, let him deny himself, and take up his cross, and follow me.' },
      { ref: 'Proverbs 16:18', text: 'Pride goeth before destruction, and an haughty spirit before a fall.' },
      { ref: 'James 4:6', text: 'God resisteth the proud, but giveth grace unto the humble.' },
    ],
    truthVsLies: [
      { lie: 'You are enough just as you are', truth: 'Without Yah, you can do nothing (John 15:5)', scripture: 'John 15:5' },
      { lie: 'Self-love is the most important love', truth: 'Love Yah with all your heart FIRST (Matthew 22:37)', scripture: 'Matthew 22:37' },
    ],
    spotDeception: [
      { statement: 'My truth is all that matters.', isDeception: true, explanation: 'There is no "my truth" — there is only THE truth. Yah\'s word is truth (John 17:17).' },
      { statement: 'I need to deny my ego and follow Yah\'s commands.', isDeception: false, explanation: 'This aligns with Matthew 16:24 — deny yourself, take up your cross.' },
    ],
  },

  // === RELIGIOUS DECEPTIONS ===
  {
    id: 'islam-vs-scripture',
    title: 'Islam vs Scripture',
    icon: '☪️',
    section: 'religious',
    whatItIs: 'Islam presents itself as a continuation of the Abrahamic faith, but fundamental differences in the nature of the Creator, salvation, and the role of the Messiah create direct contradictions with scripture.',
    whyPeopleFall: [
      'Shares some prophets and stories — feels familiar',
      'Strong community and discipline is attractive',
      'Cultural identity and family pressure',
      'Opposition to Western Christianity draws some seekers',
    ],
    conflictWithScripture: [
      'The nature and character of the Creator differs from scripture\'s revelation',
      'The role and identity of the Messiah is fundamentally different',
      'Salvation methodology contradicts the covenant framework in Torah',
    ],
    hiddenDangers: [
      'Shared vocabulary masks deep theological differences',
      'People assume "same God" without comparing the actual texts',
      'Cultural respect prevents honest examination',
    ],
    pullAwayMechanism: [
      'Replaces the covenant of Yah with a different covenant framework',
      'Changes the identity and role of key prophets',
      'Redirects worship practices away from scriptural commands',
    ],
    howToAvoid: [
      'Study the source texts side by side',
      'Compare foundational claims about the Creator, salvation, and covenant',
      'Approach with respect but demand scriptural accuracy',
    ],
    scriptures: [
      { ref: 'Deuteronomy 6:4', text: 'Hear, O Israel: The LORD our God is one LORD.' },
      { ref: 'Isaiah 43:11', text: 'I, even I, am the LORD; and beside me there is no saviour.' },
      { ref: 'Exodus 3:14-15', text: 'And God said unto Moses, I AM THAT I AM... this is my name for ever, and this is my memorial unto all generations.' },
    ],
    truthVsLies: [
      { lie: 'All Abrahamic religions worship the same God', truth: 'Compare the attributes, commands, and covenants — they are not the same', scripture: 'Deuteronomy 6:4' },
    ],
    spotDeception: [
      { statement: 'It doesn\'t matter which Abrahamic religion you follow — they all lead to the same place.', isDeception: true, explanation: 'Each makes exclusive truth claims that contradict the others. They cannot all be true simultaneously. Compare the texts.' },
    ],
  },
  {
    id: 'christianity-institution',
    title: 'Christianity — Institution vs Truth',
    icon: '⛪',
    section: 'religious',
    whatItIs: 'Institutional Christianity has often replaced scriptural obedience with traditions, rituals, and cultural practices that have no foundation in the Bible. "Church culture" can become a substitute for genuine transformation.',
    whyPeopleFall: [
      'Born into it — never questioned it',
      'Community and belonging feels good',
      'Traditions feel sacred even without scriptural backing',
      '"Everyone does it this way" — majority assumption',
    ],
    conflictWithScripture: [
      'Teaching traditions of men as commandments of God (Mark 7:7-9)',
      'Sunday-only faith vs daily obedience',
      'Grace without transformation is deception',
    ],
    hiddenDangers: [
      'Following religion instead of following Yah',
      'False comfort replaces real transformation',
      'Traditions can actually contradict scripture',
      '"Church attendance" becomes the metric instead of obedience',
    ],
    pullAwayMechanism: [
      'Creates a false sense of security — "I go to church, I\'m good"',
      'Replaces personal study with passive listening',
      'Makes correction feel like an attack on faith',
    ],
    howToAvoid: [
      'Ask: Is this tradition in scripture, or is it man-made?',
      'Study the Torah — understand what Yah actually commanded',
      'Don\'t confuse attendance with obedience',
      'Be willing to walk away from tradition for truth',
    ],
    scriptures: [
      { ref: 'Mark 7:7-9', text: 'Howbeit in vain do they worship me, teaching for doctrines the commandments of men. For laying aside the commandment of God, ye hold the tradition of men.' },
      { ref: 'Matthew 15:3', text: 'Why do ye also transgress the commandment of God by your tradition?' },
      { ref: 'James 1:22', text: 'But be ye doers of the word, and not hearers only, deceiving your own selves.' },
    ],
    truthVsLies: [
      { lie: 'Going to church every Sunday makes you right with Yah', truth: 'Obedience > sacrifice (1 Samuel 15:22)', scripture: '1 Samuel 15:22' },
      { lie: 'The law was done away with', truth: 'Not one jot or tittle shall pass (Matthew 5:18)', scripture: 'Matthew 5:18' },
    ],
    spotDeception: [
      { statement: 'As long as you go to church and believe, you\'re saved.', isDeception: true, explanation: 'James 2:26 says faith without works is dead. Believing without obeying is self-deception.' },
      { statement: 'I should compare my church\'s teachings against scripture to make sure they align.', isDeception: false, explanation: 'This is the Berean standard (Acts 17:11) — always verify.' },
    ],
  },
  {
    id: 'false-teachers',
    title: 'False Teachers / Wolves in Sheep\'s Clothing',
    icon: '🐑',
    section: 'religious',
    whatItIs: 'False teachers use scripture selectively to build platforms, gain followers, and make money. They speak smooth words, avoid hard truths, and create dependent audiences instead of mature disciples.',
    whyPeopleFall: [
      'They\'re charismatic and confident',
      'They tell you what you want to hear',
      'They use real scriptures — just selectively',
      'Big platforms create assumed authority',
    ],
    conflictWithScripture: [
      'By their fruits you shall know them (Matthew 7:20)',
      'Beware of those who come in sheep\'s clothing (Matthew 7:15)',
      'They will have a form of godliness but deny its power (2 Timothy 3:5)',
    ],
    hiddenDangers: [
      'No correction, only motivation — never addresses sin',
      'Money-focused ministry — always selling something',
      'Avoids hard truths that might lose followers',
      'Creates emotional dependence instead of scriptural maturity',
      'Uses partial truth mixed with error — the most dangerous combination',
    ],
    pullAwayMechanism: [
      'Makes you a follower of a person instead of Yah',
      'Selective scripture creates a distorted worldview',
      'Prosperity-only preaching kills urgency for repentance',
    ],
    howToAvoid: [
      'Look at their fruit — lifestyle, not just words',
      'Do they correct sin or just motivate?',
      'Do they teach the FULL counsel of scripture?',
      'Follow Yah, not personalities',
    ],
    scriptures: [
      { ref: 'Matthew 7:15', text: 'Beware of false prophets, which come to you in sheep\'s clothing, but inwardly they are ravening wolves.' },
      { ref: 'Matthew 7:20', text: 'Wherefore by their fruits ye shall know them.' },
      { ref: '2 Timothy 4:3', text: 'For the time will come when they will not endure sound doctrine; but after their own lusts shall they heap to themselves teachers, having itching ears.' },
      { ref: '2 Peter 2:1-3', text: 'But there were false prophets also among the people, even as there shall be false teachers among you, who privily shall bring in damnable heresies.' },
    ],
    truthVsLies: [
      { lie: 'A big platform means God\'s blessing', truth: 'Many false prophets will rise and deceive MANY (Matthew 24:11)', scripture: 'Matthew 24:11' },
      { lie: 'If they quote scripture, they must be right', truth: 'Satan quoted scripture to tempt the Messiah (Matthew 4:6)', scripture: 'Matthew 4:6' },
    ],
    spotDeception: [
      { statement: 'This pastor drives a Rolls Royce — God must be really blessing his ministry.', isDeception: true, explanation: 'External wealth is not a measure of spiritual authority. 1 Timothy 6:5 warns about those who think gain is godliness.' },
      { statement: 'I should compare any teacher\'s words against scripture before following their teaching.', isDeception: false, explanation: 'Acts 17:11 — the Bereans were called noble because they verified everything.' },
    ],
  },

  // === ADVANCED ===
  {
    id: 'half-truth-doctrine',
    title: 'Half-Truth Doctrine — The Most Dangerous Deception',
    icon: '🧩',
    section: 'advanced',
    whatItIs: 'A half-truth uses real scripture or real concepts but twists them slightly — just enough to redirect you away from the full truth. This is the MOST dangerous form of deception because it "sounds right."',
    whyPeopleFall: [
      'It uses real scriptures — so it passes the surface test',
      'It confirms what people already want to believe',
      'Requires deep study to spot the twist',
      'Most people don\'t study enough to catch the error',
    ],
    conflictWithScripture: [
      'Satan used actual scripture to tempt the Messiah (Matthew 4:6)',
      'A little leaven leavens the whole lump (Galatians 5:9)',
      'Twisting scripture to your own destruction (2 Peter 3:16)',
    ],
    hiddenDangers: [
      'Sounds biblical — passes casual inspection',
      'Creates false doctrines that spread through communities',
      'Builds entire theological systems on twisted foundations',
      'The closer to truth, the harder to detect',
    ],
    pullAwayMechanism: [
      'You think you\'re following truth when you\'re following error',
      'Builds confidence in a wrong foundation',
      'Makes full truth seem extreme by comparison',
    ],
    howToAvoid: [
      'Study the FULL counsel — not just favorite verses',
      'Context is king — read before AND after every quoted verse',
      'If a teaching relies on ONE verse while ignoring others, be suspicious',
      'The enemy\'s best weapon isn\'t lies — it\'s truth with a twist',
    ],
    scriptures: [
      { ref: 'Matthew 4:6', text: 'And saith unto him, If thou be the Son of God, cast thyself down: for it is written, He shall give his angels charge concerning thee.' },
      { ref: 'Galatians 5:9', text: 'A little leaven leaveneth the whole lump.' },
      { ref: '2 Peter 3:16', text: 'In which are some things hard to be understood, which they that are unlearned and unstable wrest, as they do also the other scriptures, unto their own destruction.' },
      { ref: '2 Corinthians 11:14', text: 'And no marvel; for Satan himself is transformed into an angel of light.' },
    ],
    truthVsLies: [
      { lie: 'Grace means the law is abolished', truth: 'Grace teaches us to DENY ungodliness (Titus 2:11-12), not ignore the law', scripture: 'Titus 2:11-12' },
      { lie: 'God just wants you to be happy', truth: 'Yah wants you to be HOLY (1 Peter 1:16)', scripture: '1 Peter 1:16' },
      { lie: 'Don\'t judge anyone', truth: 'Judge with righteous judgment (John 7:24)', scripture: 'John 7:24' },
    ],
    spotDeception: [
      { statement: 'The law was nailed to the cross — we\'re free from all commandments now.', isDeception: true, explanation: 'Colossians 2:14 says the handwriting of ordinances (debt/penalty) was nailed — not the Torah itself. Matthew 5:17-19 confirms the law stands.' },
      { statement: 'We should read verses in full context, not just cherry-pick.', isDeception: false, explanation: 'Correct. Context prevents misinterpretation. 2 Timothy 2:15 says to rightly divide the word of truth.' },
    ],
  },
  {
    id: 'modern-morality',
    title: 'Modern Morality — The Biggest Trap',
    icon: '🧠',
    section: 'advanced',
    whatItIs: '"Do what feels right." "Live your truth." "Love is love." Modern morality has removed Yah\'s authority and replaced it with human feelings as the standard. This is the broadest deception of our time.',
    whyPeopleFall: [
      'It feels compassionate and inclusive',
      'Opposing it makes you look hateful',
      'Culture has redefined love to mean acceptance of everything',
      'Few people want to be "that person" who stands against the crowd',
    ],
    conflictWithScripture: [
      'There is a way that seems right to a man, but leads to death (Proverbs 14:12)',
      'Woe to those who call evil good and good evil (Isaiah 5:20)',
      'The heart is deceitful above all things (Jeremiah 17:9)',
    ],
    hiddenDangers: [
      'Removes Yah\'s authority — man becomes the moral standard',
      'Truth becomes subjective — everyone has "their truth"',
      'Correction becomes "hate" — impossible to help anyone',
      'Society degrades because there\'s no fixed standard',
    ],
    pullAwayMechanism: [
      'Makes obedience to Yah feel "judgmental" and "toxic"',
      'Replaces truth with feelings',
      'Creates shame around standing for scripture',
    ],
    howToAvoid: [
      'Yah\'s word is the standard — not culture, not feelings',
      'Love includes truth AND correction',
      'Be willing to stand alone when the crowd moves away from truth',
      'Remember: the path is narrow and FEW find it (Matthew 7:14)',
    ],
    scriptures: [
      { ref: 'Isaiah 5:20', text: 'Woe unto them that call evil good, and good evil; that put darkness for light, and light for darkness.' },
      { ref: 'Proverbs 14:12', text: 'There is a way which seemeth right unto a man, but the end thereof are the ways of death.' },
      { ref: 'Jeremiah 17:9', text: 'The heart is deceitful above all things, and desperately wicked: who can know it?' },
      { ref: 'Matthew 7:13-14', text: 'Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat: Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it.' },
    ],
    truthVsLies: [
      { lie: 'Follow your heart', truth: 'Guard your heart — it\'s deceitful (Jeremiah 17:9)', scripture: 'Jeremiah 17:9' },
      { lie: 'Love means accepting everything', truth: 'Love rejoices in TRUTH, not iniquity (1 Corinthians 13:6)', scripture: '1 Corinthians 13:6' },
      { lie: 'Don\'t judge — that\'s not loving', truth: 'Judge with righteous judgment (John 7:24)', scripture: 'John 7:24' },
    ],
    spotDeception: [
      { statement: 'As long as it\'s between consenting adults, anything goes.', isDeception: true, explanation: 'Human consent doesn\'t override Yah\'s commands. He defines what is right and wrong — not human agreement.' },
      { statement: 'Yah\'s word defines right and wrong — not human feelings or cultural trends.', isDeception: false, explanation: 'Correct. Isaiah 5:20 warns against replacing Yah\'s standard with our own.' },
    ],
  },
];

export const DISCERNMENT_SECTIONS = [
  { id: 'foundations', label: '🛡️ Foundations of Discernment', description: 'What discernment is and why it matters' },
  { id: 'cultural', label: '🌍 Cultural Deceptions', description: 'Entertainment, social media, money, and identity traps' },
  { id: 'spiritual', label: '🔮 Spiritual Deceptions', description: 'New Age, witchcraft, self-worship, and hidden spiritual dangers' },
  { id: 'religious', label: '⛪ Religious Deceptions', description: 'False teachers, institutional religion, and doctrinal errors' },
  { id: 'advanced', label: '⚔️ Advanced Warfare', description: 'Half-truth doctrine, modern morality, and the deepest deceptions' },
] as const;
