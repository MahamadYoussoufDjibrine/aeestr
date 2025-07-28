-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admin users can manage their own data" 
ON public.admin_users 
FOR ALL 
USING (auth.uid()::text IN (
  SELECT id::text FROM public.admin_users WHERE email = auth.email()
));

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update gallery RLS policies for admin access
DROP POLICY IF EXISTS "Authenticated users can insert gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can update gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can delete gallery items" ON public.gallery;

-- Create admin-only policies for gallery management
CREATE POLICY "Admin users can insert gallery items" 
ON public.gallery 
FOR INSERT 
WITH CHECK (public.is_admin(auth.email()));

CREATE POLICY "Admin users can update gallery items" 
ON public.gallery 
FOR UPDATE 
USING (public.is_admin(auth.email()));

CREATE POLICY "Admin users can delete gallery items" 
ON public.gallery 
FOR DELETE 
USING (public.is_admin(auth.email()));

-- Insert a default admin user (you should change the email and use a proper password)
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('admin@aeestr.org', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'AEESTR Admin');