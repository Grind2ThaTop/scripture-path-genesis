// Highlight storage system using localStorage

export interface Highlight {
  id: string;
  reference: string; // e.g. "Genesis 1:1" or "Hebrew Lesson: Aleph-Bet"
  text: string;
  color: HighlightColor;
  source: 'bible' | 'lesson';
  createdAt: number;
}

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange';

const STORAGE_KEY = 'derekh-highlights';

function getAll(): Highlight[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(highlights: Highlight[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
}

export function addHighlight(highlight: Omit<Highlight, 'id' | 'createdAt'>): Highlight {
  const all = getAll();
  const newHighlight: Highlight = {
    ...highlight,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  all.unshift(newHighlight);
  save(all);
  return newHighlight;
}

export function removeHighlight(id: string) {
  const all = getAll().filter(h => h.id !== id);
  save(all);
}

export function getHighlights(): Highlight[] {
  return getAll();
}

export function isVerseHighlighted(reference: string, verseNum: number): Highlight | undefined {
  return getAll().find(h => h.reference === `${reference}:${verseNum}` || h.reference === reference);
}

export function getHighlightsBySource(source: 'bible' | 'lesson'): Highlight[] {
  return getAll().filter(h => h.source === source);
}

export function clearAllHighlights() {
  localStorage.removeItem(STORAGE_KEY);
}

// Color mapping for Tailwind classes
export const highlightColors: Record<HighlightColor, { bg: string; border: string; text: string; label: string }> = {
  yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300', label: 'Yellow' },
  green: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300', label: 'Green' },
  blue: { bg: 'bg-sky-500/20', border: 'border-sky-500/40', text: 'text-sky-300', label: 'Blue' },
  pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-300', label: 'Pink' },
  orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-300', label: 'Orange' },
};
