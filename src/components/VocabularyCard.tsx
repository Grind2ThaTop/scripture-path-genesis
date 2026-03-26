import type { VocabularyTerm } from '@/data/hebrewData';
import { Volume2 } from 'lucide-react';

export default function VocabularyCard({ term }: { term: VocabularyTerm }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <span className="text-3xl font-display leading-none text-foreground">{term.hebrew}</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          <Volume2 size={12} />
          <span className="font-mono">{term.pronunciation}</span>
        </div>
      </div>
      <p className="text-primary font-semibold text-sm mb-1">{term.transliteration}</p>
      <p className="text-sm text-foreground mb-2">{term.meaning}</p>
      {term.scriptureRef && (
        <p className="text-xs text-muted-foreground mb-1">📖 {term.scriptureRef}</p>
      )}
      <p className="text-xs text-muted-foreground italic">"{term.example}"</p>
    </div>
  );
}
