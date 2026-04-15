import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Ofertas from "@/components/Ofertas";
import WaveDivider from "@/components/WaveDivider";
import Catalogo from "@/components/Catalogo";
import Galeria from "@/components/Galeria";
import Horarios from "@/components/Horarios";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <TrustStrip />
    <WaveDivider color="secondary" flip />
    <Ofertas />
    <WaveDivider color="primary" />
    <Catalogo />
    <Galeria />
    <Horarios />
    <Footer />
    <WhatsAppFAB />
  </div>
);

export default Index;
