import { useState } from 'react';
import type { QuizQuestion } from '@/data/hebrewData';
import { Check, X } from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export default function QuizSection({ questions }: QuizSectionProps) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, oIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const score = questions.filter((q, i) => answers[i] === q.correctIndex).length;

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-3">{qi + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const correct = submitted && q.correctIndex === oi;
              const wrong = submitted && selected && q.correctIndex !== oi;

              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(qi, oi)}
                  className={`
                    w-full text-left text-sm px-3 py-2 rounded border transition-all
                    ${correct ? 'border-primary bg-primary/10 text-primary' : ''}
                    ${wrong ? 'border-destructive bg-destructive/10 text-destructive' : ''}
                    ${!submitted && selected ? 'border-primary bg-primary/5 text-foreground' : ''}
                    ${!submitted && !selected ? 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground' : ''}
                    ${submitted && !correct && !wrong ? 'border-border text-muted-foreground opacity-50' : ''}
                  `}
                >
                  <span className="flex items-center justify-between">
                    {opt}
                    {correct && <Check size={14} />}
                    {wrong && <X size={14} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-2.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Check Answers
        </button>
      ) : (
        <div className="text-center py-3">
          <p className="text-sm font-medium text-foreground">
            Score: <span className="text-primary font-mono">{score}/{questions.length}</span>
          </p>
          <button
            onClick={() => { setAnswers({}); setSubmitted(false); }}
            className="text-xs text-primary hover:underline mt-1"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
