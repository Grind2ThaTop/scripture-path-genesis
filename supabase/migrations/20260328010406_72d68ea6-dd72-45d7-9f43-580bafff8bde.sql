
-- Events/Calendar system
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'teaching',
  speaker TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  scriptures_covered TEXT[],
  related_lesson_id TEXT,
  replay_url TEXT,
  notes TEXT,
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  recurrence_rule TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read events" ON public.events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Event attendance
CREATE TABLE public.event_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'rsvp',
  attended BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (event_id, user_id)
);

ALTER TABLE public.event_attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read attendance" ON public.event_attendance FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can RSVP" ON public.event_attendance FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attendance" ON public.event_attendance FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can cancel RSVP" ON public.event_attendance FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Onboarding responses
CREATE TABLE public.onboarding_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  why_joining TEXT,
  growth_areas TEXT[],
  experience_level TEXT,
  wants_accountability BOOLEAN DEFAULT false,
  wants_circle BOOLEAN DEFAULT false,
  assigned_track TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own onboarding" ON public.onboarding_responses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert onboarding" ON public.onboarding_responses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update onboarding" ON public.onboarding_responses FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Library resources
CREATE TABLE public.library_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL DEFAULT 'article',
  content TEXT,
  file_url TEXT,
  topic TEXT,
  testament TEXT,
  difficulty TEXT DEFAULT 'beginner',
  teacher TEXT,
  media_type TEXT DEFAULT 'text',
  track TEXT,
  tags TEXT[] DEFAULT '{}',
  downloads INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.library_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read resources" ON public.library_resources FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage resources" ON public.library_resources FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Make user_levels readable by all authed (for leaderboard/member directory)
CREATE POLICY "Authed can read all levels" ON public.user_levels FOR SELECT TO authenticated USING (true);
