import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Plus, Trash2, LogOut, Image as ImageIcon, Video, Play, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  upload_date: string;
}

const AdminDashboard = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    type: 'image' as 'image' | 'video'
  });
  const [adminName, setAdminName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadGalleryItems();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/admin/login');
      return;
    }

    // Verify admin status
    const { data: adminData, error } = await supabase
      .from('admin_users')
      .select('name')
      .eq('email', session.user.email)
      .single();

    if (error || !adminData) {
      await supabase.auth.signOut();
      navigate('/admin/login');
      return;
    }

    setAdminName(adminData.name);
  };

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      
      const transformedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type as 'image' | 'video',
        url: item.url,
        thumbnail: item.thumbnail,
        upload_date: item.upload_date
      }));
      
      setItems(transformedData);
    } catch (error) {
      console.error('Error loading gallery:', error);
      toast({
        title: "Error",
        description: "Unable to load gallery.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!uploadForm.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${uploadForm.type}s/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{
          title: uploadForm.title,
          description: uploadForm.description,
          type: uploadForm.type === 'image' ? 'photo' : uploadForm.type,
          url: publicUrl,
          file_name: fileName,
          file_size: file.size
        }]);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });

      // Reset form and reload gallery
      setUploadForm({ title: '', description: '', type: 'image' });
      setIsDialogOpen(false);
      loadGalleryItems();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Error during upload.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteItem = async (item: GalleryItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) {
      return;
    }

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;

      // Delete from storage
      const urlParts = item.url.split('/');
      const filePath = urlParts[urlParts.length - 1];
      const storageType = item.type === 'image' ? 'images' : 'videos';
      
      await supabase.storage
        .from('gallery')
        .remove([`${storageType}/${filePath}`]);

      toast({
        title: "Success",
        description: "Content deleted successfully!",
      });

      loadGalleryItems();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Error during deletion.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AEESTR Dashboard</h1>
            <p className="text-white/80">Welcome, {adminName}</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.filter(item => item.type === 'image').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.filter(item => item.type === 'video').length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Gallery Management
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-hero hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Content to Gallery</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Content title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Content description"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Content Type</Label>
                      <div className="flex gap-4 mt-2">
                        <Button
                          type="button"
                          variant={uploadForm.type === 'image' ? 'default' : 'outline'}
                          onClick={() => setUploadForm(prev => ({ ...prev, type: 'image' }))}
                          className="flex-1"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Image
                        </Button>
                        <Button
                          type="button"
                          variant={uploadForm.type === 'video' ? 'default' : 'outline'}
                          onClick={() => setUploadForm(prev => ({ ...prev, type: 'video' }))}
                          className="flex-1"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Video
                        </Button>
                      </div>
                    </div>

                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={uploadForm.type === 'image' ? 'image/*' : 'video/*'}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isUploading ? 'Uploading...' : `Choose ${uploadForm.type === 'image' ? 'an Image' : 'a Video'}`}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Gallery Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="relative">
                    <img 
                      src={item.thumbnail || `${item.url}#t=1`}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {item.type === "video" ? (
                      <><Video className="w-3 h-3 mr-1" /> Video</>
                    ) : (
                      <><ImageIcon className="w-3 h-3 mr-1" /> Photo</>
                    )}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.upload_date).toLocaleDateString('fr-FR')}
                  </span>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Content</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding photos and videos to your gallery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;