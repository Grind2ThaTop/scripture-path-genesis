
-- Badges/achievements system
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  category TEXT NOT NULL DEFAULT 'general',
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL DEFAULT 1,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authed can read badges" ON public.badges FOR SELECT TO authenticated USING (true);

-- User earned badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "System can insert badges" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Prayer requests
CREATE TABLE public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  request_text TEXT NOT NULL,
  is_answered BOOLEAN NOT NULL DEFAULT false,
  praying_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read prayers" ON public.prayer_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create prayers" ON public.prayer_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prayers" ON public.prayer_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Prayer support (who's praying)
CREATE TABLE public.prayer_support (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_id UUID REFERENCES public.prayer_requests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (prayer_id, user_id)
);

ALTER TABLE public.prayer_support ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read support" ON public.prayer_support FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can add support" ON public.prayer_support FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove support" ON public.prayer_support FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Accountability groups
CREATE TABLE public.accountability_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  max_members INTEGER NOT NULL DEFAULT 10,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.accountability_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read groups" ON public.accountability_groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authed can create groups" ON public.accountability_groups FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

-- Group members
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.accountability_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (group_id, user_id)
);

ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authed can read members" ON public.group_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can join groups" ON public.group_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON public.group_members FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Banned users table
CREATE TABLE public.banned_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  banned_by UUID NOT NULL,
  reason TEXT,
  banned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

ALTER TABLE public.banned_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read bans" ON public.banned_users FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can ban" ON public.banned_users FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can unban" ON public.banned_users FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Make profiles readable by all authed (for leaderboard)
CREATE POLICY "Authed can read all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
