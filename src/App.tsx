import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import StudyGuide from "./pages/StudyGuide";
import StudyModule from "./pages/StudyModule";
import HebrewLessons from "./pages/HebrewLessons";
import HebrewLesson from "./pages/HebrewLesson";
import GreekLessons from "./pages/GreekLessons";
import GreekLesson from "./pages/GreekLesson";
import LifeSituations from "./pages/LifeSituations";
import BibleReader from "./pages/BibleReader";
import Highlights from "./pages/Highlights";
import Progress from "./pages/Progress";
import AuthPage from "./pages/AuthPage";
import ResetPassword from "./pages/ResetPassword";
import SearchPage from "./pages/SearchPage";
import NotesPage from "./pages/NotesPage";
import ReadingPlansPage from "./pages/ReadingPlansPage";
import SharePage from "./pages/SharePage";
import CommunityPage from "./pages/CommunityPage";
import ProgressionPage from "./pages/ProgressionPage";
import DailyDisciplinePage from "./pages/DailyDisciplinePage";
import ProphecyHub from "./pages/ProphecyHub";
import ViralHub from "./pages/ViralHub";
import TopicEngine from "./pages/TopicEngine";
import LeaderboardPage from "./pages/LeaderboardPage";
import ChurchPage from "./pages/ChurchPage";
import AdminPage from "./pages/AdminPage";
import CalendarPage from "./pages/CalendarPage";
import OnboardingPage from "./pages/OnboardingPage";
import LibraryPage from "./pages/LibraryPage";
import MembersPage from "./pages/MembersPage";
import DiscernmentPage from "./pages/DiscernmentPage";
import YahwehIsOnePage from "./pages/YahwehIsOnePage";
import ShortsEngine from "./pages/ShortsEngine";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/reading-plans" element={<ReadingPlansPage />} />
              <Route path="/study-guide" element={<StudyGuide />} />
              <Route path="/study-guide/:moduleId" element={<StudyModule />} />
              <Route path="/hebrew" element={<HebrewLessons />} />
              <Route path="/hebrew/:lessonId" element={<HebrewLesson />} />
              <Route path="/greek" element={<GreekLessons />} />
              <Route path="/greek/:lessonId" element={<GreekLesson />} />
              <Route path="/bible" element={<BibleReader />} />
              <Route path="/highlights" element={<Highlights />} />
              <Route path="/share" element={<SharePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/progression" element={<ProgressionPage />} />
              <Route path="/daily" element={<DailyDisciplinePage />} />
              <Route path="/prophecy" element={<AdminRoute><ProphecyHub /></AdminRoute>} />
              <Route path="/viral" element={<AdminRoute><ViralHub /></AdminRoute>} />
              <Route path="/topics" element={<AdminRoute><TopicEngine /></AdminRoute>} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/church" element={<ChurchPage />} />
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/discernment" element={<DiscernmentPage />} />
              <Route path="/yahweh-is-one" element={<YahwehIsOnePage />} />
              <Route path="/shorts" element={<ShortsEngine />} />
              <Route path="/life-situations" element={<LifeSituations />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
