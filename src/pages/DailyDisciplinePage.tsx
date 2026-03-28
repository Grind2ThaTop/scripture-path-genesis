import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  ArrowLeft, Sun, Moon, Flame, BookOpen,
  CheckCircle2, Circle, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';

export default function DailyDisciplinePage() {
  const { user } = useAuth();
  const [dailyContent, setDailyContent] = useState<any>(null);
  const [reflection, setReflection] = useState('');
  const [actionDone, setActionDone] = useState(false);
  const [existingReflection, setExistingReflection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [streak, setStreak] = useState<any>(null);

  useEffect(() => {
    fetchDaily();
    if (user) fetchStreak();
  }, [selectedDate, user]);

  const fetchDaily = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('daily_content')
      .select('*')
      .eq('date', selectedDate)
      .maybeSingle();
    setDailyContent(data);

    if (user && data) {
      const { data: ref } = await supabase
        .from('daily_reflections')
        .select('*')
        .eq('user_id', user.id)
        .eq('daily_content_id', data.id)
        .maybeSingle();
      setExistingReflection(ref);
      if (ref) {
        setReflection(ref.reflection_text);
        setActionDone(ref.action_completed);
      } else {
        setReflection('');
        setActionDone(false);
      }
    }
    setLoading(false);
  };

  const fetchStreak = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('reading_streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    setStreak(data);
  };

  const submitReflection = async () => {
    if (!user || !dailyContent || !reflection.trim()) return;
    if (existingReflection) {
      await supabase.from('daily_reflections')
        .update({ reflection_text: reflection.trim(), action_completed: actionDone })
        .eq('id', existingReflection.id);
    } else {
      await supabase.from('daily_reflections').insert({
        user_id: user.id,
        daily_content_id: dailyContent.id,
        reflection_text: reflection.trim(),
        action_completed: actionDone,
      });
    }

    // Award XP
    const { data: levelData } = await supabase
      .from('user_levels')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    if (levelData) {
      const newXp = (levelData.xp || 0) + (actionDone ? 50 : 25);
      const newDays = (levelData.days_consistent || 0) + (existingReflection ? 0 : 1);
      let newLevel = levelData.current_level;
      if (newXp >= 5000 && newLevel < 5) newLevel = 5;
      else if (newXp >= 3000 && newLevel < 4) newLevel = 4;
      else if (newXp >= 1500 && newLevel < 3) newLevel = 3;
      else if (newXp >= 500 && newLevel < 2) newLevel = 2;

      await supabase.from('user_levels')
        .update({ xp: newXp, days_consistent: newDays, current_level: newLevel })
        .eq('user_id', user.id);

      if (newLevel > levelData.current_level) {
        toast.success(`🔥 LEVEL UP! You are now Level ${newLevel}!`);
      }
    }

    toast.success(existingReflection ? 'Reflection updated!' : '✅ Reflection submitted! +' + (actionDone ? '50' : '25') + ' XP');
    fetchDaily();
  };

  const changeDate = (dir: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + dir);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const levelTag = dailyContent?.level_tag || 'milk';
  const levelColors: Record<string, string> = {
    milk: 'text-blue-400 bg-blue-400/10',
    bread: 'text-amber-400 bg-amber-400/10',
    meat: 'text-red-400 bg-red-400/10',
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Flame size={48} className="text-primary" />
        <h2 className="text-xl font-display font-bold text-foreground">Daily Discipline</h2>
        <p className="text-muted-foreground text-center">Sign in to start your daily training.</p>
        <Link to="/auth"><Button>Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft size={18} /></Button></Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Daily Discipline</h1>
          <p className="text-sm text-muted-foreground">Read · Understand · Apply · EVERY DAY</p>
        </div>
      </div>

      {/* Streak bar */}
      {streak && (
        <div className="flex items-center gap-4 p-3 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-orange-400" />
            <div>
              <p className="text-lg font-bold text-foreground">{streak.current_streak}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Day Streak</p>
            </div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-lg font-bold text-foreground">{streak.longest_streak}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Best</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-lg font-bold text-foreground">{streak.total_chapters_read}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Chapters</p>
          </div>
        </div>
      )}

      {/* Date nav */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => changeDate(-1)}><ChevronLeft size={18} /></Button>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {isToday ? "Today's Study" : new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-[10px] text-muted-foreground">{selectedDate}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => changeDate(1)} disabled={isToday}><ChevronRight size={18} /></Button>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-12">Loading...</p>
      ) : !dailyContent ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Moon size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No content for this date yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Check back or navigate to a different day.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Morning: Study */}
          <Card className="border-primary/20">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun size={18} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Morning Study</span>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${levelColors[levelTag]}`}>
                  {levelTag}
                </span>
              </div>

              {/* Verse */}
              <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-display text-lg italic text-foreground leading-relaxed">{dailyContent.verse_text}</p>
                <p className="text-sm font-semibold text-primary mt-2">— {dailyContent.verse_reference}</p>
              </div>

              {/* Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <BookOpen size={12} /> Breakdown
                </h4>
                <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{dailyContent.breakdown}</p>
              </div>
            </CardContent>
          </Card>

          {/* Evening: Reflection */}
          <Card className="border-purple-500/20">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Moon size={18} className="text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Evening Reflection</span>
              </div>

              {/* Reflection question */}
              <div className="bg-purple-500/5 rounded-lg p-4 border-l-4 border-purple-500/40">
                <p className="text-sm font-medium text-foreground">{dailyContent.reflection_question}</p>
              </div>

              {/* Action step */}
              <div className="bg-orange-500/5 rounded-lg p-4 border-l-4 border-orange-500/40">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1 flex items-center gap-1">
                  <Zap size={12} /> Action Step
                </p>
                <p className="text-sm text-foreground">{dailyContent.action_step}</p>
              </div>

              {/* User response */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Write your reflection... What did you learn? What will you change?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={4}
                  className="text-sm"
                />

                <button
                  onClick={() => setActionDone(!actionDone)}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  {actionDone ? (
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  ) : (
                    <Circle size={18} className="text-muted-foreground" />
                  )}
                  I completed today's action step
                </button>

                <Button onClick={submitReflection} className="w-full gap-2" disabled={!reflection.trim()}>
                  {existingReflection ? 'Update Reflection' : 'Submit Reflection'}
                  <span className="text-xs opacity-70">+{actionDone ? '50' : '25'} XP</span>
                </Button>
              </div>

              {existingReflection && (
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={10} /> You've completed today's discipline ✓
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
