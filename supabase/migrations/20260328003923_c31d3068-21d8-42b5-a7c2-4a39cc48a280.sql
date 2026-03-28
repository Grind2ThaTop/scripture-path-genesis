
-- Prophecy content table for Truth Cuts Deep engine
CREATE TABLE public.prophecy_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  headline TEXT NOT NULL,
  source_url TEXT,
  source_name TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  scripture_reference TEXT NOT NULL,
  scripture_text TEXT NOT NULL,
  ai_interpretation TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'news',
  status TEXT NOT NULL DEFAULT 'published',
  tags TEXT[] DEFAULT '{}'::TEXT[]
);

-- Enable RLS
ALTER TABLE public.prophecy_content ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read prophecy content
CREATE POLICY "Anyone authed can read prophecy content"
ON public.prophecy_content
FOR SELECT
TO authenticated
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.prophecy_content;
