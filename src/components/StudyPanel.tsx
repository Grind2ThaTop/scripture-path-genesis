import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { type Testament } from '@/lib/bibleApi';
import { getCrossReferencesAsync, type CrossRef } from '@/lib/crossReferences';
import { fetchHebrewText, fetchWordData, streamVerseStudy, type HebrewWordData } from '@/lib/studyPanelApi';
import { restoreNames } from '@/lib/restoreNames';
import {
  X, ChevronUp, ChevronDown, BookOpen, Languages, Brain,
  GitBranch, Loader2, Sparkles, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StudyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  verseRef: string;        // e.g. "Genesis 1:1"
  verseText: string;       // KJV text (already name-restored)
  bookName: string;
  chapter: number;
  verse: number;
  testament: Testament;
}

type TabType = 'overview' | 'original' | 'ai-explain' | 'cross-refs';

export default function StudyPanel({
  isOpen, onClose, verseRef, verseText,
  bookName, chapter, verse, testament
}: StudyPanelProps) {
  const [tab, setTab] = useState<TabType>('overview');
  const [expanded, setExpanded] = useState(false);

  // Original language state
  const [hebrewText, setHebrewText] = useState<string | null>(null);
  const [loadingHebrew, setLoadingHebrew] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordData, setWordData] = useState<HebrewWordData | null>(null);
  const [loadingWord, setLoadingWord] = useState(false);

  // AI state
  const [aiContent, setAiContent] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState<'explain' | 'word_study'>('explain');

  // Cross-refs state
  const [crossRefs, setCrossRefs] = useState<CrossRef[]>([]);
  const [loadingRefs, setLoadingRefs] = useState(false);

  // Reset when verse changes
  useEffect(() => {
    if (isOpen) {
      setTab('overview');
      setHebrewText(null);
      setSelectedWord(null);
      setWordData(null);
      setAiContent('');
      setAiError(null);
      setExpanded(false);
    }
  }, [verseRef, isOpen]);

  // Load Hebrew when original tab selected
  useEffect(() => {
    if (tab === 'original' && testament === 'OT' && !hebrewText && !loadingHebrew) {
      setLoadingHebrew(true);
      fetchHebrewText(bookName, chapter, verse).then(text => {
        setHebrewText(text);
        setLoadingHebrew(false);
      });
    }
  }, [tab, testament, bookName, chapter, verse]);

  // Load cross-refs when tab selected
  useEffect(() => {
    if (tab === 'cross-refs' && crossRefs.length === 0 && !loadingRefs) {
      setLoadingRefs(true);
      getCrossReferencesAsync(bookName, chapter, verse).then(refs => {
        setCrossRefs(refs);
        setLoadingRefs(false);
      });
    }
  }, [tab, bookName, chapter, verse]);

  const handleWordClick = useCallback(async (word: string) => {
    setSelectedWord(word);
    setLoadingWord(true);
    const data = await fetchWordData(word);
    setWordData(data);
    setLoadingWord(false);
  }, []);

  const handleAiStudy = useCallback((mode: 'explain' | 'word_study') => {
    setAiMode(mode);
    setAiContent('');
    setAiError(null);
    setAiLoading(true);
    streamVerseStudy(
      verseRef, verseText, testament, mode,
      (delta) => setAiContent(prev => prev + delta),
      () => setAiLoading(false),
      (error) => { setAiError(error); setAiLoading(false); }
    );
  }, [verseRef, verseText, testament]);

  // Start AI when tab is selected
  useEffect(() => {
    if (tab === 'ai-explain' && !aiContent && !aiLoading && !aiError) {
      handleAiStudy('explain');
    }
  }, [tab]);

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BookOpen size={14} /> },
    { key: 'original', label: testament === 'OT' ? 'Hebrew' : 'Greek', icon: <Languages size={14} /> },
    { key: 'ai-explain', label: 'AI Study', icon: <Brain size={14} /> },
    { key: 'cross-refs', label: 'Cross-Refs', icon: <GitBranch size={14} /> },
  ];

  const drawerHeight = expanded ? 'h-[85vh]' : 'h-[55vh]';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 z-50 ${drawerHeight} transition-all duration-300 bg-card border-t border-border rounded-t-2xl shadow-2xl flex flex-col`}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-2 border-b border-border">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-bold text-primary truncate">{verseRef}</h3>
                <p className="text-xs text-muted-foreground truncate italic">"{verseText.slice(0, 80)}{verseText.length > 80 ? '...' : ''}"</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-3 py-2 border-b border-border overflow-x-auto">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    tab === t.key
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {tab === 'overview' && <OverviewTab verseRef={verseRef} verseText={verseText} testament={testament} />}
              {tab === 'original' && (
                <OriginalTab
                  testament={testament}
                  hebrewText={hebrewText}
                  loadingHebrew={loadingHebrew}
                  selectedWord={selectedWord}
                  wordData={wordData}
                  loadingWord={loadingWord}
                  onWordClick={handleWordClick}
                  verseText={verseText}
                />
              )}
              {tab === 'ai-explain' && (
                <AITab
                  content={aiContent}
                  loading={aiLoading}
                  error={aiError}
                  mode={aiMode}
                  onModeChange={handleAiStudy}
                />
              )}
              {tab === 'cross-refs' && (
                <CrossRefsTab refs={crossRefs} loading={loadingRefs} onClose={onClose} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ==================== SUB-TABS ====================

function OverviewTab({ verseRef, verseText, testament }: { verseRef: string; verseText: string; testament: Testament }) {
  return (
    <div className="space-y-4">
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <p className="text-foreground leading-relaxed text-sm">{verseText}</p>
        <p className="text-xs text-muted-foreground mt-2 font-mono">{verseRef} · KJV Restored Names</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/20 border border-border rounded-lg p-3">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Testament</span>
          <p className="text-sm text-foreground font-medium mt-1">
            {testament === 'OT' ? 'Old Testament' : testament === 'NT' ? 'New Testament' : 'Extra-Canon'}
          </p>
        </div>
        <div className="bg-muted/20 border border-border rounded-lg p-3">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Original Language</span>
          <p className="text-sm text-foreground font-medium mt-1">
            {testament === 'OT' ? 'Hebrew / Aramaic' : testament === 'NT' ? 'Koine Greek' : 'Various'}
          </p>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={12} className="text-primary" />
          <span className="text-xs font-bold text-primary">Quick Tip</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Use the <strong>Hebrew/Greek</strong> tab to see the original text and click individual words for Strong's definitions. 
          Use <strong>AI Study</strong> for a deep breakdown of this verse's meaning.
        </p>
      </div>
    </div>
  );
}

function OriginalTab({
  testament, hebrewText, loadingHebrew, selectedWord, wordData, loadingWord, onWordClick, verseText
}: {
  testament: Testament;
  hebrewText: string | null;
  loadingHebrew: boolean;
  selectedWord: string | null;
  wordData: HebrewWordData | null;
  loadingWord: boolean;
  onWordClick: (word: string) => void;
  verseText: string;
}) {
  if (testament !== 'OT') {
    return (
      <div className="space-y-3">
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">New Testament — Koine Greek</p>
          <p className="text-sm text-muted-foreground italic">
            Greek text integration via AI word study. Use the <strong>AI Study</strong> tab → <strong>Word Study</strong> mode for full Greek breakdown with Strong's numbers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loadingHebrew && (
        <div className="flex items-center gap-2 py-8 justify-center text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Loading Hebrew text...</span>
        </div>
      )}

      {!loadingHebrew && hebrewText && (
        <>
          {/* Hebrew text display */}
          <div className="bg-muted/20 border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-bold">
              Hebrew Text — Click any word
            </p>
            <div className="text-right leading-loose" dir="rtl">
              {hebrewText.split(/\s+/).map((word, i) => (
                <button
                  key={i}
                  onClick={() => onWordClick(word)}
                  className={`inline-block mx-1 px-1.5 py-0.5 rounded text-lg font-serif transition-colors ${
                    selectedWord === word
                      ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                      : 'text-foreground hover:bg-muted/60 hover:text-primary'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Word details */}
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2"
            >
              {loadingWord ? (
                <div className="flex items-center gap-2 py-4 justify-center text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-xs">Looking up word...</span>
                </div>
              ) : wordData ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xl font-serif text-primary">{wordData.word}</span>
                      {wordData.transliteration && (
                        <span className="text-sm text-muted-foreground ml-2 italic">{wordData.transliteration}</span>
                      )}
                    </div>
                    {wordData.strongsNumber && (
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-bold">
                        {wordData.strongsNumber}
                      </span>
                    )}
                  </div>
                  {wordData.morphology && (
                    <p className="text-xs text-muted-foreground">Morphology: {wordData.morphology}</p>
                  )}
                  <p className="text-sm text-foreground leading-relaxed">{wordData.definition}</p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-2">
                  No lexicon data found for this word. Try the AI Study → Word Study for a deeper analysis.
                </p>
              )}
            </motion.div>
          )}
        </>
      )}

      {!loadingHebrew && !hebrewText && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Hebrew text not available for this verse.</p>
          <p className="text-xs mt-1">Try the AI Study tab for original language analysis.</p>
        </div>
      )}
    </div>
  );
}

