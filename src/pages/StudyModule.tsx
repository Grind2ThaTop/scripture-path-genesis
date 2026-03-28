import { useParams, Link } from 'react-router-dom';
import { studyModules } from '@/data/studyGuideData';
import { VerseRef } from '@/components/ScripturePanel';
import QuizSection from '@/components/QuizSection';
import { ArrowLeft, Check, Circle, AlertTriangle, Target, Brain } from 'lucide-react';
import { useState } from 'react';

const difficultyColors = {
  milk: 'text-milk',
  bread: 'text-bread',
  meat: 'text-meat',
};

export default function StudyModule() {
  const { moduleId } = useParams();
  const module = studyModules.find(m => m.id === moduleId);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

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
          <span className="text-primary font-mono">{module.lessons.length} Lessons</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${module.progress}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-4">
        {module.lessons.map((lesson, i) => {
          const isExpanded = expandedLesson === lesson.id;
          return (
            <div key={lesson.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Lesson Header — clickable */}
              <button
                onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${lesson.completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
                  >
                    {lesson.completed ? <Check size={14} /> : <span className="text-xs font-mono">{i + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{lesson.overview}</p>
                  </div>
                  <span className="text-muted-foreground text-xs mt-1">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-5">
                  {/* Key Verses */}
                  <div className="ml-10">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      📖 Key Verses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {lesson.keyVerses.map(v => (
                        <VerseRef key={v} reference={v} />
                      ))}
                    </div>
                  </div>

                  {/* Reflection Questions */}
                  <div className="ml-10">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">🤔 Reflection</h4>
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
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">⚡ Obedience Steps</h4>
                    <ul className="space-y-1.5">
                      {lesson.actionSteps.map((as, ai) => (
                        <li key={ai} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-primary text-xs font-mono mt-0.5">{ai + 1}.</span>
                          {as.step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deception Exposure */}
                  {lesson.deceptionExposure && (
                    <div className="ml-10 bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                      <h4 className="text-xs uppercase tracking-wider text-destructive mb-2 flex items-center gap-1.5">
                        <AlertTriangle size={12} />
                        Deception Exposure
                      </h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{lesson.deceptionExposure}</p>
                    </div>
                  )}

                  {/* Drill */}
                  {lesson.drill && (
                    <div className="ml-10 bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="text-xs uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                        <Target size={12} />
                        Training Drill
                      </h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{lesson.drill}</p>
                    </div>
                  )}

                  {/* Quiz */}
                  {lesson.quiz && lesson.quiz.length > 0 && (
                    <div className="ml-10">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                        <Brain size={12} className="text-primary" />
                        Knowledge Check
                      </h4>
                      <QuizSection questions={lesson.quiz} />
                    </div>
                  )}
                </div>
              )}

              {/* Lesson footer */}
              <div className="px-5 py-3 bg-muted/30 border-t border-border flex justify-between items-center">
                <span className={`text-xs font-medium ${lesson.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                  {lesson.completed ? '✓ Completed' : `Lesson ${i + 1} of ${module.lessons.length}`}
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
          );
        })}
      </div>
    </div>
  );
}
