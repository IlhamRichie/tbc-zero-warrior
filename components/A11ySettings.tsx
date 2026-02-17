"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, Plus, Minus, X } from "lucide-react";

export default function A11ySettings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-10 left-6 z-[60]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-nature-900 text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20"
      >
        {isOpen ? <X size={20} /> : <Accessibility size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="absolute bottom-16 left-0 w-48 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-nature-100"
          >
            <p className="text-[10px] font-black text-nature-900 uppercase tracking-widest mb-3 text-center opacity-40">Accessibility</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nature-900">Text Size</span>
                <div className="flex gap-2">
                  <button className="p-1 bg-nature-100 rounded-md hover:bg-nature-200"><Minus size={14}/></button>
                  <button className="p-1 bg-nature-100 rounded-md hover:bg-nature-200"><Plus size={14}/></button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nature-900">High Contrast</span>
                <div className="w-8 h-4 bg-nature-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}