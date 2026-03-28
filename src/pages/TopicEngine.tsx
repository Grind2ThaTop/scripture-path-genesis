import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target, RefreshCw, Loader2, LogIn, BookOpen, Video,
  MapPin, Flame, AlertTriangle, Eye, Skull, Clock, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CAT_META: Record<string, { label: string; icon: any; color: string }> = {
  controversy: { label: 'Controversy', icon: Flame, color: 'text-orange-400' },
  prophecy: { label: 'Prophecy', icon: Eye, color: 'text-blue-400' },
  reaction: { label: 'Reaction', icon: AlertTriangle, color: 'text-yellow-400' },
  wakeup: { label: 'Wake Up', icon: Skull, color: 'text-red-400' },
  expose: { label: 'Expose', icon: Target, color: 'text-purple-400' },
  endtimes: { label: 'End Times', icon: Clock, color: 'text-cyan-400' },
  local: { label: 'Philly', icon: MapPin, color: 'text-green-400' },
};

export default function TopicEngine() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [generating, setGenerating] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { data: topics, isLoading, refetch } = useQuery({
    queryKey: ['daily-topics', activeFilter],
    queryFn: async () => {
      let query = (supabase.from('daily_topics' as any) as any)
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(30);

      if (activeFilter) query = query.eq('category', activeFilter);

      const { data, error } = await query;
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  const runTopicEngine = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('topic-engine');
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Generated ${data.generated} fresh topics`);
      refetch();
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate topics');
    } finally {
      setGenerating(false);
    }
  };

  const markUsed = async (id: string) => {
    await (supabase.from('daily_topics' as any) as any)
      .update({ used: true })
      .eq('id', id);
    refetch();
    toast.success('Marked as used');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Target className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Daily Topic Engine</h1>
        <p className="text-muted-foreground text-center max-w-md">Sign in to access your daily content ammo.</p>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  // Group topics by date
  const grouped = (topics || []).reduce((acc: Record<string, any[]>, t: any) => {
    const d = t.date || 'undated';
    if (!acc[d]) acc[d] = [];
    acc[d].push(t);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <Target className="text-primary" /> Daily Topic Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            Your daily content ammo — controversy, prophecy, reactions, all ready to fire.
          </p>
        </div>
        {isAdmin && (
          <Button onClick={runTopicEngine} disabled={generating} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {generating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><RefreshCw className="mr-2 h-4 w-4" /> Generate Fresh Topics</>
            )}
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeFilter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >All Topics</button>
        {Object.entries(CAT_META).map(([key, meta]) => {
          const Icon = meta.icon;
          return (
            <button key={key} onClick={() => setActiveFilter(activeFilter === key ? null : key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                activeFilter === key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            ><Icon className="w-3 h-3" /> {meta.label}</button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !topics?.length ? (
        <div className="text-center py-20 space-y-4">
          <Target className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-display font-semibold">No Topics Yet</h3>
          <p className="text-muted-foreground">Hit "Generate Fresh Topics" to get started.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, dateTopics]) => (
          <div key={date} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
              {date === new Date().toISOString().split('T')[0] ? '🔥 TODAY' : new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(dateTopics as any[]).map((topic: any, i: number) => {
                const meta = CAT_META[topic.category] || CAT_META.controversy;
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`bg-card border rounded-lg p-4 space-y-3 ${topic.used ? 'border-border/50 opacity-60' : 'border-border'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${meta.color}`} />
                        <Badge variant="secondary" className="text-xs">{meta.label}</Badge>
                      </div>
                      {topic.used && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </div>

                    <h3 className="text-sm font-display font-semibold text-foreground leading-snug">
                      {topic.hook}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">{topic.angle}</p>

                    {topic.tiktok_hook && (
                      <div className="bg-secondary/50 rounded p-2 flex items-start gap-2">
                        <Video className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                        <p className="text-xs text-foreground/80 italic">"{topic.tiktok_hook}"</p>
                      </div>
                    )}

                    {topic.philly_angle && (
                      <div className="bg-green-500/10 rounded p-2 flex items-start gap-2">
                        <MapPin className="w-3 h-3 text-green-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-green-300/80">{topic.philly_angle}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {(topic.scripture_refs || []).map((ref: string) => (
                        <span key={ref} className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          <BookOpen className="w-2.5 h-2.5" /> {ref}
                        </span>
                      ))}
                    </div>

                    {isAdmin && !topic.used && (
                      <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => markUsed(topic.id)}>
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Mark Used
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
