"use client";
import { motion } from "framer-motion";
import { Heart, Github, Instagram, Mail, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-nature-900 text-nature-50 pt-32 pb-12 rounded-t-[4rem] -mt-16 z-30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-nature-400/30 to-transparent" />
      
      {/* Decorative Blob */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-nature-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Vision Heading - Indonesia tidak miring lagi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
              Indonesia<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 via-sun-300 to-emerald-400 italic">
                Bebas TBC 2030 '
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-nature-100/40 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              Perjalanan menuju napas yang lebih segar dimulai dari satu langkah kecil: <br className="hidden md:block"/>
              <span className="text-nature-100/80 italic font-serif tracking-wide">Kepedulian dan aksi nyata darimu.</span>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-32 w-full max-w-lg"
          >
            <button className="group relative px-10 py-5 bg-nature-50 text-nature-900 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-white/5 hover:scale-105 active:scale-95 transition-all overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Daftar Relawan <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-sun-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button className="px-10 py-5 border-2 border-nature-100/10 text-nature-100 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2">
              Donasi Oksigen <Sparkles size={16} className="text-sun-300" />
            </button>
          </motion.div>

          {/* Bottom Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16 items-start text-left">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xl font-black tracking-tighter">
                <div className="w-8 h-8 bg-nature-400 rounded-lg flex items-center justify-center text-white">
                   <Heart size={16} fill="currentColor" />
                </div>
                RESPIRE
              </div>
              <p className="text-sm text-nature-100/30 max-w-xs leading-relaxed font-medium">
                Platform digital untuk mendukung eliminasi TBC melalui pendekatan Organic Recovery dan visualisasi data yang manusiawi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:justify-self-center">
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-400">Navigasi</p>
                <div className="flex flex-col gap-2 text-sm font-bold text-nature-100/50">
                  <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
                  <a href="#cek-gejala" className="hover:text-white transition-colors">Cek Gejala</a>
                  <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-400">Media</p>
                <div className="flex flex-col gap-2 text-sm font-bold text-nature-100/50">
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={14}/> Instagram</a>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Github size={14}/> GitHub</a>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14}/> Email</a>
                </div>
              </div>
            </div>

            <div className="md:text-right flex flex-col md:items-end gap-4">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-400">Institutional</p>
               <p className="text-sm font-bold text-nature-100/80 uppercase">Universitas Harkat Negeri</p>
               <p className="text-[10px] text-nature-100/30 font-black uppercase tracking-widest">
                 Designed for Techsoft Competition <br/> 
                 {currentYear} © TBC Warrior Team
               </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}