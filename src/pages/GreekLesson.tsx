import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { greekLessons } from '@/data/greekData';
import VocabularyCard from '@/components/VocabularyCard';
import QuizSection from '@/components/QuizSection';
import HighlightableVerse from '@/components/HighlightableVerse';
import { getHighlights, type Highlight } from '@/lib/highlights';
import { ArrowLeft, Check } from 'lucide-react';

export default function GreekLesson() {
  const { lessonId } = useParams();
  const lesson = greekLessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Lesson not found.</p>
        <Link to="/greek" className="text-primary text-sm hover:underline">Back to Greek</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/greek" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Greek Lessons
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

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Lesson Progress</span>
          <span className="text-primary font-mono">{lesson.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${lesson.progress}%` }} />
        </div>
      </div>

      {lesson.sections.map((section, si) => (
        <div key={si} className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>

          {(section.type === 'text' || section.type === 'practice') && (
            <div className="bg-card border border-border rounded-lg p-5 space-y-1">
              {section.content.split('\n').filter(Boolean).map((line, li) => (
                <HighlightableVerse
                  key={li}
                  verseNumber={li + 1}
                  text={line}
                  reference={`Greek: ${lesson.title} — ${section.title}`}
                  source="lesson"
                  existingHighlight={getHighlights().find(h => h.reference === `Greek: ${lesson.title} — ${section.title}:${li + 1}`)}
                />
              ))}
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

      <div className="flex justify-between items-center pt-4 border-t border-border">
        {lesson.order > 1 ? (
          <Link
            to={`/greek/${greekLessons[lesson.order - 2]?.id}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Previous Lesson
          </Link>
        ) : <div />}
        {lesson.order < greekLessons.length ? (
          <Link
            to={`/greek/${greekLessons[lesson.order]?.id}`}
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Next Lesson →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
