"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Scan, AlertTriangle, Search, Crosshair, Activity, Fingerprint } from "lucide-react";

export default function LungScanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDetected, setIsDetected] = useState(false);
  const [showHint, setShowHint] = useState(true); // Tutorial awal

  // Koordinat Mouse/Pointer
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config lebih smooth
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Auto-Demo saat pertama kali load (biar user tau harus ngapain)
  useEffect(() => {
    const demoAnimation = async () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      
      // Gerakan simulasi
      x.set(rect.width * 0.5);
      y.set(rect.height * 0.5);
      
      await new Promise(r => setTimeout(r, 1000));
      x.set(rect.width * 0.2); // Gerak ke kiri
      y.set(rect.height * 0.45);
      
      await new Promise(r => setTimeout(r, 1500));
      setShowHint(false); // Hilangkan hint kalau user mulai interaksi
    };
    
    // Jalanin demo kalau user belum hover
    const timer = setTimeout(() => {
       if (!isHovering) demoAnimation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Logic deteksi
  useEffect(() => {
    const unsubscribe = springX.on("change", (latestX) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      
      const relX = (latestX / rect.width) * 100;
      const relY = (springY.get() / rect.height) * 100;

      // Area Bakteri (Kiri & Kanan)
      const dist1 = Math.hypot(relX - 25, relY - 45); 
      const dist2 = Math.hypot(relX - 75, relY - 55);
      
      const detected = dist1 < 12 || dist2 < 12; // Radius deteksi diperbesar biar gampang
      setIsDetected(detected);
    });
    return () => unsubscribe();
  }, [springX, springY]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
      setShowHint(false); // Matikan hint pas user gerak
      setIsHovering(true);
    }
  }

  return (
    <section className="py-24 bg-nature-950 relative overflow-hidden cursor-crosshair">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* INFO PANEL */}
        <div className="lg:w-1/3 text-nature-50">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 mb-6 text-sun-400"
          >
            <Activity size={18} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase">AI Scanner v2.0</span>
          </motion.div>

          <h2 className="text-5xl font-black mb-6 leading-[1.1] tracking-tighter">
            Cek Paru<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sun-300 via-nature-400 to-emerald-400">
              X-Ray Digital
            </span>
          </h2>

          <p className="text-nature-200/60 leading-relaxed mb-10 text-lg">
            Gerakkan kursor Anda ke area paru-paru untuk memindai kesehatan organ dalam secara real-time.
          </p>
          
          <div className={`p-6 rounded-2xl border transition-all duration-500 backdrop-blur-xl ${
            isDetected ? "bg-rose-500/10 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]" : "bg-white/5 border-white/10"
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl transition-colors duration-300 ${isDetected ? "bg-rose-500 animate-pulse" : "bg-nature-800"}`}>
                {isDetected ? <AlertTriangle size={24} className="text-white" /> : <Scan size={24} className="text-sun-400" />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Status Diagnosa</p>
                <p className={`font-bold text-lg ${isDetected ? "text-rose-400" : "text-sun-300"}`}>
                  {isDetected ? "BAKTERI DITEMUKAN!" : "MEMINDAI..."}
                </p>
              </div>
            </div>
            
            {/* Instruksi Pemula */}
            {!isDetected && (
               <div className="flex items-center gap-2 text-xs text-white/40 mt-2 bg-black/20 p-2 rounded-lg">
                  <Fingerprint size={14} />
                  <span>Arahkan ke titik gelap untuk analisis</span>
               </div>
            )}
          </div>
        </div>

        {/* SCANNER VIEWPORT */}
        <div 
          ref={ref}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => { setIsHovering(false); setIsDetected(false); }}
          className="lg:w-2/3 w-full h-[500px] md:h-[600px] relative rounded-[3rem] overflow-hidden bg-nature-900 shadow-2xl border-4 border-nature-800 group touch-none select-none"
        >
          {/* Overlay Grid */}
          <div className="absolute inset-0 pointer-events-none z-30 opacity-10 bg-[size:50px_50px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" />

          {/* Hint Overlay (Tutorial) */}
          <AnimatePresence>
            {showHint && !isHovering && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px]"
              >
                <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md flex flex-col items-center gap-2">
                   <Scan size={32} className="text-sun-400 animate-pulse" />
                   <p className="text-white font-bold text-sm tracking-widest uppercase">Gerakkan Kursor Di Sini</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 1: SICK LUNGS (Base) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 grayscale contrast-125">
             <LungSVG isDetected={isDetected} />
          </div>

          {/* LAYER 2: X-RAY REVEAL (Masked) */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              WebkitMaskImage: useTransform(() => `radial-gradient(circle ${isDetected ? 200 : 130}px at ${springX.get()}px ${springY.get()}px, black 10%, transparent 70%)`),
              maskImage: useTransform(() => `radial-gradient(circle ${isDetected ? 200 : 130}px at ${springX.get()}px ${springY.get()}px, black 10%, transparent 70%)`),
            }}
          >
             <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${isDetected ? "bg-rose-900/60" : "bg-emerald-900/40"}`}>
                <LungSVG isDetected={isDetected} xrayMode />
             </div>
          </motion.div>

          {/* CUSTOM CURSOR (LENS) */}
          <motion.div
            style={{ x: springX, y: springY }}
            className={`absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full border-[3px] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 transition-all duration-300 ${
              isDetected 
                ? "border-rose-500 bg-rose-500/10 shadow-[0_0_60px_rgba(244,63,94,0.6)] scale-110" 
                : "border-sun-400 bg-sun-400/5 shadow-[0_0_30px_rgba(250,204,21,0.3)] scale-100"
            }`}
          >
             {/* Crosshair Animation */}
             <div className="relative w-full h-full animate-spin-slow-reverse opacity-50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-current" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-current" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-4 bg-current" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-4 bg-current" />
             </div>
             
             {isDetected && (
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -bottom-10 bg-rose-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest shadow-xl"
                >
                  BACTERIA FOUND
                </motion.div>
             )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Komponen SVG Paru-paru dipisah biar rapi
function LungSVG({ isDetected, xrayMode = false }: { isDetected: boolean, xrayMode?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-[85%] h-[85%] transition-all duration-500">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      
      {/* Paru Kiri */}
      <motion.path 
        d="M50 40 Q20 60 25 100 T50 160 Q80 100 50 40 Z" 
        className={xrayMode ? (isDetected ? "stroke-rose-400 fill-transparent stroke-[0.8]" : "stroke-emerald-400 fill-transparent stroke-[0.8]") : "fill-nature-950 stroke-nature-700 stroke-[0.5]"}
        filter={xrayMode ? "url(#glow)" : ""}
      />
      
      {/* Paru Kanan */}
      <motion.path 
        d="M150 40 Q180 60 175 100 T150 160 Q120 100 150 40 Z" 
        className={xrayMode ? (isDetected ? "stroke-rose-400 fill-transparent stroke-[0.8]" : "stroke-emerald-400 fill-transparent stroke-[0.8]") : "fill-nature-950 stroke-nature-700 stroke-[0.5]"}
        filter={xrayMode ? "url(#glow)" : ""}
      />

      {/* Titik Bakteri (Hanya muncul di Xray Mode) */}
      {xrayMode && (
        <>
          <circle cx="25%" cy="45%" r="3" className={`${isDetected ? "fill-rose-500 animate-ping" : "fill-white/10"}`} />
          <circle cx="75%" cy="55%" r="4" className={`${isDetected ? "fill-rose-500 animate-ping delay-150" : "fill-white/10"}`} />
          
          {/* Target Zone Hints (Lingkaran tipis buat petunjuk) */}
          {!isDetected && (
             <>
               <circle cx="25%" cy="45%" r="15" className="stroke-white/10 fill-transparent stroke-[0.5] animate-pulse" />
               <circle cx="75%" cy="55%" r="15" className="stroke-white/10 fill-transparent stroke-[0.5] animate-pulse delay-500" />
             </>
          )}
        </>
      )}
    </svg>
  );
}