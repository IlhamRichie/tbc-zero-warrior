"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react"; // Tambah useState & useEffect
import { Leaf, Wind, Sparkles } from "lucide-react";

export default function FloralLungs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const scale = useTransform(smoothProgress, [0, 0.4], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Efek Mekar
  const bloom = useTransform(smoothProgress, [0.2, 0.6], [0.8, 1]);
  const leafGrowth = useTransform(smoothProgress, [0.2, 0.7], [0, 1]);

  // === FIX: STATE UNTUK NILAI RANDOM ===
  // Kita simpan nilai random di state biar konsisten dan gak error hydration
  const [particles, setParticles] = useState<{w: number, h: number, l: number, d: number, delay: number}[]>([]);
  const [leavesLeft, setLeavesLeft] = useState<{r: number, s: number, d: number}[]>([]);
  const [leavesRight, setLeavesRight] = useState<{r: number, s: number, d: number}[]>([]);

  useEffect(() => {
    // 1. Generate Oksigen/Partikel Background
    setParticles(Array.from({ length: 20 }).map(() => ({
      w: Math.random() * 10 + 2,
      h: Math.random() * 10 + 2,
      l: Math.random() * 100,
      d: Math.random() * 10 + 10,
      delay: Math.random() * 5
    })));

    // 2. Generate Daun Lobus Kiri
    setLeavesLeft(Array.from({ length: 8 }).map((_, i) => ({
      r: Math.random() * 360,
      s: Math.random() * 20 + 10,
      d: i * 0.1 + 0.5
    })));

    // 3. Generate Daun Lobus Kanan
    setLeavesRight(Array.from({ length: 8 }).map((_, i) => ({
      r: Math.random() * -360,
      s: Math.random() * 20 + 10,
      d: i * 0.1 + 0.7
    })));
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 relative flex flex-col items-center overflow-hidden bg-nature-50">
      
      {/* Background Flowing Particles (Oksigen) - Render dari State */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-sun-200/40 rounded-full blur-[1px]"
            style={{
              width: p.w,
              height: p.h,
              left: `${p.l}%`,
              top: "100%",
            }}
            animate={{ y: "-120vh", opacity: [0, 1, 0] }}
            transition={{
              duration: p.d,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="text-center mb-24 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-nature-200 shadow-sm"
        >
          <Wind size={14} className="text-nature-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nature-900/60">Bio-Visualization</span>
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black text-nature-900 leading-[0.9] tracking-tighter">
          Napas yang <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-500 via-emerald-400 to-sun-400 italic pr-2">
            Tumbuh Kembali.
          </span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full max-w-[500px] h-[500px] flex justify-center"
      >
        {/* === PARU-PARU UTAMA === */}
        <motion.div 
          className="relative w-full h-full flex justify-center gap-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: [0.45, 0, 0.55, 1], 
            times: [0, 0.5, 1] 
          }}
        >
          {/* LOBUS KIRI */}
          <motion.div 
            style={{ scale: bloom, originX: 1, originY: 0.5 }}
            className="w-[180px] h-[320px] bg-white rounded-[100px_40px_40px_100px] relative overflow-hidden shadow-[inset_-10px_-10px_30px_rgba(200,230,200,0.2),10px_20px_40px_rgba(0,0,0,0.05)] border border-white/50"
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             <motion.div 
               style={{ opacity: leafGrowth }}
               className="absolute inset-0 flex items-center justify-center flex-wrap content-center gap-4 p-6"
             >
                {/* Render Daun Kiri dari State */}
                {leavesLeft.map((leaf, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1, rotate: leaf.r }} 
                     transition={{ delay: leaf.d }}
                   >
                      <Leaf className="text-nature-300/60" size={leaf.s} />
                   </motion.div>
                ))}
             </motion.div>
             <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-nature-100/30 to-transparent opacity-50 animate-pulse" />
          </motion.div>

          {/* LOBUS KANAN */}
          <motion.div 
            style={{ scale: bloom, originX: 0, originY: 0.5 }}
            className="w-[180px] h-[290px] mt-4 bg-white rounded-[40px_100px_100px_40px] relative overflow-hidden shadow-[inset_10px_-10px_30px_rgba(200,230,200,0.2),-10px_20px_40px_rgba(0,0,0,0.05)] border border-white/50"
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             <motion.div 
               style={{ opacity: leafGrowth }}
               className="absolute inset-0 flex items-center justify-center flex-wrap content-center gap-4 p-6"
             >
                {/* Render Daun Kanan dari State */}
                {leavesRight.map((leaf, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1, rotate: leaf.r }} 
                     transition={{ delay: leaf.d }}
                   >
                      <Leaf className="text-emerald-300/60" size={leaf.s} />
                   </motion.div>
                ))}
             </motion.div>
             <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-emerald-100/30 to-transparent opacity-50 animate-pulse" />
          </motion.div>

          {/* TRACHEA */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-24 bg-gradient-to-b from-transparent via-nature-100 to-transparent opacity-50 blur-sm -z-10" />

        </motion.div>

        {/* Floating Stats Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute top-10 -right-4 md:-right-10 bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl border border-white/60 z-20 max-w-[200px]"
        >
          <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 bg-nature-900 rounded-full flex items-center justify-center text-sun-300">
                <Sparkles size={18} />
             </div>
             <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-nature-900/40">Kondisi</div>
                <div className="text-sm font-black text-nature-900">100% Bersih</div>
             </div>
          </div>
          <p className="text-xs text-nature-900/60 leading-relaxed font-medium">
             Jaringan paru telah beregenerasi sepenuhnya. Oksigen mengalir lancar.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}