import type { LanguageLesson, VocabularyTerm, QuizQuestion, LessonSection } from './hebrewData';

export const greekLessons: LanguageLesson[] = [
  {
    id: 'grk1',
    title: 'The Greek Alphabet',
    overview: 'Learn the 24 letters of the Greek alphabet — the language of the Renewed Covenant writings.',
    order: 1,
    progress: 100,
    completed: true,
    sections: [
      {
        title: 'Introduction',
        type: 'text',
        content: 'Greek (Koine Greek specifically) was the common language of the first-century Mediterranean world. The New Testament writings were composed in this language. The Greek alphabet has 24 letters, both uppercase and lowercase forms. Unlike Hebrew, Greek reads left to right.',
      },
      {
        title: 'First Eight Letters',
        type: 'vocabulary',
        content: 'Master the foundational Greek letters.',
        vocabularyTerms: [
          { id: 'alpha', hebrew: 'Αα', transliteration: 'Alpha', pronunciation: '"ah" as in father', meaning: 'First letter — beginning', scriptureRef: 'Revelation 1:8', example: 'I am the Alpha and the Omega' },
          { id: 'beta', hebrew: 'Ββ', transliteration: 'Beta', pronunciation: '"b" as in boy', meaning: 'Second letter', scriptureRef: '', example: 'βιβλίον (biblion) — book' },
          { id: 'gamma', hebrew: 'Γγ', transliteration: 'Gamma', pronunciation: '"g" as in go', meaning: 'Third letter', scriptureRef: '', example: 'γῆ (gē) — earth' },
          { id: 'delta', hebrew: 'Δδ', transliteration: 'Delta', pronunciation: '"d" as in door', meaning: 'Fourth letter', scriptureRef: '', example: 'δόξα (doxa) — glory' },
          { id: 'epsilon', hebrew: 'Εε', transliteration: 'Epsilon', pronunciation: 'Short "e" as in pet', meaning: 'Fifth letter', scriptureRef: '', example: 'ἐκκλησία (ekklēsia) — assembly' },
          { id: 'zeta', hebrew: 'Ζζ', transliteration: 'Zeta', pronunciation: '"dz" or "z"', meaning: 'Sixth letter', scriptureRef: '', example: 'ζωή (zōē) — life' },
          { id: 'eta', hebrew: 'Ηη', transliteration: 'Eta', pronunciation: 'Long "ay" as in they', meaning: 'Seventh letter', scriptureRef: '', example: 'ἡμέρα (hēmera) — day' },
          { id: 'theta', hebrew: 'Θθ', transliteration: 'Theta', pronunciation: '"th" as in think', meaning: 'Eighth letter', scriptureRef: '', example: 'θεός (theos) — God/Elohim' },
        ],
      },
      {
        title: 'Check Your Understanding',
        type: 'quiz',
        content: '',
        quizQuestions: [
          { question: 'How many letters are in the Greek alphabet?', options: ['22', '24', '26'], correctIndex: 1 },
          { question: 'Which direction is Greek read?', options: ['Right to left', 'Left to right', 'Both directions'], correctIndex: 1 },
          { question: 'What type of Greek is the New Testament written in?', options: ['Classical Greek', 'Modern Greek', 'Koine Greek'], correctIndex: 2 },
        ],
      },
    ],
  },
  {
    id: 'grk2',
    title: 'Pronunciation & Transliteration',
    overview: 'Learn how to pronounce Greek letters and transliterate Greek words into English characters.',
    order: 2,
    progress: 40,
    completed: false,
    sections: [
      {
        title: 'Pronunciation Systems',
        type: 'text',
        content: 'There are two main pronunciation systems for Koine Greek: Erasmian (academic) and Modern Greek. Most seminary and study tools use the Erasmian system. Key differences include how diphthongs (combined vowels) are pronounced. For study purposes, consistency matters more than which system you choose.',
      },
      {
        title: 'Common Diphthongs',
        type: 'vocabulary',
        content: 'Learn the most common vowel combinations.',
        vocabularyTerms: [
          { id: 'ai', hebrew: 'αι', transliteration: 'ai', pronunciation: '"ai" as in aisle', meaning: 'Common diphthong', scriptureRef: '', example: 'αἰώνιος (aiōnios) — eternal/age-lasting' },
          { id: 'ei', hebrew: 'ει', transliteration: 'ei', pronunciation: '"ei" as in eight', meaning: 'Common diphthong', scriptureRef: '', example: 'εἰρήνη (eirēnē) — peace' },
          { id: 'ou', hebrew: 'ου', transliteration: 'ou', pronunciation: '"oo" as in food', meaning: 'Common diphthong', scriptureRef: '', example: 'οὐρανός (ouranos) — heaven' },
          { id: 'eu', hebrew: 'ευ', transliteration: 'eu', pronunciation: '"eu" as in feud', meaning: 'Common diphthong', scriptureRef: '', example: 'εὐαγγέλιον (euangelion) — good news' },
        ],
      },
    ],
  },
  {
    id: 'grk3',
    title: 'Key New Testament Terms',
    overview: 'Learn essential Greek words that unlock deeper understanding of the Renewed Covenant writings.',
    order: 3,
    progress: 0,
    completed: false,
    sections: [
      {
        title: 'Overview',
        type: 'text',
        content: 'English translations often use a single word for multiple Greek terms, or flatten the meaning of rich Greek vocabulary. Learning key terms in their original language reveals layers of meaning that translations cannot fully capture.',
      },
      {
        title: 'Essential Terms',
        type: 'vocabulary',
        content: 'These words are foundational to understanding the Renewed Covenant.',
        vocabularyTerms: [
          { id: 'logos', hebrew: 'λόγος', transliteration: 'Logos', pronunciation: 'LOH-gos', meaning: 'Word, reason, message, divine expression', scriptureRef: 'John 1:1', example: 'In the beginning was the Logos, and the Logos was with Elohim.' },
          { id: 'agape', hebrew: 'ἀγάπη', transliteration: 'Agapē', pronunciation: 'ah-GAH-pay', meaning: 'Unconditional, self-sacrificing love', scriptureRef: '1 Corinthians 13:4-8', example: 'Agapē is patient, agapē is kind.' },
          { id: 'pistis', hebrew: 'πίστις', transliteration: 'Pistis', pronunciation: 'PIS-tis', meaning: 'Faith, trust, faithfulness, conviction', scriptureRef: 'Hebrews 11:1', example: 'Pistis is the substance of things hoped for.' },
          { id: 'charis', hebrew: 'χάρις', transliteration: 'Charis', pronunciation: 'KHAH-ris', meaning: 'Grace, unmerited favor, divine influence', scriptureRef: 'Ephesians 2:8', example: 'By charis you have been saved through pistis.' },
          { id: 'metanoia', hebrew: 'μετάνοια', transliteration: 'Metanoia', pronunciation: 'meh-TAH-noy-ah', meaning: 'Repentance, a change of mind and direction', scriptureRef: 'Acts 2:38', example: 'Repent (metanoia) and be immersed.' },
          { id: 'hamartia', hebrew: 'ἁμαρτία', transliteration: 'Hamartia', pronunciation: 'hah-mar-TEE-ah', meaning: 'Sin — literally "missing the mark"', scriptureRef: 'Romans 3:23', example: 'All have sinned (hamartia) and fall short of the glory.' },
          { id: 'basileia', hebrew: 'βασιλεία', transliteration: 'Basileia', pronunciation: 'bah-si-LAY-ah', meaning: 'Kingdom, reign, royal authority', scriptureRef: 'Matthew 6:33', example: 'Seek first the basileia of Elohim.' },
          { id: 'ekklesia', hebrew: 'ἐκκλησία', transliteration: 'Ekklēsia', pronunciation: 'ek-klay-SEE-ah', meaning: 'Called-out assembly (not "church")', scriptureRef: 'Matthew 16:18', example: 'Upon this rock I will build My ekklēsia.' },
        ],
      },
      {
        title: 'Root & Lemma Concept',
        type: 'text',
        content: 'Greek words change form based on their grammatical role (case, number, tense, voice, mood). The base form of a word is called the lemma. For nouns, the lemma is the nominative singular. For verbs, it is the first person singular present active indicative. When using study tools like concordances and lexicons, you search by lemma.\n\nFor example: ἀγαπῶ (agapō — I love), ἀγαπᾷς (agapas — you love), ἀγάπη (agapē — love as noun) all come from the same root.',
      },
      {
        title: 'Check Your Understanding',
        type: 'quiz',
        content: '',
        quizQuestions: [
          { question: 'What does "ekklēsia" literally mean?', options: ['Church building', 'Called-out assembly', 'Religious group'], correctIndex: 1 },
          { question: 'What does "hamartia" literally mean?', options: ['Rebellion', 'Missing the mark', 'Evil'], correctIndex: 1 },
          { question: 'What is a "lemma" in Greek?', options: ['A vowel mark', 'The base/dictionary form of a word', 'A type of verb'], correctIndex: 1 },
          { question: 'What does "metanoia" mean?', options: ['Forgiveness', 'A change of mind and direction', 'Baptism'], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: 'grk4',
    title: 'Simple Grammar Awareness',
    overview: 'Gain basic awareness of Greek grammar concepts to help you use study tools more effectively.',
    order: 4,
    progress: 0,
    completed: false,
    sections: [
      {
        title: 'Cases in Greek',
        type: 'text',
        content: 'Greek nouns change their endings based on their function in a sentence. This is called declension. There are five main cases:\n\n• Nominative — the subject (who/what does the action)\n• Genitive — possession or source (of/from)\n• Dative — indirect object (to/for/by)\n• Accusative — direct object (receives the action)\n• Vocative — direct address\n\nYou don\'t need to memorize all the endings right now. Just know that when a Greek word looks different from its lemma form, it may be the same word in a different case.',
      },
      {
        title: 'Verb Basics',
        type: 'text',
        content: 'Greek verbs encode a tremendous amount of information: person, number, tense, voice, and mood. The tense tells you not just when something happened but the type of action (completed, ongoing, or simple). The voice tells you the subject\'s relationship to the action (active, passive, or middle/reflexive). Understanding these basics helps you see nuances that English translations cannot capture.',
      },
    ],
  },
];
