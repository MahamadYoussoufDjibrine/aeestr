-- Add new admin user for AEESTR organization
INSERT INTO public.admin_users (name, email, password_hash)
VALUES (
  'AEESTR Admin',
  'aeestr235@gmail.com',
  crypt('admin123', gen_salt('bf'))
);