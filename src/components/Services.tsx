import { useTranslation } from "react-i18next";
import { GraduationCap, Users2, Calendar, Briefcase, Globe, Handshake } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: t("services.academic_support.title"),
      description: t("services.academic_support.description")
    },
    {
      icon: <Users2 className="w-10 h-10" />,
      title: t("services.mentorship.title"),
      description: t("services.mentorship.description")
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: t("services.cultural_events.title"),
      description: t("services.cultural_events.description")
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: t("services.career_guidance.title"),
      description: t("services.career_guidance.description")
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: t("services.emergency_support.title"),
      description: t("services.emergency_support.description")
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: t("services.networking.title"),
      description: t("services.networking.description")
    }
  ];

  return (
    <section id="services" className="py-20 bg-aeestr-blue-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {t("services.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            {t("services.description")}
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
              <p className="text-black font-semibold leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-card p-8 md:p-12 rounded-3xl shadow-soft">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Need Personalized Assistance?
            </h3>
            <p className="text-black font-semibold mb-8 max-w-2xl mx-auto leading-relaxed">
              Our team is available to help you with your specific needs. 
              Don't hesitate to contact us for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Available 24/7</span>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Quick response</span>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Free service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;