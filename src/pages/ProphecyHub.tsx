import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Flame, Shield, Cpu, CloudLightning, Eye, HeartCrack,
  MapPin, RefreshCw, BookOpen, ExternalLink, Filter, Loader2, LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CATEGORY_META: Record<string, { label: string; icon: any; color: string }> = {
  war: { label: 'War & Conflict', icon: Zap, color: 'text-red-400' },
  government: { label: 'Control Systems', icon: Shield, color: 'text-purple-400' },
  economy: { label: 'Economic Collapse', icon: Flame, color: 'text-orange-400' },
  technology: { label: 'Technology & AI', icon: Cpu, color: 'text-cyan-400' },
  disaster: { label: 'Natural Disasters', icon: CloudLightning, color: 'text-yellow-400' },
  deception: { label: 'Deception & False Doctrine', icon: Eye, color: 'text-pink-400' },
  moraldecline: { label: 'Moral Decline', icon: HeartCrack, color: 'text-rose-400' },
  israel: { label: 'Israel & Prophecy', icon: MapPin, color: 'text-blue-400' },
};

export default function ProphecyHub() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ['prophecy-content', activeCategory],
    queryFn: async () => {
      let query = supabase
        .from('prophecy_content')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(20);

      if (activeCategory) {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const runEngine = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('prophecy-engine');
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Generated ${data.generated} prophecy breakdowns`);
      refetch();
    } catch (e: any) {
      toast.error(e.message || 'Failed to run engine');
    } finally {
      setGenerating(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Eye className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Truth Cuts Deep</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Sign in to access the Prophecy Engine — current events mapped to biblical prophecy in real time.
        </p>
        <Link to="/auth">
          <Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <Eye className="text-primary" /> Truth Cuts Deep
          </h1>
          <p className="text-muted-foreground mt-1">
            Current events mapped to biblical prophecy — no speculation, just scripture.
          </p>
        </div>
        <Button
          onClick={runEngine}
          disabled={generating}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {generating ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning News...</>
          ) : (
            <><RefreshCw className="mr-2 h-4 w-4" /> Run Prophecy Engine</>
          )}
        </Button>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          <Filter className="inline w-3 h-3 mr-1" /> All
        </button>
        {Object.entries(CATEGORY_META).map(([key, meta]) => {
          const Icon = meta.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Icon className="w-3 h-3" /> {meta.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !content?.length ? (
        <div className="text-center py-20 space-y-4">
          <Eye className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-display font-semibold text-foreground">No Content Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Hit "Run Prophecy Engine" to scan current events and generate biblical analysis.
          </p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid gap-6">
            {content.map((item: any, i: number) => {
              const meta = CATEGORY_META[item.category] || CATEGORY_META.deception;
              const Icon = meta.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-4 md:p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-4 h-4 ${meta.color}`} />
                          <Badge variant="secondary" className="text-xs">
                            {meta.label}
                          </Badge>
                          {item.source_name && (
                            <span className="text-xs text-muted-foreground">{item.source_name}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-display font-semibold text-foreground leading-tight">
                          {item.headline}
                        </h3>
                      </div>
                      {item.source_url && (
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Scripture box */}
                  <div className="mx-4 md:mx-6 my-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm font-display font-semibold text-primary">
                        {item.scripture_reference}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 italic font-serif leading-relaxed">
                      "{item.scripture_text}"
                    </p>
                  </div>

                  {/* AI Interpretation */}
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      ⚔️ Prophetic Analysis
                    </h4>
                    <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                      {item.ai_interpretation}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 md:px-6 py-3 border-t border-border bg-secondary/30 flex items-center justify-between">
                    <div className="flex gap-1">
                      {(item.tags || []).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
