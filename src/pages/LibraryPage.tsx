import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Library, Search, LogIn, Loader2, BookOpen, FileText, Video, Headphones, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const MEDIA_ICONS: Record<string, any> = { text: FileText, video: Video, audio: Headphones, pdf: FileText };
const TOPICS = ['All', 'Torah', 'Prophets', 'Psalms', 'Gospel', 'Doctrine', 'Application', 'Leadership', 'Hebrew', 'Greek'];

export default function LibraryPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('All');

  const { data: resources, isLoading } = useQuery({
    queryKey: ['library', topicFilter],
    queryFn: async () => {
      let q = (supabase.from('library_resources' as any) as any).select('*').order('created_at', { ascending: false });
      if (topicFilter !== 'All') q = q.eq('topic', topicFilter.toLowerCase());
      const { data, error } = await q;
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  const filtered = (resources || []).filter((r: any) =>
    !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Library className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Library</h1>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <Library className="text-primary" /> Library
        </h1>
        <p className="text-muted-foreground mt-1">Searchable reference bank. Sermons, guides, word studies, downloads.</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TOPICS.map(t => (
          <button key={t} onClick={() => setTopicFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              topicFilter === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Resources */}
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : !filtered.length ? (
        <div className="text-center py-16">
          <Library className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No resources yet. Admin can add them from the back office.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r: any) => {
            const MediaIcon = MEDIA_ICONS[r.media_type] || FileText;
            return (
              <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MediaIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-sm">{r.title}</h3>
                    {r.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {r.topic && <Badge variant="secondary" className="text-[10px]">{r.topic}</Badge>}
                  {r.difficulty && <Badge variant="outline" className="text-[10px]">{r.difficulty}</Badge>}
                  {r.teacher && <Badge variant="outline" className="text-[10px]">{r.teacher}</Badge>}
                </div>
                {(r.tags || []).length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {r.tags.map((tag: string) => <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{tag}</span>)}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
