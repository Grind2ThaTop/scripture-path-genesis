import { useState, useRef, useEffect } from 'react';
import { lookupWord, type WordEntry } from '@/lib/wordStudy';
import { type Testament } from '@/lib/bibleApi';
import { X, BookOpen, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordStudyPopupProps {
  word: string;
  entry: WordEntry;
  onClose: () => void;
  position: { x: number; y: number };
}

function WordStudyPopup({ word, entry, onClose, position }: WordStudyPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = useState(position);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let x = position.x;
      let y = position.y;
      if (x + rect.width > vw - 16) x = vw - rect.width - 16;
      if (x < 16) x = 16;
      if (y + rect.height > vh - 16) y = position.y - rect.height - 10;
      setAdjustedPos({ x, y });
    }
  }, [position]);

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        style={{ left: adjustedPos.x, top: adjustedPos.y }}
        className="fixed z-50 w-[340px] md:w-[400px] bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-3 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">
              {entry.lang === 'hebrew' ? 'Hebrew' : 'Greek'}
            </span>
            <span className="text-sm font-medium text-foreground capitalize">{word}</span>
            {entry.strongsNumber && (
              <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-0.5">
                <Hash size={9} />{entry.strongsNumber}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Original word */}
        <div className="p-4 border-b border-border bg-muted/10">
          <p className={`text-2xl font-bold text-foreground mb-1 ${entry.lang === 'hebrew' ? 'text-right' : 'text-left'}`}
             dir={entry.lang === 'hebrew' ? 'rtl' : 'ltr'}>
            {entry.original}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary font-semibold">{entry.transliteration}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground italic">{entry.pronunciation}</span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 block">{entry.partOfSpeech}</span>
        </div>

        {/* Definition */}
        <div className="p-4 space-y-3 max-h-[250px] overflow-y-auto">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">Definition</p>
            <p className="text-sm text-foreground leading-relaxed">{entry.definition}</p>
          </div>

          {entry.extendedDef && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">Usage & Depth</p>
              <p className="text-xs text-foreground/80 leading-relaxed">{entry.extendedDef}</p>
            </div>
          )}

          {entry.root && (
            <div className="flex items-start gap-2 bg-muted/30 rounded-md p-2.5 border border-border">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Root</p>
                <p className="text-sm text-foreground">
                  <span className={entry.lang === 'hebrew' ? 'font-bold' : ''}>{entry.root}</span>
                  {entry.rootMeaning && (
                    <span className="text-muted-foreground text-xs ml-2">— {entry.rootMeaning}</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {entry.occurrences && (
            <p className="text-[10px] text-muted-foreground font-mono">
              ~{entry.occurrences.toLocaleString()} occurrences in Scripture
            </p>
          )}
        </div>
      </motion.div>
    </>
  );
}

interface InterlinearTextProps {
  text: string;
  testament: Testament;
}

export default function InterlinearText({ text, testament }: InterlinearTextProps) {
  const [activeWord, setActiveWord] = useState<{ word: string; entry: WordEntry; pos: { x: number; y: number } } | null>(null);

  const words = text.split(/(\s+)/);

  const handleWordClick = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanWord = word.replace(/[^a-zA-Z'-]/g, '');
    if (!cleanWord || cleanWord.length < 2) return;

    const entry = lookupWord(cleanWord, testament);
    if (entry) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setActiveWord({
        word: cleanWord,
        entry,
        pos: { x: rect.left, y: rect.bottom + 8 },
      });
    }
  };

  return (
    <>
      <span>
        {words.map((segment, i) => {
          if (/^\s+$/.test(segment)) return <span key={i}>{segment}</span>;

          const cleanWord = segment.replace(/[^a-zA-Z'-]/g, '');
          const hasEntry = cleanWord.length >= 2 && lookupWord(cleanWord, testament) !== null;
          const punctBefore = segment.match(/^([^a-zA-Z'-]*)/)?.[1] || '';
          const punctAfter = segment.match(/([^a-zA-Z'-]*)$/)?.[1] || '';
          const core = segment.slice(punctBefore.length, segment.length - (punctAfter.length || 0));

          if (!hasEntry) return <span key={i}>{segment}</span>;

          return (
            <span key={i}>
              {punctBefore}
              <span
                onClick={(e) => handleWordClick(core, e)}
                className="cursor-pointer border-b border-dotted border-primary/40 hover:border-primary hover:text-primary transition-colors"
              >
                {core}
              </span>
              {punctAfter}
            </span>
          );
        })}
      </span>

      <AnimatePresence>
        {activeWord && (
          <WordStudyPopup
            word={activeWord.word}
            entry={activeWord.entry}
            position={activeWord.pos}
            onClose={() => setActiveWord(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
