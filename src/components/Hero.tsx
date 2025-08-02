import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t("hero.welcome")} <span className="text-primary-glow">AEESTR</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 font-light">
            {t("hero.association_name")}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/80 leading-relaxed font-medium">
            {t("hero.tagline")}
          </p>
          <p className="text-base md:text-lg mb-12 max-w-3xl mx-auto text-white/70 leading-relaxed">
            {t("hero.description")}
          </p>
          
          <div className="flex justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-secondary hover:bg-white/90 shadow-hero px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('about')}
            >
              {t("hero.discover_mission")}
            </Button>
          </div>
        </div>
        
        <div className="animate-float">
          <ChevronDown 
            className="w-8 h-8 mx-auto cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => scrollToSection('about')}
          />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '-3s' }}></div>
    </section>
  );
};

export default Hero;