import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export interface BackgroundTask {
  id: string;
  label: string;
  module: string;
  progress: number; // 0-100
  message: string;
  status: "running" | "done" | "error";
  createdAt: number;
  onComplete?: (result: any) => void;
}

interface BackgroundTasksContextType {
  tasks: BackgroundTask[];
  addTask: (task: Omit<BackgroundTask, "createdAt">) => void;
  updateTask: (id: string, updates: Partial<BackgroundTask>) => void;
  removeTask: (id: string) => void;
  dismissTask: (id: string) => void;
  getTask: (id: string) => BackgroundTask | undefined;
  minimized: boolean;
  setMinimized: (v: boolean) => void;
}

const BackgroundTasksContext = createContext<BackgroundTasksContextType | null>(null);

export function BackgroundTasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<BackgroundTask[]>([]);
  const [minimized, setMinimized] = useState(false);
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  const addTask = useCallback((task: Omit<BackgroundTask, "createdAt">) => {
    setTasks(prev => [...prev, { ...task, createdAt: Date.now() }]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<BackgroundTask>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const getTask = useCallback((id: string) => {
    return tasksRef.current.find(t => t.id === id);
  }, []);

  return (
    <BackgroundTasksContext.Provider value={{ tasks, addTask, updateTask, removeTask, dismissTask, getTask, minimized, setMinimized }}>
      {children}
    </BackgroundTasksContext.Provider>
  );
}

export function useBackgroundTasks() {
  const ctx = useContext(BackgroundTasksContext);
  if (!ctx) throw new Error("useBackgroundTasks must be used within BackgroundTasksProvider");
  return ctx;
}
