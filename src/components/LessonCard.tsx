import { Link } from 'react-router-dom';
import type { LanguageLesson } from '@/data/hebrewData';
import { ChevronRight, Check, BookOpen } from 'lucide-react';

interface LessonCardProps {
  lesson: LanguageLesson;
  basePath: string;
}

export default function LessonCard({ lesson, basePath }: LessonCardProps) {
  return (
    <Link
      to={`${basePath}/${lesson.id}`}
      className="group block bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:glow-gold transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono
            ${lesson.completed
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'bg-muted text-muted-foreground border border-border'
            }`}
          >
            {lesson.completed ? <Check size={14} /> : lesson.order}
          </div>
          <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
        </div>
        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="text-sm text-muted-foreground mb-3 ml-11 line-clamp-2">{lesson.overview}</p>
      <div className="ml-11 flex items-center gap-2">
        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${lesson.progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-primary">{lesson.progress}%</span>
      </div>
    </Link>
  );
}
