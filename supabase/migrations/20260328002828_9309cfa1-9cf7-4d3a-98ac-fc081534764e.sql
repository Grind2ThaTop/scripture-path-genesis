
-- User levels / progression tracking
CREATE TABLE public.user_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  current_level integer NOT NULL DEFAULT 1,
  xp integer NOT NULL DEFAULT 0,
  lessons_completed integer NOT NULL DEFAULT 0,
  days_consistent integer NOT NULL DEFAULT 0,
  level_unlocked_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
ALTER TABLE public.user_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own level" ON public.user_levels FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own level" ON public.user_levels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own level" ON public.user_levels FOR UPDATE USING (auth.uid() = user_id);

-- Lesson completions
CREATE TABLE public.lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id text NOT NULL,
  module_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  reflection text,
  UNIQUE(user_id, lesson_id)
);
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own completions" ON public.lesson_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completions" ON public.lesson_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own completions" ON public.lesson_completions FOR UPDATE USING (auth.uid() = user_id);

-- Community posts
CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  channel text NOT NULL DEFAULT 'general',
  title text NOT NULL,
  content text NOT NULL,
  post_type text NOT NULL DEFAULT 'discussion',
  likes integer NOT NULL DEFAULT 0,
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authed can read posts" ON public.community_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create posts" ON public.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON public.community_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON public.community_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Community comments
CREATE TABLE public.community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authed can read comments" ON public.community_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create comments" ON public.community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.community_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Daily content
CREATE TABLE public.daily_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  verse_reference text NOT NULL,
  verse_text text NOT NULL,
  breakdown text NOT NULL,
  reflection_question text NOT NULL,
  action_step text NOT NULL,
  deep_study text,
  level_tag text NOT NULL DEFAULT 'milk',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.daily_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authed can read daily content" ON public.daily_content FOR SELECT TO authenticated USING (true);

-- Daily reflections (user responses)
CREATE TABLE public.daily_reflections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  daily_content_id uuid NOT NULL REFERENCES public.daily_content(id) ON DELETE CASCADE,
  reflection_text text NOT NULL,
  action_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, daily_content_id)
);
ALTER TABLE public.daily_reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reflections" ON public.daily_reflections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create reflections" ON public.daily_reflections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reflections" ON public.daily_reflections FOR UPDATE USING (auth.uid() = user_id);

-- Post likes tracking
CREATE TABLE public.post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authed can read likes" ON public.post_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can like" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.post_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Enable realtime for community
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_comments;
