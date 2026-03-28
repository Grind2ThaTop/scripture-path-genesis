import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  ArrowLeft, Lock, Unlock, Star, Crown, Sword,
  GraduationCap, Baby, Wheat, Beef, Shield, Flame
} from 'lucide-react';

const LEVELS = [
  {
    level: 1,
    name: 'Milk',
    icon: Baby,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    description: 'Foundations of faith — learning the basics of Torah, the character of Yahweh, and the path of obedience.',
    xpRequired: 0,
    lessonsRequired: 0,
    unlocks: ['Basic study modules', 'Community access', 'Daily verse'],
  },
  {
    level: 2,
    name: 'Understanding',
    icon: Star,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/30',
    description: 'Moving beyond surface reading — connecting patterns, types, and shadows across scripture.',
    xpRequired: 500,
    lessonsRequired: 10,
    unlocks: ['Cross-reference deep dives', 'Hebrew word studies', 'Prophetic patterns'],
  },
  {
    level: 3,
    name: 'Application',
    icon: Sword,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/30',
    description: 'Truth without action is dead. This level is about LIVING the word, not just knowing it.',
    xpRequired: 1500,
    lessonsRequired: 25,
    unlocks: ['Life situations deep study', 'Accountability tools', 'Advanced breakdowns'],
  },
  {
    level: 4,
    name: 'Discipline',
    icon: Shield,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    description: 'Consistency under pressure. Daily study is no longer optional — it is your identity.',
    xpRequired: 3000,
    lessonsRequired: 50,
    unlocks: ['Enoch & Jubilees deep study', 'Fasting guides', 'Warrior-level content'],
  },
  {
    level: 5,
    name: 'Teacher',
    icon: Crown,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
    description: 'You don\'t just learn — you REPRODUCE. Teaching others is the highest form of understanding.',
    xpRequired: 5000,
    lessonsRequired: 80,
    unlocks: ['Create community posts', 'Breakdown submissions', 'Teaching tools', 'Full content access'],
  },
];

export default function ProgressionPage() {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState<any>(null);
  const [completions, setCompletions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchProgress();
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;
    setLoading(true);

    // Fetch or create user level
    let { data: levelData } = await supabase
      .from('user_levels')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!levelData) {
      await supabase.from('user_levels').insert({ user_id: user.id });
      const { data } = await supabase.from('user_levels').select('*').eq('user_id', user.id).maybeSingle();
      levelData = data;
    }
    setUserLevel(levelData);

    // Count completions
    const { count } = await supabase
      .from('lesson_completions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    setCompletions(count || 0);

    setLoading(false);
  };

  const currentLevel = userLevel?.current_level || 1;
  const currentXp = userLevel?.xp || 0;
  const currentLevelData = LEVELS[currentLevel - 1];
  const nextLevelData = currentLevel < 5 ? LEVELS[currentLevel] : null;
  const xpProgress = nextLevelData
    ? ((currentXp - currentLevelData.xpRequired) / (nextLevelData.xpRequired - currentLevelData.xpRequired)) * 100
    : 100;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <GraduationCap size={48} className="text-primary" />
        <h2 className="text-xl font-display font-bold text-foreground">Progression System</h2>
        <p className="text-muted-foreground text-center">Sign in to track your growth.</p>
        <Link to="/auth"><Button>Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft size={18} /></Button></Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Your Path</h1>
          <p className="text-sm text-muted-foreground">Milk → Understanding → Application → Discipline → Teacher</p>
        </div>
      </div>

      {/* Current status */}
      {!loading && currentLevelData && (
        <Card className={`${currentLevelData.borderColor} border-2`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-xl ${currentLevelData.bgColor} flex items-center justify-center`}>
                <currentLevelData.icon size={32} className={currentLevelData.color} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Level</p>
                <h2 className={`text-2xl font-display font-bold ${currentLevelData.color}`}>
                  Level {currentLevel}: {currentLevelData.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{currentLevelData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{currentXp}</p>
                <p className="text-[10px] text-muted-foreground uppercase">XP Earned</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{completions}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Lessons Done</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{userLevel?.days_consistent || 0}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Days Consistent</p>
              </div>
            </div>

            {nextLevelData && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress to Level {currentLevel + 1}: {nextLevelData.name}</span>
                  <span>{Math.round(xpProgress)}%</span>
                </div>
                <Progress value={Math.min(xpProgress, 100)} className="h-3" />
                <p className="text-[10px] text-muted-foreground">
                  Need {nextLevelData.xpRequired - currentXp} more XP and {Math.max(0, nextLevelData.lessonsRequired - completions)} more lessons
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All levels */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-semibold text-foreground">The 5 Levels</h3>
        {LEVELS.map((level) => {
          const isUnlocked = currentLevel >= level.level;
          const isCurrent = currentLevel === level.level;
          return (
            <Card
              key={level.level}
              className={`transition-all ${
                isCurrent
                  ? `${level.borderColor} border-2 shadow-lg`
                  : isUnlocked
                    ? 'border-border'
                    : 'border-border opacity-60'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg ${level.bgColor} flex items-center justify-center relative`}>
                    <level.icon size={24} className={level.color} />
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-background/60 rounded-lg flex items-center justify-center">
                        <Lock size={16} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-display font-semibold ${isUnlocked ? level.color : 'text-muted-foreground'}`}>
                        Level {level.level}: {level.name}
                      </h4>
                      {isCurrent && <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">YOU ARE HERE</span>}
                      {isUnlocked && !isCurrent && <Unlock size={12} className="text-emerald-400" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{level.description}</p>
                  </div>
                </div>

                {/* Unlocks */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {level.unlocks.map((u) => (
                    <span
                      key={u}
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? `${level.bgColor} ${level.color}`
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isUnlocked ? '✓' : '🔒'} {u}
                    </span>
                  ))}
                </div>

                {!isUnlocked && (
                  <p className="text-[10px] text-muted-foreground mt-2">
                    Requires: {level.xpRequired} XP · {level.lessonsRequired} lessons completed
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
