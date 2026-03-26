import { studyModules } from '@/data/studyGuideData';
import ModuleCard from '@/components/ModuleCard';
import MaturityTracker from '@/components/MaturityTracker';

export default function StudyGuide() {
  const totalProgress = Math.round(studyModules.reduce((a, m) => a + m.progress, 0) / studyModules.length);
  const milkModules = studyModules.filter(m => m.difficulty === 'milk');
  const breadModules = studyModules.filter(m => m.difficulty === 'bread');
  const meatModules = studyModules.filter(m => m.difficulty === 'meat');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Study Guide</h1>
        <p className="text-muted-foreground text-sm">A structured path from foundational truths to mature understanding.</p>
      </div>

      <MaturityTracker currentLevel="bread" overallProgress={totalProgress} />

      {[
        { label: '🥛 Milk — Foundations', modules: milkModules },
        { label: '🍞 Bread — Growing', modules: breadModules },
        { label: '🥩 Meat — Mature', modules: meatModules },
      ].map(section => (
        section.modules.length > 0 && (
          <div key={section.label}>
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">{section.label}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.modules.map(m => <ModuleCard key={m.id} module={m} />)}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
