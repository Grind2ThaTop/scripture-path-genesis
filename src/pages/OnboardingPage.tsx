import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, BookOpen, Users, Shield, Flame, Crown, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const GROWTH_AREAS = [
  { id: 'scripture', label: 'Scripture Knowledge', icon: '📖' },
  { id: 'prayer', label: 'Prayer Life', icon: '🙏' },
  { id: 'discipline', label: 'Daily Discipline', icon: '⚔️' },
  { id: 'doctrine', label: 'Sound Doctrine', icon: '🛡️' },
  { id: 'community', label: 'Brotherhood/Sisterhood', icon: '🤝' },
  { id: 'leadership', label: 'Leadership', icon: '👑' },
];

const EXPERIENCE_LEVELS = [
  { id: 'new', label: 'New to Scripture Study', description: 'Just starting the journey', icon: '🌱' },
  { id: 'returning', label: 'Returning to Scripture', description: 'Been away, coming back stronger', icon: '🔄' },
  { id: 'deeper', label: 'Want Deeper Doctrine', description: 'Ready for meat, not milk', icon: '🥩' },
  { id: 'leader', label: 'Leadership Development', description: 'Ready to teach and lead', icon: '👑' },
];

const TRACKS = [
  { id: 'foundations', label: 'Foundations', description: 'Torah, Covenant, Obedience — the bedrock', icon: '🏛️', forLevels: ['new'] },
  { id: 'mastery', label: 'Scripture Mastery', description: 'Deep dive into Torah, Prophets, Psalms', icon: '📚', forLevels: ['returning', 'deeper'] },
  { id: 'exposed', label: 'False Doctrine Exposed', description: 'Identify and dismantle deception', icon: '🔥', forLevels: ['deeper'] },
  { id: 'application', label: 'Real Life Application', description: 'Marriage, money, discipline, speech', icon: '⚡', forLevels: ['returning', 'deeper'] },
  { id: 'teacher', label: 'Teacher Development', description: 'Learn to break down and teach scripture', icon: '👑', forLevels: ['leader'] },
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [why, setWhy] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [wantsAccountability, setWantsAccountability] = useState(false);
  const [wantsCircle, setWantsCircle] = useState(false);
  const [track, setTrack] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleArea = (id: string) => setAreas(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const suggestedTracks = TRACKS.filter(t => t.forLevels.includes(level) || !level);

  const submit = async () => {
    if (!user) return;
    setSubmitting(true);
    const { error } = await (supabase.from('onboarding_responses' as any) as any).insert({
      user_id: user.id,
      why_joining: why,
      growth_areas: areas,
      experience_level: level,
      wants_accountability: wantsAccountability,
      wants_circle: wantsCircle,
      assigned_track: track,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Welcome to The Narrow Path');
    navigate('/');
  };

  const steps = [
    // Step 0: Welcome
    <motion.div key="welcome" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center space-y-6">
      <div className="text-6xl mb-4">⚔️</div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Welcome to<br /><span className="text-primary">The Narrow Path</span></h1>
      <p className="text-muted-foreground max-w-md mx-auto">This is not a casual Bible app. This is a transformation system. You'll study, apply, grow, and eventually teach others.</p>
      <div className="space-y-2 text-sm text-muted-foreground max-w-sm mx-auto text-left">
        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Structured progression from Seeker to Elder</p>
        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Daily discipline system</p>
        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Accountability circles</p>
        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Real community, not noise</p>
      </div>
    </motion.div>,

    // Step 1: Why
    <motion.div key="why" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Why are you joining?</h2>
      <p className="text-muted-foreground text-sm">Be real. This helps us point you in the right direction.</p>
      <Textarea placeholder="I want to grow because..." value={why} onChange={e => setWhy(e.target.value)} className="bg-secondary border-border min-h-[120px]" />
    </motion.div>,

    // Step 2: Growth areas
    <motion.div key="areas" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">What do you want to grow in?</h2>
      <p className="text-muted-foreground text-sm">Select all that apply.</p>
      <div className="grid grid-cols-2 gap-3">
        {GROWTH_AREAS.map(area => (
          <button key={area.id} onClick={() => toggleArea(area.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              areas.includes(area.id) ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/30'
            }`}>
            <span className="text-2xl">{area.icon}</span>
            <p className="text-sm font-medium text-foreground mt-2">{area.label}</p>
          </button>
        ))}
      </div>
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={wantsAccountability} onChange={e => setWantsAccountability(e.target.checked)} className="accent-primary w-4 h-4" />
          <span className="text-sm text-foreground">I want accountability (daily check-ins)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={wantsCircle} onChange={e => setWantsCircle(e.target.checked)} className="accent-primary w-4 h-4" />
          <span className="text-sm text-foreground">I want to join a small circle (5-10 people)</span>
        </label>
      </div>
    </motion.div>,

    // Step 3: Experience level
    <motion.div key="level" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Where are you right now?</h2>
      <div className="space-y-3">
        {EXPERIENCE_LEVELS.map(l => (
          <button key={l.id} onClick={() => setLevel(l.id)}
            className={`w-full p-4 rounded-lg border text-left flex items-center gap-4 transition-all ${
              level === l.id ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/30'
            }`}>
            <span className="text-3xl">{l.icon}</span>
            <div>
              <p className="font-semibold text-foreground">{l.label}</p>
              <p className="text-xs text-muted-foreground">{l.description}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 4: Track assignment
    <motion.div key="track" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Your Study Track</h2>
      <p className="text-muted-foreground text-sm">Based on your answers, we recommend starting here:</p>
      <div className="space-y-3">
        {suggestedTracks.map(t => (
          <button key={t.id} onClick={() => setTrack(t.id)}
            className={`w-full p-4 rounded-lg border text-left flex items-center gap-4 transition-all ${
              track === t.id ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/30'
            }`}>
            <span className="text-3xl">{t.icon}</span>
            <div>
              <p className="font-semibold text-foreground">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 5: Ready
    <motion.div key="ready" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center space-y-6">
      <div className="text-6xl mb-4">🔥</div>
      <h2 className="text-3xl font-display font-bold text-foreground">You're Ready</h2>
      <p className="text-muted-foreground max-w-sm mx-auto">Your path is set. Time to walk it.</p>
      <div className="bg-card border border-primary/30 rounded-lg p-4 max-w-sm mx-auto space-y-2 text-left">
        {track && <p className="text-sm text-foreground">📚 Track: <span className="text-primary font-semibold">{TRACKS.find(t => t.id === track)?.label}</span></p>}
        {areas.length > 0 && <p className="text-sm text-foreground">🎯 Focus: <span className="text-primary">{areas.map(a => GROWTH_AREAS.find(g => g.id === a)?.label).join(', ')}</span></p>}
        {wantsAccountability && <p className="text-sm text-foreground">⚔️ Accountability: <span className="text-primary">Enabled</span></p>}
        {wantsCircle && <p className="text-sm text-foreground">🤝 Circle: <span className="text-primary">Will be assigned</span></p>}
      </div>
      <Button onClick={submit} disabled={submitting} size="lg" className="text-lg px-8">
        {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Flame className="mr-2" />}
        Enter The Narrow Path
      </Button>
    </motion.div>,
  ];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-1 mb-8 justify-center">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-primary w-8' : 'bg-muted w-4'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(s => s - 1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          ) : <div />}
          {step < steps.length - 1 && (
            <Button onClick={() => setStep(s => s + 1)}>
              {step === 0 ? 'Get Started' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Loader2Icon(props: any) { return <Loader2 {...props} />; }
