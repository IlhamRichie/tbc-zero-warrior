"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordsIndex, setWordsIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Ganti ke Bahasa Indonesia biar lebih "dapet" feel-nya
  const words = ["Tarik Napas.", "Hembuskan.", "RESPIRE."];

  useEffect(() => {
    // Timer Ganti Kata (Sedikit dipercepat biar ga bosen)
    const wordTimer = setInterval(() => {
      setWordsIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    }, 1200);

    // Timer Progress Bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 35); // Total sekitar 3.5 detik

    // Timer Selesai
    const mainTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3800);

    return () => {
      clearInterval(wordTimer);
      clearInterval(progressTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", // Efek tirai naik ke atas
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          // Ganti BG jadi "Zinc-950" (Hampir Hitam) biar kontras maksimal sama teks putih
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center text-white overflow-hidden"
        >
          {/* Background Noise - Biar ga polos banget */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
          
          {/* Ambient Light (Aura) - Dibuat sangat redup biar teks ga samar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1], // Maksimal opacity 0.3
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[300px] h-[300px] bg-nature-500 rounded-full blur-[150px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
            
            {/* Logo Icon */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-12 p-5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <Activity className="text-sun-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" size={40} />
            </motion.div>

            {/* Teks Utama (Kata-kata) */}
            <div className="h-32 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordsIndex}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  // Font Black + Drop Shadow Hitam Pekat = Anti Samar
                  className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-[0_10px_20px_rgba(0,0,0,1)] text-center leading-tight"
                >
                  {words[wordsIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Progress Bar Area */}
            <div className="mt-16 w-full max-w-xs">
              <div className="flex justify-between items-end mb-3 font-mono text-[10px] tracking-[0.2em] font-bold text-zinc-500">
                <span className="uppercase">System Check</span>
                <span className="text-sun-400 tabular-nums">{progress}%</span>
              </div>
              
              {/* Bar Container */}
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  // Warna Bar Hijau -> Kuning (Gradasi Halus)
                  className="h-full bg-gradient-to-r from-nature-500 to-sun-400 relative"
                >
                    {/* Kilatan Cahaya di ujung bar */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent opacity-50" />
                </motion.div>
              </div>
            </div>

          </div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">
               Techsoft 2026
             </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}