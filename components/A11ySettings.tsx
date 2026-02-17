"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, Plus, Minus, X, Check, Eye } from "lucide-react";

export default function A11ySettings() {
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk Zoom (Default 100%)
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // State untuk High Contrast
  const [isHighContrast, setIsHighContrast] = useState(false);

  // === 1. LOGIC ZOOM (Text Resizer) ===
  useEffect(() => {
    // Mengubah font-size root HTML (Tailwind pakai REM, jadi ini ngefek ke semua)
    const html = document.documentElement;
    html.style.fontSize = `${zoomLevel}%`;
  }, [zoomLevel]);

  // === 2. LOGIC HIGH CONTRAST ===
  useEffect(() => {
    const html = document.documentElement;
    if (isHighContrast) {
      // Filter tajam & sedikit saturasi biar teks lebih jelas
      html.style.filter = "contrast(120%) saturate(110%)";
    } else {
      html.style.filter = "none";
    }
  }, [isHighContrast]);

  // Handlers
  const increaseZoom = () => setZoomLevel((prev) => Math.min(prev + 10, 130)); // Max 130%
  const decreaseZoom = () => setZoomLevel((prev) => Math.max(prev - 10, 90));  // Min 90%

  return (
    <div className="fixed bottom-10 left-6 z-[9999]">
      
      {/* Tombol Utama (Floating Action Button) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border transition-colors duration-300 ${
           isOpen ? "bg-nature-900 text-white border-nature-800" : "bg-white text-nature-900 border-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
             <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
               <X size={24} />
             </motion.div>
          ) : (
             <motion.div key="open" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
               <Accessibility size={24} />
             </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            className="absolute bottom-20 left-0 w-64 bg-white/80 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50"
          >
            <div className="flex items-center gap-2 mb-6 opacity-40">
                <Eye size={14} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Accessibility</p>
            </div>
            
            <div className="space-y-6">
              
              {/* Control 1: Text Size */}
              <div className="flex items-center justify-between">
                <div>
                    <span className="text-sm font-bold text-nature-900 block">Ukuran Teks</span>
                    <span className="text-[10px] text-nature-900/40 font-mono">{zoomLevel}%</span>
                </div>
                <div className="flex items-center gap-1 bg-nature-100/50 p-1 rounded-xl border border-nature-200/50">
                  <button 
                    onClick={decreaseZoom}
                    disabled={zoomLevel <= 90}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-nature-900 hover:bg-nature-200 disabled:opacity-30 transition-colors"
                  >
                    <Minus size={14}/>
                  </button>
                  <button 
                    onClick={increaseZoom}
                    disabled={zoomLevel >= 130}
                    className="w-8 h-8 flex items-center justify-center bg-nature-900 rounded-lg shadow-sm text-white hover:bg-nature-800 disabled:opacity-50 transition-colors"
                  >
                    <Plus size={14}/>
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-nature-100" />

              {/* Control 2: High Contrast */}
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => setIsHighContrast(!isHighContrast)}>
                <div>
                    <span className="text-sm font-bold text-nature-900 block">High Contrast</span>
                    <span className="text-[10px] text-nature-900/40">Mode tajam</span>
                </div>
                
                {/* Custom Toggle Switch */}
                <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${isHighContrast ? "bg-sun-400" : "bg-nature-200"}`}>
                    <motion.div 
                        animate={{ x: isHighContrast ? 22 : 2 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                    >
                        {isHighContrast && <Check size={10} className="text-sun-500" />}
                    </motion.div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}