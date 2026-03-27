import { Link } from 'react-router-dom';
import { studyModules } from '@/data/studyGuideData';
import { hebrewLessons } from '@/data/hebrewData';
import { greekLessons } from '@/data/greekData';
import MaturityTracker from '@/components/MaturityTracker';
import { BookOpen, Languages, GraduationCap, ArrowRight, Flame, Compass, Zap, Target } from 'lucide-react';

export default function Index() {
  const totalStudyProgress = Math.round(studyModules.reduce((a, m) => a + m.progress, 0) / studyModules.length);
  const hebrewProgress = Math.round(hebrewLessons.reduce((a, l) => a + l.progress, 0) / hebrewLessons.length);
  const greekProgress = Math.round(greekLessons.reduce((a, l) => a + l.progress, 0) / greekLessons.length);

  const nextModule = studyModules.find(m => m.progress < 100);
  const nextHebrew = hebrewLessons.find(l => !l.completed);
  const nextGreek = greekLessons.find(l => !l.completed);

  // Streak (simulated — in real app would be from localStorage/DB)
  const streak = 7;
  const dailyGoalMet = true;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Walk the <span className="text-primary">Path</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Grow from milk to meat. Study the Scriptures with discipline, learn the original languages, and walk in truth.
          </p>
        </div>
        {/* Streak Badge */}
        <div className="bg-card border border-border rounded-lg p-3 text-center flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Flame size={20} className={dailyGoalMet ? 'text-primary' : 'text-muted-foreground'} />
            <span className="text-2xl font-display font-bold text-primary">{streak}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Day Streak</p>
        </div>
      </div>

      {/* Maturity Tracker */}
      <MaturityTracker currentLevel="bread" overallProgress={totalStudyProgress} />

      {/* Daily Study Card */}
      <div className="bg-card border border-primary/30 rounded-lg p-5 glow-gold">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Today's Training</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Study Module</p>
            <p className="text-sm font-medium text-foreground">{nextModule?.title || 'All complete!'}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Hebrew Practice</p>
            <p className="text-sm font-medium text-foreground">{nextHebrew?.title || 'All complete!'}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Greek Practice</p>
            <p className="text-sm font-medium text-foreground">{nextGreek?.title || 'All complete!'}</p>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          Continue Where You Left Off
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {nextModule && (
            <Link to={`/study-guide/${nextModule.id}`} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 hover:glow-gold transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Study Guide</span>
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {nextModule.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${nextModule.progress}%` }} />
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>
          )}
          {nextHebrew && (
            <Link to={`/hebrew/${nextHebrew.id}`} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 hover:glow-gold transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Languages size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Hebrew</span>
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {nextHebrew.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${nextHebrew.progress}%` }} />
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>
          )}
          {nextGreek && (
            <Link to={`/greek/${nextGreek.id}`} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 hover:glow-gold transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Greek</span>
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {nextGreek.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${nextGreek.progress}%` }} />
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-display font-bold text-primary">{totalStudyProgress}%</p>
          <p className="text-xs text-muted-foreground mt-1">Study Guide</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-display font-bold text-primary">{hebrewProgress}%</p>
          <p className="text-xs text-muted-foreground mt-1">Hebrew</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-display font-bold text-primary">{greekProgress}%</p>
          <p className="text-xs text-muted-foreground mt-1">Greek</p>
        </div>
      </div>

      {/* Mastery Levels */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Topic Mastery</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {studyModules.slice(0, 6).map(m => (
            <div key={m.id} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
              <span className="text-lg">{m.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
                  </div>
                  <span className="text-xs text-primary font-mono w-8 text-right">{m.progress}%</span>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                m.progress >= 80 ? 'text-primary border-primary/30 bg-primary/10' :
                m.progress >= 30 ? 'text-bread border-bread/30 bg-bread/10' :
                'text-muted-foreground border-border bg-muted/30'
              }`}>
                {m.progress >= 80 ? 'Mastered' : m.progress >= 30 ? 'Growing' : 'New'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/study-guide" className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:glow-gold transition-all group">
          <BookOpen size={24} className="text-primary mb-3" />
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">Study Guide</h3>
          <p className="text-xs text-muted-foreground mt-1">{studyModules.length} modules · Milk to Meat</p>
        </Link>
        <Link to="/hebrew" className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:glow-gold transition-all group">
          <Languages size={24} className="text-primary mb-3" />
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">Hebrew Lessons</h3>
          <p className="text-xs text-muted-foreground mt-1">{hebrewLessons.length} lessons · Aleph-Bet to roots</p>
        </Link>
        <Link to="/greek" className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:glow-gold transition-all group">
          <GraduationCap size={24} className="text-primary mb-3" />
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">Greek Lessons</h3>
          <p className="text-xs text-muted-foreground mt-1">{greekLessons.length} lessons · Alpha to grammar</p>
        </Link>
        <Link to="/life-situations" className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:glow-gold transition-all group">
          <Compass size={24} className="text-primary mb-3" />
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">Life Situations</h3>
          <p className="text-xs text-muted-foreground mt-1">Real-world application</p>
        </Link>
      </div>
    </div>
  );
}
