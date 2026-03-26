import { useParams, Link } from 'react-router-dom';
import { hebrewLessons } from '@/data/hebrewData';
import VocabularyCard from '@/components/VocabularyCard';
import QuizSection from '@/components/QuizSection';
import { ArrowLeft, Check } from 'lucide-react';

export default function HebrewLesson() {
  const { lessonId } = useParams();
  const lesson = hebrewLessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Lesson not found.</p>
        <Link to="/hebrew" className="text-primary text-sm hover:underline">Back to Hebrew</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/hebrew" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Hebrew Lessons
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono
            ${lesson.completed ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-muted-foreground border border-border'}`}
          >
            {lesson.completed ? <Check size={14} /> : lesson.order}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{lesson.title}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{lesson.overview}</p>
      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Lesson Progress</span>
          <span className="text-primary font-mono">{lesson.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${lesson.progress}%` }} />
        </div>
      </div>

      {/* Sections */}
      {lesson.sections.map((section, si) => (
        <div key={si} className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>

          {section.type === 'text' && (
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          )}

          {section.type === 'practice' && (
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          )}

          {section.type === 'vocabulary' && section.vocabularyTerms && (
            <>
              {section.content && <p className="text-sm text-muted-foreground">{section.content}</p>}
              <div className="grid gap-3 md:grid-cols-2">
                {section.vocabularyTerms.map(term => (
                  <VocabularyCard key={term.id} term={term} />
                ))}
              </div>
            </>
          )}

          {section.type === 'quiz' && section.quizQuestions && (
            <QuizSection questions={section.quizQuestions} />
          )}
        </div>
      ))}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        {lesson.order > 1 ? (
          <Link
            to={`/hebrew/${hebrewLessons[lesson.order - 2]?.id}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Previous Lesson
          </Link>
        ) : <div />}
        {lesson.order < hebrewLessons.length ? (
          <Link
            to={`/hebrew/${hebrewLessons[lesson.order]?.id}`}
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Next Lesson →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
