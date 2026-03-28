import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search, ArrowLeft, BookOpen, Video, Share2, ChevronDown, ChevronUp, Sparkles
} from "lucide-react";
import { BIBLE_STORIES, STORY_CATEGORIES, type BibleStory } from "@/data/bibleStoriesData";

export default function BibleStories() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filtered = BIBLE_STORIES.filter(s => {
    if (selectedCategory && s.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) ||
        s.characters.some(c => c.toLowerCase().includes(q)) ||
        s.tags.some(t => t.includes(q));
    }
    return true;
  });

  const sendToShorts = (story: BibleStory) => {
    navigate(`/shorts?topic=${encodeURIComponent(story.title)}&verse=${encodeURIComponent(story.key_scriptures[0])}`);
  };

  const shareStory = async (story: BibleStory) => {
    const text = `${story.hook}\n\n${story.summary}\n\n📖 ${story.key_scriptures.join(", ")}\n\n💪 ${story.empowerment_angle}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: story.title, text });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(text);
    toast.success("Story copied to clipboard! 📋");
  };

  const StoryCard = ({ story }: { story: BibleStory }) => {
    const isExpanded = expandedStory === story.id;
    const cat = STORY_CATEGORIES.find(c => c.id === story.category);

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-border/50 hover:border-primary/20 transition-colors overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedStory(isExpanded ? null : story.id)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{cat?.emoji || "📖"}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight">{story.title}</h3>
                  <p className="text-xs text-primary italic mt-0.5">"{story.hook}"</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[10px]">{cat?.label}</Badge>
                    <div className="flex gap-1">
                      {story.characters.slice(0, 2).map(c => (
                        <span key={c} className="text-[10px] text-muted-foreground">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                    {/* Summary */}
                    <p className="text-xs text-foreground/90 leading-relaxed">{story.summary}</p>

                    {/* Scriptures */}
                    <div>
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Key Scriptures</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {story.key_scriptures.map(s => (
                          <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Lesson */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">The Lesson</span>
                      <p className="text-xs font-medium mt-1">{story.lesson}</p>
                    </div>

                    {/* Empowerment */}
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                      <span className="text-[10px] font-medium text-primary uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Power Word
                      </span>
                      <p className="text-xs font-bold mt-1 text-foreground">{story.empowerment_angle}</p>
                    </div>

                    {/* Shorts Hook */}
                    {story.shorts_hook && (
                      <div className="bg-accent/10 rounded-lg p-3">
                        <span className="text-[10px] font-medium text-accent-foreground uppercase tracking-wider">🎬 Shorts Hook</span>
                        <p className="text-xs italic mt-1">"{story.shorts_hook}"</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {story.tags.map(t => (
                        <span key={t} className="text-[10px] text-muted-foreground">#{t.replace(/\s/g, "")}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" className="text-xs h-8 flex-1" onClick={() => sendToShorts(story)}>
                        <Video className="w-3.5 h-3.5 mr-1" /> Make Short
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-8 flex-1" onClick={() => shareStory(story)}>
                        <Share2 className="w-3.5 h-3.5 mr-1" /> Share
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" asChild><Link to="/"><ArrowLeft className="w-5 h-5" /></Link></Button>
        <div>
          <h1 className="text-xl font-black flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Bible Stories
          </h1>
          <p className="text-xs text-muted-foreground">Empowering stories that build people up</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search stories, characters, themes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-thin mb-3">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer shrink-0 text-[10px]"
          onClick={() => setSelectedCategory(null)}
        >
          All ({BIBLE_STORIES.length})
        </Badge>
        {STORY_CATEGORIES.map(cat => {
          const count = BIBLE_STORIES.filter(s => s.category === cat.id).length;
          if (count === 0) return null;
          return (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className="cursor-pointer shrink-0 text-[10px]"
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            >
              {cat.emoji} {cat.label.replace(/^.+\s/, "")} ({count})
            </Badge>
          );
        })}
      </div>

      {/* Stories */}
      <div className="grid gap-3">
        {filtered.map(story => <StoryCard key={story.id} story={story} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No stories found</p>
        </div>
      )}
    </div>
  );
}
