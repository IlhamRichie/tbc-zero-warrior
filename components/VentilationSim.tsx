"use client";
import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sun, Wind, Bug, Sparkles, Cloud } from "lucide-react";

export default function VentilationSim() {
  const [value, setValue] = useState(0);
  const [bacteriaPositions, setBacteriaPositions] = useState<{ top: number; left: number }[]>([]);

  // === LOGIC PHYSICS (Tetap dipertahankan) ===
  const smoothValue = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    smoothValue.set(value);
  }, [value, smoothValue]);

  // Window movement
  const yMove = useTransform(smoothValue, [0, 100], ["0%", "-85%"]);
  
  // Visual transformations
  const opacitySky = useTransform(smoothValue, [0, 50], [0, 1]);
  const glassOpacity = useTransform(smoothValue, [0, 90], [1, 0.2]);
  const roomBrightness = useTransform(smoothValue, [0, 100], [0.3, 1]); // Ruangan jadi terang
  const sunRayOpacity = useTransform(smoothValue, [20, 100], [0, 0.6]); // Berkas cahaya

  // Slider visual
  const thumbLeft = useTransform(smoothValue, (v) => `${v}%`);
  const trackWidth = useTransform(smoothValue, (v) => `${v}%`);
  const trackColor = useTransform(smoothValue, [0, 50, 100], ["#ef4444", "#f59e0b", "#10b981"]); // Merah -> Kuning -> Hijau

  useEffect(() => {
    setBacteriaPositions(
      Array.from({ length: 5 }).map(() => ({
        top: 30 + Math.random() * 40,
        left: 20 + Math.random() * 60,
      }))
    );
  }, []);

  const bacteriaCount = Math.max(0, 5 - Math.floor(value / 20));

  return (
    <section className="py-24 px-6 bg-nature-50 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/50 flex flex-col md:flex-row relative z-10">
        
        {/* === VISUAL ROOM === */}
        <motion.div
          className="relative w-full md:w-1/2 h-[500px] flex items-center justify-center overflow-hidden"
          style={{ 
            backgroundColor: "#0f172a", // Base color gelap
          }}
        >
          {/* 1. LAYER LANGIT (Muncul pas dibuka) */}
          <motion.div
            className="absolute inset-0 bg-sky-300 z-0"
            style={{ opacity: opacitySky }}
          >
             <Cloud className="absolute top-10 left-10 text-white/40 w-20 h-20" />
             <Cloud className="absolute top-20 right-20 text-white/30 w-12 h-12" />
          </motion.div>
          
          {/* 2. LAYER DINDING DALAM (Terang/Gelap ikut slider) */}
          <motion.div 
             className="absolute inset-0 bg-nature-100 z-0 pointer-events-none mix-blend-overlay"
             style={{ opacity: roomBrightness }}
          />

          {/* 3. GOD RAYS (Berkas Cahaya Masuk) */}
          <motion.div 
            style={{ opacity: sunRayOpacity, rotate: -20 }}
            className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none z-10 blur-xl transform origin-top-right"
          />

          {/* === JENDELA UTAMA === */}
          <div className="relative z-20 w-72 h-96 bg-stone-800 border-[16px] border-stone-700 rounded-t-[120px] shadow-2xl overflow-hidden">
            
            {/* Pemandangan Luar (Matahari) */}
            <div className="absolute inset-0 bg-sky-400 overflow-hidden">
              <motion.div
                style={{ opacity: opacitySky, scale: opacitySky }}
                className="absolute top-8 right-8"
              >
                <Sun className="text-yellow-300 w-16 h-16 animate-spin-slow drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
              </motion.div>
            </div>

            {/* KACA JENDELA (Sliding Part) */}
            <motion.div
              className="absolute inset-0 bg-slate-700/80 backdrop-blur-[4px] border-b-[16px] border-slate-600 flex flex-col justify-end"
              style={{ y: yMove, opacity: glassOpacity }}
            >
              <div className="w-full h-full relative overflow-hidden">
                {/* Refleksi Kaca */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent" />
                <div className="absolute top-10 right-10 w-2 h-32 bg-white/20 rotate-12 rounded-full blur-[1px]" />
                
                {/* Handle Jendela */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-400 rounded-full shadow-lg border border-slate-300" />
              </div>
            </motion.div>

            {/* Tralis Jendela (Tetap) */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-40">
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-stone-900" />
              <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-stone-900" />
            </div>
          </div>

          {/* === PARTIKEL & BAKTERI === */}
          
          {/* Partikel Debu (Muncul pas gelap) */}
          <motion.div style={{ opacity: useTransform(smoothValue, [0, 50], [1, 0]) }} className="absolute inset-0 pointer-events-none">
             {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" 
                     style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />
             ))}
          </motion.div>

          {/* Partikel Angin Segar (Muncul pas terang) */}
          <motion.div style={{ opacity: useTransform(smoothValue, [60, 100], [0, 1]) }} className="absolute inset-0 pointer-events-none z-30">
             <Wind className="absolute top-1/4 left-10 text-white/30 w-12 h-12 animate-pulse" />
             <Wind className="absolute bottom-1/4 right-10 text-white/30 w-8 h-8 animate-pulse delay-700" />
          </motion.div>

          {/* Bakteri yang Melayang */}
          <AnimatePresence>
            {bacteriaPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute z-40 pointer-events-none"
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  opacity: i < bacteriaCount ? 1 : 0,
                  scale: i < bacteriaCount ? 1 : 0,
                  y: [0, -15, 0], // Floating effect
                  x: [0, 5, 0],
                }}
                transition={{ 
                   opacity: { duration: 0.5 },
                   scale: { duration: 0.5 },
                   y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 } 
                }}
                style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              >
                <div className="relative">
                   <Bug size={28} className="text-tbc-danger drop-shadow-md" strokeWidth={2.5} />
                   {/* Aura Kuman */}
                   <div className="absolute inset-0 bg-red-500/30 blur-md rounded-full -z-10 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

        </motion.div>

        {/* === CONTROLLER === */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white z-40 relative">
          {/* Background Pattern halus */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-nature-500 font-bold mb-4">
              <div className="p-2 bg-nature-100 rounded-lg"><Wind size={18} /></div>
              <span className="uppercase tracking-widest text-xs">Simulasi Ventilasi</span>
            </div>

            <h3 className="text-4xl font-black text-nature-900 mb-4 leading-[1.1]">
              Buka Jendela,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 to-emerald-600">Usir Penyakit.</span>
            </h3>

            <p className="text-nature-900/60 mb-12 leading-relaxed">
              Sirkulasi udara buruk memerangkap bakteri TBC hingga berjam-jam. Biarkan sinar matahari masuk sebagai disinfektan alami.
            </p>

            {/* CUSTOM SLIDER */}
            <div className="relative h-20 w-full flex items-center justify-center group select-none">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-50"
              />

              {/* Track Background */}
              <div className="absolute w-full h-6 bg-nature-50 rounded-full overflow-hidden border border-nature-200 pointer-events-none shadow-inner">
                {/* Dynamic Colored Track */}
                <motion.div
                  className="absolute top-0 bottom-0 left-0"
                  style={{ 
                    width: trackWidth,
                    backgroundColor: trackColor 
                  }}
                />
              </div>

              {/* Thumb (Matahari) */}
              <motion.div
                className="absolute h-14 w-14 bg-white border-[3px] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center justify-center pointer-events-none z-20"
                style={{
                  left: thumbLeft,
                  x: "-50%",
                  borderColor: trackColor
                }}
              >
                {/* Icon berubah sesuai progress */}
                {value > 50 ? (
                    <Sun className="text-sun-400 fill-sun-400" size={24} />
                ) : (
                    <Sparkles className="text-slate-400" size={20} />
                )}
              </motion.div>
            </div>

            <div className="mt-2 flex justify-between text-[10px] font-black tracking-widest text-nature-900/30 uppercase">
              <span>Tertutup (Bahaya)</span>
              <span>Terbuka (Aman)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}