import { useState } from 'react';
import { lifeSituations } from '@/data/lifeSituationsData';
import { VerseRef } from '@/components/ScripturePanel';
import { Compass, ChevronDown, ChevronUp, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LifeSituations() {
  const [expandedId, setExpandedId] = useState<string | null>(lifeSituations[0]?.id || null);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Compass size={28} className="text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Life Situations</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Scripture is not theory — it speaks to every real situation you face. Find the truth that applies to your life right now.
        </p>
      </div>

      <div className="space-y-4">
        {lifeSituations.map((situation) => {
          const isExpanded = expandedId === situation.id;
          return (
            <div key={situation.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : situation.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{situation.icon}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{situation.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{situation.overview}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
                      <p className="text-sm text-foreground/80">{situation.overview}</p>

                      {/* Scriptures with application */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                          Scripture & Application
                        </h4>
                        <div className="space-y-3">
                          {situation.scriptures.map((s, i) => (
                            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border">
                              <div className="mb-2">
                                <VerseRef reference={s.ref} />
                              </div>
                              <p className="text-sm text-foreground/80">{s.application}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Principles */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                          Key Principles
                        </h4>
                        <ul className="space-y-2">
                          {situation.principles.map((p, i) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                              <Circle size={6} className="text-primary mt-1.5 flex-shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Steps */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                          Action Steps
                        </h4>
                        <ul className="space-y-2">
                          {situation.actionSteps.map((step, i) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                              <span className="text-primary text-xs font-mono mt-0.5">{i + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
