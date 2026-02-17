"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Leaf, Wind } from "lucide-react";

export default function FloralLungs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animasi: Paru-paru membesar (napas) dan bunga bermekaran saat scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateLeaves = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={containerRef} className="py-32 px-6 relative flex flex-col items-center">
      <motion.div style={{ opacity }} className="text-center mb-16 z-10">
        <div className="inline-flex items-center gap-2 text-nature-500 font-bold mb-4">
          <Wind size={20} className="animate-pulse" />
          <span className="uppercase tracking-[0.3em] text-xs">Vitality Visualization</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-nature-900 leading-tight">
          Napas yang <br/><span className="text-nature-400">Tumbuh Kembali.</span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full max-w-lg aspect-square flex items-center justify-center"
      >
        {/* PARU-PARU ABSTRACT (Floral Style) */}
        <div className="relative w-full h-full">
          {/* Lobe Kiri */}
          <motion.div 
            style={{ rotate: rotateLeaves }}
            className="absolute left-[10%] top-0 w-[40%] h-full bg-nature-100 rounded-l-[100px] rounded-br-[50px] border-2 border-nature-200 overflow-hidden flex items-center justify-center"
          >
            <div className="grid grid-cols-3 gap-2 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => (
                <Leaf key={i} className="text-nature-400" size={24} />
              ))}
            </div>
          </motion.div>

          {/* Lobe Kanan */}
          <motion.div 
            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -45]) }}
            className="absolute right-[10%] top-0 w-[40%] h-full bg-nature-100 rounded-r-[100px] rounded-bl-[50px] border-2 border-nature-200 overflow-hidden flex items-center justify-center"
          >
             <div className="grid grid-cols-3 gap-2 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => (
                <Leaf key={i} className="text-nature-400" size={24} />
              ))}
            </div>
          </motion.div>

          {/* Center Stem (Trachea) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1/2 bg-gradient-to-b from-sun-300 to-nature-400 rounded-full blur-[1px]" />
        </div>

        {/* Floating Icons pas Sehat */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 right-10 p-4 bg-white rounded-2xl shadow-xl border border-nature-100 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-nature-400 rounded-full flex items-center justify-center text-white font-bold">100%</div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-nature-900/40 uppercase">Kapasitas Oksigen</p>
            <p className="text-xs font-black text-nature-900 tracking-tight">Optimal & Segar</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}