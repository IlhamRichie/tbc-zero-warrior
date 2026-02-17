"use client";
import { motion } from "framer-motion";
import { Pill, CalendarCheck, Sun, Activity } from "lucide-react";

// Komponen Kotak Kaca (Reusable)
const GlassCard = ({ children, className, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className={`p-6 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-nature-900">Dashboard Harapan</h2>
        <p className="text-nature-900/60">Transparansi data untuk ketenangan pikiranmu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
        
        {/* Kotak 1: Jadwal Obat (Gede Vertikal) */}
        <GlassCard className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-nature-100/50 to-white/40 flex flex-col justify-between" delay={0.1}>
          <div>
            <div className="p-3 bg-nature-400/20 rounded-full w-fit mb-4 text-nature-900">
              <Pill size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Jadwal Minum</h3>
            <p className="text-sm opacity-60">Jangan putus, ya!</p>
          </div>
          <div className="space-y-3 mt-4">
            {['07:00 Pagi', 'Sebelum Makan'].map((time, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-sun-400" />
                <span className="font-medium text-sm">{time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Kotak 2: Progress Sembuh (Lebar) */}
        <GlassCard className="md:col-span-2 md:row-span-1 bg-nature-900 text-white" delay={0.2}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">Bulan ke-2</h3>
              <p className="text-nature-100 text-sm">Fase Intensif Selesai</p>
            </div>
            <Activity className="text-sun-300" />
          </div>
          {/* Visual Progress Bar Organik */}
          <div className="mt-8 relative h-4 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-sun-300 to-nature-400 rounded-full"
            />
          </div>
          <p className="text-right text-xs mt-2 text-nature-100">40% Menuju Sembuh Total</p>
        </GlassCard>

        {/* Kotak 3: Cuaca/Matahari (Kotak Kecil) */}
        <GlassCard className="md:col-span-1 md:row-span-1 bg-sun-300/30" delay={0.3}>
          <Sun size={32} className="text-orange-500 mb-4 animate-spin-slow" />
          <h3 className="font-bold text-lg">UV Index</h3>
          <p className="text-sm">Waktu tepat berjemur: <br/><b>09:00 WIB</b></p>
        </GlassCard>

        {/* Kotak 4: Motivasi (Lebar Bawah) */}
        <GlassCard className="md:col-span-3 md:row-span-1 flex items-center justify-between" delay={0.4}>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center text-2xl">🌿</div>
            <div>
              <h3 className="font-bold text-lg text-nature-900">Paru-paru mulai bersih</h3>
              <p className="text-sm opacity-60">Bakteri berkurang signifikan minggu ini.</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-nature-900 text-white text-sm rounded-full">Lihat Hasil Lab</button>
        </GlassCard>

      </div>
    </section>
  );
}