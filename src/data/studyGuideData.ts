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
  progress: number; // 0-100
}

export const maturityLabels: Record<MaturityLevel, { label: string; description: string }> = {
  milk: { label: 'Milk', description: 'Foundational truths for new believers' },
  bread: { label: 'Bread', description: 'Growing in understanding and discipline' },
  meat: { label: 'Meat', description: 'Deep study for the mature and discerning' },
};

export const studyModules: StudyModule[] = [
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
    id: 'scripture-discipline',
    title: 'Scripture Discipline',
    overview: 'Learn how to study the Word properly — comparing texts, avoiding eisegesis, testing doctrines, and building a disciplined study habit.',
    icon: '📜',
    difficulty: 'bread',
    progress: 10,
    lessons: [
      {
        id: 'sd1',
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
        id: 'sd2',
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
        id: 'sd3',
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
    icon: '⚖️',
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
    ],
  },
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
    icon: '🛡️',
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
];
