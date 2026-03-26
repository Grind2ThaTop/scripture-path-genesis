import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import StudyGuide from "./pages/StudyGuide";
import StudyModule from "./pages/StudyModule";
import HebrewLessons from "./pages/HebrewLessons";
import HebrewLesson from "./pages/HebrewLesson";
import GreekLessons from "./pages/GreekLessons";
import GreekLesson from "./pages/GreekLesson";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/study-guide" element={<StudyGuide />} />
            <Route path="/study-guide/:moduleId" element={<StudyModule />} />
            <Route path="/hebrew" element={<HebrewLessons />} />
            <Route path="/hebrew/:lessonId" element={<HebrewLesson />} />
            <Route path="/greek" element={<GreekLessons />} />
            <Route path="/greek/:lessonId" element={<GreekLesson />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
