export interface VocabularyTerm {
  id: string;
  hebrew: string;
  transliteration: string;
  pronunciation: string;
  meaning: string;
  scriptureRef: string;
  example: string;
}

export interface LessonSection {
  title: string;
  content: string;
  type: 'text' | 'vocabulary' | 'practice' | 'quiz';
  vocabularyTerms?: VocabularyTerm[];
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LanguageLesson {
  id: string;
  title: string;
  overview: string;
  order: number;
  sections: LessonSection[];
  completed: boolean;
  progress: number;
}

export const hebrewLessons: LanguageLesson[] = [
  {
    id: 'heb1',
    title: 'The Hebrew Aleph-Bet',
    overview: 'Learn the 22 consonants of the Hebrew alphabet — the building blocks of the language of Scripture.',
    order: 1,
    progress: 100,
    completed: true,
    sections: [
      {
        title: 'Introduction',
        type: 'text',
        content: 'Hebrew is written from right to left and consists of 22 consonant letters. Vowels are indicated by marks (niqud) placed above or below the letters. The alphabet is called the Aleph-Bet after its first two letters: א (Aleph) and ב (Bet).',
      },
      {
        title: 'First Five Letters',
        type: 'vocabulary',
        content: 'Master the first five letters of the Hebrew alphabet.',
        vocabularyTerms: [
          { id: 'aleph', hebrew: 'א', transliteration: 'Aleph', pronunciation: 'Silent / glottal stop', meaning: 'First letter — represents the oneness of Elohim', scriptureRef: 'Psalm 119:1', example: 'אָב (av) — father' },
          { id: 'bet', hebrew: 'ב', transliteration: 'Bet / Vet', pronunciation: 'B as in boy / V as in vine', meaning: 'House — bayit means house', scriptureRef: 'Genesis 1:1', example: 'בְּרֵאשִׁית (bereshit) — in the beginning' },
          { id: 'gimel', hebrew: 'ג', transliteration: 'Gimel', pronunciation: 'G as in go', meaning: 'Camel — picture of lifting up', scriptureRef: '', example: 'גָּדוֹל (gadol) — great' },
          { id: 'dalet', hebrew: 'ד', transliteration: 'Dalet', pronunciation: 'D as in door', meaning: 'Door — the pathway', scriptureRef: '', example: 'דָּבָר (davar) — word, matter' },
          { id: 'he', hebrew: 'ה', transliteration: 'He', pronunciation: 'H as in hello', meaning: 'Window — behold, reveal', scriptureRef: '', example: 'הַלְלוּיָהּ (halleluyah) — praise Yah' },
        ],
      },
      {
        title: 'Check Your Understanding',
        type: 'quiz',
        content: '',
        quizQuestions: [
          { question: 'Which direction is Hebrew read?', options: ['Left to right', 'Right to left', 'Top to bottom'], correctIndex: 1 },
          { question: 'How many consonant letters are in the Hebrew alphabet?', options: ['24', '22', '26'], correctIndex: 1 },
          { question: 'What does the letter Bet (ב) picture?', options: ['Water', 'House', 'Head'], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: 'heb2',
    title: 'Vowel Marks (Niqud) Basics',
    overview: 'Understand the vowel pointing system that gives Hebrew words their pronunciation.',
    order: 2,
    progress: 60,
    completed: false,
    sections: [
      {
        title: 'What Are Niqud?',
        type: 'text',
        content: 'Ancient Hebrew was written without vowels. The niqud (vowel marks) were added by the Masoretes to preserve pronunciation. They appear as dots and dashes above and below consonant letters. The main vowel sounds are: a (patach/qamatz), e (segol/tzere), i (chirik), o (cholam), u (qubbutz/shuruq).',
      },
      {
        title: 'Primary Vowel Marks',
        type: 'vocabulary',
        content: 'Learn the five primary vowel sounds and their marks.',
        vocabularyTerms: [
          { id: 'patach', hebrew: 'בַ', transliteration: 'Patach', pronunciation: 'Short "a" as in father', meaning: 'Open vowel — a horizontal line below', scriptureRef: '', example: 'בַּת (bat) — daughter' },
          { id: 'tsere', hebrew: 'בֵ', transliteration: 'Tsere', pronunciation: '"ey" as in they', meaning: 'Two dots below the letter', scriptureRef: '', example: 'בֵּן (ben) — son' },
          { id: 'chirik', hebrew: 'בִ', transliteration: 'Chirik', pronunciation: '"ee" as in machine', meaning: 'Single dot below', scriptureRef: '', example: 'בִּרְכָּה (birkhah) — blessing' },
          { id: 'cholam', hebrew: 'בֹ', transliteration: 'Cholam', pronunciation: '"oh" as in go', meaning: 'Dot above left of letter', scriptureRef: '', example: 'שָׁלוֹם (shalom) — peace' },
          { id: 'qubbutz', hebrew: 'בֻ', transliteration: 'Qubbutz', pronunciation: '"oo" as in food', meaning: 'Three diagonal dots below', scriptureRef: '', example: 'רוּחַ (ruach) — spirit/breath' },
        ],
      },
      {
        title: 'Practice',
        type: 'quiz',
        content: '',
        quizQuestions: [
          { question: 'Who added the vowel marks to the Hebrew text?', options: ['The apostles', 'The Masoretes', 'King David'], correctIndex: 1 },
          { question: 'What sound does Chirik make?', options: ['"ah"', '"oh"', '"ee"'], correctIndex: 2 },
        ],
      },
    ],
  },
  {
    id: 'heb3',
    title: 'Key Scriptural Words',
    overview: 'Learn foundational Hebrew words that appear throughout Scripture and deepen your understanding of the text.',
    order: 3,
    progress: 0,
    completed: false,
    sections: [
      {
        title: 'Overview',
        type: 'text',
        content: 'Many critical concepts in Scripture are best understood in their original Hebrew. English translations often flatten the richness of Hebrew words. Learning these key terms will transform your reading of the Tanakh (Old Testament).',
      },
      {
        title: 'Foundational Terms',
        type: 'vocabulary',
        content: 'These words form the backbone of scriptural understanding.',
        vocabularyTerms: [
          { id: 'shalom', hebrew: 'שָׁלוֹם', transliteration: 'Shalom', pronunciation: 'shah-LOHM', meaning: 'Peace, wholeness, completeness, well-being', scriptureRef: 'Numbers 6:26', example: 'Yahweh lift up His face upon you and give you shalom.' },
          { id: 'torah', hebrew: 'תּוֹרָה', transliteration: 'Torah', pronunciation: 'toh-RAH', meaning: 'Instruction, teaching, law — from the root yarah (to shoot, instruct)', scriptureRef: 'Psalm 19:7', example: 'The Torah of Yahweh is perfect, restoring the soul.' },
          { id: 'ruach', hebrew: 'רוּחַ', transliteration: 'Ruach', pronunciation: 'ROO-akh', meaning: 'Spirit, breath, wind', scriptureRef: 'Genesis 1:2', example: 'The Ruach of Elohim was hovering over the waters.' },
          { id: 'nephesh', hebrew: 'נֶפֶשׁ', transliteration: 'Nephesh', pronunciation: 'NEH-fesh', meaning: 'Soul, life, living being, self', scriptureRef: 'Genesis 2:7', example: 'Man became a living nephesh.' },
          { id: 'hesed', hebrew: 'חֶסֶד', transliteration: 'Chesed', pronunciation: 'KHEH-sed', meaning: 'Lovingkindness, covenant loyalty, faithful love', scriptureRef: 'Psalm 136:1', example: 'Give thanks to Yahweh, for His chesed endures forever.' },
          { id: 'emet', hebrew: 'אֱמֶת', transliteration: 'Emet', pronunciation: 'eh-MET', meaning: 'Truth, faithfulness, reliability', scriptureRef: 'Psalm 119:160', example: 'The sum of Your word is emet.' },
          { id: 'qadosh', hebrew: 'קָדוֹשׁ', transliteration: 'Qadosh', pronunciation: 'kah-DOHSH', meaning: 'Set apart, holy, sacred', scriptureRef: 'Leviticus 19:2', example: 'Be qadosh, for I Yahweh your Elohim am qadosh.' },
          { id: 'shabbat', hebrew: 'שַׁבָּת', transliteration: 'Shabbat', pronunciation: 'shah-BAHT', meaning: 'Rest, cessation — the seventh day', scriptureRef: 'Exodus 20:8', example: 'Remember the Shabbat day, to set it apart.' },
        ],
      },
      {
        title: 'Root Word Concept',
        type: 'text',
        content: 'Hebrew words are built from three-letter roots. Understanding the root reveals layers of meaning. For example, the root שׁ-ל-ם (shin-lamed-mem) gives us shalom (peace), shalem (complete), and shillem (to repay). When you learn roots, you unlock families of related words and deepen your understanding exponentially.',
      },
      {
        title: 'Check Your Understanding',
        type: 'quiz',
        content: '',
        quizQuestions: [
          { question: 'What does "Torah" literally mean?', options: ['Law only', 'Instruction / Teaching', 'Old rules'], correctIndex: 1 },
          { question: 'What is the root concept behind "chesed"?', options: ['Justice', 'Covenant loyalty and faithful love', 'Anger'], correctIndex: 1 },
          { question: 'How many letters are in a typical Hebrew root?', options: ['2', '3', '4'], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: 'heb4',
    title: 'Reading Direction & Basic Grammar',
    overview: 'Understand how Hebrew sentences are structured and begin reading simple phrases.',
    order: 4,
    progress: 0,
    completed: false,
    sections: [
      {
        title: 'Right to Left',
        type: 'text',
        content: 'Hebrew reads from right to left. Books open from what English readers consider the "back." The verb typically comes first in a sentence (VSO order: Verb-Subject-Object), though this can vary. Hebrew is a very concrete language — abstract ideas are often expressed through physical imagery.',
      },
      {
        title: 'Practice Reading',
        type: 'practice',
        content: 'Try reading these simple Hebrew phrases:\n\n• שָׁלוֹם (shalom) — Peace\n• בְּרֵאשִׁית (bereshit) — In the beginning\n• יהוה אֶחָד (Yahweh echad) — Yahweh is one\n• בָּרוּךְ יהוה (barukh Yahweh) — Blessed is Yahweh',
      },
    ],
  },
];
