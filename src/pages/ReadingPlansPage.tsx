import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Flame, BookOpen, Trophy, Calendar, Loader2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bibleBooks } from '@/lib/bibleApi';

interface ReadingPlan {
  name: string;
  description: string;
  books: string[];
  chaptersPerDay: number;
}

const READING_PLANS: ReadingPlan[] = [
  {
    name: 'Torah in 30 Days',
    description: 'Read the five books of Moses — the foundation of all scripture.',
    books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
    chaptersPerDay: 6,
  },
  {
    name: 'Psalms & Proverbs',
    description: 'Daily wisdom and praise — 30 days of Psalms and Proverbs.',
    books: ['Psalms', 'Proverbs'],
    chaptersPerDay: 6,
  },
  {
    name: 'Prophets Deep Dive',
    description: 'Isaiah through Malachi — hear what Yahweh spoke through His prophets.',
    books: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
    chaptersPerDay: 8,
  },
  {
    name: 'New Testament Sprint',
    description: 'Matthew through Revelation in 30 days — know the testimony of Yahshua.',
    books: ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'],
    chaptersPerDay: 9,
  },
];

interface StreakData {
  current_streak: number;
  longest_streak: number;
  total_chapters_read: number;
  last_read_date: string | null;
}

interface ProgressEntry {
  book_name: string;
  chapter: number;
  completed_at: string;
}

export default function ReadingPlansPage() {
  const { user } = useAuth();
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchData();
    else setLoading(false);
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const [streakRes, progressRes] = await Promise.all([
      supabase.from('reading_streaks').select('*').eq('user_id', user!.id).maybeSingle(),
      supabase.from('reading_progress').select('*').order('completed_at', { ascending: false }).limit(100),
    ]);
    if (streakRes.data) {
      setStreak(streakRes.data as StreakData);
    }
    if (progressRes.data) setProgress(progressRes.data as ProgressEntry[]);
    setLoading(false);
  };

  const markChapterRead = async (bookName: string, chapter: number) => {
    if (!user) return;

    // Upsert reading progress
    await supabase.from('reading_progress').upsert(
      { user_id: user.id, book_name: bookName, chapter },
      { onConflict: 'user_id,book_name,chapter' }
    );

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (streak) {
      const isConsecutive = streak.last_read_date === yesterday || streak.last_read_date === today;
      const newCurrent = streak.last_read_date === today
        ? streak.current_streak
        : isConsecutive ? streak.current_streak + 1 : 1;
      const newLongest = Math.max(streak.longest_streak, newCurrent);

      await supabase.from('reading_streaks').update({
        current_streak: newCurrent,
        longest_streak: newLongest,
        last_read_date: today,
        total_chapters_read: streak.total_chapters_read + (streak.last_read_date === today ? 0 : 1),
      }).eq('user_id', user.id);
    } else {
      await supabase.from('reading_streaks').insert({
        user_id: user.id,
        current_streak: 1,
        longest_streak: 1,
        last_read_date: today,
        total_chapters_read: 1,
      });
    }

    fetchData();
  };

  const isChapterRead = (bookName: string, chapter: number) => {
    return progress.some(p => p.book_name === bookName && p.chapter === chapter);
  };

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <Flame className="mx-auto text-muted-foreground" size={48} />
        <h2 className="font-display text-xl font-bold text-foreground">Sign in to track your reading</h2>
        <Link to="/auth" className="inline-block bg-primary text-primary-foreground rounded-lg px-6 py-2.5 text-sm font-bold">Sign In</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
        <Loader2 size={20} className="animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <Flame className="text-primary" size={28} />
          Reading Plans & Streaks
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Build a daily habit in the Word. Track your progress.</p>
      </div>

      {/* Streak cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Flame className="text-primary mx-auto mb-1" size={24} />
          <p className="text-2xl font-bold text-foreground">{streak?.current_streak || 0}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Current Streak</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Trophy className="text-primary mx-auto mb-1" size={24} />
          <p className="text-2xl font-bold text-foreground">{streak?.longest_streak || 0}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Longest Streak</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <BookOpen className="text-primary mx-auto mb-1" size={24} />
          <p className="text-2xl font-bold text-foreground">{streak?.total_chapters_read || 0}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Chapters Read</p>
        </div>
      </div>

      {/* Reading Plans */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Reading Plans</h2>
        {READING_PLANS.map(plan => {
          const totalChapters = plan.books.reduce((sum, bookName) => {
            const book = bibleBooks.find(b => b.name === bookName);
            return sum + (book?.chapters || 0);
          }, 0);
          const readChapters = plan.books.reduce((sum, bookName) => {
            const book = bibleBooks.find(b => b.name === bookName);
            if (!book) return sum;
            let count = 0;
            for (let ch = 1; ch <= book.chapters; ch++) {
              if (isChapterRead(bookName, ch)) count++;
            }
            return sum + count;
          }, 0);
          const pct = totalChapters > 0 ? Math.round((readChapters / totalChapters) * 100) : 0;

          return (
            <div key={plan.name} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-bold">{pct}%</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex flex-wrap gap-1">
                {plan.books.slice(0, 8).map(bookName => {
                  const book = bibleBooks.find(b => b.name === bookName);
                  const allRead = book ? Array.from({ length: book.chapters }, (_, i) => isChapterRead(bookName, i + 1)).every(Boolean) : false;
                  return (
                    <Link key={bookName} to={`/bible?book=${encodeURIComponent(bookName)}&chapter=1`}
                      className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                        allRead
                          ? 'bg-primary/20 text-primary border-primary/30'
                          : 'bg-muted/30 text-muted-foreground border-border hover:text-foreground'
                      }`}>
                      {allRead && <CheckCircle size={8} className="inline mr-0.5" />}
                      {bookName}
                    </Link>
                  );
                })}
                {plan.books.length > 8 && (
                  <span className="text-[10px] text-muted-foreground px-2 py-0.5">+{plan.books.length - 8} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent reads */}
      {progress.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Recent Reading</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {progress.slice(0, 12).map(p => (
              <Link key={`${p.book_name}-${p.chapter}`}
                to={`/bible?book=${encodeURIComponent(p.book_name)}&chapter=${p.chapter}`}
                className="bg-card border border-border rounded-lg p-2.5 text-center hover:border-primary/30 transition-colors">
                <p className="text-xs font-bold text-primary font-mono">{p.book_name} {p.chapter}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(p.completed_at).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
