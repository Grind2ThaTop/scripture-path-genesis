import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCrossReferences, hasCrossReferences, type CrossRef } from '@/lib/crossReferences';
import { GitBranch, ExternalLink, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrossReferenceButtonProps {
  bookName: string;
  chapter: number;
  verse: number;
}

export function CrossReferenceButton({ bookName, chapter, verse }: CrossReferenceButtonProps) {
  const [open, setOpen] = useState(false);
  const refs = getCrossReferences(bookName, chapter, verse);

  if (refs.length === 0) return null;

  return (
    <span className="relative inline-block align-middle ml-1">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="text-primary/70 hover:text-primary transition-colors"
        title={`${refs.length} cross-references`}
      >
        <GitBranch size={12} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 z-50 w-[340px] max-h-[400px] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-border p-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-primary" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Cross References
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-mono font-bold">
                    {refs.length}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Cross-ref list */}
              <div className="p-2 space-y-1">
                {refs.map((cr, i) => (
                  <CrossRefItem key={i} crossRef={cr} onClose={() => setOpen(false)} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}

function CrossRefItem({ crossRef, onClose }: { crossRef: CrossRef; onClose: () => void }) {
  // Parse reference to create link
  const match = crossRef.ref.match(/^(.+?)\s+(\d+):(\d+)$/);
  const linkTo = match
    ? `/bible?book=${encodeURIComponent(match[1])}&chapter=${match[2]}`
    : '/bible';

  return (
    <Link
      to={linkTo}
      onClick={onClose}
      className="block p-2.5 rounded-lg hover:bg-muted/50 transition-colors group/ref border border-transparent hover:border-border"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-primary font-mono">{crossRef.ref}</span>
            <ChevronRight size={10} className="text-muted-foreground opacity-0 group-hover/ref:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed italic truncate">
            "{crossRef.text}"
          </p>
          <p className="text-[10px] text-primary/70 mt-1 font-medium">
            ↗ {crossRef.connection}
          </p>
        </div>
        <ExternalLink size={10} className="text-muted-foreground mt-1 opacity-0 group-hover/ref:opacity-60 transition-opacity flex-shrink-0" />
      </div>
    </Link>
  );
}

export default CrossReferenceButton;
