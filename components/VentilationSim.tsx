"use client";
import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Sun, Wind, Bug } from "lucide-react";

export default function VentilationSim() {
  const [value, setValue] = useState(0);
  const [bacteriaPositions, setBacteriaPositions] = useState<
    { top: number; left: number }[]
  >([]);

  // === SPRING PHYSICS ===
  const smoothValue = useSpring(0, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  // sinkron langsung tiap slider berubah
  useEffect(() => {
    smoothValue.set(value);
  }, [value, smoothValue]);

  // window movement pakai pixel biar stabil
  const yMove = useTransform(smoothValue, [0, 100], [0, -320]);

  const opacitySky = useTransform(smoothValue, [0, 50], [0, 1]);
  const glassOpacity = useTransform(smoothValue, [0, 90], [1, 0.5]);

  const thumbLeft = useTransform(smoothValue, (v) => `${v}%`);
  const trackWidth = useTransform(smoothValue, (v) => `${v}%`);

  useEffect(() => {
    setBacteriaPositions(
      Array.from({ length: 5 }).map(() => ({
        top: 30 + Math.random() * 50,
        left: 20 + Math.random() * 60,
      }))
    );
  }, []);

  const bacteriaCount = Math.max(0, 5 - Math.floor(value / 20));

  return (
    <section className="py-24 px-6 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row">
        {/* === VISUAL ROOM === */}
        <div
          className="relative w-full md:w-1/2 h-[450px] transition-colors duration-500 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: `rgba(12, 74, 110, ${1 - value / 120})` }}
        >
          <motion.div
            className="absolute inset-0 bg-sky-300 z-0"
            style={{ opacity: opacitySky }}
          />

          <div className="relative z-10 w-64 h-80 bg-stone-800 border-[12px] border-stone-700 rounded-t-[100px] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-sky-400 overflow-hidden">
              <motion.div
                style={{ opacity: opacitySky, scale: opacitySky }}
                className="absolute top-6 right-6"
              >
                <Sun className="text-yellow-300 w-12 h-12 animate-spin-slow" />
              </motion.div>

              <motion.div
                animate={{ x: [0, 60, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-8 left-4 text-white/60 text-5xl"
              >
                ☁️
              </motion.div>
            </div>

            {/* kaca gerak */}
            <motion.div
              className="absolute inset-0 bg-slate-700/80 backdrop-blur-[2px] border-b-[12px] border-slate-600"
              style={{ y: yMove, opacity: glassOpacity }}
            >
              <div className="w-full h-full rounded-t-[86px] relative overflow-hidden">
                <div className="absolute top-10 right-6 w-3 h-24 bg-white/10 rotate-12 rounded-full blur-[1px]" />
                <div className="absolute top-20 right-10 w-1 h-12 bg-white/10 rotate-12 rounded-full" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-400 rounded-full shadow-lg border border-slate-300" />
              </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-stone-800/40" />
              <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-stone-800/40" />
            </div>
          </div>

          {bacteriaPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-red-500 z-30 pointer-events-none"
              initial={{ scale: 1 }}
              animate={{
                opacity: i < bacteriaCount ? 1 : 0,
                scale: i < bacteriaCount ? 1 : 0,
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.4 }}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
            >
              <Bug size={32} strokeWidth={2.5} className="drop-shadow-lg" />
            </motion.div>
          ))}
        </div>

        {/* === CONTROLLER === */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white z-40">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
            <Wind size={20} />
            <span className="uppercase tracking-widest text-xs">
              Simulasi Ventilasi
            </span>
          </div>

          <h3 className="text-4xl font-extrabold text-slate-800 mb-2 leading-tight">
            Buka Jendela,
            <br />
            Usir Penyakit.
          </h3>

          <p className="text-slate-500 mb-10">
            Geser matahari untuk membuka sirkulasi udara.
          </p>

          {/* slider */}
          <div className="relative h-16 w-full flex items-center justify-center group select-none">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[100] appearance-none"
              style={{ touchAction: "pan-x" }}
            />

            <div className="absolute w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 pointer-events-none">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-300 to-emerald-500"
                style={{ width: trackWidth }}
              />
            </div>

            <motion.div
              className="absolute h-14 w-14 bg-white border-4 border-emerald-500 rounded-full shadow-xl flex items-center justify-center pointer-events-none z-20"
              style={{
                left: thumbLeft,
                x: "-50%",
                willChange: "transform",
              }}
            >
              <Sun
                className="text-emerald-500 fill-emerald-500"
                size={24}
              />
            </motion.div>
          </div>

          <div className="mt-4 flex justify-between text-[10px] font-mono font-bold text-slate-400">
            <span>TERTUTUP (PENGAP)</span>
            <span>TERBUKA (SEGAR)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
