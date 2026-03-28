import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, RefreshCw, BookOpen, ExternalLink, Loader2, LogIn,
  Video, Instagram, Youtube, Copy, Check, Eye, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const TOPIC_META: Record<string, { label: string; color: string }> = {
  endtimes: { label: 'End Times', color: 'text-red-400' },
  falseteaching: { label: 'False Teaching', color: 'text-orange-400' },
  control: { label: 'Control Systems', color: 'text-purple-400' },
  moraldecline: { label: 'Moral Decline', color: 'text-rose-400' },
  deception: { label: 'Deception', color: 'text-pink-400' },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function ViralHub() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [generating, setGenerating] = useState(false);

  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ['viral-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('viral_content' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  const runEngine = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('viral-engine');
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Generated ${data.generated} viral content pieces`);
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
        <Flame className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Viral Hijack Engine</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Sign in to access viral content scripts powered by scripture.
        </p>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <Zap className="text-primary" /> Viral Hijack Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            Spot what's trending → reinterpret through scripture → post fast.
          </p>
        </div>
        {isAdmin && (
          <Button onClick={runEngine} disabled={generating} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {generating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning Viral...</>
            ) : (
              <><RefreshCw className="mr-2 h-4 w-4" /> Run Viral Engine</>
            )}
          </Button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !content?.length ? (
        <div className="text-center py-20 space-y-4">
          <Flame className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-display font-semibold text-foreground">No Viral Content Yet</h3>
          <p className="text-muted-foreground">Hit "Run Viral Engine" to scan trending religious content.</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid gap-6">
            {content.map((item: any, i: number) => {
              const meta = TOPIC_META[item.core_topic] || TOPIC_META.deception;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-4 md:p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="secondary" className={`text-xs ${meta.color}`}>{meta.label}</Badge>
                          {item.source_platform && (
                            <Badge variant="outline" className="text-xs">{item.source_platform}</Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-display font-semibold text-foreground leading-tight">
                          {item.source_title}
                        </h3>
                        {item.emotional_trigger && (
                          <p className="text-sm text-muted-foreground mt-1">
                            🔥 <span className="font-medium">Why viral:</span> {item.emotional_trigger}
                          </p>
                        )}
                        {item.controversy && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                            ⚡ <span className="font-medium">Controversy:</span> {item.controversy}
                          </p>
                        )}
                      </div>
                      {item.source_url && (
                        <a href={item.source_url} target="_blank" rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Biblical angle */}
                  <div className="mx-4 md:mx-6 my-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm font-display font-semibold text-primary">
                        {item.scripture_reference}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 italic font-serif leading-relaxed mb-3">
                      "{item.scripture_text}"
                    </p>
                    <p className="text-sm text-foreground/80">
                      <span className="font-semibold">⚔️ Your Angle:</span> {item.biblical_angle}
                    </p>
                  </div>

                  {/* Content scripts */}
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <Tabs defaultValue="tiktok" className="w-full">
                      <TabsList className="w-full bg-secondary">
                        <TabsTrigger value="tiktok" className="flex-1 text-xs gap-1">
                          <Video className="w-3 h-3" /> TikTok
                        </TabsTrigger>
                        <TabsTrigger value="ig" className="flex-1 text-xs gap-1">
                          <Instagram className="w-3 h-3" /> Instagram
                        </TabsTrigger>
                        <TabsTrigger value="youtube" className="flex-1 text-xs gap-1">
                          <Youtube className="w-3 h-3" /> YouTube
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="tiktok" className="mt-3">
                        <div className="bg-secondary/50 rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <CopyButton text={item.tiktok_script || ''} />
                          </div>
                          <p className="text-sm text-foreground/80 whitespace-pre-line pr-8">
                            {item.tiktok_script}
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="ig" className="mt-3">
                        <div className="bg-secondary/50 rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <CopyButton text={item.ig_caption || ''} />
                          </div>
                          <p className="text-sm text-foreground/80 whitespace-pre-line pr-8">
                            {item.ig_caption}
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="youtube" className="mt-3">
                        <div className="bg-secondary/50 rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <CopyButton text={item.youtube_short_script || ''} />
                          </div>
                          <p className="text-sm text-foreground/80 whitespace-pre-line pr-8">
                            {item.youtube_short_script}
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Footer */}
                  <div className="px-4 md:px-6 py-3 border-t border-border bg-secondary/30 flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {(item.tags || []).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
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
