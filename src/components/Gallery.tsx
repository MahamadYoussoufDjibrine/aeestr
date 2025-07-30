import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Filter, X, Play, Image as ImageIcon, Video } from "lucide-react";
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

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Load gallery items from database
  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      
      // Transform data to match GalleryItem interface
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


  const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

  return (
    <section id="gallery" className="py-20 bg-aeestr-blue-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Our <span className="text-secondary">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            Discover our activities, events and memorable moments through photos and videos. 
            Chaque image raconte l'histoire de notre communauté dynamique.
          </p>
        </div>

        {/* Filter and Upload Controls */}
        <div className="animate-fade-in-up mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Tout voir ({items.length})
            </Button>
            <Button
              variant={filter === 'image' ? 'default' : 'outline'}
              onClick={() => setFilter('image')}
              className="flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Photos ({items.filter(item => item.type === 'image').length})
            </Button>
            <Button
              variant={filter === 'video' ? 'default' : 'outline'}
              onClick={() => setFilter('video')}
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Videos ({items.filter(item => item.type === 'video').length})
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id}
                className="overflow-hidden shadow-card hover:shadow-hero transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="relative">
                      <img 
                        src={item.thumbnail || `${item.url}#t=1`}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-3">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Media Type Indicator */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {item.type === "video" ? (
                        <><Video className="w-3 h-3 mr-1" /> Vidéo</>
                      ) : (
                        <><ImageIcon className="w-3 h-3 mr-1" /> Photo</>
                      )}
                    </Badge>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">Cliquer pour voir plus</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-foreground line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-black font-semibold text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="text-sm text-black font-semibold">
                    <span>{new Date(item.upload_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Aucun contenu trouvé</h3>
            <p className="text-black font-semibold mb-6">
              {filter === 'all' 
                ? "La galerie est vide. Soyez le premier à partager du contenu !"
                : `Aucun ${filter === 'image' ? 'photo' : 'vidéo'} trouvée.`
              }
            </p>
          </div>
        )}

        {/* Media Viewer Modal */}
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-4 top-4"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogHeader>
              <div className="mt-4">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title}
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                  />
                ) : (
                  <video 
                    src={selectedItem.url}
                    controls
                    className="w-full max-h-[60vh] rounded-lg"
                  />
                )}
                {selectedItem.description && (
                  <p className="mt-4 text-black font-semibold">{selectedItem.description}</p>
                )}
                <p className="text-sm text-black font-semibold mt-2">
                  Uploadé le {new Date(selectedItem.upload_date).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default Gallery;