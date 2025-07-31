-- Insert gallery records for uploaded images
INSERT INTO public.gallery (title, description, type, url, file_name, file_size)
VALUES 
  ('Meeting Photo 1', 'AEESTR team meeting', 'image', 'https://mizarsmnrvmssrgymnfr.supabase.co/storage/v1/object/public/gallery/meeting3.jpg', 'meeting3.jpg', 0),
  ('Team Members', 'AEESTR team members', 'image', 'https://mizarsmnrvmssrgymnfr.supabase.co/storage/v1/object/public/gallery/membre.jpg', 'membre.jpg', 0),
  ('Meeting Photo 2', 'AEESTR meeting session', 'image', 'https://mizarsmnrvmssrgymnfr.supabase.co/storage/v1/object/public/gallery/meet4.csv.jpg', 'meet4.csv.jpg', 0);