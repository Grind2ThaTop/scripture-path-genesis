import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchChapter, bibleBooks, otBooks, ntBooks, apBooks, type BibleBook, type BiblePassage, type Testament } from '@/lib/bibleApi';
import { restoreNames } from '@/lib/restoreNames';
import { getHighlights, type Highlight } from '@/lib/highlights';
import HighlightableVerse from '@/components/HighlightableVerse';
import { BookOpen, ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';

export default function BibleReader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBook, setSelectedBook] = useState<BibleBook>(bibleBooks[0]);
  const [chapter, setChapter] = useState(1);
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allHighlights, setAllHighlights] = useState<Highlight[]>(getHighlights());
  const [showBookList, setShowBookList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [testament, setTestament] = useState<'OT' | 'NT'>('OT');

  // Init from URL params
  useEffect(() => {
    const bookParam = searchParams.get('book');
    const chapterParam = searchParams.get('chapter');
    if (bookParam) {
      const found = bibleBooks.find(b => b.name === bookParam || b.shortName === bookParam);
      if (found) {
        setSelectedBook(found);
        setTestament(found.testament);
      }
    }
    if (chapterParam) setChapter(parseInt(chapterParam, 10) || 1);
  }, []);

  // Fetch chapter on book/chapter change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchChapter(selectedBook.name, chapter).then(data => {
      if (cancelled) return;
      if (data) {
        setPassage(data);
      } else {
        setError('Could not load this chapter. Check your connection.');
      }
      setLoading(false);
    });
    setSearchParams({ book: selectedBook.name, chapter: String(chapter) }, { replace: true });
    return () => { cancelled = true; };
  }, [selectedBook, chapter]);

  const goNext = () => {
    if (chapter < selectedBook.chapters) {
      setChapter(c => c + 1);
    } else {
      const idx = bibleBooks.indexOf(selectedBook);
      if (idx < bibleBooks.length - 1) {
        setSelectedBook(bibleBooks[idx + 1]);
        setChapter(1);
      }
    }
  };

  const goPrev = () => {
    if (chapter > 1) {
      setChapter(c => c - 1);
    } else {
      const idx = bibleBooks.indexOf(selectedBook);
      if (idx > 0) {
        const prev = bibleBooks[idx - 1];
        setSelectedBook(prev);
        setChapter(prev.chapters);
      }
    }
  };

  const filteredBooks = (testament === 'OT' ? otBooks : ntBooks).filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <BookOpen className="text-primary" size={28} />
          Scripture
        </h1>
        <p className="text-muted-foreground text-sm mt-1">KJV · Restored Names Edition — Yahweh, Elohim, Yahshua</p>
      </div>

      {/* Book / Chapter selector */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setShowBookList(!showBookList)}
          className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 transition-colors flex items-center gap-2"
        >
          <BookOpen size={16} className="text-primary" />
          {selectedBook.name}
          <span className="text-muted-foreground">Ch. {chapter}</span>
        </button>

        {/* Chapter nav */}
        <div className="flex items-center gap-1">
          <button onClick={goPrev} className="p-2 rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <select
            value={chapter}
            onChange={e => setChapter(Number(e.target.value))}
            className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/40"
          >
            {Array.from({ length: selectedBook.chapters }, (_, i) => (
              <option key={i + 1} value={i + 1}>Chapter {i + 1}</option>
            ))}
          </select>
          <button onClick={goNext} className="p-2 rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Testament badge */}
        <span className={`text-xs px-2 py-1 rounded border ${
          selectedBook.testament === 'OT'
            ? 'bg-primary/10 text-primary border-primary/20'
            : 'bg-accent/50 text-accent-foreground border-accent/30'
        }`}>
          {selectedBook.testament === 'OT' ? 'Old Testament · Hebrew' : 'New Testament · Greek'}
        </span>
      </div>

      {/* Book list dropdown */}
      {showBookList && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
            />
          </div>

          {/* Testament tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setTestament('OT')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                testament === 'OT' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Old Testament ({otBooks.length})
            </button>
            <button
              onClick={() => setTestament('NT')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                testament === 'NT' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              New Testament ({ntBooks.length})
            </button>
          </div>

          {/* Book grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filteredBooks.map(book => (
              <button
                key={book.name}
                onClick={() => {
                  setSelectedBook(book);
                  setChapter(1);
                  setShowBookList(false);
                  setSearchTerm('');
                }}
                className={`text-left px-3 py-2 rounded-md text-sm transition-colors border ${
                  selectedBook.name === book.name
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-muted/30 text-foreground border-transparent hover:bg-muted/60 hover:border-border'
                }`}
              >
                <span className="font-medium">{book.name}</span>
                <span className="text-xs text-muted-foreground ml-1">({book.chapters})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chapter content */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Chapter header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">
            {selectedBook.name} {chapter}
          </h2>
          <span className="text-xs font-mono text-muted-foreground">KJV · Restored Names</span>
        </div>

        {/* Verses */}
        <div className="p-5 md:p-8">
          {loading && (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">Loading chapter...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-destructive text-sm">{error}</p>
              <button onClick={() => setChapter(chapter)} className="text-primary text-xs mt-2 hover:underline">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && passage && (
            <div className="space-y-1">
              {passage.verses.map(verse => {
                const ref = `${selectedBook.name} ${chapter}`;
                const existing = allHighlights.find(h => h.reference === `${ref}:${verse.verse}`);
                return (
                  <HighlightableVerse
                    key={verse.verse}
                    verseNumber={verse.verse}
                    text={restoreNames(verse.text)}
                    reference={ref}
                    source="bible"
                    existingHighlight={existing}
                    onHighlightChange={() => setAllHighlights(getHighlights())}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="p-4 border-t border-border flex justify-between items-center">
          <button
            onClick={goPrev}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <span className="text-xs font-mono text-muted-foreground">
            {selectedBook.name} {chapter} of {selectedBook.chapters}
          </span>
          <button
            onClick={goNext}
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
