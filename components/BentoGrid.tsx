"use client";
import { motion } from "framer-motion";
import { Pill, Sun, Activity, ArrowUpRight, Heart, Timer } from "lucide-react";

const GlassCard = ({ children, className, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className={`group relative p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden transition-all ${className}`}
  >
    {/* Efek Kilauan Internal (Inner Glow) */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-nature-400/5 rounded-full blur-[100px] -z-10" />

      <div className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-nature-100 text-nature-900 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
        >
          Personal Dashboard
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-nature-900 tracking-tight">
          Recovery <span className="text-nature-400">Insight</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        
        {/* Card 1: Medication Schedule */}
        <GlassCard className="md:col-span-1 md:row-span-2 justify-between" delay={0.1}>
          <div>
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-nature-900 text-white rounded-2xl shadow-lg shadow-nature-900/20">
                <Pill size={24} />
              </div>
              <div className="flex items-center gap-1 bg-sun-300/30 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-sun-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-nature-900">AKTIF</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-nature-900 mb-2 leading-tight">Jadwal<br/>Minum Obat</h3>
            <p className="text-sm text-nature-900/50 font-medium">Konsistensi adalah kunci kesembuhan.</p>
          </div>

          <div className="space-y-3 mt-10">
            {[
              { time: '07:00', label: 'Dosis Pagi', color: 'bg-nature-400' },
              { time: '19:00', label: 'Dosis Malam', color: 'bg-nature-200' }
            ].map((item, i) => (
              <div key={i} className="group/item flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-white/50 hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <div>
                    <p className="text-xs font-black text-nature-900">{item.time}</p>
                    <p className="text-[10px] text-nature-900/40 font-bold uppercase">{item.label}</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-nature-300 opacity-0 group-hover/item:opacity-100 transition-all" />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Card 2: Main Progress */}
        <GlassCard className="md:col-span-2 md:row-span-1 bg-nature-900 text-white" delay={0.2}>
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Timer className="text-sun-300" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Progress Pemulihan</h3>
                    <p className="text-nature-100/50 text-xs">Fase Intensif: Hari ke-42</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-3xl font-black text-sun-300 tracking-tighter">40%</p>
            </div>
          </div>

          {/* Bio-Progress Bar */}
          <div className="mt-auto pt-10">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-nature-100/40 mb-3">
                <span>Start</span>
                <span>Target: 6 Bulan</span>
            </div>
            <div className="relative h-6 bg-white/5 rounded-2xl p-1 overflow-hidden border border-white/10">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-sun-300 to-nature-400 rounded-xl relative"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </motion.div>
            </div>
          </div>
        </GlassCard>

        {/* Card 3: UV & Vitamin D */}
        <GlassCard className="md:col-span-1 md:row-span-1 bg-sun-300/20" delay={0.3}>
          <div className="flex flex-col h-full">
            <Sun size={40} className="text-orange-500 mb-4 animate-pulse" />
            <h3 className="font-black text-nature-900 text-lg leading-tight mb-1">UV Insight</h3>
            <p className="text-xs text-nature-900/50 font-bold uppercase mb-4 tracking-tighter">Waktu Berjemur Terbaik</p>
            <div className="mt-auto">
                <div className="bg-white/60 p-3 rounded-2xl border border-white/50 flex items-center justify-between">
                    <span className="text-sm font-black text-nature-900">09:15</span>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">IDEAL</span>
                </div>
            </div>
          </div>
        </GlassCard>

        {/* Card 4: Health Motivation / Result */}
        <GlassCard className="md:col-span-3 md:row-span-1 group" delay={0.4}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="flex gap-6 items-center">
              <div className="relative">
                  <div className="w-16 h-16 bg-nature-100 rounded-[2rem] flex items-center justify-center text-3xl shadow-inner group-hover:rotate-12 transition-transform">🌿</div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Heart size={16} className="text-tbc-danger fill-tbc-danger" />
                  </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-nature-900 tracking-tight">Kondisi Membaik</h3>
                <p className="text-sm text-nature-900/50 font-medium">Bakteri berkurang signifikan. Pertahankan ritme ini!</p>
              </div>
            </div>
            
            <button className="relative overflow-hidden group/btn bg-nature-900 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-nature-900/20 active:scale-95 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Detail Hasil Lab <ArrowUpRight size={18} />
              </span>
              <div className="absolute inset-0 bg-nature-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}