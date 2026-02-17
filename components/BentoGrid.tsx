"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Pill, Sun, Activity, ArrowUpRight, Heart, Timer, Zap, CheckCircle2 } from "lucide-react";

// 1. Enhanced GlassCard dengan Mouse Spotlight Effect
const GlassCard = ({ children, className, delay }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`group relative p-8 rounded-[3rem] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl overflow-hidden transition-all flex flex-col ${className}`}
    >
      {/* Efek Spotlight yang mengikuti kursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(127,176,105,0.15), transparent 40%)`
          ),
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

export default function BentoGrid() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Ornamen Background */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-nature-400/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      <div className="mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nature-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6"
        >
          <Activity size={12} className="text-sun-300" />
          Personal Health Dashboard
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black text-nature-900 tracking-tighter leading-none">
          Recovery <span className="text-nature-400 italic font-serif">Insight.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
        
        {/* Card 1: Medication (Paling Penting untuk Kepatuhan 6 Bulan) */}
        <GlassCard className="md:col-span-1 md:row-span-2 justify-between border-nature-200/50" delay={0.1}>
          <div>
            <div className="flex justify-between items-start mb-10">
              <div className="w-14 h-14 bg-nature-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-nature-900/30">
                <Pill size={28} />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-3 py-1 rounded-full border border-emerald-200"
              >
                ON TRACK
              </motion.div>
            </div>
            <h3 className="text-3xl font-black text-nature-900 mb-2 leading-none">Disiplin<br/>Obat.</h3>
            <p className="text-xs text-nature-900/40 font-bold uppercase tracking-widest">Kunci Sembuh Total</p>
          </div>

          <div className="space-y-4 mt-12">
            {[
              { time: '07:00', label: 'Dosis Pagi', status: 'done' },
              { time: '19:00', label: 'Dosis Malam', status: 'pending' }
            ].map((item, i) => (
              <div key={i} className="group/item flex items-center justify-between p-5 bg-white/40 rounded-[2rem] border border-white/60 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'done' ? 'bg-nature-400 text-white' : 'bg-nature-100 text-nature-400'}`}>
                    {item.status === 'done' ? <CheckCircle2 size={18} /> : <Timer size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-nature-900">{item.time}</p>
                    <p className="text-[10px] text-nature-900/40 font-bold uppercase">{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Card 2: Main Progress (Roadmap Visual) */}
        <GlassCard className="md:col-span-2 md:row-span-1 bg-nature-900 text-white" delay={0.2}>
          <div className="flex justify-between items-start">
            <div className="flex gap-5 items-center">
                <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                    <Zap className="text-sun-300 fill-sun-300" size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-black tracking-tight">Perjalanan Sembuh</h3>
                    <p className="text-nature-100/40 text-xs font-bold uppercase tracking-widest">Fase Intensif: Hari ke-42</p>
                </div>
            </div>
            <div className="text-right">
                <motion.p 
                  initial={{ scale: 0.5 }} 
                  whileInView={{ scale: 1 }}
                  className="text-5xl font-black text-sun-300 tracking-tighter"
                >
                  40%
                </motion.p>
            </div>
          </div>

          <div className="mt-auto pt-12">
            <div className="relative h-10 bg-white/5 rounded-full p-1.5 overflow-hidden border border-white/10 shadow-inner">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-sun-300 via-nature-400 to-nature-500 rounded-full relative"
                >
                    {/* Efek Cahaya Bergerak pada Progress Bar */}
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </motion.div>
            </div>
            <div className="flex justify-between mt-4 px-2">
                <span className="text-[10px] font-black text-nature-100/30 uppercase tracking-[0.2em]">Start</span>
                <span className="text-[10px] font-black text-sun-300 uppercase tracking-[0.2em]">Finish: 6 Bulan</span>
            </div>
          </div>
        </GlassCard>

        {/* Card 3: UV & Vitamin D */}
        <GlassCard className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-sun-100/50 to-orange-50/50 border-sun-200/50" delay={0.3}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-6"
              >
                <Sun size={32} />
              </motion.div>
              <h3 className="font-black text-nature-900 text-2xl leading-none mb-2">UV Insight</h3>
              <p className="text-[10px] text-orange-600/60 font-black uppercase tracking-widest">Optimasi Vitamin D</p>
            </div>
            
            <div className="bg-white/80 p-4 rounded-[1.5rem] border border-sun-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-nature-900/40 uppercase">Waktu Terbaik</p>
                  <p className="text-xl font-black text-nature-900">09:15</p>
                </div>
                <div className="px-3 py-1 bg-orange-500 text-white text-[9px] font-black rounded-lg animate-pulse">
                  IDEAL
                </div>
            </div>
          </div>
        </GlassCard>

        {/* Card 4: Lab Result & Motivation */}
        <GlassCard className="md:col-span-3 md:row-span-1 group hover:bg-white/50" delay={0.4}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="flex gap-8 items-center">
              <div className="relative">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="w-20 h-20 bg-nature-100 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner border border-white"
                  >
                    🌿
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-nature-100"
                  >
                    <Heart size={16} className="text-rose-500 fill-rose-500" />
                  </motion.div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-nature-900 tracking-tighter leading-none mb-3">Kondisi Membaik.</h3>
                <p className="text-sm text-nature-900/50 font-bold max-w-md leading-relaxed">
                  Bakteri berkurang signifikan berdasarkan hasil laboratorium terakhir. Napas Anda kini lebih berkualitas!
                </p>
              </div>
            </div>
            
            <button className="relative group/btn bg-nature-900 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-nature-900/40 hover:scale-105 active:scale-95 transition-all overflow-hidden shrink-0">
              <span className="relative z-10 flex items-center gap-3">
                Unduh Hasil Lab <ArrowUpRight size={18} className="text-sun-300" />
              </span>
              <div className="absolute inset-0 bg-nature-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}