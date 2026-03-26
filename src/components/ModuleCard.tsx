import { Link } from 'react-router-dom';
import type { StudyModule } from '@/data/studyGuideData';
import { ChevronRight, BookOpen } from 'lucide-react';

const difficultyColors = {
  milk: 'text-milk bg-milk/10 border-milk/20',
  bread: 'text-bread bg-bread/10 border-bread/20',
  meat: 'text-meat bg-meat/10 border-meat/20',
};

const difficultyLabels = { milk: 'Milk', bread: 'Bread', meat: 'Meat' };

export default function ModuleCard({ module }: { module: StudyModule }) {
  const completedCount = module.lessons.filter(l => l.completed).length;

  return (
    <Link
      to={`/study-guide/${module.id}`}
      className="group block bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:glow-gold transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{module.icon}</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {module.title}
            </h3>
            <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded border ${difficultyColors[module.difficulty]}`}>
              {difficultyLabels[module.difficulty]}
            </span>
          </div>
        </div>
        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{module.overview}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen size={14} />
          <span>{completedCount}/{module.lessons.length} lessons</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${module.progress}%` }}
            />
          </div>
          <span className="text-xs text-primary font-mono">{module.progress}%</span>
        </div>
      </div>
    </Link>
  );
}
