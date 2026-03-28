import { useState, useCallback } from 'react';
import { restoreNames } from '@/lib/restoreNames';
import { Search as SearchIcon, Loader2, BookOpen, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  reference: string;
  text: string;
  bookName: string;
  chapter: number;
}

const QUICK_SEARCHES = [
  'love', 'faith', 'forgiveness', 'salvation', 'prayer', 'wisdom',
  'John 3:16', 'Psalm 23', 'Romans 8:28', 'Isaiah 53',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchType, setSearchType] = useState<'auto' | 'keyword' | 'verse'>('auto');

  const isVerseReference = (q: string) => {
    return /^(\d\s*)?[a-zA-Z]+\s+\d+/i.test(q.trim());
  };

  const searchByReference = async (q: string): Promise<SearchResult[]> => {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(q.trim())}?translation=kjv`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.verses?.length) return [];
    return data.verses.map((v: any) => ({
      reference: `${v.book_name} ${v.chapter}:${v.verse}`,
      text: restoreNames(v.text),
      bookName: v.book_name,
      chapter: v.chapter,
    }));
  };

  const searchByKeyword = async (q: string): Promise<SearchResult[]> => {
    // Search across key books for the keyword using bible-api.com
    // We'll search multiple strategic passages
    const searchBooks = [
      'Genesis 1-3', 'Exodus 20', 'Deuteronomy 6', 'Psalm 1', 'Psalm 23', 'Psalm 91', 'Psalm 119:1-50',
      'Proverbs 1-4', 'Isaiah 53', 'Isaiah 55', 'Jeremiah 29', 'Matthew 5-7', 'Matthew 24', 'Mark 12',
      'Luke 6', 'John 1', 'John 3', 'John 14-15', 'Romans 3', 'Romans 5-8', 'Romans 12',
      '1 Corinthians 13', 'Galatians 5', 'Ephesians 2', 'Ephesians 6', 'Philippians 4',
      'Colossians 3', '1 Thessalonians 5', 'Hebrews 11', 'James 1-2', '1 John 4', 'Revelation 21-22',
    ];

    const keyword = q.trim().toLowerCase();
    const allResults: SearchResult[] = [];

    // Fetch in parallel batches
    const batchSize = 6;
    for (let i = 0; i < searchBooks.length && allResults.length < 50; i += batchSize) {
      const batch = searchBooks.slice(i, i + batchSize);
      const responses = await Promise.allSettled(
        batch.map(ref =>
          fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=kjv`)
            .then(r => r.ok ? r.json() : null)
        )
      );

      for (const resp of responses) {
        if (resp.status === 'fulfilled' && resp.value?.verses) {
          for (const v of resp.value.verses) {
            if (v.text.toLowerCase().includes(keyword)) {
              allResults.push({
                reference: `${v.book_name} ${v.chapter}:${v.verse}`,
                text: restoreNames(v.text),
                bookName: v.book_name,
                chapter: v.chapter,
              });
            }
          }
        }
      }
    }

    return allResults;
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setResults([]);

    try {
      let mode = searchType;
      if (mode === 'auto') {
        mode = isVerseReference(query) ? 'verse' : 'keyword';
      }

      const found = mode === 'verse'
        ? await searchByReference(query)
        : await searchByKeyword(query);

      setResults(found);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, [query, searchType]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <SearchIcon className="text-primary" size={28} />
          Scripture Search
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search by keyword (e.g. "love", "faith"), verse reference (e.g. "John 3:16"), or topic
        </p>
      </div>

      {/* Search mode toggle */}
      <div className="flex gap-1 bg-muted/30 rounded-lg p-1 w-fit">
        {([['auto', '🔍 Auto'], ['keyword', '💬 Keyword'], ['verse', '📖 Verse']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSearchType(key as any)}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              searchType === key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder={
              searchType === 'keyword' ? "Search by word... (e.g. 'love', 'forgiveness', 'faith')"
              : searchType === 'verse' ? "Enter a reference... (e.g. 'John 3:16', 'Romans 8:28-39')"
              : "Search anything... keywords, verses, topics"
            }
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />}
          Search
        </button>
      </div>

      {/* Quick searches */}
      <div className="flex flex-wrap gap-2">
        {QUICK_SEARCHES.map(ref => (
          <button
            key={ref}
            onClick={() => { setQuery(ref); }}
            className="text-xs bg-muted/50 text-muted-foreground border border-border rounded-full px-3 py-1 hover:text-primary hover:border-primary/30 transition-colors"
          >
            {ref}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
          <Loader2 size={24} className="animate-spin text-primary" />
          <span className="text-sm">Searching across scripture...</span>
          <span className="text-xs text-muted-foreground/60">This may take a moment for keyword searches</span>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">No results found for "{query}"</p>
          <p className="text-xs text-muted-foreground mt-1">Try a different keyword or specific verse reference</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
            {results.length} Result{results.length !== 1 ? 's' : ''} found
          </p>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {results.map((r, i) => (
              <Link
                key={`${r.reference}-${i}`}
                to={`/bible?book=${encodeURIComponent(r.bookName)}&chapter=${r.chapter}`}
                className="block bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen size={14} className="text-primary" />
                      <span className="text-sm font-bold text-primary font-mono">{r.reference}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
