export type MaturityLevel = 'milk' | 'bread' | 'meat';

export interface ReflectionQuestion {
  question: string;
}

export interface ActionStep {
  step: string;
}

export interface StudyLesson {
  id: string;
  title: string;
  overview: string;
  keyVerses: string[];
  reflectionQuestions: ReflectionQuestion[];
  actionSteps: ActionStep[];
  completed: boolean;
}

export interface StudyModule {
  id: string;
  title: string;
  overview: string;
  icon: string;
  difficulty: MaturityLevel;
  lessons: StudyLesson[];
  progress: number;
}

export const maturityLabels: Record<MaturityLevel, { label: string; description: string }> = {
  milk: { label: 'Milk', description: 'Foundational truths for new believers' },
  bread: { label: 'Bread', description: 'Growing in understanding and discipline' },
  meat: { label: 'Meat', description: 'Deep study for the mature and discerning' },
};

export const studyModules: StudyModule[] = [
  // ──────── MILK ────────
  {
    id: 'foundations',
    title: 'Foundations: Knowing Yahweh',
    overview: 'Establish a solid foundation by understanding who Yahweh is, what covenant means, and the basics of repentance, obedience, prayer, holiness, and wisdom.',
    icon: '🪨',
    difficulty: 'milk',
    progress: 35,
    lessons: [
      {
        id: 'f1',
        title: 'Who is Yahweh?',
        overview: 'The Creator revealed His name. Understanding Yahweh as the self-existent One, the Elohim of Abraham, Yitshaq, and Ya\'aqob.',
        keyVerses: ['Exodus 3:14-15', 'Isaiah 42:8', 'Psalm 83:18', 'Deuteronomy 6:4'],
        reflectionQuestions: [
          { question: 'Why did Yahweh reveal His personal name to Mosheh?' },
          { question: 'How does knowing the name of the Creator change your relationship with Him?' },
        ],
        actionSteps: [
          { step: 'Read Exodus 3 in full and note every attribute of Yahweh revealed.' },
          { step: 'Begin using the restored name Yahweh in your prayers this week.' },
        ],
        completed: true,
      },
      {
        id: 'f2',
        title: 'Covenant — The Binding Agreement',
        overview: 'Covenant is the framework of relationship between Yahweh and His people. Understand what it means to be in covenant.',
        keyVerses: ['Genesis 15:1-21', 'Jeremiah 31:31-34', 'Hebrews 8:6-13'],
        reflectionQuestions: [
          { question: 'What responsibilities does a covenant place on both parties?' },
          { question: 'Are you living as though you are in covenant with the Most High?' },
        ],
        actionSteps: [
          { step: 'Study the five major covenants in Scripture and list the terms of each.' },
          { step: 'Write down what covenant faithfulness looks like in your daily life.' },
        ],
        completed: true,
      },
      {
        id: 'f3',
        title: 'Repentance — Turning Back',
        overview: 'Teshuvah (repentance) is not merely feeling sorry — it is a decisive turning from sin back to obedience to Yahweh\'s instructions.',
        keyVerses: ['2 Chronicles 7:14', 'Acts 3:19', 'Ezekiel 18:30-32', 'Joel 2:12-13'],
        reflectionQuestions: [
          { question: 'What is the difference between worldly sorrow and true repentance?' },
          { question: 'Is there an area of your life where you need to turn back?' },
        ],
        actionSteps: [
          { step: 'Identify one area of compromise and take a concrete step to repent this week.' },
          { step: 'Memorize Ezekiel 18:30-32.' },
        ],
        completed: false,
      },
      {
        id: 'f4',
        title: 'Obedience — The Evidence of Love',
        overview: 'Obedience is not legalism — it is the natural fruit of loving Yahweh. If you love Me, keep My commandments.',
        keyVerses: ['John 14:15', 'Deuteronomy 28:1-14', '1 John 5:3', 'James 1:22'],
        reflectionQuestions: [
          { question: 'How does obedience differ from legalism in motive and heart posture?' },
          { question: 'Which commandments are you currently neglecting?' },
        ],
        actionSteps: [
          { step: 'Read Deuteronomy 28 and list the blessings tied to obedience.' },
          { step: 'Choose one commandment you\'ve overlooked and begin walking it out.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'law-vs-grace',
    title: 'Law vs Grace — The Real Breakdown',
    overview: 'The most twisted doctrine in modern Christianity. Break through the confusion and see what Scripture actually says about Torah and grace working together.',
    icon: '⚖️',
    difficulty: 'milk',
    progress: 0,
    lessons: [
      {
        id: 'lg1',
        title: 'What Did Yahshua Actually Say About the Law?',
        overview: 'Matthew 5:17-19 is the clearest statement. Did He abolish it or uphold it? Let the text speak.',
        keyVerses: ['Matthew 5:17-19', 'Matthew 7:21-23', 'Luke 16:17', 'John 14:15'],
        reflectionQuestions: [
          { question: 'If Yahshua said He did not come to abolish the Law, why do most teach otherwise?' },
          { question: 'What does "not one jot or tittle" mean practically for how you live?' },
        ],
        actionSteps: [
          { step: 'Read the Sermon on the Mount (Matthew 5-7) and list every time Yahshua references the Law.' },
          { step: 'Ask yourself: Am I following a Messiah who kept Torah or one who abolished it?' },
        ],
        completed: false,
      },
      {
        id: 'lg2',
        title: 'Paul and the Law — Misunderstood Apostle',
        overview: 'Paul is the most misquoted writer in Scripture. Learn what he actually said about Torah vs what people claim he said.',
        keyVerses: ['Romans 3:31', 'Romans 7:12', 'Romans 6:1-2', 'Galatians 3:21-24', '2 Peter 3:15-17'],
        reflectionQuestions: [
          { question: 'Peter warned that people twist Paul\'s writings. Have you seen this happen?' },
          { question: 'Does Romans 3:31 sound like someone abolishing the Law?' },
        ],
        actionSteps: [
          { step: 'Read Romans 6-8 in one sitting and note every positive thing Paul says about the Law.' },
          { step: 'Find three commonly cited "Paul abolished the law" verses and read them in full context.' },
        ],
        completed: false,
      },
      {
        id: 'lg3',
        title: 'Grace — What It Actually Means',
        overview: 'Charis (grace) is divine empowerment to obey, not a license to disobey. This lesson dismantles the cheap grace doctrine.',
        keyVerses: ['Titus 2:11-14', 'Jude 1:4', 'Romans 6:14-15', 'Hebrews 10:26-31'],
        reflectionQuestions: [
          { question: 'If grace teaches us to deny ungodliness (Titus 2:12), how can it also mean the Law is irrelevant?' },
        ],
        actionSteps: [
          { step: 'Compare Titus 2:11-14 with Jude 1:4 — what warning emerges about grace?' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'sin-defined',
    title: 'Sin — What It Actually Is',
    overview: 'Sin is not vague badness. Scripture defines it precisely. Know the definition, the examples, and the consequences — or you cannot repent from what you do not recognize.',
    icon: '🎯',
    difficulty: 'milk',
    progress: 0,
    lessons: [
      {
        id: 'sd1',
        title: 'The Scriptural Definition of Sin',
        overview: '1 John 3:4 gives the explicit definition: sin is lawlessness (transgression of Torah). If you reject Torah, you have no framework to identify sin.',
        keyVerses: ['1 John 3:4', 'Romans 3:20', 'Romans 7:7', 'James 2:10-11'],
        reflectionQuestions: [
          { question: 'If sin is lawlessness, what law is being referenced?' },
          { question: 'How do you identify sin without a standard to measure against?' },
        ],
        actionSteps: [
          { step: 'Memorize 1 John 3:4 and meditate on its implications for daily living.' },
          { step: 'List five things you consider sin — then find the Torah commandment behind each one.' },
        ],
        completed: false,
      },
      {
        id: 'sd2',
        title: 'Consequences of Sin',
        overview: 'The wages of sin is death. Not metaphorical vagueness — real separation from Yahweh with real consequences. Understand the weight.',
        keyVerses: ['Romans 6:23', 'Ezekiel 18:4', 'Isaiah 59:1-2', 'Hebrews 10:26-27'],
        reflectionQuestions: [
          { question: 'Do you treat sin casually because you assume grace covers everything automatically?' },
        ],
        actionSteps: [
          { step: 'Read Hebrews 10:26-31 slowly and write your honest reaction.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'fear-of-yahweh',
    title: 'The Fear of Yahweh',
    overview: 'The beginning of wisdom is the fear of Yahweh. Not cute reverence — real, deep, trembling respect for the Almighty.',
    icon: '⚡',
    difficulty: 'milk',
    progress: 0,
    lessons: [
      {
        id: 'fy1',
        title: 'What Is the Fear of Yahweh?',
        overview: 'It is not being scared of a tyrant. It is holy awe, deep reverence, and the understanding that Yahweh is serious about His instructions.',
        keyVerses: ['Proverbs 9:10', 'Proverbs 1:7', 'Psalm 111:10', 'Ecclesiastes 12:13', 'Isaiah 66:2'],
        reflectionQuestions: [
          { question: 'Do you approach Yahweh with casual familiarity or with trembling reverence?' },
          { question: 'How does fearing Yahweh change the way you make decisions?' },
        ],
        actionSteps: [
          { step: 'Read Ecclesiastes 12:13 — "Fear Elohim and keep His commandments, for this is the whole of man." Sit with that.' },
          { step: 'List three areas where you have lost holy fear and repent.' },
        ],
        completed: false,
      },
    ],
  },

  // ──────── BREAD ────────
  {
    id: 'scripture-discipline',
    title: 'Scripture Discipline',
    overview: 'Learn how to study the Word properly — comparing texts, avoiding eisegesis, testing doctrines, and building a disciplined study habit.',
    icon: '📜',
    difficulty: 'bread',
    progress: 10,
    lessons: [
      {
        id: 'scd1',
        title: 'How to Study Scripture',
        overview: 'Develop a method for reading that respects context, authorial intent, and the full counsel of Scripture.',
        keyVerses: ['2 Timothy 2:15', 'Acts 17:11', 'Isaiah 28:10', 'Proverbs 25:2'],
        reflectionQuestions: [
          { question: 'Do you read Scripture to confirm what you already believe, or to discover what Yahweh actually says?' },
        ],
        actionSteps: [
          { step: 'Pick a chapter and practice reading it in three different translations, noting differences.' },
        ],
        completed: false,
      },
      {
        id: 'scd2',
        title: 'Comparing Verse to Verse',
        overview: 'Scripture interprets Scripture. Learn to cross-reference and let the text speak for itself.',
        keyVerses: ['Isaiah 28:9-10', '2 Peter 1:20-21', 'Psalm 119:160'],
        reflectionQuestions: [
          { question: 'Have you ever held a belief that was challenged when you compared it to other verses?' },
        ],
        actionSteps: [
          { step: 'Take a doctrine you hold and find at least five supporting and two challenging verses.' },
        ],
        completed: false,
      },
      {
        id: 'scd3',
        title: 'Testing Doctrine',
        overview: 'Every teaching must be tested against the whole of Scripture. Learn to evaluate teachers, traditions, and popular beliefs.',
        keyVerses: ['1 Thessalonians 5:21', '1 John 4:1', 'Galatians 1:8-9', 'Matthew 7:15-20'],
        reflectionQuestions: [
          { question: 'What criteria do you use to evaluate whether a teaching is sound?' },
        ],
        actionSteps: [
          { step: 'List three teachings you\'ve accepted without fully testing them. Begin testing one this week.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'torah-foundations',
    title: 'Torah Foundations',
    overview: 'The Torah is the foundation of all Scripture. Understand the law, feasts, Sabbath, clean and unclean, justice, and mercy as Yahweh gave them.',
    icon: '📖',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      {
        id: 'tf1',
        title: 'What is Torah?',
        overview: 'Torah means instruction, not merely law. Understanding what Yahweh\'s Torah encompasses and why it matters for every believer.',
        keyVerses: ['Psalm 119:1-8', 'Psalm 19:7-11', 'Matthew 5:17-19', 'Romans 3:31'],
        reflectionQuestions: [
          { question: 'Has anyone taught you that Torah is obsolete? What does Yahshua say about it?' },
        ],
        actionSteps: [
          { step: 'Read Psalm 119 in one sitting and note every positive description of Torah.' },
        ],
        completed: false,
      },
      {
        id: 'tf2',
        title: 'The Sabbath',
        overview: 'The seventh-day Sabbath is a sign between Yahweh and His people. Understand its origin, purpose, and ongoing significance.',
        keyVerses: ['Genesis 2:2-3', 'Exodus 20:8-11', 'Isaiah 58:13-14', 'Mark 2:27-28'],
        reflectionQuestions: [
          { question: 'Do you keep the Sabbath? If not, what has prevented you?' },
        ],
        actionSteps: [
          { step: 'Set apart next Shabbat (Friday evening to Saturday evening) and rest intentionally.' },
        ],
        completed: false,
      },
      {
        id: 'tf3',
        title: 'The Appointed Times (Mo\'edim)',
        overview: 'Yahweh\'s feast days are rehearsals of His redemptive plan. Study the seven appointed times and their prophetic significance.',
        keyVerses: ['Leviticus 23:1-44', 'Colossians 2:16-17', '1 Corinthians 5:7-8'],
        reflectionQuestions: [
          { question: 'Which of Yahweh\'s feasts have you observed? Which ones are you unfamiliar with?' },
        ],
        actionSteps: [
          { step: 'Create a chart of all seven feasts with their dates, meanings, and prophetic fulfillments.' },
        ],
        completed: false,
      },
      {
        id: 'tf4',
        title: 'Clean and Unclean — Dietary Instructions',
        overview: 'Yahweh gave clear dietary instructions in Leviticus 11 and Deuteronomy 14. They were never abolished. Understand what is clean and what is not.',
        keyVerses: ['Leviticus 11:1-47', 'Deuteronomy 14:3-21', 'Isaiah 66:15-17', 'Acts 10:14-15'],
        reflectionQuestions: [
          { question: 'Was Peter\'s vision in Acts 10 really about food? Read the full passage and answer honestly.' },
        ],
        actionSteps: [
          { step: 'Read Leviticus 11 and begin aligning your diet to Yahweh\'s instructions.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'messiah-nt',
    title: 'Messiah & the Renewed Covenant',
    overview: 'Understand the kingdom message of Yahshua, true discipleship, salvation, faithfulness, the relationship between grace and obedience, and enduring to the end.',
    icon: '👑',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      {
        id: 'mn1',
        title: 'The Kingdom Message',
        overview: 'Yahshua came preaching the kingdom of Yahweh. What is this kingdom and what does it require of us?',
        keyVerses: ['Mark 1:14-15', 'Matthew 6:33', 'Luke 17:20-21', 'Matthew 7:21'],
        reflectionQuestions: [
          { question: 'Is the kingdom something you enter once, or something you walk in daily?' },
        ],
        actionSteps: [
          { step: 'Study every use of "kingdom" in the book of Matthew and summarize the pattern.' },
        ],
        completed: false,
      },
      {
        id: 'mn2',
        title: 'Grace and Obedience',
        overview: 'Grace is not a license to sin. Understand the true relationship between unmerited favor and faithful obedience.',
        keyVerses: ['Romans 6:1-2', 'Titus 2:11-14', 'Ephesians 2:8-10', 'James 2:17-26'],
        reflectionQuestions: [
          { question: 'Can grace exist without a transformed life? What does Scripture say?' },
        ],
        actionSteps: [
          { step: 'Read Romans 6 fully and write out Paul\'s argument about grace and sin.' },
        ],
        completed: false,
      },
      {
        id: 'mn3',
        title: 'Enduring to the End',
        overview: 'Salvation is not a one-time event with no follow-through. Yahshua said the one who endures to the end will be saved.',
        keyVerses: ['Matthew 24:13', 'Hebrews 3:14', 'Revelation 2:10', 'Philippians 2:12-13'],
        reflectionQuestions: [
          { question: 'If you cannot lose your position, why did Yahshua warn about enduring?' },
        ],
        actionSteps: [
          { step: 'Read the letters to the seven assemblies in Revelation 2-3 and note every conditional promise.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'prophets-warnings',
    title: 'Prophets & Warnings — Patterns of Judgment',
    overview: 'The prophets warned Yisrael repeatedly. The same patterns of rebellion, judgment, and restoration are relevant today. Learn them or repeat them.',
    icon: '📢',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      {
        id: 'pw1',
        title: 'The Pattern of Rebellion',
        overview: 'From the golden calf to the exile — Yisrael\'s cycle of obedience, rebellion, judgment, and repentance.',
        keyVerses: ['Judges 2:11-19', 'Jeremiah 7:23-28', 'Nehemiah 9:26-31'],
        reflectionQuestions: [
          { question: 'Are you personally caught in a cycle of rebellion and half-repentance?' },
        ],
        actionSteps: [
          { step: 'Read Judges 2 and map the cycle. Then honestly assess where you fall in that cycle right now.' },
        ],
        completed: false,
      },
      {
        id: 'pw2',
        title: 'Judgment & Accountability',
        overview: 'Yahweh judges nations and individuals. Understand that accountability is an act of love, not cruelty.',
        keyVerses: ['Amos 3:2', 'Hebrews 12:5-11', 'Proverbs 3:11-12', 'Revelation 3:19'],
        reflectionQuestions: [
          { question: 'Do you accept correction or resist it?' },
        ],
        actionSteps: [
          { step: 'Read Amos and list the specific sins Yahweh judged. Ask yourself if any apply today.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'spiritual-warfare',
    title: 'Spiritual Warfare — Real vs Fake',
    overview: 'Separate the theatrical from the textual. Real spiritual warfare is about standing firm in truth, resisting temptation, and guarding your mind.',
    icon: '🛡️',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      {
        id: 'sw1',
        title: 'The Armor of Yahweh',
        overview: 'Ephesians 6 describes real spiritual armor. It is not shouting at demons — it is truth, righteousness, readiness, faith, salvation, and the Word.',
        keyVerses: ['Ephesians 6:10-18', '2 Corinthians 10:3-5', 'James 4:7', '1 Peter 5:8-9'],
        reflectionQuestions: [
          { question: 'Which piece of the armor are you currently neglecting?' },
        ],
        actionSteps: [
          { step: 'Go through each piece of armor in Ephesians 6 and rate yourself honestly on each one.' },
        ],
        completed: false,
      },
      {
        id: 'sw2',
        title: 'Guarding the Mind',
        overview: 'The battlefield is the mind. What you consume, think about, and meditate on determines your spiritual strength.',
        keyVerses: ['Philippians 4:8', 'Romans 12:2', 'Proverbs 4:23', '2 Corinthians 10:5'],
        reflectionQuestions: [
          { question: 'What are you feeding your mind daily? Is it building you up or tearing you down?' },
        ],
        actionSteps: [
          { step: 'Do a 7-day audit of your media consumption. Cut what does not align with Philippians 4:8.' },
        ],
        completed: false,
      },
    ],
  },

  // ──────── MEAT ────────
  {
    id: 'spiritual-maturity',
    title: 'Spiritual Maturity',
    overview: 'Moving beyond knowledge into character. Self-control, humility, discernment, patience, guarding the tongue, and walking uprightly.',
    icon: '🔥',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      {
        id: 'sm1',
        title: 'Self-Control and Discipline',
        overview: 'A person without self-control is like a city broken into and left without walls. Master yourself under Yahweh\'s authority.',
        keyVerses: ['Proverbs 25:28', 'Galatians 5:22-23', '1 Corinthians 9:27', '2 Peter 1:5-8'],
        reflectionQuestions: [
          { question: 'In what area of your life do you most lack self-control?' },
        ],
        actionSteps: [
          { step: 'Choose one area of indiscipline and fast from it for one week, replacing it with prayer.' },
        ],
        completed: false,
      },
      {
        id: 'sm2',
        title: 'Discernment — Seeing Clearly',
        overview: 'Discernment is the ability to judge rightly between truth and error, good and evil. It is developed through practice.',
        keyVerses: ['Hebrews 5:14', '1 Kings 3:9', 'Philippians 1:9-10', 'Proverbs 2:1-6'],
        reflectionQuestions: [
          { question: 'How do you currently test whether a teaching or practice is from Yahweh?' },
        ],
        actionSteps: [
          { step: 'Practice discernment by evaluating one popular teaching this week using only Scripture.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'error-detection',
    title: 'Error Detection',
    overview: 'Learn to identify common errors: tradition elevated above text, assumptions presented as explicit teaching, selective reading, and false confidence.',
    icon: '🔍',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      {
        id: 'ed1',
        title: 'Tradition vs. Text',
        overview: 'Many widely held beliefs are traditions of men, not explicit Scripture. Learn to distinguish between the two.',
        keyVerses: ['Mark 7:6-9', 'Colossians 2:8', 'Matthew 15:3-9', 'Jeremiah 16:19'],
        reflectionQuestions: [
          { question: 'Name a tradition you once believed was biblical. What caused you to re-examine it?' },
        ],
        actionSteps: [
          { step: 'Pick one common church tradition and trace it — is it found explicitly in Scripture?' },
        ],
        completed: false,
      },
      {
        id: 'ed2',
        title: 'Selective Reading',
        overview: 'Cherry-picking verses to support a position while ignoring contrary passages is a dangerous practice. Study the whole counsel.',
        keyVerses: ['Acts 20:27', '2 Timothy 3:16-17', '2 Peter 3:15-17', 'Deuteronomy 4:2'],
        reflectionQuestions: [
          { question: 'Have you ever ignored a verse because it challenged your theology?' },
        ],
        actionSteps: [
          { step: 'Take your strongest held belief and intentionally seek out passages that seem to challenge it.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'parables-decoded',
    title: 'Parables Decoded — Beyond the Surface',
    overview: 'Yahshua\'s parables are not children\'s stories. They contain coded kingdom truth that most people never dig into. Go deeper.',
    icon: '🗝️',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      {
        id: 'pd1',
        title: 'Why Did Yahshua Speak in Parables?',
        overview: 'It was not to make things easier — it was to hide truth from those not ready and reveal it to those who seek.',
        keyVerses: ['Matthew 13:10-17', 'Mark 4:11-12', 'Proverbs 25:2'],
        reflectionQuestions: [
          { question: 'If parables are meant to conceal and reveal, how hard are you seeking to understand them?' },
        ],
        actionSteps: [
          { step: 'Read Matthew 13 and note which parables Yahshua explains vs which He leaves unexplained.' },
        ],
        completed: false,
      },
      {
        id: 'pd2',
        title: 'The Wheat and the Tares',
        overview: 'The kingdom is not what most think. There are imitations growing alongside the real. Learn to understand the separation that is coming.',
        keyVerses: ['Matthew 13:24-30', 'Matthew 13:36-43', 'Matthew 7:21-23'],
        reflectionQuestions: [
          { question: 'How do you distinguish wheat from tares in your own life and community?' },
        ],
        actionSteps: [
          { step: 'Study the parable of the wheat and tares alongside Matthew 7:21-23 and write the connection.' },
        ],
        completed: false,
      },
      {
        id: 'pd3',
        title: 'The Ten Virgins — Readiness',
        overview: 'Five were ready. Five were not. The door shut. This parable is a warning about preparation and perseverance.',
        keyVerses: ['Matthew 25:1-13', 'Luke 12:35-40', 'Revelation 19:7-8'],
        reflectionQuestions: [
          { question: 'What does "oil in your lamp" represent? Are you maintaining it?' },
        ],
        actionSteps: [
          { step: 'Write out what it means to be spiritually prepared — then assess your own readiness honestly.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'paul-misunderstood',
    title: 'Paul\'s Writings — Correct vs Misinterpreted',
    overview: 'Peter warned that people twist Paul\'s letters to their own destruction. This module untangles the most misused Pauline passages.',
    icon: '⚔️',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      {
        id: 'pm1',
        title: 'Peter\'s Warning About Paul',
        overview: '2 Peter 3:15-17 explicitly warns that unstable people twist Paul\'s writings. This is not optional reading — it is a direct biblical warning.',
        keyVerses: ['2 Peter 3:15-17', 'Acts 21:20-24', 'Acts 24:14'],
        reflectionQuestions: [
          { question: 'If Peter himself said Paul is hard to understand, why do people build entire theologies on single Pauline verses?' },
        ],
        actionSteps: [
          { step: 'Read 2 Peter 3:15-17 and then read Acts 21:20-24 where Paul takes a Torah vow. Reconcile.' },
        ],
        completed: false,
      },
      {
        id: 'pm2',
        title: 'Galatians in Context',
        overview: 'Galatians is not about abolishing Torah. It is about the Judaizer heresy of adding works FOR salvation vs walking in obedience BECAUSE of salvation.',
        keyVerses: ['Galatians 2:16', 'Galatians 3:10-14', 'Galatians 5:13-14', 'Galatians 5:18-25'],
        reflectionQuestions: [
          { question: 'If Galatians abolishes Torah, why does Paul list fruits of the Spirit that are Torah-aligned?' },
        ],
        actionSteps: [
          { step: 'Read all of Galatians in one sitting. Note every time Paul references Abraham and covenant — not abolition.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'end-times',
    title: 'End Times — Scripture Only, No Church Fluff',
    overview: 'What does the text actually say about the last days? Strip away the rapture fiction, the Hollywood eschatology, and get back to the words of Yahshua and the prophets.',
    icon: '🌑',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      {
        id: 'et1',
        title: 'The Olivet Discourse — Yahshua\'s Own Words',
        overview: 'Matthew 24-25 is the most direct end-times teaching from Yahshua Himself. Read it before any commentary.',
        keyVerses: ['Matthew 24:3-14', 'Matthew 24:15-31', 'Matthew 24:36-44', 'Matthew 25:31-46'],
        reflectionQuestions: [
          { question: 'Does Yahshua describe a secret rapture or a visible return? Read carefully.' },
        ],
        actionSteps: [
          { step: 'Read Matthew 24-25 without any commentary. Write down only what the text says.' },
        ],
        completed: false,
      },
      {
        id: 'et2',
        title: 'Daniel\'s Prophecies',
        overview: 'Daniel provides the foundational framework for understanding the end-times timeline. Weeks, kingdoms, and the abomination of desolation.',
        keyVerses: ['Daniel 2:31-45', 'Daniel 7:13-14', 'Daniel 9:24-27', 'Daniel 12:1-4'],
        reflectionQuestions: [
          { question: 'How do Daniel\'s prophecies connect to what Yahshua said in Matthew 24?' },
        ],
        actionSteps: [
          { step: 'Create a timeline chart connecting Daniel 9:24-27 with Matthew 24:15 and 2 Thessalonians 2:3-4.' },
        ],
        completed: false,
      },
      {
        id: 'et3',
        title: 'The Book of Revelation — Overview',
        overview: 'Revelation is not chaos — it follows a structure. Seven seals, seven trumpets, seven bowls. Understand the framework.',
        keyVerses: ['Revelation 1:1-3', 'Revelation 6:1-17', 'Revelation 14:12', 'Revelation 22:14'],
        reflectionQuestions: [
          { question: 'Revelation 14:12 describes the set-apart ones as those who keep the commandments AND the faith. Are you doing both?' },
        ],
        actionSteps: [
          { step: 'Read Revelation 14:12 and 22:14 — note what is required of the faithful.' },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'apocrypha-enoch',
    title: 'Extra-Biblical Texts — Truth vs Controversy',
    overview: 'The Book of Enoch, Gospel of Thomas, and Apocryphal writings. What do they say, why were they excluded, and how do they relate to the canon?',
    icon: '📕',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      {
        id: 'ae1',
        title: '1 Enoch — The Book Jude Quoted',
        overview: 'Jude 1:14-15 directly quotes 1 Enoch. This book was preserved by the Ethiopian church and provides context for Genesis 6, the Watchers, and the origin of evil.',
        keyVerses: ['Jude 1:14-15', 'Genesis 6:1-4', '2 Peter 2:4-5', 'Hebrews 11:5'],
        reflectionQuestions: [
          { question: 'If Jude (inspired by the Ruach) quotes Enoch, should the book be dismissed entirely?' },
          { question: 'What does the Watchers narrative add to your understanding of Genesis 6?' },
        ],
        actionSteps: [
          { step: 'Read 1 Enoch chapters 1-16 and compare the Watchers account with Genesis 6:1-4.' },
          { step: 'Research why 1 Enoch was excluded from the Western canon but remains in the Ethiopian Bible.' },
        ],
        completed: false,
      },
      {
        id: 'ae2',
        title: 'The Apocrypha — Hidden Books',
        overview: 'Books like Sirach, Wisdom of Solomon, and Maccabees were part of the Scriptures for centuries. Understand what they contain and why they matter.',
        keyVerses: ['2 Timothy 3:16-17', 'Luke 24:44'],
        reflectionQuestions: [
          { question: 'Who decided these books were not Scripture? Was it men or was it Yahweh?' },
        ],
        actionSteps: [
          { step: 'Read Sirach 1-2 (Ecclesiasticus) and note the wisdom parallels with Proverbs.' },
        ],
        completed: false,
      },
      {
        id: 'ae3',
        title: 'Gospel of Thomas — Evaluate Carefully',
        overview: 'A collection of sayings attributed to Yahshua. Some align with canonical gospels, others diverge. Study it with discernment, not blind acceptance or rejection.',
        keyVerses: ['1 Thessalonians 5:21', '1 John 4:1'],
        reflectionQuestions: [
          { question: 'Can you test a non-canonical text against canonical Scripture without fear? That is discernment.' },
        ],
        actionSteps: [
          { step: 'Read 10 sayings from the Gospel of Thomas and compare each with canonical gospel parallels.' },
        ],
        completed: false,
      },
    ],
  },
];
