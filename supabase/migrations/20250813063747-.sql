-- Allow admin users to delete contact messages
CREATE POLICY "Admin users can delete contact messages" 
ON public.contacts 
FOR DELETE 
USING (is_admin(auth.email()));