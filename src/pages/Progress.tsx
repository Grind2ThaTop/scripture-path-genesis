import { Link } from 'react-router-dom';
import { studyModules } from '@/data/studyGuideData';
import { hebrewLessons } from '@/data/hebrewData';
import { greekLessons } from '@/data/greekData';
import MaturityTracker from '@/components/MaturityTracker';
import { BookOpen, Languages, GraduationCap, TrendingUp } from 'lucide-react';

export default function Progress() {
  const totalStudyProgress = Math.round(studyModules.reduce((a, m) => a + m.progress, 0) / studyModules.length);
  const hebrewProgress = Math.round(hebrewLessons.reduce((a, l) => a + l.progress, 0) / hebrewLessons.length);
  const greekProgress = Math.round(greekLessons.reduce((a, l) => a + l.progress, 0) / greekLessons.length);

  const completedStudyLessons = studyModules.reduce((a, m) => a + m.lessons.filter(l => l.completed).length, 0);
  const totalStudyLessons = studyModules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={28} className="text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Your Progress</h1>
        </div>
        <p className="text-muted-foreground text-sm">Track your growth across Scripture study and language learning.</p>
      </div>

      <MaturityTracker currentLevel="bread" overallProgress={totalStudyProgress} />

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} className="text-primary" />
            <h3 className="font-display font-semibold text-foreground">Study Guide</h3>
          </div>
          <p className="text-3xl font-display font-bold text-primary mb-1">{totalStudyProgress}%</p>
          <p className="text-xs text-muted-foreground">{completedStudyLessons}/{totalStudyLessons} lessons completed</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden mt-3">
            <div className="h-full bg-primary rounded-full" style={{ width: `${totalStudyProgress}%` }} />
          </div>
          <div className="mt-3 space-y-1">
            {studyModules.map(m => (
              <div key={m.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate mr-2">{m.icon} {m.title}</span>
                <span className="text-primary font-mono">{m.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Languages size={18} className="text-primary" />
            <h3 className="font-display font-semibold text-foreground">Hebrew</h3>
          </div>
          <p className="text-3xl font-display font-bold text-primary mb-1">{hebrewProgress}%</p>
          <p className="text-xs text-muted-foreground">{hebrewLessons.filter(l => l.completed).length}/{hebrewLessons.length} lessons completed</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden mt-3">
            <div className="h-full bg-primary rounded-full" style={{ width: `${hebrewProgress}%` }} />
          </div>
          <div className="mt-3 space-y-1">
            {hebrewLessons.map(l => (
              <div key={l.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate mr-2">{l.title}</span>
                <span className="text-primary font-mono">{l.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={18} className="text-primary" />
            <h3 className="font-display font-semibold text-foreground">Greek</h3>
          </div>
          <p className="text-3xl font-display font-bold text-primary mb-1">{greekProgress}%</p>
          <p className="text-xs text-muted-foreground">{greekLessons.filter(l => l.completed).length}/{greekLessons.length} lessons completed</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden mt-3">
            <div className="h-full bg-primary rounded-full" style={{ width: `${greekProgress}%` }} />
          </div>
          <div className="mt-3 space-y-1">
            {greekLessons.map(l => (
              <div key={l.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate mr-2">{l.title}</span>
                <span className="text-primary font-mono">{l.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
