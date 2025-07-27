-- Create storage bucket for gallery media
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Create policies for gallery bucket
CREATE POLICY "Gallery items are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can upload to gallery" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Anyone can update gallery items" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can delete gallery items" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery');