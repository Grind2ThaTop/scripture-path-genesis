import { hebrewLessons } from '@/data/hebrewData';
import LessonCard from '@/components/LessonCard';
import { Languages } from 'lucide-react';

export default function HebrewLessons() {
  const progress = Math.round(hebrewLessons.reduce((a, l) => a + l.progress, 0) / hebrewLessons.length);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Languages size={28} className="text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Hebrew Lessons</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Learn the language of the Tanakh. From the Aleph-Bet to reading Scripture in its original tongue.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Hebrew Progress</span>
          <span className="text-primary font-mono">{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {hebrewLessons.filter(l => l.completed).length} of {hebrewLessons.length} lessons completed
        </p>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {hebrewLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} basePath="/hebrew" />
        ))}
      </div>
    </div>
  );
}
