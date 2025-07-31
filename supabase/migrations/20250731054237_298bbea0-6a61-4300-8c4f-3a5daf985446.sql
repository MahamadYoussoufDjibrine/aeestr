-- Fix infinite recursion in admin_users RLS policy
-- Drop the current problematic policy
DROP POLICY IF EXISTS "Admin users can manage their own data" ON public.admin_users;

-- Create a simpler, safe policy that allows authenticated users to read their own admin record
CREATE POLICY "Users can read their own admin record"
ON public.admin_users
FOR SELECT
USING (email = auth.email());

-- Add policy for inserts (for initial admin setup)
CREATE POLICY "Allow admin record creation"
ON public.admin_users
FOR INSERT
WITH CHECK (true);

-- Add policy for updates
CREATE POLICY "Users can update their own admin record"
ON public.admin_users
FOR UPDATE
USING (email = auth.email());