import type { MaturityLevel } from '@/data/studyGuideData';

const levels: { key: MaturityLevel; label: string; icon: string }[] = [
  { key: 'milk', label: 'Milk', icon: '🥛' },
  { key: 'bread', label: 'Bread', icon: '🍞' },
  { key: 'meat', label: 'Meat', icon: '🥩' },
];

interface MaturityTrackerProps {
  currentLevel: MaturityLevel;
  overallProgress: number;
}

export default function MaturityTracker({ currentLevel, overallProgress }: MaturityTrackerProps) {
  const currentIndex = levels.findIndex(l => l.key === currentLevel);

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Maturity Track</h3>
      <div className="flex items-center justify-between mb-4">
        {levels.map((level, i) => (
          <div key={level.key} className="flex flex-col items-center flex-1">
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl
                transition-all duration-300
                ${i <= currentIndex
                  ? 'bg-primary/20 border-2 border-primary glow-gold'
                  : 'bg-muted border-2 border-border'
                }
              `}
            >
              {level.icon}
            </div>
            <span className={`text-xs mt-2 font-medium ${i <= currentIndex ? 'text-primary' : 'text-muted-foreground'}`}>
              {level.label}
            </span>
            {i < levels.length - 1 && (
              <div className="hidden" /> // connector handled below
            )}
          </div>
        ))}
      </div>
      {/* Connectors */}
      <div className="flex items-center px-6 -mt-10 mb-6">
        {[0, 1].map(i => (
          <div key={i} className="flex-1 h-0.5 mx-1">
            <div className={`h-full ${i < currentIndex ? 'bg-primary' : 'bg-border'}`} />
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="text-primary font-mono">{overallProgress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
