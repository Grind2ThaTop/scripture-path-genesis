// Bible API service using bible-api.com (free, no key needed)
// Supports KJV translation

export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BiblePassage {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
}

const API_BASE = 'https://bible-api.com';

export async function fetchPassage(reference: string, translation: string = 'kjv'): Promise<BiblePassage | null> {
  try {
    const encoded = encodeURIComponent(reference);
    const res = await fetch(`${API_BASE}/${encoded}?translation=${translation}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data as BiblePassage;
  } catch {
    return null;
  }
}

export async function fetchChapter(book: string, chapter: number, translation: string = 'kjv'): Promise<BiblePassage | null> {
  return fetchPassage(`${book} ${chapter}`, translation);
}

// Book data with testament info and chapter counts
export type Testament = 'OT' | 'NT' | 'AP';

export interface BibleBook {
  name: string;
  shortName: string;
  testament: Testament;
  chapters: number;
  hasHebrew: boolean;
  hasGreek: boolean;
}

export const bibleBooks: BibleBook[] = [
  // Old Testament
  { name: 'Genesis', shortName: 'Gen', testament: 'OT', chapters: 50, hasHebrew: true, hasGreek: false },
  { name: 'Exodus', shortName: 'Exo', testament: 'OT', chapters: 40, hasHebrew: true, hasGreek: false },
  { name: 'Leviticus', shortName: 'Lev', testament: 'OT', chapters: 27, hasHebrew: true, hasGreek: false },
  { name: 'Numbers', shortName: 'Num', testament: 'OT', chapters: 36, hasHebrew: true, hasGreek: false },
  { name: 'Deuteronomy', shortName: 'Deu', testament: 'OT', chapters: 34, hasHebrew: true, hasGreek: false },
  { name: 'Joshua', shortName: 'Jos', testament: 'OT', chapters: 24, hasHebrew: true, hasGreek: false },
  { name: 'Judges', shortName: 'Jdg', testament: 'OT', chapters: 21, hasHebrew: true, hasGreek: false },
  { name: 'Ruth', shortName: 'Rut', testament: 'OT', chapters: 4, hasHebrew: true, hasGreek: false },
  { name: '1 Samuel', shortName: '1Sa', testament: 'OT', chapters: 31, hasHebrew: true, hasGreek: false },
  { name: '2 Samuel', shortName: '2Sa', testament: 'OT', chapters: 24, hasHebrew: true, hasGreek: false },
  { name: '1 Kings', shortName: '1Ki', testament: 'OT', chapters: 22, hasHebrew: true, hasGreek: false },
  { name: '2 Kings', shortName: '2Ki', testament: 'OT', chapters: 25, hasHebrew: true, hasGreek: false },
  { name: '1 Chronicles', shortName: '1Ch', testament: 'OT', chapters: 29, hasHebrew: true, hasGreek: false },
  { name: '2 Chronicles', shortName: '2Ch', testament: 'OT', chapters: 36, hasHebrew: true, hasGreek: false },
  { name: 'Ezra', shortName: 'Ezr', testament: 'OT', chapters: 10, hasHebrew: true, hasGreek: false },
  { name: 'Nehemiah', shortName: 'Neh', testament: 'OT', chapters: 13, hasHebrew: true, hasGreek: false },
  { name: 'Esther', shortName: 'Est', testament: 'OT', chapters: 10, hasHebrew: true, hasGreek: false },
  { name: 'Job', shortName: 'Job', testament: 'OT', chapters: 42, hasHebrew: true, hasGreek: false },
  { name: 'Psalms', shortName: 'Psa', testament: 'OT', chapters: 150, hasHebrew: true, hasGreek: false },
  { name: 'Proverbs', shortName: 'Pro', testament: 'OT', chapters: 31, hasHebrew: true, hasGreek: false },
  { name: 'Ecclesiastes', shortName: 'Ecc', testament: 'OT', chapters: 12, hasHebrew: true, hasGreek: false },
  { name: 'Song of Solomon', shortName: 'SoS', testament: 'OT', chapters: 8, hasHebrew: true, hasGreek: false },
  { name: 'Isaiah', shortName: 'Isa', testament: 'OT', chapters: 66, hasHebrew: true, hasGreek: false },
  { name: 'Jeremiah', shortName: 'Jer', testament: 'OT', chapters: 52, hasHebrew: true, hasGreek: false },
  { name: 'Lamentations', shortName: 'Lam', testament: 'OT', chapters: 5, hasHebrew: true, hasGreek: false },
  { name: 'Ezekiel', shortName: 'Eze', testament: 'OT', chapters: 48, hasHebrew: true, hasGreek: false },
  { name: 'Daniel', shortName: 'Dan', testament: 'OT', chapters: 12, hasHebrew: true, hasGreek: false },
  { name: 'Hosea', shortName: 'Hos', testament: 'OT', chapters: 14, hasHebrew: true, hasGreek: false },
  { name: 'Joel', shortName: 'Joe', testament: 'OT', chapters: 3, hasHebrew: true, hasGreek: false },
  { name: 'Amos', shortName: 'Amo', testament: 'OT', chapters: 9, hasHebrew: true, hasGreek: false },
  { name: 'Obadiah', shortName: 'Oba', testament: 'OT', chapters: 1, hasHebrew: true, hasGreek: false },
  { name: 'Jonah', shortName: 'Jon', testament: 'OT', chapters: 4, hasHebrew: true, hasGreek: false },
  { name: 'Micah', shortName: 'Mic', testament: 'OT', chapters: 7, hasHebrew: true, hasGreek: false },
  { name: 'Nahum', shortName: 'Nah', testament: 'OT', chapters: 3, hasHebrew: true, hasGreek: false },
  { name: 'Habakkuk', shortName: 'Hab', testament: 'OT', chapters: 3, hasHebrew: true, hasGreek: false },
  { name: 'Zephaniah', shortName: 'Zep', testament: 'OT', chapters: 3, hasHebrew: true, hasGreek: false },
  { name: 'Haggai', shortName: 'Hag', testament: 'OT', chapters: 2, hasHebrew: true, hasGreek: false },
  { name: 'Zechariah', shortName: 'Zec', testament: 'OT', chapters: 14, hasHebrew: true, hasGreek: false },
  { name: 'Malachi', shortName: 'Mal', testament: 'OT', chapters: 4, hasHebrew: true, hasGreek: false },
  // New Testament
  { name: 'Matthew', shortName: 'Mat', testament: 'NT', chapters: 28, hasHebrew: false, hasGreek: true },
  { name: 'Mark', shortName: 'Mar', testament: 'NT', chapters: 16, hasHebrew: false, hasGreek: true },
  { name: 'Luke', shortName: 'Luk', testament: 'NT', chapters: 24, hasHebrew: false, hasGreek: true },
  { name: 'John', shortName: 'Joh', testament: 'NT', chapters: 21, hasHebrew: false, hasGreek: true },
  { name: 'Acts', shortName: 'Act', testament: 'NT', chapters: 28, hasHebrew: false, hasGreek: true },
  { name: 'Romans', shortName: 'Rom', testament: 'NT', chapters: 16, hasHebrew: false, hasGreek: true },
  { name: '1 Corinthians', shortName: '1Co', testament: 'NT', chapters: 16, hasHebrew: false, hasGreek: true },
  { name: '2 Corinthians', shortName: '2Co', testament: 'NT', chapters: 13, hasHebrew: false, hasGreek: true },
  { name: 'Galatians', shortName: 'Gal', testament: 'NT', chapters: 6, hasHebrew: false, hasGreek: true },
  { name: 'Ephesians', shortName: 'Eph', testament: 'NT', chapters: 6, hasHebrew: false, hasGreek: true },
  { name: 'Philippians', shortName: 'Phi', testament: 'NT', chapters: 4, hasHebrew: false, hasGreek: true },
  { name: 'Colossians', shortName: 'Col', testament: 'NT', chapters: 4, hasHebrew: false, hasGreek: true },
  { name: '1 Thessalonians', shortName: '1Th', testament: 'NT', chapters: 5, hasHebrew: false, hasGreek: true },
  { name: '2 Thessalonians', shortName: '2Th', testament: 'NT', chapters: 3, hasHebrew: false, hasGreek: true },
  { name: '1 Timothy', shortName: '1Ti', testament: 'NT', chapters: 6, hasHebrew: false, hasGreek: true },
  { name: '2 Timothy', shortName: '2Ti', testament: 'NT', chapters: 4, hasHebrew: false, hasGreek: true },
  { name: 'Titus', shortName: 'Tit', testament: 'NT', chapters: 3, hasHebrew: false, hasGreek: true },
  { name: 'Philemon', shortName: 'Phm', testament: 'NT', chapters: 1, hasHebrew: false, hasGreek: true },
  { name: 'Hebrews', shortName: 'Heb', testament: 'NT', chapters: 13, hasHebrew: false, hasGreek: true },
  { name: 'James', shortName: 'Jam', testament: 'NT', chapters: 5, hasHebrew: false, hasGreek: true },
  { name: '1 Peter', shortName: '1Pe', testament: 'NT', chapters: 5, hasHebrew: false, hasGreek: true },
  { name: '2 Peter', shortName: '2Pe', testament: 'NT', chapters: 3, hasHebrew: false, hasGreek: true },
  { name: '1 John', shortName: '1Jo', testament: 'NT', chapters: 5, hasHebrew: false, hasGreek: true },
  { name: '2 John', shortName: '2Jo', testament: 'NT', chapters: 1, hasHebrew: false, hasGreek: true },
  { name: '3 John', shortName: '3Jo', testament: 'NT', chapters: 1, hasHebrew: false, hasGreek: true },
  { name: 'Jude', shortName: 'Jud', testament: 'NT', chapters: 1, hasHebrew: false, hasGreek: true },
  { name: 'Revelation', shortName: 'Rev', testament: 'NT', chapters: 22, hasHebrew: false, hasGreek: true },
  // ===== APOCRYPHA & EXTRA-CANONICAL =====
  { name: 'Tobit', shortName: 'Tob', testament: 'AP', chapters: 14, hasHebrew: false, hasGreek: true },
  { name: 'Judith', shortName: 'Jdt', testament: 'AP', chapters: 16, hasHebrew: false, hasGreek: true },
  { name: 'Wisdom of Solomon', shortName: 'Wis', testament: 'AP', chapters: 19, hasHebrew: false, hasGreek: true },
  { name: 'Sirach (Ecclesiasticus)', shortName: 'Sir', testament: 'AP', chapters: 51, hasHebrew: true, hasGreek: true },
  { name: 'Baruch', shortName: 'Bar', testament: 'AP', chapters: 6, hasHebrew: false, hasGreek: true },
  { name: '1 Maccabees', shortName: '1Ma', testament: 'AP', chapters: 16, hasHebrew: false, hasGreek: true },
  { name: '2 Maccabees', shortName: '2Ma', testament: 'AP', chapters: 15, hasHebrew: false, hasGreek: true },
  { name: '1 Esdras', shortName: '1Es', testament: 'AP', chapters: 9, hasHebrew: false, hasGreek: true },
  { name: '2 Esdras', shortName: '2Es', testament: 'AP', chapters: 16, hasHebrew: false, hasGreek: false },
  { name: 'Prayer of Manasseh', shortName: 'PrM', testament: 'AP', chapters: 1, hasHebrew: false, hasGreek: true },
  { name: 'Additions to Esther', shortName: 'AddEst', testament: 'AP', chapters: 7, hasHebrew: false, hasGreek: true },
  { name: 'Additions to Daniel', shortName: 'AddDan', testament: 'AP', chapters: 3, hasHebrew: false, hasGreek: true },
  // ===== PSEUDEPIGRAPHA & LOST BOOKS =====
  { name: '1 Enoch (Ethiopic)', shortName: '1En', testament: 'AP', chapters: 108, hasHebrew: false, hasGreek: false },
  { name: '2 Enoch (Slavonic)', shortName: '2En', testament: 'AP', chapters: 73, hasHebrew: false, hasGreek: false },
  { name: '3 Enoch (Hebrew)', shortName: '3En', testament: 'AP', chapters: 48, hasHebrew: true, hasGreek: false },
  { name: 'Book of Jubilees', shortName: 'Jub', testament: 'AP', chapters: 50, hasHebrew: false, hasGreek: false },
  { name: 'Book of Jasher', shortName: 'Jas', testament: 'AP', chapters: 91, hasHebrew: false, hasGreek: false },
  { name: 'Testament of the 12 Patriarchs', shortName: 'T12', testament: 'AP', chapters: 12, hasHebrew: false, hasGreek: true },
  { name: 'Psalms of Solomon', shortName: 'PsS', testament: 'AP', chapters: 18, hasHebrew: false, hasGreek: true },
  { name: 'Assumption of Moses', shortName: 'AsMo', testament: 'AP', chapters: 12, hasHebrew: false, hasGreek: false },
  { name: 'Apocalypse of Abraham', shortName: 'ApAb', testament: 'AP', chapters: 32, hasHebrew: false, hasGreek: false },
  { name: '4 Ezra', shortName: '4Ez', testament: 'AP', chapters: 16, hasHebrew: false, hasGreek: false },
  { name: 'Gospel of Thomas', shortName: 'GoT', testament: 'AP', chapters: 1, hasHebrew: false, hasGreek: true },
];

export const otBooks = bibleBooks.filter(b => b.testament === 'OT');
export const ntBooks = bibleBooks.filter(b => b.testament === 'NT');
export const apBooks = bibleBooks.filter(b => b.testament === 'AP');
