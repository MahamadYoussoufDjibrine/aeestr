import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-foreground to-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Association Info */}
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6">AEESTR</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Association des Étudiants et Élèves Stagiaires Tchadiens au Rwanda. 
              Nous accompagnons la réussite de notre communauté étudiante.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Nos Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3 text-white/80">
              <li>Soutien Académique</li>
              <li>Intégration Sociale</li>
              <li>Événements Culturels</li>
              <li>Orientation Professionnelle</li>
              <li>Assistance Administrative</li>
              <li>Médiation et Soutien</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <p className="text-white/80">contact@aeestr.org</p>
                  <p className="text-white/80">info@aeestr.org</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <p className="text-white/80">+250 XXX XXX XXX</p>
                  <p className="text-sm text-white/60">Lun-Ven: 8h-18h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <p className="text-white/80">Kigali, Rwanda</p>
                  <p className="text-sm text-white/60">Adresse complète sur demande</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} AEESTR. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors duration-300">
                Politique de Confidentialité
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Conditions d'Utilisation
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Plan du Site
              </a>
              <a href="/admin/login" className="hover:text-white transition-colors duration-300">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;