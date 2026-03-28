export type MaturityLevel = 'milk' | 'bread' | 'meat';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

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
  deceptionExposure?: string;
  drill?: string;
  quiz?: QuizQuestion[];
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

  // ═══════════════════════════════════════════
  // MODULE 1: WHO IS YAHWEH (MILK)
  // ═══════════════════════════════════════════
  {
    id: 'who-is-yahweh',
    title: 'Who Is Yahweh — Foundation of Everything',
    overview: 'Lock in the identity of the Creator. His Name, His character, His exclusivity. Without this foundation, everything else crumbles.',
    icon: '🔥',
    difficulty: 'milk',
    progress: 0,
    lessons: [
      {
        id: 'wy1',
        title: "Yahweh's Name Revealed",
        overview: 'Exodus 3:14-15 — The moment the Creator gave His personal name. Not a title. Not a description. A NAME. And He said it is His memorial forever.',
        keyVerses: ['Exodus 3:14-15', 'Psalm 83:18', 'Isaiah 42:8'],
        reflectionQuestions: [
          { question: 'Why would the Creator reveal a personal name instead of just a title?' },
          { question: 'What does it mean that this name is His "memorial to all generations"?' },
        ],
        actionSteps: [
          { step: 'Read Exodus 3 in full and note every attribute of Yahweh revealed in that chapter.' },
          { step: 'Begin using the name Yahweh in your prayers this week instead of generic titles.' },
        ],
        deceptionExposure: 'Most modern Bibles replace "Yahweh" with "LORD" (all caps) — hiding the Creator\'s actual name behind a generic English title. This was a deliberate editorial choice, not a translation. Check any Hebrew interlinear: the name is יהוה (YHWH).',
        drill: 'Open your Bible to Exodus 3:14-15 and find every place "LORD" appears. Write "Yahweh" above each one. Do this for Psalm 83:18 as well.',
        quiz: [
          { question: 'What is the personal name of the Creator revealed in Exodus 3:14-15?', options: ['God', 'Lord', 'Yahweh', 'Jehovah'], correctIndex: 2 },
          { question: 'What does Psalm 83:18 say about the name?', options: ['It should be hidden', 'Yahweh alone is the Most High over all the earth', 'The name is not important', 'It was only for Israel'], correctIndex: 1 },
          { question: 'Why do most Bibles use "LORD" instead of Yahweh?', options: ['The original text says Lord', 'Translation tradition replaced the name', 'Hebrew has no vowels for it', 'It was never written down'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy2',
        title: 'Why Most Bibles Hide the Name',
        overview: 'The deliberate removal of the name Yahweh from Scripture is one of the biggest cover-ups in religious history. Over 6,800 times the name appears in Hebrew — replaced with "LORD" in English.',
        keyVerses: ['Jeremiah 23:27', 'Hosea 2:16-17', 'Psalm 68:4', 'Exodus 3:15'],
        reflectionQuestions: [
          { question: 'If Yahweh said His name is a memorial forever, who decided to remove it?' },
          { question: 'Jeremiah 23:27 warns about those who cause people to forget His name. Is this happening today?' },
        ],
        actionSteps: [
          { step: 'Look up how many times YHWH appears in the Hebrew text (hint: 6,828 times).' },
          { step: 'Compare a KJV verse containing "LORD" with the same verse in the Hebrew interlinear.' },
        ],
        deceptionExposure: 'The Jewish tradition of not speaking the name (based on a misinterpretation of "do not take His name in vain") led to replacing it with "Adonai." Translators followed suit, burying the name under "LORD." But Yahweh never commanded His name to be hidden — He commanded it to be proclaimed (Exodus 9:16).',
        drill: 'Find 5 verses where "LORD" appears in your Bible. Look up the Hebrew for each. Write the actual name Yahweh beside every one.',
        quiz: [
          { question: 'How many times does YHWH appear in the Hebrew manuscripts?', options: ['About 200', 'About 1,000', 'About 6,800', 'It was never written'], correctIndex: 2 },
          { question: 'What does Jeremiah 23:27 warn about?', options: ['False prophets', 'Causing people to forget Yahweh\'s name', 'The end times', 'Temple destruction'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy3',
        title: 'Yahweh Is ONE',
        overview: 'Deuteronomy 6:4 — the Shema. The most fundamental declaration in all of Scripture. Yahweh is not two, not three. He is ONE.',
        keyVerses: ['Deuteronomy 6:4', 'Isaiah 44:6', 'Isaiah 45:5-6', 'Mark 12:29'],
        reflectionQuestions: [
          { question: 'If Yahweh declares "there is no Elohim beside Me," how do you reconcile that with trinitarian theology?' },
          { question: 'Yahshua quoted the Shema as the greatest commandment. What does that tell you about his theology?' },
        ],
        actionSteps: [
          { step: 'Memorize Deuteronomy 6:4 in both English and Hebrew (Shema Yisrael, Yahweh Eloheinu, Yahweh Echad).' },
          { step: 'Read Isaiah 44-46 and count how many times Yahweh says He is alone/there is no other.' },
        ],
        deceptionExposure: 'Some claim "echad" (one) means a "compound unity" to support the Trinity. But echad simply means ONE — the same word used for "one day," "one man," "one place." The Hebrew word for compound unity would be "yachad." This is a theological invention, not a linguistic fact.',
        drill: 'Look up every use of "echad" in the Torah. Does it ever mean "three in one"? Write your findings.',
        quiz: [
          { question: 'What does "Shema Yisrael Yahweh Eloheinu Yahweh Echad" mean?', options: ['Hear O Israel, God is three in one', 'Hear O Israel, Yahweh our Elohim, Yahweh is ONE', 'Listen Israel, the Lord is God', 'Israel, worship the Trinity'], correctIndex: 1 },
          { question: 'What does "echad" mean in Hebrew?', options: ['Unity of three', 'Compound oneness', 'One (numerical)', 'Mysterious'], correctIndex: 2 },
          { question: 'Who quoted the Shema as the greatest commandment?', options: ['Paul', 'Moses', 'Yahshua', 'David'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'wy4',
        title: 'No Other Beside Him',
        overview: 'Yahweh is not sharing His throne. Isaiah makes this devastatingly clear — there is no Elohim formed before Him or after Him. He alone is the Savior.',
        keyVerses: ['Isaiah 45:5-6', 'Isaiah 43:10-11', 'Isaiah 44:8', 'Isaiah 46:9'],
        reflectionQuestions: [
          { question: 'If Yahweh says "I am the first and the last, beside Me there is no Elohim" — what room does that leave?' },
          { question: 'How does this affect your understanding of who saves?' },
        ],
        actionSteps: [
          { step: 'Read Isaiah 43-46 in one sitting. Highlight every "I alone" statement.' },
          { step: 'Write a personal declaration: "Yahweh alone is my Elohim."' },
        ],
        deceptionExposure: 'Many apply Isaiah\'s "first and last" to Yahshua to prove he is Yahweh. But Yahweh spoke these words about HIMSELF in context. Revelation applies similar language to Yahshua as the firstborn of creation and the beginning of Yahweh\'s new creation — not as Yahweh Himself.',
        drill: 'List every "I am" statement by Yahweh in Isaiah 40-48. Who is speaking? Who is being addressed?',
        quiz: [
          { question: 'According to Isaiah 43:11, who is the Savior?', options: ['Yahshua', 'The Trinity', 'Yahweh alone', 'Angels'], correctIndex: 2 },
          { question: 'Isaiah 46:9 says...', options: ['There are multiple gods', 'I am Elohim and there is none like Me', 'Worship the Son equally', 'The Spirit is also God'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy5',
        title: 'Yahweh vs Elohim — Name vs Title',
        overview: 'Yahweh is a NAME. Elohim is a TITLE (meaning "mighty one" or "judge"). Understanding this distinction prevents massive theological errors.',
        keyVerses: ['Exodus 3:14-15', 'Psalm 82:1', 'Psalm 82:6', 'John 10:34-35'],
        reflectionQuestions: [
          { question: 'If "elohim" can refer to judges and rulers (Psalm 82), does calling someone elohim make them Yahweh?' },
          { question: 'Why is the distinction between a name and a title so important theologically?' },
        ],
        actionSteps: [
          { step: 'Study Psalm 82 — who are the "elohim" being addressed, and who judges them?' },
          { step: 'Make a two-column chart: Left = "Yahweh (Name)" / Right = "Elohim (Title)" with examples.' },
        ],
        deceptionExposure: 'When John 1:1 says "the Word was God," the Greek says "theos" (the equivalent of elohim — a title). This does not mean the Word IS Yahweh. Elohim/theos is applied to Moses (Exodus 7:1), judges (Psalm 82), and angels. The title describes authority, not identity with Yahweh.',
        drill: 'Find 5 places in Scripture where "elohim" or "theos" is used for someone OTHER than Yahweh.',
        quiz: [
          { question: 'What is the difference between Yahweh and Elohim?', options: ['They are the same', 'Yahweh is a name, Elohim is a title', 'Elohim is a name, Yahweh is a title', 'Both are titles'], correctIndex: 1 },
          { question: 'In Psalm 82, who does Yahweh call "elohim"?', options: ['Angels only', 'The Trinity', 'Human judges/rulers', 'Satan'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'wy6',
        title: 'The Fear of Yahweh',
        overview: 'Fear of Yahweh is the BEGINNING of wisdom and knowledge. Not a suggestion. The starting point. Without this reverence, nothing else in your walk will hold.',
        keyVerses: ['Proverbs 1:7', 'Proverbs 9:10', 'Psalm 111:10', 'Ecclesiastes 12:13'],
        reflectionQuestions: [
          { question: 'Do you approach Yahweh with casual familiarity or genuine reverence?' },
          { question: 'Ecclesiastes 12:13 says fearing Elohim and keeping His commandments is the whole duty of man. Are you doing both?' },
        ],
        actionSteps: [
          { step: 'Read every Proverbs verse about the fear of Yahweh and journal what each reveals.' },
          { step: 'Examine: Do I fear Yahweh more than I fear people\'s opinions?' },
        ],
        drill: 'List 10 verses about "the fear of Yahweh." What pattern do you see?',
        quiz: [
          { question: 'According to Proverbs 1:7, what is the fear of Yahweh?', options: ['The end of wisdom', 'The beginning of knowledge', 'Optional for believers', 'Old Testament only'], correctIndex: 1 },
          { question: 'Ecclesiastes 12:13 says the whole duty of man is...', options: ['Love your neighbor', 'Fear Elohim and keep His commandments', 'Believe in the Trinity', 'Go to church on Sunday'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy7',
        title: "Yahweh's Character — Mercy & Judgment",
        overview: 'Yahweh is not just love. He is also justice, wrath, jealousy, and holiness. A one-dimensional view of the Creator leads to a weak, permissive theology.',
        keyVerses: ['Exodus 34:6-7', 'Nahum 1:2-3', 'Deuteronomy 32:4', 'Psalm 89:14'],
        reflectionQuestions: [
          { question: 'Exodus 34:6-7 shows mercy AND justice together. How do you hold both?' },
          { question: 'Is your image of Yahweh balanced or have you only focused on love?' },
        ],
        actionSteps: [
          { step: 'Read Exodus 34:6-7 and write out every attribute listed.' },
          { step: 'Study Nahum 1 — what does Yahweh\'s wrath look like, and what triggers it?' },
        ],
        deceptionExposure: 'Modern Christianity often presents "God is love" as if that\'s all He is. But 1 John 4:8 does not negate Hebrews 12:29 ("our Elohim is a consuming fire"). Reducing Yahweh to only love removes the fear, holiness, and accountability that scripture demands.',
        drill: 'Create two lists: Yahweh\'s mercy attributes vs. His judgment attributes. Use at least 5 verses for each.',
        quiz: [
          { question: 'Exodus 34:6-7 reveals Yahweh as...', options: ['Only loving', 'Only wrathful', 'Merciful AND just — forgiving but not clearing the guilty', 'Distant and uninvolved'], correctIndex: 2 },
          { question: 'Hebrews 12:29 calls our Elohim a...', options: ['Gentle shepherd', 'Consuming fire', 'Still small voice', 'Loving father only'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy8',
        title: 'Why Knowing His Name Matters Spiritually',
        overview: "This isn't academic. Knowing and using Yahweh's name has direct spiritual significance — it changes how you pray, how you worship, and how you relate to the Creator.",
        keyVerses: ['Joel 2:32', 'Acts 2:21', 'Romans 10:13', 'Proverbs 18:10', 'Exodus 9:16'],
        reflectionQuestions: [
          { question: '"Whoever calls on the name of Yahweh shall be saved." Are you calling on the right name?' },
          { question: 'If the name is a strong tower (Proverbs 18:10), what are you running to when you use generic titles?' },
        ],
        actionSteps: [
          { step: 'Replace every "God" and "Lord" in your prayers with the proper names for one full week.' },
          { step: 'Teach someone else why the name Yahweh matters.' },
        ],
        deceptionExposure: 'The argument "He knows who I mean" when using "God" or "Lord" ignores that Yahweh specifically said His name is His memorial forever (Exodus 3:15). If names didn\'t matter, why did He reveal one? Every false deity is also called "god" and "lord."',
        drill: 'Pray for 10 minutes using only the name Yahweh. Journal how it feels different from using generic titles.',
        quiz: [
          { question: 'According to Joel 2:32, who shall be saved?', options: ['Whoever goes to church', 'Whoever calls on the name of Yahweh', 'Whoever believes in the Trinity', 'Everyone automatically'], correctIndex: 1 },
          { question: 'Proverbs 18:10 calls the name of Yahweh a...', options: ['Mystery', 'Strong tower', 'Secret word', 'Prayer formula'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy9',
        title: 'False Replacements — God, Lord, and Misuse',
        overview: 'The words "God" and "Lord" are not names — they are generic English words applied to every deity in history. Using them as substitutes for Yahweh is not neutral; it creates confusion.',
        keyVerses: ['Hosea 2:16-17', 'Jeremiah 23:26-27', 'Exodus 23:13', 'Joshua 23:7'],
        reflectionQuestions: [
          { question: 'Hosea 2:16 says a day is coming when Israel will no longer call Him "Baali" (my Lord). What does this imply about using "Lord" today?' },
          { question: 'If "God" is also the title used for Zeus, Baal, and Allah — is it specific enough for worship?' },
        ],
        actionSteps: [
          { step: 'Research the etymological origin of the word "God" — where does it come from?' },
          { step: 'Study Hosea 2:16-17 in context and journal what Yahweh wants to be called.' },
        ],
        drill: 'Find the names of 5 pagan deities that are also called "god" or "lord" in their cultures. What does this tell you?',
        quiz: [
          { question: 'Hosea 2:16 says Yahweh wants to be called...', options: ['Lord (Baali)', 'Ishi (My husband)', 'God', 'Master'], correctIndex: 1 },
          { question: 'What does Exodus 23:13 command about the names of other gods?', options: ['Learn them for study', 'Do not mention them', 'Use them in worship', 'They don\'t matter'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'wy10',
        title: 'DRILL: Replace Every LORD with Yahweh',
        overview: 'This is not a lesson. This is training. Take key passages and manually restore the name Yahweh wherever "LORD" has been substituted. Make the text speak truth again.',
        keyVerses: ['Psalm 23:1-6', 'Psalm 91:1-16', 'Isaiah 40:28-31', 'Deuteronomy 6:4-9'],
        reflectionQuestions: [
          { question: 'After restoring the name in these passages, do they feel different? More personal? More powerful?' },
          { question: 'Will you commit to reading Scripture with restored names going forward?' },
        ],
        actionSteps: [
          { step: 'Write out Psalm 23 completely with "Yahweh" instead of "the LORD."' },
          { step: 'Write out Deuteronomy 6:4-9 with the restored name and post it somewhere visible.' },
          { step: 'Challenge: Do this for one full chapter of Isaiah.' },
        ],
        drill: 'Restore the name in Psalm 23, Psalm 91, and Isaiah 40:28-31. Read them aloud with the restored name.',
        quiz: [
          { question: 'In Psalm 23:1, "The LORD is my shepherd" should read...', options: ['God is my shepherd', 'The Lord is my shepherd', 'Yahweh is my shepherd', 'Adonai is my shepherd'], correctIndex: 2 },
          { question: 'How many times does YHWH appear in the Hebrew Old Testament?', options: ['About 500', 'About 2,000', 'About 6,800', 'It was never written'], correctIndex: 2 },
          { question: 'Why is restoring the name important?', options: ['It\'s just preference', 'Because Yahweh commanded His name to be remembered forever', 'It doesn\'t matter', 'Scholars disagree'], correctIndex: 1 },
        ],
        completed: false,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 2: WHO IS YAHSHUA (MILK)
  // ═══════════════════════════════════════════
  {
    id: 'who-is-yahshua',
    title: 'Who Is Yahshua — Son, Not the Father',
    overview: 'Destroy the confusion between Yahweh and Yahshua. The Son is sent BY the Father, prays TO the Father, and is subordinate TO the Father. Scripture is clear.',
    icon: '✝️',
    difficulty: 'milk',
    progress: 0,
    lessons: [
      {
        id: 'ys1',
        title: 'Yahshua Is the Son of Yahweh',
        overview: 'John 3:16 — Yahweh so loved the world that He GAVE His only brought-forth Son. The Son is given. The Father gives. They are not the same person.',
        keyVerses: ['John 3:16', 'Matthew 16:16', '1 John 4:15', 'Hebrews 1:1-2'],
        reflectionQuestions: [
          { question: 'If Yahshua IS Yahweh, who sent him? Can you send yourself?' },
          { question: 'What does "only brought-forth Son" tell you about Yahshua\'s relationship to the Father?' },
        ],
        actionSteps: [
          { step: 'Read John 3:16-18 and identify who is acting (the Father) and who is being acted upon (the Son).' },
          { step: 'List 10 verses where Yahshua is called "the Son" — what pattern emerges?' },
        ],
        deceptionExposure: 'Trinitarian theology claims Yahshua is "God the Son" — a phrase that never appears in Scripture. The Bible says "Son of Elohim" (describing relationship), never "God the Son" (describing identity with Yahweh).',
        drill: 'Search for "God the Son" in your Bible. You won\'t find it. Now search for "Son of God." What\'s the difference?',
        quiz: [
          { question: 'Does the phrase "God the Son" appear in Scripture?', options: ['Yes, many times', 'Yes, in Revelation', 'No, it never appears', 'Only in the Greek'], correctIndex: 2 },
          { question: 'John 3:16 says Yahweh _____ His Son.', options: ['Is', 'Became', 'Gave/Sent', 'Was born as'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'ys2',
        title: '"The Father Is Greater Than I"',
        overview: 'John 14:28 — Yahshua\'s own words. He never claimed equality with Yahweh. He submitted, obeyed, and always pointed back to the Father.',
        keyVerses: ['John 14:28', 'John 5:19', 'John 5:30', 'John 8:28'],
        reflectionQuestions: [
          { question: 'If Yahshua said the Father is greater, why do people teach they are equal?' },
          { question: 'John 5:19 says the Son can do NOTHING by himself. What does this reveal about his nature?' },
        ],
        actionSteps: [
          { step: 'Read John 5:19-30 and list every statement of subordination Yahshua makes.' },
          { step: 'Compare these statements with trinitarian claims of co-equality.' },
        ],
        deceptionExposure: 'The standard response is "He was speaking in his human nature." But Yahshua never switches between two natures in conversation. He speaks as ONE person, always subordinate. The "two natures" doctrine was invented centuries later at church councils — it is not in the text.',
        quiz: [
          { question: 'In John 14:28, Yahshua says...', options: ['I and the Father are the same', 'The Father is greater than I', 'I am the Father', 'We are co-equal'], correctIndex: 1 },
          { question: 'John 5:19 says the Son can do...', options: ['Everything on his own', 'Nothing by himself', 'Whatever he wants', 'More than the Father'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'ys3',
        title: 'Yahshua Prays TO Yahweh',
        overview: 'If Yahshua IS Yahweh, who is he praying to? Himself? The prayers of Yahshua prove a clear distinction between Father and Son.',
        keyVerses: ['John 17:1-5', 'Matthew 26:39', 'Luke 6:12', 'Hebrews 5:7'],
        reflectionQuestions: [
          { question: 'In Gethsemane, Yahshua prayed "Not MY will, but YOURS." If they share one will, this makes no sense. Why?' },
          { question: 'John 17 is an entire chapter of Yahshua praying to the Father. What does this reveal?' },
        ],
        actionSteps: [
          { step: 'Read John 17 in full. Who is Yahshua speaking to? Who gave him authority? Who sent him?' },
          { step: 'Read Hebrews 5:7 — Yahshua offered prayers "to Him who was able to save him from death." Who is that?' },
        ],
        drill: 'List every prayer of Yahshua in the Gospels. In each one, identify who he is praying to and what this proves about their relationship.',
        quiz: [
          { question: 'In Matthew 26:39, Yahshua says...', options: ['My will be done', 'Not my will but yours be done', 'Our will be done', 'I don\'t need to pray'], correctIndex: 1 },
          { question: 'Who did Yahshua offer prayers to, according to Hebrews 5:7?', options: ['Himself', 'The Holy Spirit', 'Him who was able to save him from death', 'No one'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'ys4',
        title: 'Sent By Yahweh — The Mission',
        overview: 'Over 40 times in John alone, Yahshua says he was SENT. The one who sends and the one who is sent are not the same person.',
        keyVerses: ['John 17:3', 'John 7:28-29', 'John 20:21', '1 John 4:14'],
        reflectionQuestions: [
          { question: 'John 17:3 defines eternal life as knowing the Father (the ONLY true Elohim) AND Yahshua whom He SENT. Does this sound like they are the same?' },
          { question: 'If Yahshua sent his disciples, does that make the disciples Yahshua? Then why would being sent by Yahweh make Yahshua Yahweh?' },
        ],
        actionSteps: [
          { step: 'Count how many times "sent" appears in John\'s Gospel in relation to Yahshua.' },
          { step: 'Meditate on John 17:3 — this is Yahshua\'s own definition of eternal life.' },
        ],
        quiz: [
          { question: 'According to John 17:3, eternal life is knowing...', options: ['The Trinity', 'The only true Elohim (the Father) and Yahshua whom He sent', 'That Jesus is God', 'Church doctrine'], correctIndex: 1 },
          { question: 'How many times does John\'s Gospel reference Yahshua being "sent"?', options: ['About 5', 'About 15', 'Over 40', 'It never does'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'ys5',
        title: 'Mediator — Between Yahweh and Man',
        overview: '1 Timothy 2:5 — There is ONE Elohim, and ONE mediator between Elohim and men, the MAN Messiah Yahshua. Not "God the Son mediating with himself."',
        keyVerses: ['1 Timothy 2:5', 'Hebrews 9:15', 'Hebrews 8:6', 'Hebrews 12:24'],
        reflectionQuestions: [
          { question: 'A mediator stands BETWEEN two parties. If Yahshua is Yahweh, there is no mediation — just Yahweh talking to Himself.' },
          { question: 'Paul calls Yahshua "the MAN Messiah Yahshua" — not "God the Son." Why do people add to what Paul said?' },
        ],
        actionSteps: [
          { step: 'Read Hebrews 8-9 and identify every time Yahshua\'s role as mediator is described.' },
          { step: 'Journal what it means practically that Yahshua stands between you and Yahweh.' },
        ],
        drill: 'Draw a diagram: Yahweh ← Mediator (Yahshua) → Mankind. Can the mediator be the same as one of the parties?',
        quiz: [
          { question: '1 Timothy 2:5 says there is ONE Elohim and ONE mediator, the _____ Messiah Yahshua.', options: ['God', 'Spirit', 'Man', 'Angel'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'ys6',
        title: 'Firstborn — What It Actually Means',
        overview: 'Colossians 1:15 calls Yahshua the "firstborn of all creation." This does not mean he existed eternally as Yahweh — it means he holds preeminence as the first of Yahweh\'s new creation.',
        keyVerses: ['Colossians 1:15', 'Revelation 3:14', 'Romans 8:29', 'Hebrews 1:6'],
        reflectionQuestions: [
          { question: '"Firstborn" implies a beginning. Does Yahweh have a beginning? Then how can Yahshua be Yahweh if he is "firstborn"?' },
        ],
        actionSteps: [
          { step: 'Study how "firstborn" (prototokos) is used throughout Scripture. Does it always mean first created?' },
          { step: 'Read Revelation 3:14 — Yahshua calls himself "the beginning of the creation of Yahweh."' },
        ],
        quiz: [
          { question: 'Colossians 1:15 calls Yahshua the _____ of all creation.', options: ['Creator', 'Firstborn', 'Eternal God', 'Father'], correctIndex: 1 },
          { question: 'Revelation 3:14 calls Yahshua...', options: ['The Almighty', 'The beginning of the creation of Yahweh', 'Yahweh Himself', 'The Holy Spirit'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'ys7',
        title: '"The Word Made Flesh" — Explained Properly',
        overview: 'John 1:1 is the most misused verse in theology. Understanding what "the Word" (logos) means in its Jewish context changes everything.',
        keyVerses: ['John 1:1-3', 'John 1:14', 'Proverbs 8:22-31', 'Genesis 1:3'],
        reflectionQuestions: [
          { question: 'In Hebrew thought, "the Word" is Yahweh\'s spoken power and plan — not a second person. How does this change your reading of John 1?' },
          { question: 'If "the Word was God" means Yahshua IS Yahweh, then "the Word was WITH God" means Yahweh was WITH Himself. Does that make sense?' },
        ],
        actionSteps: [
          { step: 'Study "logos" in Greek philosophical AND Hebrew ("davar") contexts.' },
          { step: 'Read Proverbs 8 — is wisdom a separate person from Yahweh, or an attribute OF Yahweh?' },
        ],
        deceptionExposure: 'John 1:1 in Greek says "theos en ho logos" — literally "the Word was divine/god" (no article before theos, making it qualitative, not identifying). This means the Word had divine quality — not that it WAS the person Yahweh. Many scholars acknowledge this distinction but it\'s ignored in popular teaching.',
        quiz: [
          { question: 'In John 1:1, the Greek "theos" without the article before it indicates...', options: ['Definite identity with Yahweh', 'A qualitative/divine nature', 'Nothing important', 'A Trinity proof'], correctIndex: 1 },
          { question: '"The Word was WITH God" implies...', options: ['They are the same person', 'Two distinct entities', 'A mystery we can\'t understand', 'It doesn\'t matter'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'ys8',
        title: 'Resurrection Power Comes from Yahweh',
        overview: 'Yahshua did not raise himself. Yahweh raised him. Over and over, the apostles declare that YAHWEH raised Yahshua from the dead.',
        keyVerses: ['Acts 2:24', 'Acts 2:32', 'Acts 3:15', 'Romans 10:9', 'Galatians 1:1'],
        reflectionQuestions: [
          { question: 'If Yahshua raised himself, why do ALL the apostles say Yahweh raised him?' },
          { question: 'Romans 10:9 ties salvation to believing that YAHWEH raised him. Not that he raised himself. Why does this matter?' },
        ],
        actionSteps: [
          { step: 'Read every sermon in Acts (chapters 2, 3, 4, 10, 13, 17). Who do the apostles say raised Yahshua?' },
          { step: 'Make a list: "Yahweh raised Yahshua" vs. "Yahshua raised himself." Which has more evidence?' },
        ],
        quiz: [
          { question: 'According to Acts 2:24, who raised Yahshua from the dead?', options: ['Yahshua himself', 'The Holy Spirit', 'Yahweh/God', 'Angels'], correctIndex: 2 },
          { question: 'How many times in Acts do apostles credit Yahweh with raising Yahshua?', options: ['Never', 'Once or twice', 'Multiple times throughout', 'They never mention it'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'ys9',
        title: 'Why People Call Him "God" — Misinterpretations',
        overview: 'Certain verses are consistently pulled out of context to claim Yahshua is Yahweh. Time to address every single one and see what the text actually says.',
        keyVerses: ['John 10:30', 'John 20:28', 'Isaiah 9:6', 'Philippians 2:6'],
        reflectionQuestions: [
          { question: '"I and the Father are one" — is this ontological identity or unity of purpose? (See John 17:22 where Yahshua prays for his disciples to be "one" in the same way.)' },
        ],
        actionSteps: [
          { step: 'For each verse above, read the FULL context (5 verses before and after). Does the context support deity or agency?' },
          { step: 'Study Thomas\'s exclamation in John 20:28 — is it a theological declaration or an expression of shock?' },
        ],
        deceptionExposure: '"I and the Father are one" (John 10:30) uses "hen" (neuter) meaning one in PURPOSE, not "heis" (masculine) which would mean one person. Yahshua uses the exact same word in John 17:22 for his disciples. Nobody claims the disciples become Yahweh.',
        quiz: [
          { question: 'In John 10:30, "one" (hen) is...', options: ['Masculine, meaning one person', 'Neuter, meaning one in purpose/unity', 'Proof of the Trinity', 'A translation error'], correctIndex: 1 },
          { question: 'John 17:22 uses the same word "one" for...', options: ['The Trinity', 'Yahshua and the Father only', 'The disciples being unified', 'Nothing related'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'ys10',
        title: 'DRILL: Identify Who Is Speaking',
        overview: 'Training exercise. Read passages and determine: Is Yahweh speaking? Is Yahshua speaking? Is the speaker referring to someone else? Precision matters.',
        keyVerses: ['Isaiah 42:1', 'Matthew 3:17', 'John 17:1-5', 'Hebrews 1:5'],
        reflectionQuestions: [
          { question: 'Can you always tell the difference between when Yahweh speaks and when Yahshua speaks? Why is this skill critical?' },
        ],
        actionSteps: [
          { step: 'Read Isaiah 42:1 — who is "My servant"? Who is speaking?' },
          { step: 'Read Matthew 3:17 — who is the voice from heaven? Who is being baptized?' },
          { step: 'Read John 17 — list every distinction Yahshua makes between himself and the Father.' },
        ],
        drill: 'Go through 20 verses. For each one, identify: WHO is the speaker, WHO is being addressed, and WHAT is the relationship described.',
        quiz: [
          { question: 'In Isaiah 42:1, Yahweh says "Behold MY servant." Who is the servant?', options: ['Yahweh himself', 'The Messiah', 'Israel only', 'Moses'], correctIndex: 1 },
          { question: 'In Matthew 3:17, the voice from heaven says "This is MY beloved Son." Who is speaking?', options: ['Yahshua', 'An angel', 'Yahweh the Father', 'The Holy Spirit'], correctIndex: 2 },
          { question: 'If Yahweh calls Yahshua "My Son," this indicates...', options: ['They are the same person', 'A father-son relationship with distinction', 'Yahshua is the Father', 'It\'s a metaphor only'], correctIndex: 1 },
        ],
        completed: false,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 3: TRUTH VS TRINITY (BREAD)
  // ═══════════════════════════════════════════
  {
    id: 'truth-vs-trinity',
    title: 'The Truth vs Trinity — Breaking the Doctrine',
    overview: 'No verse says "Trinity." No apostle taught it. It was formalized at the Council of Nicaea in 325 AD under Roman political pressure. Time to break it with scripture.',
    icon: '⚖️',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      {
        id: 'tt1', title: 'What the Trinity Actually Teaches', overview: 'Before you refute it, understand it. One God in three co-equal, co-eternal persons: Father, Son, Holy Spirit. Each fully God, yet not three Gods.',
        keyVerses: ['Deuteronomy 6:4', 'Isaiah 44:6', 'Mark 12:29', '1 Corinthians 8:6'],
        reflectionQuestions: [{ question: 'Does the description "three co-equal persons" appear anywhere in Scripture?' }],
        actionSteps: [{ step: 'Research the Nicene Creed and the Athanasian Creed. Compare their language to actual Scripture.' }],
        deceptionExposure: 'The doctrine requires philosophical concepts (hypostasis, homoousios, perichoresis) that come from Greek philosophy, not Hebrew Scripture. The apostles never used these words or concepts.',
        quiz: [
          { question: 'When was the Trinity formally defined as church doctrine?', options: ['In the New Testament', 'By the apostles', 'At the Council of Nicaea in 325 AD', 'In Genesis'], correctIndex: 2 },
          { question: 'The word "Trinity" appears in the Bible...', options: ['Many times', 'Once', 'In Revelation', 'Never'], correctIndex: 3 },
        ],
        completed: false,
      },
      {
        id: 'tt2', title: 'Where It Actually Came From', overview: 'Trace the Trinity doctrine from its roots in Greek philosophy through Roman political councils. This is not conspiracy — this is documented church history.',
        keyVerses: ['Colossians 2:8', 'Matthew 15:9', '1 Timothy 4:1', 'Acts 20:29-30'],
        reflectionQuestions: [{ question: 'Paul warned about philosophy and traditions of men corrupting the faith. Could the Trinity be an example?' }],
        actionSteps: [{ step: 'Read about the Council of Nicaea (325 AD) and why Emperor Constantine called it. Was it about truth or political unity?' }],
        deceptionExposure: 'Tertullian (around 200 AD) was the first to use the Latin "trinitas." He was a lawyer, not an apostle. The concept was debated for centuries before becoming enforced doctrine under imperial authority — not scriptural authority.',
        completed: false,
      },
      {
        id: 'tt3', title: 'No Verse Says "Trinity"', overview: 'Search every translation. The word does not exist in Scripture. The burden of proof is on those who claim it — not on those who reject it.',
        keyVerses: ['2 Timothy 3:16-17', 'Proverbs 30:5-6', 'Revelation 22:18-19', 'Deuteronomy 4:2'],
        reflectionQuestions: [{ question: 'If Scripture is sufficient (2 Timothy 3:16-17), why would a doctrine need to come from outside Scripture?' }],
        actionSteps: [{ step: 'Do a complete Bible search for "Trinity," "three persons," "God the Son," and "God the Holy Spirit." Document your findings.' }],
        drill: 'Search your entire Bible (any translation) for the words: Trinity, triune, three persons, God the Son, God the Holy Spirit. Write what you find (or don\'t find).',
        quiz: [
          { question: 'Which of these phrases appears in the Bible?', options: ['The Trinity', 'God the Son', 'Son of God', 'Three co-equal persons'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'tt4', title: 'Yahweh Is Not Three Persons', overview: 'Numbers 23:19 — Yahweh is not a man. He does not change forms, split into persons, or manifest as three beings. He is ONE.',
        keyVerses: ['Numbers 23:19', 'Malachi 3:6', 'Isaiah 45:5', '1 Kings 8:27'],
        reflectionQuestions: [{ question: 'If Yahweh is unchangeable (Malachi 3:6), when did He become a Trinity?' }],
        actionSteps: [{ step: 'Find every verse where Yahweh describes Himself. Does He ever describe Himself as three persons?' }],
        completed: false,
      },
      {
        id: 'tt5', title: 'Separation Between Father & Son', overview: 'Scripture consistently separates the Father and Son as distinct beings with distinct roles, positions, and knowledge.',
        keyVerses: ['Mark 13:32', 'Acts 7:55-56', '1 Corinthians 15:27-28', 'Revelation 3:12'],
        reflectionQuestions: [{ question: 'Mark 13:32 — Yahshua says he doesn\'t know the day or hour, only the Father knows. How can they be co-equal in knowledge?' }],
        actionSteps: [{ step: 'Read 1 Corinthians 15:27-28 carefully — after everything is subject to the Son, what happens? The Son subjects himself to the Father. Write out what this means.' }],
        quiz: [
          { question: 'According to Mark 13:32, who knows the day and hour?', options: ['The Son', 'The Holy Spirit', 'Only the Father', 'All three equally'], correctIndex: 2 },
          { question: '1 Corinthians 15:28 says the Son will ultimately...', options: ['Rule forever as God', 'Subject himself to the Father', 'Become the Father', 'Cease to exist'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'tt6', title: 'Baptism Verses Explained Properly', overview: 'Matthew 28:19 is the single most cited "proof" of the Trinity. But naming three does not make them one being — and the apostles in Acts baptized differently.',
        keyVerses: ['Matthew 28:19', 'Acts 2:38', 'Acts 8:16', 'Acts 10:48', 'Acts 19:5'],
        reflectionQuestions: [{ question: 'The apostles in Acts always baptized in the NAME of Yahshua. Why didn\'t they use the trinitarian formula if Yahshua commanded it?' }],
        actionSteps: [{ step: 'Compare Matthew 28:19 with every baptism recorded in Acts. What formula did the apostles actually use?' }],
        deceptionExposure: 'Many scholars (including Eusebius quotes) note that the original Matthew 28:19 may have read "in my name" — consistent with how the apostles actually baptized. The trinitarian formula may be a later insertion. This is debated but historically documented.',
        quiz: [
          { question: 'In Acts 2:38, Peter baptizes in the name of...', options: ['Father, Son, Holy Spirit', 'Yahshua the Messiah', 'The Trinity', 'God'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'tt7', title: '"I and My Father Are One" — The Real Meaning', overview: 'John 10:30 is not a Trinity proof. The Greek word "hen" (neuter) means one in purpose, not one in person. Yahshua said the same about his disciples.',
        keyVerses: ['John 10:30', 'John 17:11', 'John 17:21-22', '1 Corinthians 3:8'],
        reflectionQuestions: [{ question: 'If "I and the Father are one" means they are the same being, then John 17:22 means the disciples are also Yahweh. Do you believe that?' }],
        actionSteps: [{ step: 'Study the Greek word "hen" vs "heis" and document the difference.' }],
        completed: false,
      },
      {
        id: 'tt8', title: 'Greek Philosophy Influence on Christian Theology', overview: 'The early church was infiltrated by Hellenistic philosophy. Plato\'s concept of the "Triad" and the logos predates Christian trinitarian theology.',
        keyVerses: ['Colossians 2:8', 'Acts 17:18', '1 Corinthians 1:22-23', '1 Timothy 6:20'],
        reflectionQuestions: [{ question: 'Paul warned about "philosophy and vain deceit." Could Greek philosophical influence be what he was warning about?' }],
        actionSteps: [{ step: 'Research Plato\'s "divine triad" concept and compare it to the Trinity doctrine.' }],
        completed: false,
      },
      {
        id: 'tt9', title: 'Early Church Corruption', overview: 'By the 3rd-4th century, the simple faith of the apostles was transformed into a complex philosophical system enforced by Roman imperial power.',
        keyVerses: ['Acts 20:29-30', '2 Thessalonians 2:3', '2 Peter 2:1', 'Jude 1:3-4'],
        reflectionQuestions: [{ question: 'The apostles predicted a falling away and false teachers entering. Is the Trinity part of that falling away?' }],
        actionSteps: [{ step: 'Study the Arian controversy — Arius taught that the Son had a beginning. The Council of Nicaea condemned him. Who was more scriptural?' }],
        completed: false,
      },
      {
        id: 'tt10', title: 'DRILL: Spot Trinity Assumptions in Verses', overview: 'Training exercise. People read the Trinity INTO verses because they were taught to. Time to read what the text actually says.',
        keyVerses: ['Genesis 1:26', 'Isaiah 9:6', 'Matthew 3:16-17', 'John 1:1'],
        reflectionQuestions: [{ question: 'For each verse, ask: Does this PROVE the Trinity, or am I reading that into it?' }],
        actionSteps: [
          { step: 'For Genesis 1:26 ("Let US make"): Study the Hebrew "elohim" as a royal/majestic plural. Does "us" require three persons?' },
          { step: 'For Matthew 3:16-17: Three being mentioned ≠ three being one. Is a father, son, and a dove one being?' },
        ],
        drill: 'Take the top 10 "Trinity proof texts" and for each, write: What does it actually say? What is being assumed?',
        quiz: [
          { question: 'Genesis 1:26 "Let us make man" uses the plural because...', options: ['God is three persons', 'Hebrew uses majestic/royal plural for majesty', 'The Trinity was at creation', 'Angels helped create'], correctIndex: 1 },
          { question: 'Three being mentioned at Yahshua\'s baptism proves...', options: ['The Trinity', 'Three entities exist, not that they are one being', 'They are co-equal', 'Nothing about their nature'], correctIndex: 1 },
        ],
        completed: false,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 4: DECEPTION & FALSE TEACHERS (BREAD)
  // ═══════════════════════════════════════════
  {
    id: 'deception-false-teachers',
    title: 'Deception & False Teachers — See Through Everything',
    overview: 'Train your eyes to identify wolves, false doctrine, and manipulation BEFORE it takes root. This module makes you spiritually untouchable.',
    icon: '🐍',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      {
        id: 'df1', title: 'Wolves in Sheep\'s Clothing', overview: 'Matthew 7:15 — They look like sheep. They sound right. But by their FRUIT you know them.',
        keyVerses: ['Matthew 7:15-23', 'Acts 20:29-30', '2 Peter 2:1-3', 'Jude 1:4'],
        reflectionQuestions: [{ question: 'Have you ever followed someone who seemed godly but their fruit said otherwise?' }],
        actionSteps: [{ step: 'List 5 characteristics of a wolf in sheep\'s clothing from Matthew 7 and 2 Peter 2.' }],
        drill: 'Create a "False Teacher Checklist": 10 red flags from Scripture that expose wolves.',
        completed: false,
      },
      {
        id: 'df2', title: 'Signs of a False Prophet', overview: 'Scripture gives clear criteria for identifying false prophets. If the prediction fails, they are false. Period.',
        keyVerses: ['Deuteronomy 18:20-22', 'Jeremiah 23:16-22', 'Ezekiel 13:1-9', 'Matthew 24:24'],
        reflectionQuestions: [{ question: 'How many modern "prophets" have made predictions that failed — and people still follow them?' }],
        actionSteps: [{ step: 'Research 3 modern prophets whose predictions failed. Apply Deuteronomy 18:22.' }],
        completed: false,
      },
      {
        id: 'df3', title: 'Mega Church Deception System', overview: 'The corporate church model prioritizes attendance, tithes, and entertainment over truth, accountability, and discipleship.',
        keyVerses: ['2 Timothy 4:3-4', 'Isaiah 30:10', 'Jeremiah 5:31', 'Ezekiel 34:1-10'],
        reflectionQuestions: [{ question: 'When was the last time your church taught something uncomfortable from Scripture?' }],
        actionSteps: [{ step: 'Compare the early assembly model (Acts 2:42-47) with the modern mega church. List the differences.' }],
        deceptionExposure: 'The mega church model mirrors corporate entertainment: stages, lighting, emotional music, motivational speeches. Ezekiel 34 warns about shepherds who feed themselves instead of the flock.',
        completed: false,
      },
      {
        id: 'df4', title: 'Prosperity Gospel Exposed', overview: '"Name it and claim it" is not faith — it\'s greed wrapped in Scripture. Yahshua was poor. The apostles suffered. Prosperity is not the marker of righteousness.',
        keyVerses: ['1 Timothy 6:5-10', 'Luke 6:20-26', 'Matthew 6:19-24', 'James 5:1-6'],
        reflectionQuestions: [{ question: 'If wealth = blessing, was Yahshua cursed? Were the apostles failures?' }],
        actionSteps: [{ step: 'Read 1 Timothy 6:5-10 and Luke 6:20-26. Write how these contradict the prosperity gospel.' }],
        completed: false,
      },
      {
        id: 'df5', title: 'Emotional Manipulation in Churches', overview: 'Dim lights, repetitive music, altar calls designed to produce emotional responses — not genuine repentance or understanding.',
        keyVerses: ['John 4:24', '1 Corinthians 14:33', '2 Timothy 1:7', 'Isaiah 29:13'],
        reflectionQuestions: [{ question: 'Have you ever "felt the Spirit" in a service but looking back, it was just emotional manipulation?' }],
        actionSteps: [{ step: 'Next time you\'re in a service, observe: Is the emotion coming from truth or technique?' }],
        completed: false,
      },
      {
        id: 'df6', title: 'Why People Follow Lies', overview: 'People don\'t follow lies because they\'re stupid. They follow lies because lies are comfortable, and truth is costly.',
        keyVerses: ['2 Thessalonians 2:10-12', 'John 3:19-20', 'Romans 1:25', '2 Timothy 4:3-4'],
        reflectionQuestions: [{ question: '2 Thessalonians 2:11 says Yahweh sends a strong delusion to those who didn\'t love the truth. What does it mean to "love truth"?' }],
        actionSteps: [{ step: 'Examine your own beliefs. Are any of them comfortable lies you\'ve never questioned?' }],
        completed: false,
      },
      {
        id: 'df7', title: 'False Doctrine Checklist', overview: 'A practical framework for evaluating ANY teaching against Scripture.',
        keyVerses: ['Acts 17:11', 'Isaiah 8:20', '1 John 4:1', 'Galatians 1:8-9'],
        reflectionQuestions: [{ question: 'Do you test every teaching you hear against Scripture, or do you accept things because you trust the speaker?' }],
        actionSteps: [{ step: 'Build your personal "doctrine filter" based on Isaiah 8:20 and Acts 17:11.' }],
        drill: 'Create a 5-question filter: Does it align with Torah? Does it match the prophets? Did the apostles teach it? Does it produce good fruit? Does it honor Yahweh alone?',
        quiz: [
          { question: 'According to Acts 17:11, what made the Bereans noble?', options: ['They accepted Paul immediately', 'They searched the Scriptures daily to verify', 'They had great faith', 'They built a large church'], correctIndex: 1 },
          { question: 'Isaiah 8:20 says to test everything against...', options: ['Church tradition', 'Pastoral authority', 'The Torah and the testimony', 'Feelings and experience'], correctIndex: 2 },
        ],
        completed: false,
      },
      {
        id: 'df8', title: 'Social Media Deception — Modern False Prophets', overview: 'Instagram prophets, TikTok teachers, YouTube pastors. The same wolves, just with better production.',
        keyVerses: ['Matthew 24:4-5', '2 Corinthians 11:13-15', '1 Timothy 4:1', '2 Peter 2:18-19'],
        reflectionQuestions: [{ question: 'How many accounts do you follow that teach things you\'ve never verified in Scripture?' }],
        actionSteps: [{ step: 'Audit 5 religious accounts you follow. For each, find one claim they make and verify it against Scripture.' }],
        completed: false,
      },
      {
        id: 'df9', title: 'Testing Every Spirit', overview: '1 John 4:1 commands us to test the spirits. This is not optional. Every teaching, every prophecy, every spiritual experience must be tested.',
        keyVerses: ['1 John 4:1-6', '1 Thessalonians 5:21', 'Deuteronomy 13:1-4', 'Revelation 2:2'],
        reflectionQuestions: [{ question: 'Do you test spiritual experiences or accept them because they feel good?' }],
        actionSteps: [{ step: 'Read 1 John 4:1-6 and write out the test: How do you determine if a spirit is from Yahweh?' }],
        quiz: [
          { question: '1 John 4:1 says we should...', options: ['Accept all spiritual experiences', 'Test the spirits to see if they are from Yahweh', 'Never question teachers', 'Trust our feelings'], correctIndex: 1 },
        ],
        completed: false,
      },
      {
        id: 'df10', title: 'DRILL: Analyze Real Teaching', overview: 'Take a popular sermon, clip, or post and run it through your biblical filter. Is it truth, deception, or a dangerous mix?',
        keyVerses: ['Acts 17:11', 'Isaiah 8:20', '2 Timothy 2:15'],
        reflectionQuestions: [{ question: 'After analyzing, what did you discover? Truth? Error? Half-truths?' }],
        actionSteps: [
          { step: 'Find a popular sermon online. Watch it with your Bible open.' },
          { step: 'For every claim made, write: Scripture reference supporting it OR "No scripture found."' },
          { step: 'Share your analysis with someone.' },
        ],
        drill: 'Use the Discernment Scanner in the app. Drop a link to a popular teaching video and analyze the results.',
        completed: false,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 5: MUSIC, CULTURE & SPIRITUAL INFLUENCE (BREAD)
  // ═══════════════════════════════════════════
  {
    id: 'music-culture',
    title: 'Music, Culture & Spiritual Influence',
    overview: 'What you consume shapes who you become. Music, media, and culture are not neutral — they are spiritual transmission systems.',
    icon: '🎤',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      { id: 'mc1', title: 'Power of Words & Sound', overview: 'Proverbs 18:21 — Death and life are in the power of the tongue. What you listen to repeatedly enters your spirit.',
        keyVerses: ['Proverbs 18:21', 'Proverbs 4:23', 'Romans 10:17', 'Matthew 12:36-37'],
        reflectionQuestions: [{ question: 'If faith comes by hearing, what is being built inside you by what you hear daily?' }],
        actionSteps: [{ step: 'Track everything you listen to for one week. Categorize it: life-giving or death-speaking.' }],
        completed: false },
      { id: 'mc2', title: 'Repetition = Programming', overview: 'When you hear something 100 times, you stop questioning it. Music uses repetition to bypass your conscious mind.',
        keyVerses: ['Philippians 4:8', 'Romans 12:2', 'Psalm 101:3', '2 Corinthians 10:5'],
        reflectionQuestions: [{ question: 'What lyrics can you recite from memory? What beliefs do they carry?' }],
        actionSteps: [{ step: 'Write out the lyrics of 3 songs you listen to regularly. What messages are they planting?' }],
        completed: false },
      { id: 'mc3', title: 'Sexual Immorality in Music', overview: 'The normalization of sexual sin through music is not accidental. It\'s systematic desensitization.',
        keyVerses: ['1 Corinthians 6:18-20', 'Ephesians 5:3-5', 'Matthew 5:28', 'Galatians 5:19-21'],
        reflectionQuestions: [{ question: 'If you wouldn\'t say these lyrics to Yahweh, why are you singing them?' }],
        actionSteps: [{ step: 'For one month, eliminate music with sexual content. Journal the difference.' }],
        completed: false },
      { id: 'mc4', title: 'Violence Normalization', overview: 'Celebrating violence, murder, and destruction in music reshapes how you view human life — which Yahweh created.',
        keyVerses: ['Genesis 9:6', 'Proverbs 6:16-19', 'Psalm 11:5', 'Matthew 5:9'],
        reflectionQuestions: [{ question: 'Yahweh says He hates hands that shed innocent blood. Does your playlist reflect that value?' }],
        actionSteps: [{ step: 'List the themes of violence in your top 10 most-played songs. Would Yahweh endorse this?' }],
        completed: false },
      { id: 'mc5', title: 'Industry Agenda — Control Mindset', overview: 'The music industry isn\'t just entertainment — it shapes culture, values, and behavior on a mass scale.',
        keyVerses: ['Ephesians 6:12', '2 Corinthians 4:4', '1 John 2:15-17', 'James 4:4'],
        reflectionQuestions: [{ question: 'Who benefits from a generation that glorifies sin, materialism, and rebellion?' }],
        actionSteps: [{ step: 'Research the history of music industry influence on culture. What patterns emerge?' }],
        completed: false },
      { id: 'mc6', title: 'Righteous vs Worldly Music', overview: 'There IS an alternative. Music that edifies, teaches, and glorifies Yahweh exists — but it requires intentional seeking.',
        keyVerses: ['Colossians 3:16', 'Ephesians 5:19', 'Psalm 150', 'Psalm 33:1-3'],
        reflectionQuestions: [{ question: 'How much of your music intake glorifies Yahweh vs. glorifies the world?' }],
        actionSteps: [{ step: 'Create a playlist of truth-based music. Replace worldly music for 30 days.' }],
        completed: false },
      { id: 'mc7', title: 'Guarding Your Mind', overview: 'Proverbs 4:23 — Guard your heart, for out of it flow the issues of life. What you allow in determines what comes out.',
        keyVerses: ['Proverbs 4:23', 'Philippians 4:8', 'Romans 12:2', 'Psalm 119:11'],
        reflectionQuestions: [{ question: 'What are the current "gates" (eyes, ears) that you\'re leaving unguarded?' }],
        actionSteps: [{ step: 'Implement a 30-day media fast. Replace entertainment with Scripture and prayer.' }],
        completed: false },
      { id: 'mc8', title: 'What You Consume = Who You Become', overview: 'This is the culmination. You are the sum of your inputs. Change the inputs, change the person.',
        keyVerses: ['Galatians 6:7-8', '1 Corinthians 15:33', 'Proverbs 13:20', 'Psalm 1:1-3'],
        reflectionQuestions: [{ question: 'If someone analyzed everything you consumed last month, what kind of person would they predict you\'re becoming?' }],
        actionSteps: [{ step: 'Write a personal "input standard" — what you will and won\'t allow into your mind going forward.' }],
        completed: false },
      { id: 'mc9', title: 'DRILL: Break Down Lyrics Line by Line', overview: 'Take a popular song and analyze every line. What is it teaching? What spirits does it invoke? What behavior does it normalize?',
        keyVerses: ['2 Corinthians 10:5', 'Philippians 4:8'],
        reflectionQuestions: [{ question: 'After breaking down the lyrics, would you play this song for your children? For Yahweh?' }],
        actionSteps: [{ step: 'Choose one hit song. Write out every lyric. Next to each line, write what it promotes or normalizes.' }],
        drill: 'Full lyric breakdown of a current top-10 song. Flag every line that contradicts Scripture with the specific verse.',
        completed: false },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 6: WITCHCRAFT, NEW AGE & HIDDEN PRACTICES (BREAD)
  // ═══════════════════════════════════════════
  {
    id: 'witchcraft-new-age',
    title: 'Witchcraft, New Age & Hidden Practices',
    overview: 'Expose what people don\'t realize they\'re doing. Many practices branded as "spiritual growth" are actually witchcraft by biblical definition.',
    icon: '🔮',
    difficulty: 'bread',
    progress: 0,
    lessons: [
      { id: 'wn1', title: 'What Witchcraft Actually Is', overview: 'The Bible defines witchcraft clearly. It\'s not just cauldrons and spells — it\'s any attempt to access spiritual power outside of Yahweh.',
        keyVerses: ['Deuteronomy 18:10-12', 'Galatians 5:19-21', '1 Samuel 15:23', 'Revelation 21:8'],
        reflectionQuestions: [{ question: 'Does Deuteronomy 18:10-12 describe any practices you or people around you participate in?' }],
        actionSteps: [{ step: 'List every practice named in Deuteronomy 18:10-12 and find their modern equivalents.' }],
        completed: false },
      { id: 'wn2', title: 'Astrology — Truth vs Deception', overview: 'Astrology is not harmless fun. It\'s divination — seeking guidance from created things instead of the Creator.',
        keyVerses: ['Isaiah 47:13-14', 'Deuteronomy 4:19', 'Jeremiah 10:2', 'Daniel 2:27-28'],
        reflectionQuestions: [{ question: 'Do you check your horoscope or identify by your zodiac sign? What does Isaiah 47 say about stargazers?' }],
        actionSteps: [{ step: 'Delete any astrology apps or unfollow astrology accounts. Replace with Scripture reading.' }],
        completed: false },
      { id: 'wn3', title: 'Manifestation vs Prayer', overview: '"Manifesting" is the belief that your words/thoughts create reality. Prayer is submitting to Yahweh\'s will. They are opposites.',
        keyVerses: ['Matthew 6:10', 'James 4:13-15', 'Proverbs 19:21', 'Isaiah 55:8-9'],
        reflectionQuestions: [{ question: 'Is your prayer "Thy will be done" or "My will be done"?' }],
        actionSteps: [{ step: 'Compare 5 manifestation teachings with what Yahshua taught about prayer in Matthew 6.' }],
        deceptionExposure: 'Manifestation repackages the serpent\'s original lie: "You shall be as gods." It puts human will above Yahweh\'s sovereignty. This is not faith — it is rebellion dressed in spiritual language.',
        completed: false },
      { id: 'wn4', title: 'Crystals, Energy & Vibrations Exposed', overview: 'The idea that created objects contain spiritual power is idolatry. Crystals don\'t heal. Energy doesn\'t save. Only Yahweh does.',
        keyVerses: ['Isaiah 44:9-20', 'Psalm 115:4-8', 'Acts 19:18-19', 'Habakkuk 2:18-19'],
        reflectionQuestions: [{ question: 'Are you putting faith in objects that Yahweh\'s hands created, instead of in Yahweh Himself?' }],
        actionSteps: [{ step: 'If you own any spiritual objects (crystals, talismans, etc.), study Acts 19:18-19 where believers burned their occult materials.' }],
        completed: false },
      { id: 'wn5', title: 'Law of Attraction vs Yahweh\'s Will', overview: 'The universe is not a cosmic vending machine. Yahweh is sovereign. His plans prevail, not human desires projected onto the cosmos.',
        keyVerses: ['Proverbs 16:9', 'Jeremiah 29:11', 'Romans 8:28', 'Isaiah 46:10'],
        reflectionQuestions: [{ question: 'Do you trust in a sovereign Creator or in your own ability to "attract" outcomes?' }],
        actionSteps: [{ step: 'Read Jeremiah 29:11 in context (exile, suffering, waiting on Yahweh\'s timing). How is this different from "manifesting"?' }],
        completed: false },
      { id: 'wn6', title: 'Sorcery in Modern Culture', overview: 'The Greek word for sorcery is "pharmakeia" — relating to drugs, potions, and altered states. Modern connections are closer than you think.',
        keyVerses: ['Revelation 18:23', 'Galatians 5:20', 'Revelation 9:21', 'Revelation 21:8'],
        reflectionQuestions: [{ question: 'What role do altered states of consciousness play in modern "spiritual" practices?' }],
        actionSteps: [{ step: 'Study the Greek word "pharmakeia" and its connections to modern concepts.' }],
        completed: false },
      { id: 'wn7', title: 'Why It Feels Real', overview: 'Spiritual deception works BECAUSE it produces real experiences. Real power ≠ Yahweh\'s power. Satan also has power.',
        keyVerses: ['2 Thessalonians 2:9-10', 'Exodus 7:11-12', 'Matthew 7:22-23', '2 Corinthians 11:14'],
        reflectionQuestions: [{ question: 'Pharaoh\'s magicians replicated Moses\' miracles. Does "working" prove something is from Yahweh?' }],
        actionSteps: [{ step: 'Document 3 examples where false spiritual practices produce real results. What does this prove?' }],
        completed: false },
      { id: 'wn8', title: 'Open Doors Spiritually', overview: 'Participation in occult practices opens doors to spiritual influence that can be difficult to close.',
        keyVerses: ['Ephesians 4:27', 'James 4:7', '1 Peter 5:8', 'Ephesians 6:11'],
        reflectionQuestions: [{ question: 'What spiritual doors have you opened through ignorance that need to be closed?' }],
        actionSteps: [{ step: 'Pray through every area of your life where you\'ve participated in occult practices. Renounce them by name.' }],
        completed: false },
      { id: 'wn9', title: 'How to Separate from It', overview: 'Separation is not optional. You cannot serve Yahweh and dabble in the occult. The break must be complete.',
        keyVerses: ['2 Corinthians 6:14-18', 'Acts 19:18-19', 'Deuteronomy 7:25-26', 'Joshua 24:15'],
        reflectionQuestions: [{ question: 'What are you still holding onto that you know Yahweh wants you to let go of?' }],
        actionSteps: [
          { step: 'Make a list of everything you need to separate from. Do it this week.' },
          { step: 'Follow the Acts 19 example: believers brought their occult items and burned them publicly.' },
        ],
        drill: 'Walk through your home, phone, and social media. Identify every item, app, or account connected to witchcraft, New Age, or occult practices. Remove them.',
        completed: false },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 7: TRUE WORSHIP & OBEDIENCE (MEAT)
  // ═══════════════════════════════════════════
  {
    id: 'true-worship',
    title: 'True Worship & Obedience — Belief → Action',
    overview: 'Move from knowing to DOING. Yahweh doesn\'t want fans — He wants obedient sons and daughters who walk the walk.',
    icon: '🛐',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      { id: 'tw1', title: 'What Yahweh Actually Wants', overview: 'Not sacrifice. Not ritual. Not church attendance. Obedience, justice, mercy, and humility.',
        keyVerses: ['Micah 6:8', '1 Samuel 15:22', 'Hosea 6:6', 'Matthew 9:13'], reflectionQuestions: [{ question: 'Are you giving Yahweh what He asked for, or what you decided He wants?' }],
        actionSteps: [{ step: 'Write out Micah 6:8 and make it your life mission statement.' }], completed: false },
      { id: 'tw2', title: 'Obedience vs Religion', overview: 'Religion is man\'s system. Obedience is Yahweh\'s requirement. They are not the same.',
        keyVerses: ['James 1:27', 'Isaiah 1:11-17', 'Matthew 15:7-9', 'Mark 7:6-8'], reflectionQuestions: [{ question: 'Is your "faith" actually obedience to Yahweh, or performance for people?' }],
        actionSteps: [{ step: 'Compare James 1:27 with your current religious practices.' }], completed: false },
      { id: 'tw3', title: 'Keeping the Commandments', overview: 'If you love Me, keep My commandments. Not suggestions. Not options. Commandments.',
        keyVerses: ['John 14:15', '1 John 5:3', 'Ecclesiastes 12:13', 'Revelation 14:12'], reflectionQuestions: [{ question: 'Which commandments are you currently ignoring?' }],
        actionSteps: [{ step: 'Read through the 10 Commandments (Exodus 20). Rate yourself honestly on each one.' }], completed: false },
      { id: 'tw4', title: 'Faith + Works Balance', overview: 'James 2:26 — Faith without works is DEAD. Not dormant. Dead. Works prove your faith is alive.',
        keyVerses: ['James 2:14-26', 'Ephesians 2:8-10', 'Titus 2:14', 'Matthew 7:21'], reflectionQuestions: [{ question: 'If someone watched your life for a month without hearing your words, would they know you have faith?' }],
        actionSteps: [{ step: 'List 5 ways your faith is currently producing visible works/fruit.' }], completed: false },
      { id: 'tw5', title: 'Repentance Explained', overview: 'Repentance is not crying at an altar. It\'s turning 180 degrees from sin to obedience — and staying turned.',
        keyVerses: ['Acts 3:19', '2 Chronicles 7:14', 'Ezekiel 18:30-32', 'Luke 13:3'], reflectionQuestions: [{ question: 'Have you repented, or just apologized? There\'s a difference.' }],
        actionSteps: [{ step: 'Identify one sin pattern in your life and take concrete action to turn from it this week.' }], completed: false },
      { id: 'tw6', title: 'Living Set Apart', overview: 'Holiness is not perfection — it\'s separation. Being set apart FOR Yahweh and FROM the world.',
        keyVerses: ['1 Peter 1:15-16', 'Leviticus 20:26', 'Romans 12:1-2', '2 Corinthians 6:17'], reflectionQuestions: [{ question: 'What in your life looks no different from someone who doesn\'t follow Yahweh?' }],
        actionSteps: [{ step: 'Identify 3 areas where you need to separate from worldly patterns.' }], completed: false },
      { id: 'tw7', title: 'Daily Discipline System', overview: 'Build a daily walk with Yahweh that is consistent, structured, and transformative.',
        keyVerses: ['Psalm 1:1-3', 'Joshua 1:8', 'Psalm 119:105', 'Daniel 6:10'], reflectionQuestions: [{ question: 'Do you have a daily discipline or do you only seek Yahweh when you need something?' }],
        actionSteps: [{ step: 'Create a daily schedule: Morning prayer, scripture reading, evening reflection. Follow it for 30 days.' }], completed: false },
      { id: 'tw8', title: 'Prayer Structure — Real, Not Religious', overview: 'Prayer is not repeating phrases or performing for an audience. It\'s honest communication with your Creator.',
        keyVerses: ['Matthew 6:5-13', 'Philippians 4:6-7', '1 Thessalonians 5:17', 'Romans 8:26'], reflectionQuestions: [{ question: 'When was the last time you prayed honestly instead of religiously?' }],
        actionSteps: [{ step: 'Pray for 15 minutes without any religious language. Just talk to Yahweh like He\'s in the room.' }], completed: false },
      { id: 'tw9', title: 'Fasting Breakdown', overview: 'Fasting is not a diet. It\'s a spiritual weapon that sharpens your hearing and weakens your flesh.',
        keyVerses: ['Isaiah 58:1-12', 'Matthew 6:16-18', 'Matthew 17:21', 'Joel 2:12'], reflectionQuestions: [{ question: 'Have you ever fasted with a spiritual purpose, not just skipping meals?' }],
        actionSteps: [{ step: 'Plan a 24-hour fast with prayer. Set a spiritual intention. Journal what you experience.' }],
        drill: 'Build your daily walk system: Wake time, prayer, Scripture reading, evening reflection. Test it for one week.',
        completed: false },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 8: SPIRITUAL WARFARE (MEAT)
  // ═══════════════════════════════════════════
  {
    id: 'spiritual-warfare',
    title: 'Spiritual Warfare — Know the Battle',
    overview: 'You are in a war whether you acknowledge it or not. Ignorance is not protection. Awareness, armor, and authority are.',
    icon: '⚔️',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      { id: 'sw1', title: 'Who Satan Is — Role & Purpose', overview: 'Satan is not Yahweh\'s equal opposite. He is a created being with a defined role, operating within boundaries set by Yahweh.',
        keyVerses: ['Isaiah 14:12-15', 'Ezekiel 28:12-19', 'Job 1:6-12', 'Luke 10:18'], reflectionQuestions: [{ question: 'Do you fear Satan more than you fear Yahweh? Why?' }],
        actionSteps: [{ step: 'Read Job 1-2. What does Satan\'s interaction with Yahweh reveal about his limitations?' }], completed: false },
      { id: 'sw2', title: 'How Deception Works', overview: 'The serpent\'s method hasn\'t changed: question Yahweh\'s word, twist it slightly, offer an alternative that appeals to the flesh.',
        keyVerses: ['Genesis 3:1-5', '2 Corinthians 11:3', 'John 8:44', '2 Corinthians 2:11'], reflectionQuestions: [{ question: 'Can you identify the three stages of deception in Genesis 3? Question → Contradict → Offer alternative.' }],
        actionSteps: [{ step: 'Identify a modern deception and trace it through the Genesis 3 pattern.' }], completed: false },
      { id: 'sw3', title: 'Mind Attacks', overview: 'The battlefield is the mind. Intrusive thoughts, doubt, fear, confusion — these are not random. They are attacks.',
        keyVerses: ['2 Corinthians 10:3-5', 'Romans 8:6', 'Philippians 4:6-8', 'Isaiah 26:3'], reflectionQuestions: [{ question: 'What recurring thoughts do you battle that pull you away from truth and peace?' }],
        actionSteps: [{ step: 'For one week, when a negative thought comes, capture it (2 Cor 10:5) and replace it with Scripture.' }], completed: false },
      { id: 'sw4', title: 'Temptation Patterns', overview: 'Temptation follows patterns. Once you see the pattern, you can break the cycle before it completes.',
        keyVerses: ['James 1:14-15', '1 Corinthians 10:13', 'Matthew 4:1-11', 'Hebrews 4:15'], reflectionQuestions: [{ question: 'What is your typical temptation cycle? Trigger → Desire → Action → Guilt?' }],
        actionSteps: [{ step: 'Map your top 3 temptation patterns. For each, identify the trigger and the Scripture that counters it.' }], completed: false },
      { id: 'sw5', title: 'Strongholds Explained', overview: 'A stronghold is a deeply entrenched pattern of thinking or behavior that has taken root. It requires active warfare to tear down.',
        keyVerses: ['2 Corinthians 10:4', 'Ephesians 4:27', 'Romans 6:12-14', 'Galatians 5:1'], reflectionQuestions: [{ question: 'What strongholds exist in your life that you\'ve accepted as "just who I am"?' }],
        actionSteps: [{ step: 'Name your strongholds. Write Scripture against each one. Pray through them daily for 21 days.' }], completed: false },
      { id: 'sw6', title: 'Armor of Yahweh — Ephesians 6 Breakdown', overview: 'Each piece of armor corresponds to a specific spiritual reality. This is not metaphor — it\'s equipment.',
        keyVerses: ['Ephesians 6:10-18', 'Isaiah 59:17', '1 Thessalonians 5:8', 'Romans 13:12'], reflectionQuestions: [{ question: 'Which piece of armor are you currently NOT wearing?' }],
        actionSteps: [{ step: 'Study each piece of armor in Ephesians 6. For each, write: What does it protect? How do I "put it on" practically?' }],
        drill: 'Write out each piece of armor, what it represents, and a daily practice for "putting it on." Make this your morning routine.',
        completed: false },
      { id: 'sw7', title: 'Authority Over Spirits', overview: 'Yahshua gave his followers authority. Not suggestion. Authority. But authority requires obedience and right standing.',
        keyVerses: ['Luke 10:19', 'Mark 16:17', 'James 4:7', 'Acts 16:16-18'], reflectionQuestions: [{ question: 'Do you operate in spiritual authority, or do you live in spiritual fear?' }],
        actionSteps: [{ step: 'Study every instance in Acts where believers exercised authority over spirits. What was their posture?' }], completed: false },
      { id: 'sw8', title: 'Discernment Sharpening', overview: 'Discernment is a skill that must be practiced. The mature, by reason of use, have their senses trained to discern good and evil.',
        keyVerses: ['Hebrews 5:14', '1 Kings 3:9', 'Proverbs 2:1-6', '1 Corinthians 12:10'], reflectionQuestions: [{ question: 'Are your spiritual senses trained, or have you been spiritually lazy?' }],
        actionSteps: [{ step: 'Practice discernment daily: Test one teaching, one conversation, one situation against Scripture.' }], completed: false },
      { id: 'sw9', title: 'Staying Protected Daily', overview: 'Spiritual protection is not a one-time prayer. It\'s a daily discipline of armor, awareness, and alignment with Yahweh.',
        keyVerses: ['Psalm 91:1-16', 'Proverbs 18:10', 'Psalm 23:4', 'Isaiah 54:17'], reflectionQuestions: [{ question: 'What is your daily spiritual protection routine?' }],
        actionSteps: [{ step: 'Create a morning spiritual warfare prayer. Pray it daily for 30 days.' }],
        drill: 'Identify 3 current spiritual attacks in your life. For each, identify the strategy, the lie, and the Scripture that defeats it.',
        completed: false },
    ],
  },

  // ═══════════════════════════════════════════
  // MODULE 9: DEEP STUDY SYSTEM (MEAT)
  // ═══════════════════════════════════════════
  {
    id: 'deep-study-system',
    title: 'Deep Study System — Become a Student',
    overview: 'Stop depending on others to interpret Scripture for you. Learn HOW to study so you become a self-feeding, independent student of the Word.',
    icon: '📚',
    difficulty: 'meat',
    progress: 0,
    lessons: [
      { id: 'ds1', title: 'How to Study Scripture Properly', overview: 'Read in context. Compare with other verses. Check the original language. Let Scripture interpret Scripture.',
        keyVerses: ['2 Timothy 2:15', 'Acts 17:11', 'Isaiah 28:10', 'Psalm 119:18'], reflectionQuestions: [{ question: 'When you study, do you look for truth or confirmation of what you already believe?' }],
        actionSteps: [{ step: 'Choose one chapter. Read it 5 times. Context, key words, cross-references, original language, application.' }], completed: false },
      { id: 'ds2', title: 'Context > Cherry Picking', overview: 'Every verse has a context: who said it, to whom, when, and why. Ripping verses out of context is how false doctrine is built.',
        keyVerses: ['2 Peter 3:16', '2 Timothy 2:15', 'Nehemiah 8:8', 'Acts 8:30-31'], reflectionQuestions: [{ question: 'Have you ever used a verse to support a belief without reading the full passage?' }],
        actionSteps: [{ step: 'Take 3 commonly misquoted verses. Read 10 verses before and after each. Does the meaning change?' }], completed: false },
      { id: 'ds3', title: 'Hebrew & Greek Basics', overview: 'You don\'t need to be a linguist. But knowing how to look up Hebrew and Greek words transforms your study.',
        keyVerses: ['Psalm 119:160', 'Proverbs 25:2', 'Matthew 5:18', 'John 1:1'], reflectionQuestions: [{ question: 'Have you ever looked up the original Hebrew or Greek of a verse you love? What did you discover?' }],
        actionSteps: [{ step: 'Use the Hebrew/Greek tools in this app or a concordance to study 5 key words in their original language.' }], completed: false },
      { id: 'ds4', title: 'Cross-Referencing Scripture', overview: 'Scripture interprets Scripture. Every verse connects to others. Cross-referencing reveals patterns human authors couldn\'t have orchestrated.',
        keyVerses: ['Isaiah 34:16', 'Matthew 4:4', '2 Timothy 3:16', 'Luke 24:27'], reflectionQuestions: [{ question: 'When you study a verse, do you check what the rest of Scripture says about the same topic?' }],
        actionSteps: [{ step: 'Choose a topic (e.g., "the name of Yahweh"). Find 20 verses across OT and NT that address it.' }], completed: false },
      { id: 'ds5', title: 'Using Strong\'s Concordance', overview: 'Strong\'s numbers connect every English word to its Hebrew/Greek root. This is your key to unlocking original meaning.',
        keyVerses: ['Proverbs 2:4-5', 'Colossians 2:3', 'Matthew 7:7', 'Jeremiah 29:13'], reflectionQuestions: [{ question: 'Are you willing to put in the work to dig deeper, or are you satisfied with surface-level understanding?' }],
        actionSteps: [{ step: 'Look up Strong\'s numbers for 5 words: love, sin, faith, grace, law. Write the original language definitions.' }], completed: false },
      { id: 'ds6', title: 'Breaking Down Verses Word-by-Word', overview: 'The interlinear method: take a verse, break every word into its original language, and rebuild the meaning from the ground up.',
        keyVerses: ['John 1:1', 'Romans 3:31', 'Galatians 3:13', 'Hebrews 4:12'], reflectionQuestions: [{ question: 'What does a word-by-word breakdown reveal that a surface reading misses?' }],
        actionSteps: [{ step: 'Use the Interlinear feature in this app. Break down John 1:1 word by word. What does each Greek word actually mean?' }], completed: false },
      { id: 'ds7', title: 'Building Your Own Doctrine (Correctly)', overview: 'Your doctrine should come from Scripture — not from a denomination, a pastor, or a tradition. Build it brick by brick, verse by verse.',
        keyVerses: ['Isaiah 8:20', '2 Timothy 3:16-17', 'Titus 1:9', '1 Peter 3:15'], reflectionQuestions: [{ question: 'Can you defend every belief you hold with multiple Scripture references, or are some just inherited assumptions?' }],
        actionSteps: [{ step: 'List your top 10 beliefs. For each, find at least 3 Scripture references that directly support it. If you can\'t, question it.' }], completed: false },
      { id: 'ds8', title: 'Avoiding False Interpretations', overview: 'Eisegesis (reading INTO the text) vs. exegesis (drawing OUT of the text). Learn to recognize when you or others are adding to Scripture.',
        keyVerses: ['Revelation 22:18-19', 'Deuteronomy 4:2', 'Proverbs 30:5-6', '2 Peter 1:20'], reflectionQuestions: [{ question: 'Are you reading what the text says, or what you want it to say?' }],
        actionSteps: [{ step: 'Take a controversial verse. Read it without any preconceived theology. What does it plainly say?' }], completed: false },
      { id: 'ds9', title: 'Study Schedule System', overview: 'Discipline beats motivation. Create a study system that doesn\'t depend on how you feel.',
        keyVerses: ['Joshua 1:8', 'Psalm 1:2', 'Acts 17:11', 'Ezra 7:10'], reflectionQuestions: [{ question: 'Do you have a study schedule, or do you only study when inspired?' }],
        actionSteps: [{ step: 'Build a weekly study schedule: 3 days Torah, 2 days Prophets/Writings, 2 days Apostolic Writings. Commit to it.' }],
        drill: 'Take one full chapter (e.g., Romans 8). Break it down completely: context, key words, cross-references, original language, application. Write a 1-page summary.',
        completed: false },
    ],
  },
];
