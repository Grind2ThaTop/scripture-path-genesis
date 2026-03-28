
-- Shorts projects table
CREATE TABLE public.shorts_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  verse_reference TEXT NOT NULL,
  verse_text TEXT,
  duration INTEGER NOT NULL DEFAULT 30,
  style TEXT NOT NULL DEFAULT 'urban-prophetic',
  tone TEXT NOT NULL DEFAULT 'urgent',
  voice_preset TEXT DEFAULT 'truth-narrator',
  cta TEXT DEFAULT 'Follow for truth',
  status TEXT NOT NULL DEFAULT 'draft',
  script TEXT,
  final_video_url TEXT,
  youtube_title TEXT,
  youtube_description TEXT,
  hashtags TEXT[],
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.shorts_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own shorts projects"
  ON public.shorts_projects FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create shorts projects"
  ON public.shorts_projects FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own shorts projects"
  ON public.shorts_projects FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own shorts projects"
  ON public.shorts_projects FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Shorts scenes table
CREATE TABLE public.shorts_scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.shorts_projects(id) ON DELETE CASCADE,
  scene_order INTEGER NOT NULL DEFAULT 0,
  narration_text TEXT NOT NULL DEFAULT '',
  caption_text TEXT NOT NULL DEFAULT '',
  verse_reference TEXT,
  image_prompt TEXT,
  generated_image_url TEXT,
  motion_type TEXT DEFAULT 'ken-burns',
  video_generation_id TEXT,
  duration_ms INTEGER NOT NULL DEFAULT 5000,
  transition_type TEXT DEFAULT 'fade',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.shorts_scenes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scenes"
  ON public.shorts_scenes FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.shorts_projects WHERE id = project_id AND user_id = auth.uid()));

CREATE POLICY "Users can create scenes"
  ON public.shorts_scenes FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.shorts_projects WHERE id = project_id AND user_id = auth.uid()));

CREATE POLICY "Users can update own scenes"
  ON public.shorts_scenes FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.shorts_projects WHERE id = project_id AND user_id = auth.uid()));

CREATE POLICY "Users can delete own scenes"
  ON public.shorts_scenes FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.shorts_projects WHERE id = project_id AND user_id = auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_shorts_projects_updated_at
  BEFORE UPDATE ON public.shorts_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shorts_scenes_updated_at
  BEFORE UPDATE ON public.shorts_scenes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
