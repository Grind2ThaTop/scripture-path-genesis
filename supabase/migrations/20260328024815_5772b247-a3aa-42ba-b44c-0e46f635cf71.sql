
-- Create storage bucket for rendered shorts videos
INSERT INTO storage.buckets (id, name, public) VALUES ('shorts-videos', 'shorts-videos', true);

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload videos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'shorts-videos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow authenticated users to read their own videos
CREATE POLICY "Users can read own videos" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'shorts-videos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read access for sharing
CREATE POLICY "Public can read shorts videos" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'shorts-videos');

-- Allow users to delete their own videos
CREATE POLICY "Users can delete own videos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'shorts-videos' AND (storage.foldername(name))[1] = auth.uid()::text);