function AITab({
  content, loading, error, mode, onModeChange
}: {
  content: string;
  loading: boolean;
  error: string | null;
  mode: 'explain' | 'word_study';
  onModeChange: (mode: 'explain' | 'word_study') => void;
}) {
  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange('explain')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            mode === 'explain'
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          <Brain size={12} />
          Deep Explanation
        </button>
        <button
          onClick={() => onModeChange('word_study')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            mode === 'word_study'
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          <Languages size={12} />
          Word-by-Word Study
        </button>
      </div>

      {/* Content */}
      <div className="bg-muted/20 border border-border rounded-lg p-4">
        {error && (
          <div className="text-destructive text-sm text-center py-4">
            <p>{error}</p>
          </div>
        )}

        {!error && !content && loading && (
          <div className="flex items-center gap-2 py-8 justify-center text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">AI is studying this verse...</span>
          </div>
        )}

        {content && (
          <div className="prose prose-sm prose-invert max-w-none 
            prose-headings:text-primary prose-headings:font-display prose-headings:text-sm
            prose-p:text-muted-foreground prose-p:text-sm prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-li:text-muted-foreground prose-li:text-sm
            prose-code:text-primary prose-code:text-xs">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {loading && content && (
          <div className="flex items-center gap-1 mt-3 text-primary">
            <Loader2 size={12} className="animate-spin" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Generating...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CrossRefsTab({ refs, loading, onClose }: { refs: CrossRef[]; loading: boolean; onClose: () => void }) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 py-8 justify-center text-muted-foreground">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Loading cross-references...</span>
      </div>
    );
  }

  if (refs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No cross-references found for this verse.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
        {refs.length} Connected Scriptures
      </p>
      {refs.map((cr, i) => {
        const match = cr.ref.match(/^(.+?)\s+(\d+):(\d+)/);
        const linkTo = match
          ? `/bible?book=${encodeURIComponent(match[1])}&chapter=${match[2]}`
          : '/bible';

        return (
          <Link
            key={i}
            to={linkTo}
            onClick={onClose}
            className="block p-2.5 rounded-lg hover:bg-muted/50 transition-colors group/ref border border-transparent hover:border-border"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary font-mono">{cr.ref}</span>
              <ChevronRight size={10} className="text-muted-foreground opacity-0 group-hover/ref:opacity-100 transition-opacity" />
            </div>
            {cr.text && (
              <p className="text-xs text-muted-foreground italic truncate mt-0.5">"{cr.text}"</p>
            )}
            {cr.connection && (
              <p className="text-[10px] text-primary/70 mt-0.5 font-medium">↗ {cr.connection}</p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
