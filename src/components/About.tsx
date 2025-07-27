import { Users, Target, Heart, BookOpen } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Communauté Unie",
      description: "Rassembler tous les étudiants tchadiens au Rwanda dans une communauté solidaire et bienveillante."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Objectifs Clairs",
      description: "Soutenir la réussite académique et l'intégration sociale de nos membres dans leur parcours éducatif."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Entraide Mutuelle",
      description: "Promouvoir l'entraide entre étudiants pour surmonter ensemble les défis de la vie étudiante."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Excellence Académique",
      description: "Encourager l'excellence dans les études et offrir un accompagnement personnalisé."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            À Propos d'<span className="text-primary">AEESTR</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            L'Association des Étudiants et Élèves Stagiaires Tchadiens au Rwanda (AEESTR) 
            est une organisation dédiée au bien-être et à la réussite de la communauté étudiante 
            tchadienne poursuivant leurs études au Rwanda. Nous servons de pont entre les cultures 
            et facilitons l'intégration académique et sociale de nos membres.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-2xl shadow-card hover:shadow-hero transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-card p-8 md:p-12 rounded-3xl shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Notre Vision pour l'Avenir
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nous aspirons à créer un écosystème éducatif où chaque étudiant tchadien au Rwanda 
                peut s'épanouir pleinement, développer son potentiel et contribuer positivement 
                au développement de nos deux nations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                À travers nos programmes et initiatives, nous bâtissons des ponts durables entre 
                le Tchad et le Rwanda, favorisant les échanges culturels et académiques pour 
                un avenir meilleur.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-white p-8 rounded-2xl shadow-card">
                <h4 className="text-xl font-semibold mb-4 text-primary">Nos Valeurs Fondamentales</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Solidarité et entraide mutuelle
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Excellence académique et professionnelle
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Respect de la diversité culturelle
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Intégrité et transparence
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;