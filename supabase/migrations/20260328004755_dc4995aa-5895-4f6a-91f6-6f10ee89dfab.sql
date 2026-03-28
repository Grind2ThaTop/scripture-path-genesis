
CREATE TABLE public.viral_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_platform TEXT NOT NULL DEFAULT 'web',
  source_url TEXT,
  source_title TEXT NOT NULL,
  source_description TEXT,
  viral_score INTEGER DEFAULT 0,
  emotional_trigger TEXT,
  controversy TEXT,
  core_topic TEXT,
  biblical_angle TEXT NOT NULL,
  scripture_reference TEXT NOT NULL,
  scripture_text TEXT NOT NULL,
  tiktok_script TEXT,
  ig_caption TEXT,
  youtube_short_script TEXT,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  status TEXT NOT NULL DEFAULT 'draft'
);

ALTER TABLE public.viral_content ENABLE ROW LEVEL SECURITY;

-- Admin can do everything, regular users can only read published
CREATE POLICY "Anyone authed can read published viral content"
ON public.viral_content FOR SELECT TO authenticated
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert viral content"
ON public.viral_content FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update viral content"
ON public.viral_content FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete viral content"
ON public.viral_content FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
