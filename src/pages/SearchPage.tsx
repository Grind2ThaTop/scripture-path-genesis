import { useState, useCallback } from 'react';
import { fetchPassage } from '@/lib/bibleApi';
import { restoreNames } from '@/lib/restoreNames';
import { Search as SearchIcon, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  reference: string;
  text: string;
  bookName: string;
  chapter: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      // Use bible-api.com search - it supports verse reference lookups
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(query.trim())}?translation=kjv`);
      if (res.ok) {
        const data = await res.json();
        if (data.verses && data.verses.length > 0) {
          const mapped: SearchResult[] = data.verses.map((v: any) => ({
            reference: `${v.book_name} ${v.chapter}:${v.verse}`,
            text: restoreNames(v.text),
            bookName: v.book_name,
            chapter: v.chapter,
          }));
          setResults(mapped);
        } else {
          setResults([]);
        }
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <SearchIcon className="text-primary" size={28} />
          Scripture Search
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search by verse reference (e.g. "John 3:16"), passage range (e.g. "Genesis 1:1-10"), or keyword
        </p>
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
            placeholder="Search verses... (e.g. 'John 3:16' or 'Romans 8:28-39')"
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

      {/* Quick search suggestions */}
      <div className="flex flex-wrap gap-2">
        {['Genesis 1:1', 'John 3:16', 'Psalm 23', 'Isaiah 53', 'Romans 8:28', 'Revelation 21:1-4'].map(ref => (
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
        <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Searching scripture...</span>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">No results found for "{query}"</p>
          <p className="text-xs text-muted-foreground mt-1">Try a specific verse reference like "John 1:1" or "Genesis 1:1-5"</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
            {results.length} Result{results.length !== 1 ? 's' : ''}
          </p>
          {results.map((r, i) => (
            <Link
              key={i}
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
      )}
    </div>
  );
}
