import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctrineLessons, DOCTRINE_CATEGORIES, DOCTRINE_SUMMARY, type DoctrineLesson } from '@/data/yahwehIsOneData';
import { VerseRef } from '@/components/ScripturePanel';
import { ArrowLeft, ChevronRight, BookOpen, ArrowRight, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function YahwehIsOnePage() {
  const [selectedLesson, setSelectedLesson] = useState<DoctrineLesson | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('foundation');

  if (selectedLesson) {
    return <LessonView lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

  const categoryLessons = doctrineLessons.filter(l => l.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <Crown className="text-primary" /> Yahweh Is One
        </h1>
        <p className="text-muted-foreground mt-1">The Father alone is God. Let the text speak clean — no forcing, no twisting.</p>
      </div>

      {/* Doctrine Summary Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        {Object.values(DOCTRINE_SUMMARY).map(s => (
          <div key={s.title} className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-display font-semibold text-foreground text-sm mb-2">{s.title}</h3>
            <ul className="space-y-1">
              {s.points.map((p, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {DOCTRINE_CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
              activeCategory === c.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          {DOCTRINE_CATEGORIES.find(c => c.id === activeCategory)?.description}
        </p>
      </div>

      {/* Lesson Cards */}
      <div className="space-y-3">
        {categoryLessons.map(lesson => (
          <motion.button key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedLesson(lesson)}
            className="w-full bg-card border border-border rounded-lg p-5 text-left hover:border-primary/30 transition-all group">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{lesson.icon}</span>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{lesson.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lesson.summary}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-[10px]">{lesson.scriptures.length} scriptures</Badge>
                  {lesson.debatePoints && (
                    <Badge variant="outline" className="text-[10px]">{lesson.debatePoints.length} debate points</Badge>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-1" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function LessonView({ lesson, onBack }: { lesson: DoctrineLesson; onBack: () => void }) {
  const currentIndex = doctrineLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? doctrineLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < doctrineLessons.length - 1 ? doctrineLessons[currentIndex + 1] : null;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Yahweh Is One
      </button>

      <div className="flex items-center gap-3">
        <span className="text-4xl">{lesson.icon}</span>
        <div>
          <p className="text-xs text-muted-foreground font-mono">Lesson {lesson.order} of {doctrineLessons.length}</p>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{lesson.title}</h1>
          <Badge variant="secondary" className="text-xs mt-1">{DOCTRINE_CATEGORIES.find(c => c.id === lesson.category)?.label}</Badge>
        </div>
      </div>

      {lesson.debatePoints ? (
        <DebateLessonContent lesson={lesson} />
      ) : (
        <StandardLessonContent lesson={lesson} />
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        {prevLesson ? (
          <button onClick={() => { onBack(); setTimeout(() => {}, 50); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← {prevLesson.title}
          </button>
        ) : <div />}
        {nextLesson ? (
          <button onClick={() => { onBack(); setTimeout(() => {}, 50); }}
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            {nextLesson.title} →
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

function StandardLessonContent({ lesson }: { lesson: DoctrineLesson }) {
  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground/90">{lesson.summary}</p>
      </div>

      {/* Breakdown */}
      <Section title="Breakdown" icon="📋">
        <ul className="space-y-2">
          {lesson.breakdown.map((item, i) => (
            <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Key Point */}
      <div className="bg-card border-l-4 border-primary rounded-r-lg p-4">
        <p className="text-xs font-semibold text-primary mb-1">👉 KEY POINT</p>
        <p className="text-sm text-foreground font-medium">{lesson.keyPoint}</p>
      </div>

      {/* Scriptures */}
      <Section title="Key Scriptures" icon="📖">
        <div className="space-y-3">
          {lesson.scriptures.map((s, i) => (
            <div key={i} className="bg-secondary/50 border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-primary">{s.ref}</p>
                <VerseRef reference={s.ref} className="text-[10px]" />
              </div>
              <p className="text-sm text-foreground/90 italic">"{s.text}"</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function DebateLessonContent({ lesson }: { lesson: DoctrineLesson }) {
  return (
    <div className="space-y-5">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground/90">{lesson.summary}</p>
      </div>

      <Section title="Approach" icon="⚖️">
        <ul className="space-y-2">
          {lesson.breakdown.map((item, i) => (
            <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Debate Points */}
      {lesson.debatePoints?.map((dp, i) => (
        <DebateCard key={i} point={dp} />
      ))}

      <div className="bg-card border-l-4 border-primary rounded-r-lg p-4">
        <p className="text-xs font-semibold text-primary mb-1">👉 KEY POINT</p>
        <p className="text-sm text-foreground font-medium">{lesson.keyPoint}</p>
      </div>
    </div>
  );
}

function DebateCard({ point }: { point: { verse: string; text: string; commonClaim: string; counterPoint: string } }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary">{point.verse}</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{point.text}</p>
          </div>
          <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-destructive mb-1">COMMON CLAIM</p>
                <p className="text-sm text-foreground/90">{point.commonClaim}</p>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-emerald-500 mb-1">COUNTER-POINT (LET THE TEXT SPEAK)</p>
                <p className="text-sm text-foreground/90">{point.counterPoint}</p>
              </div>
              <div className="text-right">
                <VerseRef reference={point.verse} className="text-xs" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}
