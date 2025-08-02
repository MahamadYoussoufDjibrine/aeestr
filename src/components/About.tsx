import { useTranslation } from "react-i18next";
import { Users, Target, Heart, BookOpen } from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t("about.community.title"),
      description: t("about.community.description")
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t("about.cultural.title"),
      description: t("about.cultural.description")
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t("about.academic.title"),
      description: t("about.academic.description")
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t("about.development.title"),
      description: t("about.development.description")
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            {t("about.description")}
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
              <p className="text-black font-semibold leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-card p-8 md:p-12 rounded-3xl shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {t("about.vision_title")}
              </h3>
              <p className="text-black font-semibold leading-relaxed">
                {t("about.vision_description")}
              </p>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-white p-8 rounded-2xl shadow-card">
                <h4 className="text-xl font-semibold mb-4 text-primary">{t("about.values_title")}</h4>
                <ul className="space-y-3 text-black font-semibold">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t("about.values.unity")}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    {t("about.values.excellence")}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t("about.values.respect")}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    {t("about.values.integrity")}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t("about.values.solidarity")}
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