/**
 * Study Panel API layer
 * Fetches Hebrew text from Sefaria, and uses AI for deep study
 */

export interface HebrewWordData {
  word: string;
  transliteration: string;
  strongsNumber: string;
  definition: string;
  morphology?: string;
}

export interface VerseOriginalData {
  hebrewText?: string;
  greekText?: string;
  words: HebrewWordData[];
}

// Book name mapping for Sefaria API (uses different naming)
const sefariaBookMap: Record<string, string> = {
  'Genesis': 'Genesis', 'Exodus': 'Exodus', 'Leviticus': 'Leviticus',
  'Numbers': 'Numbers', 'Deuteronomy': 'Deuteronomy', 'Joshua': 'Joshua',
  'Judges': 'Judges', 'Ruth': 'Ruth', '1 Samuel': 'I Samuel', '2 Samuel': 'II Samuel',
  '1 Kings': 'I Kings', '2 Kings': 'II Kings', '1 Chronicles': 'I Chronicles',
  '2 Chronicles': 'II Chronicles', 'Ezra': 'Ezra', 'Nehemiah': 'Nehemiah',
  'Esther': 'Esther', 'Job': 'Job', 'Psalms': 'Psalms', 'Proverbs': 'Proverbs',
  'Ecclesiastes': 'Ecclesiastes', 'Song of Solomon': 'Song of Songs',
  'Isaiah': 'Isaiah', 'Jeremiah': 'Jeremiah', 'Lamentations': 'Lamentations',
  'Ezekiel': 'Ezekiel', 'Daniel': 'Daniel', 'Hosea': 'Hosea', 'Joel': 'Joel',
  'Amos': 'Amos', 'Obadiah': 'Obadiah', 'Jonah': 'Jonah', 'Micah': 'Micah',
  'Nahum': 'Nahum', 'Habakkuk': 'Habakkuk', 'Zephaniah': 'Zephaniah',
  'Haggai': 'Haggai', 'Zechariah': 'Zechariah', 'Malachi': 'Malachi',
};

/**
 * Fetch Hebrew text for an OT verse from Sefaria
 */
export async function fetchHebrewText(
  bookName: string,
  chapter: number,
  verse: number
): Promise<string | null> {
  const sefariaBook = sefariaBookMap[bookName];
  if (!sefariaBook) return null;

  try {
    const ref = `${sefariaBook}.${chapter}.${verse}`;
    const res = await fetch(`https://www.sefaria.org/api/texts/${ref}?context=0&pad=0`);
    if (!res.ok) return null;
    const data = await res.json();
    // Strip HTML tags from Hebrew text
    const raw = typeof data.he === 'string' ? data.he : Array.isArray(data.he) ? data.he[0] : '';
    return raw.replace(/<[^>]+>/g, '');
  } catch {
    return null;
  }
}

/**
 * Fetch Hebrew word data from Sefaria's lexicon
 */
export async function fetchWordData(hebrewWord: string): Promise<HebrewWordData | null> {
  try {
    // Clean the word of cantillation marks and vowels for lookup
    const cleanWord = hebrewWord.replace(/[\u0591-\u05C7]/g, '').trim();
    if (!cleanWord) return null;

    const res = await fetch(`https://www.sefaria.org/api/words/${encodeURIComponent(hebrewWord)}`);
    if (!res.ok) return null;
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      const entry = data[0];
      const senses = entry.content?.senses || [];
      const definition = senses.map((s: any) => s.definition).filter(Boolean).join('; ');
      
      return {
        word: entry.headword || hebrewWord,
        transliteration: entry.transliteration || '',
        strongsNumber: entry.strong_number ? `H${entry.strong_number}` : '',
        definition: definition || 'Definition not available',
        morphology: entry.content?.morphology || '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch Hebrew text for an entire chapter (for preloading)
 */
export async function fetchChapterHebrew(
  bookName: string,
  chapter: number
): Promise<Record<number, string>> {
  const sefariaBook = sefariaBookMap[bookName];
  if (!sefariaBook) return {};

  try {
    const ref = `${sefariaBook}.${chapter}`;
    const res = await fetch(`https://www.sefaria.org/api/texts/${ref}?context=0&pad=0`);
    if (!res.ok) return {};
    const data = await res.json();
    
    const heTexts: Record<number, string> = {};
    if (Array.isArray(data.he)) {
      data.he.forEach((text: string, i: number) => {
        heTexts[i + 1] = text.replace(/<[^>]+>/g, '');
      });
    }
    return heTexts;
  } catch {
    return {};
  }
}

/**
 * Stream AI verse explanation
 */
export async function streamVerseStudy(
  verseRef: string,
  verseText: string,
  testament: 'OT' | 'NT' | 'AP',
  mode: 'explain' | 'word_study',
  onDelta: (text: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verse-study`;
  
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        verse_ref: verseRef,
        verse_text: verseText,
        testament,
        mode,
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: 'Unknown error' }));
      onError(errorData.error || `Error ${resp.status}`);
      return;
    }

    if (!resp.body) {
      onError('No response body');
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') { onDone(); return; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + '\n' + buffer;
          break;
        }
      }
    }

    // Flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split('\n')) {
        if (!raw || raw.startsWith(':') || raw.trim() === '') continue;
        if (raw.endsWith('\r')) raw = raw.slice(0, -1);
        if (!raw.startsWith('data: ')) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Connection error');
  }
}
