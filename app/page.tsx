import Navbar from "@/components/Navbar";
import HeroBreathe from "@/components/HeroBreathe";
import SymptomSwiper from "@/components/SymptomSwiper"; // <-- FITUR BARU
import LungScanner from "@/components/LungScanner";
import BentoGrid from "@/components/BentoGrid";
import HealingJourney from "@/components/HealingJourney";

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-nature-400 selection:text-white">
      <Navbar />
      
      <HeroBreathe />

      {/* Bagian Interaktif didahulukan biar user langsung main */}
      <SymptomSwiper /> 
      
      <LungScanner />
      
      <BentoGrid />
      
      <HealingJourney />
      
      {/* Footer Simple */}
      <footer className="py-12 bg-nature-900 text-center text-nature-100/50">
        <p className="font-mono text-sm">Dibuat dengan ❤️ untuk Indonesia Bebas TBC</p>
      </footer>
    </main>
  );
}