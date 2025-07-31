-- Enable real-time for gallery table
ALTER TABLE public.gallery REPLICA IDENTITY FULL;

-- Add gallery table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery;