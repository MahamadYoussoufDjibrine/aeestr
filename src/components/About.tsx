import { Users, Target, Heart, BookOpen } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "United Community",
      description: "Bringing together all Chadian students in Rwanda in a supportive and caring community."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Clear Objectives",
      description: "Supporting the academic success and social integration of our members in their educational journey."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mutual Support",
      description: "Promoting mutual aid among students to overcome the challenges of student life together."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Academic Excellence",
      description: "Encouraging excellence in studies and offering personalized support."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-primary">AEESTR</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            The Association of Chadian Students and Trainees in Rwanda (AEESTR) 
            is an organization dedicated to the well-being and success of the Chadian student 
            community pursuing their studies in Rwanda. We serve as a bridge between cultures 
            and facilitate the academic and social integration of our members.
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
                Our Vision for the Future
              </h3>
              <p className="text-black font-semibold leading-relaxed mb-6">
                We aspire to create an educational ecosystem where every Chadian student in Rwanda 
                can flourish fully, develop their potential and contribute positively 
                to the development of our two nations.
              </p>
              <p className="text-black font-semibold leading-relaxed">
                Through our programs and initiatives, we build lasting bridges between 
                Chad and Rwanda, fostering cultural and academic exchanges for 
                a better future.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-white p-8 rounded-2xl shadow-card">
                <h4 className="text-xl font-semibold mb-4 text-primary">Our Core Values</h4>
                <ul className="space-y-3 text-black font-semibold">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Solidarity and mutual support
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Academic and professional excellence
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Respect for cultural diversity
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Integrity and transparency
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