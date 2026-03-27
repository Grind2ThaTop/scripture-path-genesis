import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getHighlights, removeHighlight, highlightColors, type Highlight, type HighlightColor } from '@/lib/highlights';
import { Highlighter, Trash2, BookOpen, GraduationCap, Filter } from 'lucide-react';

export default function Highlights() {
  const [highlights, setHighlights] = useState<Highlight[]>(getHighlights());
  const [filterColor, setFilterColor] = useState<HighlightColor | 'all'>('all');
  const [filterSource, setFilterSource] = useState<'all' | 'bible' | 'lesson'>('all');

  const filtered = highlights.filter(h => {
    if (filterColor !== 'all' && h.color !== filterColor) return false;
    if (filterSource !== 'all' && h.source !== filterSource) return false;
    return true;
  });

  const handleRemove = (id: string) => {
    removeHighlight(id);
    setHighlights(getHighlights());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <Highlighter className="text-primary" size={28} />
          My Highlights
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {highlights.length} saved highlight{highlights.length !== 1 ? 's' : ''} — tap any verse in the Bible or lessons to highlight it.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Filter size={14} />
          <span>Filter:</span>
        </div>

        {/* Source filter */}
        <div className="flex gap-1">
          {(['all', 'bible', 'lesson'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterSource(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterSource === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'all' ? 'All' : s === 'bible' ? 'Bible' : 'Lessons'}
            </button>
          ))}
        </div>

        {/* Color filter */}
        <div className="flex gap-1.5 ml-2">
          <button
            onClick={() => setFilterColor('all')}
            className={`w-6 h-6 rounded-full border-2 transition-colors ${
              filterColor === 'all' ? 'border-foreground bg-muted' : 'border-border bg-muted/30'
            }`}
            title="All colors"
          />
          {(Object.keys(highlightColors) as HighlightColor[]).map(color => (
            <button
              key={color}
              onClick={() => setFilterColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-colors ${highlightColors[color].bg} ${
                filterColor === color ? 'border-foreground scale-110' : `${highlightColors[color].border}`
              }`}
              title={highlightColors[color].label}
            />
          ))}
        </div>
      </div>

      {/* Highlights list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Highlighter size={40} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-display font-semibold text-lg">No highlights yet</p>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            Tap on any verse in the Bible reader or in your lessons to highlight and save it here for quick reference.
          </p>
          <Link
            to="/bible"
            className="inline-flex items-center gap-2 mt-4 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <BookOpen size={16} />
            Open Bible
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(h => {
            const colors = highlightColors[h.color];
            return (
              <div
                key={h.id}
                className={`${colors.bg} border ${colors.border} rounded-lg p-4 group transition-colors`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {h.source === 'bible' ? (
                        <BookOpen size={14} className="text-primary shrink-0" />
                      ) : (
                        <GraduationCap size={14} className="text-primary shrink-0" />
                      )}
                      <span className="text-sm font-display font-bold text-foreground">{h.reference}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {colors.label}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed">{h.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-mono">
                      {new Date(h.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(h.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0 p-1"
                    title="Remove highlight"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
