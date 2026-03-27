import { useState } from 'react';
import { addHighlight, removeHighlight, highlightColors, type HighlightColor, type Highlight } from '@/lib/highlights';
import { type Testament } from '@/lib/bibleApi';
import InterlinearText from '@/components/InterlinearText';
import { CrossReferenceButton } from '@/components/CrossReferencePopup';
import { Highlighter, Check, X } from 'lucide-react';

interface HighlightableVerseProps {
  verseNumber: number;
  text: string;
  reference: string;
  source: 'bible' | 'lesson';
  testament?: Testament;
  existingHighlight?: Highlight;
  onHighlightChange?: () => void;
}

export default function HighlightableVerse({
  verseNumber,
  text,
  reference,
  source,
  testament = 'OT',
  existingHighlight,
  onHighlightChange,
}: HighlightableVerseProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [highlight, setHighlight] = useState<Highlight | undefined>(existingHighlight);

  const fullRef = `${reference}:${verseNumber}`;
  const colors = highlight ? highlightColors[highlight.color] : null;

  const handleHighlight = (color: HighlightColor) => {
    if (highlight) removeHighlight(highlight.id);
    const newH = addHighlight({ reference: fullRef, text, color, source });
    setHighlight(newH);
    setShowPicker(false);
    onHighlightChange?.();
  };

  const handleRemove = () => {
    if (highlight) {
      removeHighlight(highlight.id);
      setHighlight(undefined);
      setShowPicker(false);
      onHighlightChange?.();
    }
  };

  return (
    <div className="relative group">
      <div
        className={`leading-[1.9] text-[15px] md:text-base rounded-sm px-1 -mx-1 transition-colors ${
          colors
            ? `${colors.bg} ${colors.border} border`
            : 'border border-transparent'
        }`}
      >
        <sup className="text-primary font-mono text-[10px] mr-1.5 select-none font-bold">{verseNumber}</sup>
        <InterlinearText text={text} testament={testament} />
        <button
          onClick={(e) => { e.stopPropagation(); setShowPicker(!showPicker); }}
          className="inline-block ml-1.5 text-muted-foreground opacity-0 group-hover:opacity-60 transition-opacity align-middle hover:text-primary"
          title="Highlight verse"
        >
          <Highlighter size={12} />
        </button>
      </div>

      {/* Color picker popup */}
      {showPicker && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowPicker(false)} />
          <div className="absolute left-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-xl p-2.5 flex items-center gap-2">
            {(Object.keys(highlightColors) as HighlightColor[]).map(color => (
              <button
                key={color}
                onClick={(e) => { e.stopPropagation(); handleHighlight(color); }}
                className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${highlightColors[color].bg} ${highlightColors[color].border} ${
                  highlight?.color === color ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background' : ''
                }`}
                title={highlightColors[color].label}
              >
                {highlight?.color === color && <Check size={12} className="mx-auto text-foreground" />}
              </button>
            ))}
            {highlight && (
              <button
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="w-7 h-7 rounded-full border-2 border-destructive/40 bg-destructive/10 flex items-center justify-center hover:scale-110 transition-all"
                title="Remove highlight"
              >
                <X size={12} className="text-destructive" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
