import { Link } from 'react-router-dom';
import { studyModules } from '@/data/studyGuideData';
import { hebrewLessons } from '@/data/hebrewData';
import { greekLessons } from '@/data/greekData';
import MaturityTracker from '@/components/MaturityTracker';
import { BookOpen, Languages, GraduationCap, ArrowRight, Flame } from 'lucide-react';

export default function Index() {
  const totalStudyProgress = Math.round(studyModules.reduce((a, m) => a + m.progress, 0) / studyModules.length);
  const hebrewProgress = Math.round(hebrewLessons.reduce((a, l) => a + l.progress, 0) / hebrewLessons.length);
  const greekProgress = Math.round(greekLessons.reduce((a, l) => a + l.progress, 0) / greekLessons.length);

  // Find next incomplete items
  const nextModule = studyModules.find(m => m.progress < 100);
  const nextHebrew = hebrewLessons.find(l => !l.completed);
  const nextGreek = greekLessons.find(l => !l.completed);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Walk the <span className="text-primary">Path</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Grow from milk to meat. Study the Scriptures with discipline, learn the original languages, and walk in truth.
        </p>
      </div>

      {/* Maturity Tracker */}
      <MaturityTracker currentLevel="bread" overallProgress={totalStudyProgress} />

      {/* Continue Learning */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Flame size={20} className="text-primary" />
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

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
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
      </div>
    </div>
  );
}
