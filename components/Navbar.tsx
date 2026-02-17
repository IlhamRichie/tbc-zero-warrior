"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Activity, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State buat Menu HP

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
    
    if (latest > 50) setScrolled(true);
    else setScrolled(false);
  });

  return (
    <>
      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" }}}
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
          <div className="flex items-center gap-2 z-50">
            <div className="p-2 bg-nature-400 rounded-full text-white shadow-md">
              <Activity size={18} />
            </div>
            <span className="font-bold tracking-tight text-nature-900">TBC Warrior</span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-nature-900/70">
            <a href="#tentang" className="hover:text-nature-500 transition">Tentang</a>
            <a href="#roadmap" className="hover:text-nature-500 transition">Roadmap</a>
            <a href="#scanner" className="hover:text-nature-500 transition">Scanner</a>
          </div>

          {/* Tombol Desktop */}
          <button className="hidden md:block bg-nature-900 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md hover:scale-105">
            Darurat
          </button>

          {/* Tombol Hamburger (Mobile Only) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-nature-900 z-50 relative"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY (Fullscreen) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-nature-900 z-40 flex flex-col justify-center px-8"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="space-y-6 relative z-10">
              {['Beranda', 'Cek Gejala', 'Simulasi', 'Roadmap Sembuh'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="block text-4xl font-bold text-nature-50 hover:text-sun-300 transition-colors flex items-center gap-4 group"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-12 border-t border-white/10"
            >
              <p className="text-nature-100/50 text-sm mb-4">Butuh bantuan darurat?</p>
              <button className="w-full py-4 bg-tbc-danger text-white rounded-xl font-bold text-lg shadow-xl">
                Call Ambulance 119
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}