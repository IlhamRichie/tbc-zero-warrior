"use client";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Activity } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0; // Kasih default value 0 biar ga error
    if (latest > previous && latest > 150) setHidden(true); // Scroll ke bawah -> Sembunyi
    else setHidden(false); // Scroll ke atas -> Muncul
    
    if (latest > 50) setScrolled(true); // Kalau udah scroll dikit -> Background Kaca
    else setScrolled(false);
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-lg shadow-lg border border-white/50 w-full max-w-2xl" 
          : "bg-transparent w-full max-w-4xl"
      }`}>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-nature-400 rounded-full text-white shadow-md">
            <Activity size={18} />
          </div>
          <span className={`font-bold tracking-tight transition-colors ${scrolled ? 'text-nature-900' : 'text-nature-900'}`}>
            TBC Warrior
          </span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-nature-900/70">
          <a href="#" className="hover:text-nature-500 transition">Tentang</a>
          <a href="#" className="hover:text-nature-500 transition">Roadmap</a>
          <a href="#" className="hover:text-nature-500 transition">Scanner</a>
        </div>

        {/* Tombol yang berubah warna */}
        <button className={`${scrolled ? 'bg-nature-900 text-white' : 'bg-white text-nature-900'} px-5 py-2 rounded-full text-sm font-semibold transition shadow-md hover:scale-105`}>
          Darurat
        </button>
      </div>
    </motion.nav>
  );
}