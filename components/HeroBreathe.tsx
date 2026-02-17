"use client";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";

export default function HeroBreathe() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-6 bg-nature-50">
      
      {/* 1. BACKGROUND BREATHING ENGINE (Tetap dipertahankan sebagai nyawa visual) */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1], 
            rotate: [0, 90, 0],
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 30% 70% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-nature-400/20 to-sun-300/10 blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, delay: 0.5, repeat: Infinity }}
          className="absolute w-[300px] h-[300px] bg-white rounded-full blur-[120px]"
        />
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="relative z-10 max-w-4xl">
        {/* Badge & Floating Guide Dihapus untuk tampilan yang lebih Clean & Jos */}

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-black tracking-tighter text-nature-900 mb-8 leading-[0.9]"
        >
          Hanya Perlu <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 to-sun-400 italic font-serif pr-4">Bernapas.</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-nature-900/50 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          RESPIRE mengubah perjalanan sembuh Anda menjadi pengalaman yang menenangkan. 
          Bebas stigma, penuh dukungan, dan fokus pada pemulihan alami.
        </motion.p>

        {/* 3. INTERACTIVE CTA */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <div className="relative group">
            <button className="bg-nature-900 text-white pl-8 pr-16 py-5 rounded-[2rem] font-bold shadow-2xl shadow-nature-900/20 hover:bg-nature-800 transition-all flex items-center gap-3 overflow-hidden">
              <span>Mulai Perjalanan</span>
              <div className="absolute right-3 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-sun-400 group-hover:text-nature-900 transition-colors">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>

          <button className="flex items-center gap-3 px-6 py-5 rounded-[2rem] border-2 border-nature-200 font-bold text-nature-900 hover:bg-nature-100 transition-colors group">
            <div className="w-10 h-10 bg-nature-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
              <Mic size={20} className="text-nature-900" />
            </div>
            <span>Gunakan Suara</span>
          </button>
        </motion.div>
      </div>

      {/* 4. BOTTOM SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-nature-900 to-transparent" />
      </motion.div>

    </section>
  );
}