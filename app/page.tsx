import Navbar from "@/components/Navbar"; // Navbar yg tadi tetep dipake
import HeroBreathe from "@/components/HeroBreathe";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-nature-400 selection:text-white">
      <Navbar /> {/* Nanti update warna navbar manual ya biar match */}
      
      <HeroBreathe />
      
      <BentoGrid />
      
      {/* Tambahan Space biar bisa scroll */}
      <div className="h-[200px] text-center pt-20 text-nature-900/40 text-sm">
        <p>Design for Techsoft 2026 • Organic Recovery Concept</p>
      </div>
    </main>
  );
}