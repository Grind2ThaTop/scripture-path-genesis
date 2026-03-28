import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search, Sparkles, TrendingUp, Zap, ArrowLeft, Filter, Flame,
  Eye, Hash, ChevronRight, Loader2, Target, BarChart3, Video
} from "lucide-react";
import { VIRAL_KEYWORDS, KEYWORD_CATEGORIES, type ViralKeyword } from "@/data/keywordResearchData";

interface TrendingTopic {
  topic: string;
  hook: string;
  angle: string;
  scriptures: string[];
  controversy_level: number;
  viral_potential: number;
  hashtags: string[];
  audience_trigger?: string;
  shorts_script_idea?: string;
}

interface ExpandedAngle {
  title: string;
  hook: string;
  emotional_angle: string;
  scriptures: string[];
  script_outline: string;
  estimated_viral_score?: number;
}

export default function KeywordResearch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"controversy" | "search">("controversy");
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [expandedAngles, setExpandedAngles] = useState<ExpandedAngle[]>([]);
  const [expandingTopic, setExpandingTopic] = useState<string | null>(null);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingExpand, setLoadingExpand] = useState(false);
  const [trendingCategory, setTrendingCategory] = useState("");
  const [trendingCustom, setTrendingCustom] = useState("");

  const filtered = VIRAL_KEYWORDS
    .filter(k => {
      if (selectedCategory && k.category !== selectedCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return k.topic.toLowerCase().includes(q) || k.tags.some(t => t.includes(q)) || k.hook.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => sortBy === "controversy" ? b.controversy_level - a.controversy_level : b.search_potential - a.search_potential);

  const generateTrending = async () => {
    setLoadingTrending(true);
    try {
      const { data, error } = await supabase.functions.invoke("keyword-research", {
        body: { action: "trending", category: trendingCategory, topic: trendingCustom },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setTrendingTopics(data.topics || []);
      toast.success("🔥 Trending topics generated!");
    } catch (e: any) {
      toast.error(e.message || "Failed to generate");
    } finally {
      setLoadingTrending(false);
    }
  };

  const expandTopic = async (topic: string) => {
    setLoadingExpand(true);
    setExpandingTopic(topic);
    setExpandedAngles([]);
    try {
      const { data, error } = await supabase.functions.invoke("keyword-research", {
        body: { action: "expand", topic },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setExpandedAngles(data.angles || []);
      toast.success("Topic expanded!");
    } catch (e: any) {
      toast.error(e.message || "Failed to expand");
    } finally {
      setLoadingExpand(false);
    }
  };

  const sendToShorts = (topic: string, verse: string) => {
    navigate(`/shorts?topic=${encodeURIComponent(topic)}&verse=${encodeURIComponent(verse)}`);
  };

  const ControversyMeter = ({ level }: { level: number }) => (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-4 rounded-sm ${
            i < level
              ? level >= 8 ? "bg-red-500" : level >= 5 ? "bg-amber-500" : "bg-emerald-500"
              : "bg-muted"
          }`}
        />
      ))}
      <span className="text-xs font-bold ml-1">{level}/10</span>
    </div>
  );

  const KeywordCard = ({ kw }: { kw: ViralKeyword }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50 hover:border-primary/30 transition-colors">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm leading-tight">{kw.topic}</h3>
            {kw.shorts_ready && (
              <Badge variant="outline" className="text-[10px] shrink-0 border-primary/50 text-primary">
                <Video className="w-3 h-3 mr-0.5" /> Ready
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground italic">"{kw.hook}"</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-red-500" /> Controversy</span>
            </div>
            <ControversyMeter level={kw.controversy_level} />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500" /> Search Potential</span>
            </div>
            <ControversyMeter level={kw.search_potential} />
          </div>
          <div className="flex flex-wrap gap-1">
            {kw.scriptures.slice(0, 2).map(s => (
              <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {kw.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] text-muted-foreground">#{t.replace(/\s/g, "")}</span>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" variant="outline" className="text-xs h-7 flex-1" onClick={() => expandTopic(kw.topic)}>
              <Target className="w-3 h-3 mr-1" /> Expand
            </Button>
            <Button size="sm" className="text-xs h-7 flex-1" onClick={() => sendToShorts(kw.topic, kw.scriptures[0])}>
              <Video className="w-3 h-3 mr-1" /> Short
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <p className="text-muted-foreground">Sign in to use the Keyword Research Tool</p>
        <Button asChild><Link to="/auth">Sign In</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-24 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" asChild><Link to="/"><ArrowLeft className="w-5 h-5" /></Link></Button>
        <div>
          <h1 className="text-xl font-black flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> Keyword Research
          </h1>
          <p className="text-xs text-muted-foreground">Find viral Bible topics that make people STOP scrolling</p>
        </div>
      </div>

      <Tabs defaultValue="database">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="database" className="text-xs"><BarChart3 className="w-3.5 h-3.5 mr-1" /> Database</TabsTrigger>
          <TabsTrigger value="trending" className="text-xs"><TrendingUp className="w-3.5 h-3.5 mr-1" /> AI Trends</TabsTrigger>
          <TabsTrigger value="expand" className="text-xs"><Zap className="w-3.5 h-3.5 mr-1" /> Expand</TabsTrigger>
        </TabsList>

        {/* DATABASE TAB */}
        <TabsContent value="database" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search topics, tags, hooks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer shrink-0 text-[10px]"
              onClick={() => setSelectedCategory(null)}
            >
              All ({VIRAL_KEYWORDS.length})
            </Badge>
            {KEYWORD_CATEGORIES.map(cat => {
              const count = VIRAL_KEYWORDS.filter(k => k.category === cat.id).length;
              return (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer shrink-0 text-[10px]"
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                >
                  {cat.label} ({count})
                </Badge>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={sortBy === "controversy" ? "default" : "outline"}
              onClick={() => setSortBy("controversy")}
              className="text-xs h-7"
            >
              <Flame className="w-3 h-3 mr-1" /> Most Controversial
            </Button>
            <Button
              size="sm"
              variant={sortBy === "search" ? "default" : "outline"}
              onClick={() => setSortBy("search")}
              className="text-xs h-7"
            >
              <TrendingUp className="w-3 h-3 mr-1" /> Most Searched
            </Button>
          </div>

          <div className="grid gap-3">
            {filtered.map(kw => <KeywordCard key={kw.id} kw={kw} />)}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">No topics match your search</p>
          )}
        </TabsContent>

        {/* AI TRENDING TAB */}
        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> AI Trend Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Custom topic (optional)..."
                value={trendingCustom}
                onChange={e => setTrendingCustom(e.target.value)}
                className="h-9 text-sm"
              />
              <div className="flex gap-1.5 flex-wrap">
                {["exposed", "identity", "spiritual-warfare", "end-times", "controversial"].map(cat => (
                  <Badge
                    key={cat}
                    variant={trendingCategory === cat ? "default" : "outline"}
                    className="cursor-pointer text-[10px]"
                    onClick={() => setTrendingCategory(trendingCategory === cat ? "" : cat)}
                  >
                    {KEYWORD_CATEGORIES.find(c => c.id === cat)?.label || cat}
                  </Badge>
                ))}
              </div>
              <Button onClick={generateTrending} disabled={loadingTrending} className="w-full h-10">
                {loadingTrending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Trends...</> : <><TrendingUp className="w-4 h-4 mr-2" /> Generate Trending Topics</>}
              </Button>
            </CardContent>
          </Card>

          <AnimatePresence>
            {trendingTopics.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-sm">{t.topic}</h3>
                      <div className="flex gap-1">
                        <Badge variant="destructive" className="text-[10px]">🔥 {t.controversy_level}</Badge>
                        <Badge variant="secondary" className="text-[10px]">📈 {t.viral_potential}</Badge>
                      </div>
                    </div>
                    <p className="text-xs italic text-muted-foreground">"{t.hook}"</p>
                    <p className="text-xs text-foreground/80">{t.angle}</p>
                    <div className="flex flex-wrap gap-1">
                      {t.scriptures?.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                    </div>
                    {t.shorts_script_idea && <p className="text-[10px] text-muted-foreground">📹 {t.shorts_script_idea}</p>}
                    <div className="flex flex-wrap gap-1">
                      {t.hashtags?.slice(0, 5).map(h => <span key={h} className="text-[10px] text-primary">#{h.replace("#", "")}</span>)}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="outline" className="text-xs h-7 flex-1" onClick={() => expandTopic(t.topic)}>
                        <Target className="w-3 h-3 mr-1" /> Expand
                      </Button>
                      <Button size="sm" className="text-xs h-7 flex-1" onClick={() => sendToShorts(t.topic, t.scriptures?.[0] || "")}>
                        <Video className="w-3 h-3 mr-1" /> Make Short
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        {/* EXPAND TAB */}
        <TabsContent value="expand" className="space-y-4">
          {expandingTopic ? (
            <>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-1">Expanding: {expandingTopic}</h3>
                  {loadingExpand && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Finding angles...
                    </div>
                  )}
                </CardContent>
              </Card>
              <AnimatePresence>
                {expandedAngles.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className="border-border/50">
                      <CardContent className="p-4 space-y-2">
                        <h3 className="font-bold text-sm">{a.title}</h3>
                        <p className="text-xs italic text-primary">"{a.hook}"</p>
                        <p className="text-xs text-muted-foreground">{a.emotional_angle}</p>
                        <p className="text-xs text-foreground/80">{a.script_outline}</p>
                        <div className="flex flex-wrap gap-1">
                          {a.scriptures?.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                        </div>
                        {a.estimated_viral_score && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">Viral Score:</span>
                            <Progress value={a.estimated_viral_score * 10} className="h-1.5 flex-1" />
                            <span className="text-[10px] font-bold">{a.estimated_viral_score}/10</span>
                          </div>
                        )}
                        <Button size="sm" className="w-full text-xs h-7" onClick={() => sendToShorts(a.title, a.scriptures?.[0] || "")}>
                          <Video className="w-3 h-3 mr-1" /> Create Short
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Target className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Select a topic from the Database or AI Trends tab and click "Expand"</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
