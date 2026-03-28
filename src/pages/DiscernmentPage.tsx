import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { discernmentLessons, DISCERNMENT_SECTIONS, type DiscernmentLesson } from '@/data/discernmentData';
import { supabase } from '@/integrations/supabase/client';
import {
  Shield, ArrowLeft, ChevronRight, CheckCircle2, XCircle, AlertTriangle,
  BookOpen, Eye, Zap, Send, Loader2, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function DiscernmentPage() {
  const [selectedLesson, setSelectedLesson] = useState<DiscernmentLesson | null>(null);
  const [activeSection, setActiveSection] = useState<string>('foundations');

  if (selectedLesson) {
    return <LessonView lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

  const sectionLessons = discernmentLessons.filter(l => l.section === activeSection);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <Shield className="text-primary" /> Discernment
        </h1>
        <p className="text-muted-foreground mt-1">Exposing false paths. Training you to see deception fast and reject it without confusion.</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {DISCERNMENT_SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
              activeSection === s.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Section Description */}
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          {DISCERNMENT_SECTIONS.find(s => s.id === activeSection)?.description}
        </p>
      </div>

      {/* Lesson Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {sectionLessons.map(lesson => (
          <motion.button key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedLesson(lesson)}
            className="bg-card border border-border rounded-lg p-5 text-left hover:border-primary/30 transition-all group">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{lesson.icon}</span>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{lesson.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lesson.whatItIs}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-[10px]">{lesson.scriptures.length} scriptures</Badge>
                  <Badge variant="outline" className="text-[10px]">{lesson.truthVsLies.length} comparisons</Badge>
                  <Badge variant="outline" className="text-[10px]">{lesson.spotDeception.length} drills</Badge>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-1" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Red Flag Scanner */}
      <RedFlagScanner />
    </div>
  );
}

function LessonView({ lesson, onBack }: { lesson: DiscernmentLesson; onBack: () => void }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [showTruthToggle, setShowTruthToggle] = useState(false);

  const currentQuiz = lesson.spotDeception[quizIndex];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Discernment
      </button>

      <div className="flex items-center gap-3">
        <span className="text-4xl">{lesson.icon}</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{lesson.title}</h1>
          <Badge variant="secondary" className="text-xs mt-1">{DISCERNMENT_SECTIONS.find(s => s.id === lesson.section)?.label}</Badge>
        </div>
      </div>

      <Tabs defaultValue="lesson" className="w-full">
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="lesson" className="flex-1">📖 Lesson</TabsTrigger>
          <TabsTrigger value="truth" className="flex-1">⚖️ Truth vs Lie</TabsTrigger>
          <TabsTrigger value="drill" className="flex-1">🎯 Spot It</TabsTrigger>
        </TabsList>

        {/* === LESSON TAB === */}
        <TabsContent value="lesson" className="mt-4 space-y-5">
          {/* What It Is */}
          <Section title="What It Is" icon="📋">
            <p className="text-sm text-foreground/90">{lesson.whatItIs}</p>
          </Section>

          {/* Why People Fall */}
          <Section title="Why People Fall For It" icon="🧲">
            <ul className="space-y-1.5">
              {lesson.whyPeopleFall.map((item, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Conflict */}
          <Section title="Where It Conflicts With Scripture" icon="⚔️">
            <ul className="space-y-1.5">
              {lesson.conflictWithScripture.map((item, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Hidden Dangers */}
          <Section title="Hidden Dangers (What Most Don't See)" icon="👁️">
            <ul className="space-y-1.5">
              {lesson.hiddenDangers.map((item, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <Eye className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Pull Away */}
          <Section title="How It Pulls You Away From Yah" icon="🚪">
            <ul className="space-y-1.5">
              {lesson.pullAwayMechanism.map((item, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* How To Avoid */}
          <Section title="How To Respond / Avoid It" icon="🛡️">
            <ul className="space-y-1.5">
              {lesson.howToAvoid.map((item, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Key Scriptures */}
          <Section title="Key Scriptures" icon="📖">
            <div className="space-y-3">
              {lesson.scriptures.map((s, i) => (
                <div key={i} className="bg-secondary/50 border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-primary mb-1">{s.ref}</p>
                  <p className="text-sm text-foreground/90 italic">"{s.text}"</p>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* === TRUTH VS LIE TAB === */}
        <TabsContent value="truth" className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">See the deception side-by-side with truth. Tap to toggle.</p>
          {lesson.truthVsLies.map((tvl, i) => (
            <TruthVsLieCard key={i} tvl={tvl} />
          ))}
        </TabsContent>

        {/* === SPOT THE DECEPTION TAB === */}
        <TabsContent value="drill" className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">Read the statement. Is it truth or deception?</p>
          {currentQuiz && (
            <motion.div key={quizIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-lg p-5 space-y-4">
              <p className="text-xs text-muted-foreground">Statement {quizIndex + 1} of {lesson.spotDeception.length}</p>
              <p className="text-foreground font-medium text-lg">"{currentQuiz.statement}"</p>

              {!quizRevealed ? (
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={() => { setQuizAnswer(false); setQuizRevealed(true); }}>
                    <CheckCircle2 className="mr-2 w-4 h-4" /> Truth
                  </Button>
                  <Button variant="outline" className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => { setQuizAnswer(true); setQuizRevealed(true); }}>
                    <XCircle className="mr-2 w-4 h-4" /> Deception
                  </Button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className={`p-3 rounded-lg border ${
                    quizAnswer === currentQuiz.isDeception
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-destructive/10 border-destructive/30'
                  }`}>
                    <p className="text-sm font-semibold">
                      {quizAnswer === currentQuiz.isDeception ? '✅ Correct!' : '❌ Incorrect'}
                    </p>
                    <p className="text-sm text-foreground/80 mt-1">
                      This is {currentQuiz.isDeception ? '⚠️ DECEPTION' : '✅ TRUTH'}
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-sm text-foreground/90">{currentQuiz.explanation}</p>
                  </div>
                  {quizIndex < lesson.spotDeception.length - 1 && (
                    <Button onClick={() => { setQuizIndex(i => i + 1); setQuizRevealed(false); setQuizAnswer(null); }} className="w-full">
                      Next <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
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

function TruthVsLieCard({ tvl }: { tvl: { lie: string; truth: string; scripture: string } }) {
  const [showTruth, setShowTruth] = useState(false);

  return (
    <button onClick={() => setShowTruth(!showTruth)}
      className="w-full bg-card border border-border rounded-lg p-4 text-left transition-all hover:border-primary/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-muted-foreground">{showTruth ? '✅ TRUTH' : '❌ THE LIE'}</span>
        <span className="text-[10px] text-primary">tap to toggle</span>
      </div>
      <AnimatePresence mode="wait">
        {showTruth ? (
          <motion.div key="truth" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }}>
            <p className="text-foreground font-medium">{tvl.truth}</p>
            <p className="text-xs text-primary mt-2">📖 {tvl.scripture}</p>
          </motion.div>
        ) : (
          <motion.div key="lie" initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 90 }}>
            <p className="text-foreground font-medium">{tvl.lie}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function RedFlagScanner() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const scan = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('discernment-scanner', {
        body: { statement: input },
      });
      if (error) throw error;
      setResult(data.analysis);
    } catch (e: any) {
      toast.error('Scanner error: ' + (e.message || 'Try again'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-primary/20 rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold text-foreground">🔍 Red Flag Scanner</h2>
      </div>
      <p className="text-xs text-muted-foreground">Paste something you saw online, heard in a sermon, or read somewhere. The scanner will analyze it against scripture.</p>
      <Textarea placeholder="I saw this on TikTok… / My pastor said… / Someone told me…"
        value={input} onChange={e => setInput(e.target.value)} className="bg-secondary border-border" />
      <Button onClick={scan} disabled={!input.trim() || loading} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
        Scan for Deception
      </Button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/50 border border-border rounded-lg p-4">
          <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans">{result}</pre>
        </motion.div>
      )}
    </div>
  );
}
