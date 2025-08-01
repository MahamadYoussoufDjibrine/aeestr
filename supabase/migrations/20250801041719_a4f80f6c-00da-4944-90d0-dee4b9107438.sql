-- Enable realtime for gallery table
ALTER TABLE public.gallery REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery;