import { useBackgroundTasks, type BackgroundTask } from "@/hooks/useBackgroundTasks";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, CheckCircle2, Loader2, AlertCircle, Minimize2 } from "lucide-react";

function TaskRow({ task }: { task: BackgroundTask }) {
  const { dismissTask } = useBackgroundTasks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      className="px-4 py-3 border-b border-border/50 last:border-0"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          {task.status === "running" && <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />}
          {task.status === "done" && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
          {task.status === "error" && <AlertCircle className="w-4 h-4 text-destructive shrink-0" />}
          <span className="text-sm font-medium truncate">{task.label}</span>
          <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted shrink-0">{task.module}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground tabular-nums">{Math.round(task.progress)}%</span>
          {task.status !== "running" && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => dismissTask(task.id)}>
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      <Progress value={task.progress} className="h-2" />
      <p className="text-[11px] text-muted-foreground mt-1 truncate">{task.message}</p>
    </motion.div>
  );
}

export default function BackgroundTasksOverlay() {
  const { tasks, minimized, setMinimized } = useBackgroundTasks();

  const activeTasks = tasks.filter(t => t.status === "running");
  const completedTasks = tasks.filter(t => t.status !== "running");
  const allTasks = [...activeTasks, ...completedTasks];

  if (allTasks.length === 0) return null;

  const overallProgress = allTasks.length > 0
    ? allTasks.reduce((sum, t) => sum + t.progress, 0) / allTasks.length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)]"
    >
      <div className="rounded-xl border bg-background/95 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5 bg-muted/50 cursor-pointer"
          onClick={() => setMinimized(!minimized)}
        >
          <div className="flex items-center gap-2">
            {activeTasks.length > 0 && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
            {activeTasks.length === 0 && allTasks.length > 0 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            <span className="text-sm font-semibold">
              {activeTasks.length > 0
                ? `${activeTasks.length} task${activeTasks.length > 1 ? "s" : ""} running`
                : "Tasks complete"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {!minimized && activeTasks.length > 0 && (
              <span className="text-xs text-muted-foreground tabular-nums mr-1">{Math.round(overallProgress)}%</span>
            )}
            {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {/* Minimized progress bar */}
        {minimized && activeTasks.length > 0 && (
          <Progress value={overallProgress} className="h-1.5 rounded-none" />
        )}

        {/* Task list */}
        {!minimized && (
          <div className="max-h-[300px] overflow-y-auto">
            <AnimatePresence>
              {allTasks.map(task => (
                <TaskRow key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
