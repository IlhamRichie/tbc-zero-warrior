"use client";
import { motion } from "framer-motion";
import { Wind, Mic } from "lucide-react"; // Ikon napas & suara

export default function HeroBreathe() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4">
      
      {/* BACKGROUND BREATHING ANIMATION (Jantungnya Website) */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} // Ritme napas 6 detik
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-nature-400/20 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-sun-300/30 rounded-full blur-[60px]"
        />
      </div>

      {/* Badge "Optimistic" */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-nature-100 shadow-sm mb-8"
      >
        <div className="w-2 h-2 bg-nature-400 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-nature-900">Healing Journey Partner</span>
      </motion.div>

      {/* Main Copy */}
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-nature-900 mb-6 drop-shadow-sm">
        Just <span className="text-nature-400 italic">Breathe.</span>
      </h1>
      <p className="text-xl text-nature-900/70 max-w-xl mx-auto mb-10 leading-relaxed">
        Pemulihan TBC bukan akhir, tapi awal dari napas yang lebih segar. 
        Pantau, rawat, dan sembuh alami bersama kami.
      </p>

      {/* Voice-First UI (Floating Mic) */}
      <div className="relative group">
        <button className="bg-nature-900 text-white pl-6 pr-14 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3">
          <span>Mulai Perjalanan Sembuh</span>
        </button>
        
        {/* Tombol Mic yg "Nempel" */}
        <button className="absolute right-2 top-2 bottom-2 aspect-square bg-nature-500 rounded-xl flex items-center justify-center text-white hover:bg-sun-400 transition-colors group-hover:scale-105">
          <Mic size={20} />
        </button>
      </div>

    </section>
  );
}