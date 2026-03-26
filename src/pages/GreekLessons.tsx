import { greekLessons } from '@/data/greekData';
import LessonCard from '@/components/LessonCard';
import { GraduationCap } from 'lucide-react';

export default function GreekLessons() {
  const progress = Math.round(greekLessons.reduce((a, l) => a + l.progress, 0) / greekLessons.length);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap size={28} className="text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Greek Lessons</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Learn the language of the Renewed Covenant. From the alphabet to understanding key New Testament terms.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Greek Progress</span>
          <span className="text-primary font-mono">{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {greekLessons.filter(l => l.completed).length} of {greekLessons.length} lessons completed
        </p>
      </div>

      <div className="space-y-3">
        {greekLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} basePath="/greek" />
        ))}
      </div>
    </div>
  );
}
