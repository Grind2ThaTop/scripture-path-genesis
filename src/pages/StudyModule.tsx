import { useParams, Link } from 'react-router-dom';
import { studyModules } from '@/data/studyGuideData';
import { ArrowLeft, Check, Circle, BookOpen } from 'lucide-react';

const difficultyColors = {
  milk: 'text-milk',
  bread: 'text-bread',
  meat: 'text-meat',
};

export default function StudyModule() {
  const { moduleId } = useParams();
  const module = studyModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Module not found.</p>
        <Link to="/study-guide" className="text-primary text-sm hover:underline">Back to Study Guide</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/study-guide" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Study Guide
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{module.icon}</span>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{module.title}</h1>
            <span className={`text-xs font-medium ${difficultyColors[module.difficulty]}`}>
              {module.difficulty === 'milk' ? '🥛 Milk' : module.difficulty === 'bread' ? '🍞 Bread' : '🥩 Meat'}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{module.overview}</p>
      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Module Progress</span>
          <span className="text-primary font-mono">{module.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${module.progress}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-4">
        {module.lessons.map((lesson, i) => (
          <div key={lesson.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                  ${lesson.completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
                >
                  {lesson.completed ? <Check size={14} /> : <span className="text-xs font-mono">{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{lesson.overview}</p>
                </div>
              </div>

              {/* Key Verses */}
              <div className="ml-10 mb-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <BookOpen size={12} /> Key Verses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lesson.keyVerses.map(v => (
                    <span key={v} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reflection Questions */}
              <div className="ml-10 mb-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Reflection</h4>
                <ul className="space-y-1.5">
                  {lesson.reflectionQuestions.map((rq, ri) => (
                    <li key={ri} className="text-sm text-foreground/80 flex items-start gap-2">
                      <Circle size={6} className="text-primary mt-1.5 flex-shrink-0" />
                      {rq.question}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Steps */}
              <div className="ml-10">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Obedience Steps</h4>
                <ul className="space-y-1.5">
                  {lesson.actionSteps.map((as, ai) => (
                    <li key={ai} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="text-primary text-xs font-mono mt-0.5">{ai + 1}.</span>
                      {as.step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lesson footer */}
            <div className="px-5 py-3 bg-muted/30 border-t border-border flex justify-between items-center">
              <span className={`text-xs font-medium ${lesson.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                {lesson.completed ? '✓ Completed' : 'Not yet completed'}
              </span>
              <button className={`text-xs px-3 py-1.5 rounded font-medium transition-all
                ${lesson.completed
                  ? 'bg-muted text-muted-foreground hover:text-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {lesson.completed ? 'Review' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
