import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Camera, Video, Plus } from "lucide-react";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample gallery items - in a real app, these would come from a database
  const galleryItems = [
    {
      id: 1,
      type: "image",
      title: "Cérémonie d'Accueil des Nouveaux Étudiants 2024",
      date: "15 Mars 2024",
      category: "events",
      description: "Accueil chaleureux des nouveaux étudiants tchadiens à Kigali",
      thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
      participants: 45
    },
    {
      id: 2,
      type: "video",
      title: "Soirée Culturelle Tchado-Rwandaise",
      date: "28 Février 2024",
      category: "culture",
      description: "Échange culturel entre étudiants tchadiens et rwandais",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
      participants: 78
    },
    {
      id: 3,
      type: "image",
      title: "Atelier de Formation Professionnelle",
      date: "12 Janvier 2024",
      category: "workshops",
      description: "Formation sur les techniques de recherche d'emploi",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      participants: 32
    },
    {
      id: 4,
      type: "image",
      title: "Tournoi Sportif Inter-Universités",
      date: "05 Avril 2024",
      category: "sports",
      description: "Compétition sportive amicale entre universités",
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      participants: 120
    },
    {
      id: 5,
      type: "video",
      title: "Conférence sur l'Entrepreneuriat",
      date: "20 Mars 2024",
      category: "academic",
      description: "Intervention d'entrepreneurs tchadiens et rwandais",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      participants: 85
    },
    {
      id: 6,
      type: "image",
      title: "Célébration de la Fête Nationale du Tchad",
      date: "11 Août 2024",
      category: "culture",
      description: "Commémoration patriotique avec la communauté tchadienne",
      thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
      participants: 95
    }
  ];

  const filters = [
    { id: "all", label: "Tout", count: galleryItems.length },
    { id: "events", label: "Événements", count: galleryItems.filter(item => item.category === "events").length },
    { id: "culture", label: "Culture", count: galleryItems.filter(item => item.category === "culture").length },
    { id: "academic", label: "Académique", count: galleryItems.filter(item => item.category === "academic").length },
    { id: "workshops", label: "Ateliers", count: galleryItems.filter(item => item.category === "workshops").length },
    { id: "sports", label: "Sports", count: galleryItems.filter(item => item.category === "sports").length }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-aeestr-green-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Notre <span className="text-secondary">Galerie</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Découvrez nos activités, événements et moments marquants à travers photos et vidéos. 
            Chaque image raconte l'histoire de notre communauté dynamique.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`transition-all duration-300 ${
                activeFilter === filter.id 
                  ? "bg-gradient-hero shadow-soft" 
                  : "hover:bg-primary/10"
              }`}
            >
              {filter.label}
              <Badge variant="secondary" className="ml-2">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className="overflow-hidden shadow-card hover:shadow-hero transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Media Type Indicator */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {item.type === "video" ? (
                      <><Video className="w-3 h-3 mr-1" /> Vidéo</>
                    ) : (
                      <><Camera className="w-3 h-3 mr-1" /> Photo</>
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
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{item.participants} participants</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Badge 
                    variant="outline" 
                    className="text-xs capitalize border-primary/20 text-primary"
                  >
                    {item.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-card shadow-card">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Partagez Vos Moments
              </h3>
              <p className="text-muted-foreground mb-6">
                Vous avez participé à un événement AEESTR ? Partagez vos photos et vidéos 
                avec la communauté pour enrichir notre galerie.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
                <Camera className="w-4 h-4 mr-2" />
                Envoyer des Photos
              </Button>
              <Button variant="outline" className="border-primary hover:bg-primary/10">
                <Video className="w-4 h-4 mr-2" />
                Envoyer des Vidéos
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Formats acceptés: JPG, PNG, MP4, MOV | Taille max: 10MB
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;