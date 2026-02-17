"use client";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Activity, Menu, X, ArrowRight, PhoneCall, Leaf } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const navWidth = useTransform(smoothScrollY, [0, 100], ["100%", "92%"]);
  const navMaxWidth = useTransform(smoothScrollY, [0, 100], ["1200px", "720px"]); // Sedikit dilebarkan agar px-12 muat enak

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
    
    if (latest > 50) setScrolled(true);
    else setScrolled(false);
  });

  const menuItems = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Scanner', href: '#scanner' },
    { name: 'Simulasi', href: '#tentang' },
    { name: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <>
      <motion.nav 
        variants={{ 
          visible: { y: 0, opacity: 1 }, 
          hidden: { y: "-120%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none"
      >
        <motion.div 
          style={{ width: navWidth, maxWidth: navMaxWidth }}
          className={`flex items-center justify-between px-3 md:px-4 py-2 rounded-full transition-all duration-500 pointer-events-auto ${
            scrolled 
              ? "bg-white/75 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-white/60" 
              : "bg-transparent"
          }`}
        >
          
          {/* Logo Section */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 z-50 cursor-pointer pl-3"
          >
            <div className="p-1.5 bg-gradient-to-br from-nature-400 to-nature-600 rounded-lg text-white shadow-lg">
              <Activity size={16} />
            </div>
            <span className="font-black tracking-tighter text-nature-900 text-base">RESPIRE</span>
          </motion.div>

          {/* Menu Desktop - Gap dipersempit (gap-6), Samping diperlebar (px-12) */}
          <div className="hidden md:flex gap-6 px-12 text-[10px] font-bold uppercase tracking-[0.2em] text-nature-900/40">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="relative group hover:text-nature-900 transition-colors duration-300"
              >
                {item.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-nature-400 w-0 group-hover:w-full transition-all duration-300"
                />
              </a>
            ))}
          </div>

          {/* Action Button Desktop */}
          <div className="hidden md:flex items-center gap-3 pr-2">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-nature-900 text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 group relative overflow-hidden transition-all"
            >
              <span className="relative z-10">Bantuan SOS</span>
              <PhoneCall size={12} className="relative z-10" />
              <div className="absolute inset-0 bg-rose-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-full transition-all z-50 ${
              isOpen ? "text-white" : "text-nature-900 bg-white/50 backdrop-blur-md shadow-sm"
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.nav>

      {/* MOBILE MENU (Tetap sama) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-nature-900 z-40 flex flex-col justify-between p-8 pt-32"
          >
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
              <Leaf size={320} className="text-nature-400 rotate-45" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <p className="text-nature-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10 opacity-50">Navigasi Utama</p>
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="block text-4xl font-black text-white hover:text-sun-300 transition-colors flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <ArrowRight size={28} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 border-t border-white/10 pt-8"
            >
              <div className="flex items-center gap-4 text-white/40 mb-8">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Darurat TBC</p>
                  <p className="text-base font-bold text-white tracking-tight">Call Center: 119</p>
                </div>
              </div>
              <button className="w-full py-5 bg-white text-nature-900 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl">
                Hubungi Ambulans
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}