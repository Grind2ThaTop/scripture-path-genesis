
CREATE TABLE public.daily_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  hook TEXT NOT NULL,
  angle TEXT NOT NULL,
  scripture_refs TEXT[] DEFAULT '{}'::TEXT[],
  content_type TEXT NOT NULL DEFAULT 'controversy',
  philly_angle TEXT,
  tiktok_hook TEXT,
  used BOOLEAN NOT NULL DEFAULT false,
  priority INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.daily_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authed can read topics"
ON public.daily_topics FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage topics"
ON public.daily_topics FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
