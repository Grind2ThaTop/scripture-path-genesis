import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { StickyNote, Plus, Trash2, Loader2, BookOpen, Tag, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Note {
  id: string;
  reference: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface Bookmark {
  id: string;
  reference: string;
  label: string | null;
  collection: string;
  created_at: string;
}

export default function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'notes' | 'bookmarks'>('notes');

  // New note form
  const [showNewNote, setShowNewNote] = useState(false);
  const [newRef, setNewRef] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const [notesRes, bookmarksRes] = await Promise.all([
      supabase.from('study_notes').select('*').order('updated_at', { ascending: false }),
      supabase.from('bookmarks').select('*').order('created_at', { ascending: false }),
    ]);
    if (notesRes.data) setNotes(notesRes.data as Note[]);
    if (bookmarksRes.data) setBookmarks(bookmarksRes.data as Bookmark[]);
    setLoading(false);
  };

  const saveNote = async () => {
    if (!user || !newRef.trim() || !newContent.trim()) return;
    setSaving(true);
    const tags = newTags.split(',').map(t => t.trim()).filter(Boolean);
    const { error } = await supabase.from('study_notes').insert({
      user_id: user.id,
      reference: newRef.trim(),
      content: newContent.trim(),
      tags,
    });
    if (error) toast.error(error.message);
    else {
      toast.success('Note saved');
      setShowNewNote(false);
      setNewRef(''); setNewContent(''); setNewTags('');
      fetchData();
    }
    setSaving(false);
  };

  const deleteNote = async (id: string) => {
    await supabase.from('study_notes').delete().eq('id', id);
    setNotes(notes.filter(n => n.id !== id));
    toast.success('Note deleted');
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id);
    setBookmarks(bookmarks.filter(b => b.id !== id));
    toast.success('Bookmark removed');
  };

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <StickyNote className="mx-auto text-muted-foreground" size={48} />
        <h2 className="font-display text-xl font-bold text-foreground">Sign in to use Notes</h2>
        <p className="text-sm text-muted-foreground">Your study notes and bookmarks are saved to your account.</p>
        <Link to="/auth" className="inline-block bg-primary text-primary-foreground rounded-lg px-6 py-2.5 text-sm font-bold">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <StickyNote className="text-primary" size={28} />
            Study Notes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your personal scripture annotations and bookmarks</p>
        </div>
        <button
          onClick={() => setShowNewNote(true)}
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2"
        >
          <Plus size={16} /> New Note
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['notes', 'bookmarks'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}>
            {t === 'notes' ? `Notes (${notes.length})` : `Bookmarks (${bookmarks.length})`}
          </button>
        ))}
      </div>

      {/* New note form */}
      {showNewNote && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <input value={newRef} onChange={e => setNewRef(e.target.value)} placeholder="Verse reference (e.g. Genesis 1:1)"
            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Write your study notes..."
            rows={4}
            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none" />
          <input value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="Tags (comma separated: faith, law, prophecy)"
            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
          <div className="flex gap-2">
            <button onClick={saveNote} disabled={saving || !newRef.trim() || !newContent.trim()}
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Note
            </button>
            <button onClick={() => setShowNewNote(false)} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
          <Loader2 size={20} className="animate-spin" /> Loading...
        </div>
      ) : tab === 'notes' ? (
        notes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">No notes yet. Start studying and take notes!</div>
        ) : (
          <div className="space-y-3">
            {notes.map(note => {
              const bookMatch = note.reference.match(/^(.+?)\s+\d+/);
              const chMatch = note.reference.match(/(\d+):/);
              return (
                <div key={note.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <Link to={`/bible?book=${encodeURIComponent(bookMatch?.[1] || '')}&chapter=${chMatch?.[1] || '1'}`}
                      className="text-sm font-bold text-primary font-mono hover:underline flex items-center gap-1">
                      <BookOpen size={12} /> {note.reference}
                    </Link>
                    <button onClick={() => deleteNote(note.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{note.content}</p>
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Tag size={8} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground">{new Date(note.updated_at).toLocaleDateString()}</p>
                </div>
              );
            })}
          </div>
        )
      ) : (
        bookmarks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">No bookmarks yet.</div>
        ) : (
          <div className="space-y-2">
            {bookmarks.map(bm => {
              const bookMatch = bm.reference.match(/^(.+?)\s+\d+/);
              const chMatch = bm.reference.match(/(\d+):/);
              return (
                <div key={bm.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
                  <Link to={`/bible?book=${encodeURIComponent(bookMatch?.[1] || '')}&chapter=${chMatch?.[1] || '1'}`}
                    className="text-sm font-bold text-primary font-mono hover:underline flex items-center gap-2">
                    <BookOpen size={14} /> {bm.reference}
                    {bm.label && <span className="text-xs text-muted-foreground font-normal">— {bm.label}</span>}
                  </Link>
                  <button onClick={() => deleteBookmark(bm.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
