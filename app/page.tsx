import Preloader from "@/components/Preloader";
import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import HeroBreathe from "@/components/HeroBreathe";
import SymptomSwiper from "@/components/SymptomSwiper";
import LungScanner from "@/components/LungScanner";
import VentilationSim from "@/components/VentilationSim";
import FloralLungs from "@/components/FloralLungs"; // <-- Baru
import BentoGrid from "@/components/BentoGrid";
import HealingJourney from "@/components/HealingJourney";
import A11ySettings from "@/components/A11ySettings"; // <-- Baru
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-nature-400 selection:text-white bg-nature-50">
      <Preloader />
      <FloatingParticles /> 
      <A11ySettings />
      <Navbar />
      
      {/* Beranda / Hero */}
      <section id="beranda">
        <HeroBreathe />
      </section>

      {/* Simulasi / Tentang */}
      <section id="tentang">
        <FloralLungs />
        <VentilationSim />
      </section>

      {/* Cek Gejala */}
      <section id="cek-gejala">
        <SymptomSwiper /> 
      </section>
      
      {/* Scanner */}
      <section id="scanner">
        <LungScanner />
      </section>
      
      <BentoGrid />

      {/* Roadmap */}
      <section id="roadmap">
        <HealingJourney />
      </section>
      
      <Footer />
    </main>
  );
}