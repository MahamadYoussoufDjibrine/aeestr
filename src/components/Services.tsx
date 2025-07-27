import { GraduationCap, Users2, Calendar, Briefcase, Globe, Handshake } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Soutien Académique",
      description: "Tutorat, groupes d'étude, et partage de ressources éducatives pour améliorer vos performances scolaires.",
      features: ["Sessions de tutorat", "Groupes d'étude", "Ressources pédagogiques", "Accompagnement personnalisé"]
    },
    {
      icon: <Users2 className="w-10 h-10" />,
      title: "Intégration Sociale",
      description: "Faciliter votre adaptation à la vie rwandaise et créer des liens durables avec la communauté locale.",
      features: ["Activités d'accueil", "Parrainage étudiant", "Échanges culturels", "Réseau social"]
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Événements Culturels",
      description: "Organisation d'événements pour célébrer notre héritage tchadien et découvrir la culture rwandaise.",
      features: ["Fêtes traditionnelles", "Soirées culturelles", "Conférences", "Festivals"]
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Orientation Professionnelle",
      description: "Conseils pour votre carrière, stages, et opportunités d'emploi au Rwanda et au Tchad.",
      features: ["Conseils carrière", "Recherche de stages", "Networking professionnel", "Ateliers CV"]
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Assistance Administrative",
      description: "Aide pour les démarches administratives, visa, logement, et autres formalités officielles.",
      features: ["Aide visa/permis", "Recherche logement", "Démarches légales", "Orientation administrative"]
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: "Médiation et Soutien",
      description: "Médiation en cas de conflits et soutien psychologique pour votre bien-être général.",
      features: ["Médiation conflits", "Soutien psychologique", "Conseil personnel", "Assistance d'urgence"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-aeestr-blue-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Nos <span className="text-primary">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            AEESTR offre une gamme complète de services pour accompagner les étudiants tchadiens 
            dans leur parcours académique et leur intégration sociale au Rwanda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-card hover:shadow-hero transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-card p-8 md:p-12 rounded-3xl shadow-soft">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Besoin d'une Assistance Personnalisée ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Notre équipe est disponible pour vous accompagner dans vos démarches spécifiques. 
              N'hésitez pas à nous contacter pour une consultation personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Disponible 24/7</span>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Réponse rapide</span>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Service gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;