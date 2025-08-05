import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <AnnouncementBanner />
      <main>
        <section id="home">
          <Hero />
        </section>
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
