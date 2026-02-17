"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Scan, AlertTriangle, Search } from "lucide-react";

export default function LungScanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Koordinat Mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Biar gerakan senternya mulus (ada delay dikit kayak magnet)
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      // Hitung posisi mouse relatif terhadap kotak scanner
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  }

  return (
    <section className="py-24 bg-nature-900 relative overflow-hidden cursor-none">
      {/* Background Grid biar kesan Tech */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* TEXT SECTION */}
        <div className="md:w-1/3 text-nature-50">
          <div className="flex items-center gap-2 mb-4 text-sun-300">
            <Scan className="animate-pulse" />
            <span className="font-mono text-sm tracking-widest uppercase">System Check</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Deteksi Dini <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sun-300 to-nature-400">
              X-Ray Vision
            </span>
          </h2>
          <p className="text-nature-100/60 leading-relaxed mb-8">
            Gunakan kursor Anda untuk memindai area paru-paru. Temukan bercak bakteri tersembunyi yang sering diabaikan.
          </p>
          
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-sm">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={16} className="text-sun-300" />
              <span className="font-bold">Status Scanner:</span>
            </div>
            <p className="opacity-70">
              {isHovering ? "Memindai jaringan..." : "Menunggu input kursor..."}
            </p>
          </div>
        </div>

        {/* SCANNER AREA (THE MAGIC) */}
        <div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="md:w-2/3 w-full h-[500px] relative rounded-[3rem] overflow-hidden bg-nature-800 shadow-2xl border border-nature-700 group"
        >
          
          {/* LAYER 1: SICK LUNGS (Gelap/Kusam) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 grayscale">
             {/* Kita pake SVG Paru-paru Abstract Sederhana */}
             <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] fill-nature-900 stroke-nature-600 stroke-[0.5]">
                <path d="M50 40 Q20 60 25 100 T50 160 Q80 100 50 40 Z" /> {/* Paru Kiri */}
                <path d="M150 40 Q180 60 175 100 T150 160 Q120 100 150 40 Z" /> {/* Paru Kanan */}
                {/* Bercak Bakteri */}
                <circle cx="40" cy="90" r="5" fill="#4B2C2C" className="animate-pulse" /> 
                <circle cx="160" cy="110" r="8" fill="#4B2C2C" className="animate-pulse delay-75" /> 
             </svg>
             <p className="absolute bottom-10 text-nature-500 font-mono text-xs">MODE: STANDARD VIEW</p>
          </div>

          {/* LAYER 2: HEALTHY/X-RAY (Masking Effect) */}
          <motion.div 
            style={{ 
              maskImage: "radial-gradient(circle at var(--mask-x) var(--mask-y), black 20%, transparent 50%)",
              WebkitMaskImage: "radial-gradient(circle at 150px 150px, black 20%, transparent 100%)", // Fallback
            }}
            className="absolute inset-0 flex items-center justify-center bg-nature-900"
          >
             {/* Kita pake SVG Paru-paru yg sama tapi GLOWING */}
             {/* PENTING: Framer Motion butuh kita update variabel CSS custom buat masking */}
             <MaskedContent x={springX} y={springY} />
          </motion.div>

          {/* CUSTOM CURSOR (Kaca Pembesar) */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute top-0 left-0 w-32 h-32 rounded-full border-2 border-sun-300 bg-sun-300/10 backdrop-blur-none pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 mix-blend-screen shadow-[0_0_30px_rgba(243,222,138,0.4)]"
          >
             <Search size={24} className="text-sun-300/80" />
             {/* Garis Crosshair */}
             <div className="absolute w-full h-[1px] bg-sun-300/30" />
             <div className="absolute h-full w-[1px] bg-sun-300/30" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Komponen Kecil buat ngatur Masking CSS Variable
function MaskedContent({ x, y }: any) {
  // Update CSS variable secara realtime biar mask-nya gerak
  // Ini trik tingkat dewa biar performa kenceng (gak nge-lag)
  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center bg-nature-800 relative"
      style={{
        maskImage: useTransform(() => `radial-gradient(circle 120px at ${x.get()}px ${y.get()}px, black, transparent)`),
        WebkitMaskImage: useTransform(() => `radial-gradient(circle 120px at ${x.get()}px ${y.get()}px, black, transparent)`),
      }}
    >
       {/* Background Grid XRAY */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(127,176,105,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(127,176,105,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
       
       <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] fill-transparent stroke-sun-300 stroke-[1.5] drop-shadow-[0_0_15px_rgba(127,176,105,0.8)]">
          <path d="M50 40 Q20 60 25 100 T50 160 Q80 100 50 40 Z" />
          <path d="M150 40 Q180 60 175 100 T150 160 Q120 100 150 40 Z" />
          
          {/* Detail Pembuluh Darah / Alveoli (Visual Tech) */}
          <path d="M50 60 L40 80 M50 90 L60 110" strokeWidth="0.5" className="opacity-50" />
          <path d="M150 60 L160 80 M150 90 L140 110" strokeWidth="0.5" className="opacity-50" />
       </svg>

       {/* Floating Data Points (Cuma muncul pas disorot) */}
       <div className="absolute top-[40%] left-[30%] flex flex-col items-center">
         <div className="w-2 h-2 bg-sun-400 rounded-full animate-ping" />
         <span className="text-[10px] text-sun-300 font-mono mt-1 bg-black/50 px-1 rounded">INFEKSI AKTIF</span>
       </div>
    </motion.div>
  );
}