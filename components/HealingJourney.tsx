"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, Pill, CheckCircle2, Mountain, Calendar, Star } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Fase Intensif",
    month: "Bulan 1-2",
    desc: "Masa paling krusial. Bakteri masih aktif menular. Wajib minum obat setiap hari di jam yang sama tanpa terlewat.",
    icon: AlertCircle,
    accentColor: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
    details: ["Minum obat tiap pagi", "Cek dahak berkala", "Gunakan masker"]
  },
  {
    id: "02",
    title: "Fase Lanjutan",
    month: "Bulan 3-5",
    desc: "Tubuh mulai terasa enak, tapi bakteri belum mati total. Jangan berhenti atau bakteri akan kebal (MDR-TB)!",
    icon: Pill,
    accentColor: "text-sun-500",
    bgColor: "bg-sun-50",
    borderColor: "border-sun-100",
    details: ["Nutrisi tinggi protein", "Jaga kebersihan udara", "Tetap disiplin obat"]
  },
  {
    id: "03",
    title: "Garis Finish",
    month: "Bulan 6",
    desc: "Paru-paru bersih. Tes laboratorium negatif. Kamu resmi menjadi TBC Warrior yang menang dan sehat kembali!",
    icon: CheckCircle2,
    accentColor: "text-nature-600",
    bgColor: "bg-nature-50",
    borderColor: "border-nature-200",
    isWinner: true,
    details: ["Sembuh Total", "Imun Kuat", "Inspirasi Sesama"]
  },
];

export default function HealingJourney() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]), {
    stiffness: 100,
    damping: 20,
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* PARALLAX NUMBERS */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute inset-0 flex items-center gap-[40vw] whitespace-nowrap pointer-events-none opacity-[0.02] select-none"
        >
          {steps.map((step) => (
            <span key={step.id} className="text-[40vw] font-black text-nature-900 leading-none">
              {step.id}
            </span>
          ))}
        </motion.div>

        {/* HEADER SECTION */}
        <div className="absolute top-12 left-12 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-nature-900/30 mb-3"
          >
            <div className="h-[1px] w-12 bg-nature-200" />
            <span className="font-black uppercase tracking-[0.3em] text-[10px]">The Roadmap</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-nature-900 tracking-tighter leading-none">
            6 Bulan Menuju <br />
            <span className="text-nature-400 italic">Napas Baru.</span>
          </h2>
        </div>

        {/* HORIZONTAL CARDS */}
        <motion.div style={{ x }} className="flex gap-16 pl-[40vw] items-center relative z-10">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
          ))}
          
          {/* FINAL MESSAGE */}
          <div className="flex flex-col items-center justify-center w-[60vw] md:w-[550px] shrink-0">
             <motion.div
               whileInView={{ scale: [0.9, 1.1, 1], rotate: [0, 5, 0] }}
               className="w-28 h-28 bg-sun-300 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-sun-300/40"
             >
               <Mountain size={42} className="text-nature-900" />
             </motion.div>
             <h3 className="text-4xl md:text-6xl font-black text-nature-900 text-center leading-tight tracking-tighter">
               Waktunya<br/><span className="text-nature-400 underline decoration-sun-300">Menang.</span>
             </h3>
          </div>
        </motion.div>

        {/* BOTTOM PROGRESS BAR */}
        <div className="absolute bottom-12 left-12 right-12 flex items-center gap-6">
           <div className="text-[10px] font-black text-nature-900/30 uppercase tracking-widest shrink-0">Progress Journey</div>
           <div className="h-1 flex-1 bg-nature-100 rounded-full overflow-hidden">
              <motion.div 
                style={{ scaleX: scrollYProgress }} 
                className="h-full bg-nature-400 origin-left" 
              />
           </div>
           <div className="text-[10px] font-black text-nature-400 uppercase tracking-widest shrink-0">Finish Line</div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, scrollYProgress }: any) {
  const range = [index * 0.25, (index + 1) * 0.25];
  const scale = useTransform(scrollYProgress, range, [0.92, 1]);
  const opacity = useTransform(scrollYProgress, range, [0.6, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`relative w-[82vw] md:w-[480px] shrink-0 p-9 rounded-[3.5rem] bg-white border-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] flex flex-col ${step.borderColor} ${step.isWinner ? 'shadow-nature-200/50' : ''}`}
    >
      {/* Step Indicator Top */}
      <div className="flex justify-between items-start mb-8">
        <div className={`p-4 rounded-xl shadow-sm border ${step.bgColor} ${step.accentColor}`}>
          <step.icon size={32} strokeWidth={2.5} />
        </div>
        <div className="text-right">
           <span className="text-6xl font-black opacity-[0.05] leading-none block tracking-tighter">{step.id}</span>
           <div className="flex items-center gap-2 justify-end mt-[-8px]">
              <Calendar size={12} className="text-nature-300" />
              <span className="text-[10px] font-black text-nature-900/40 uppercase tracking-widest">{step.month}</span>
           </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-black text-nature-900 mb-3 tracking-tighter leading-none">
          {step.title}
        </h3>
        <p className="text-base font-bold text-nature-900/60 leading-relaxed italic">
          "{step.desc}"
        </p>
      </div>

      {/* Checklist (High Contrast) */}
      <div className="space-y-3 pt-6 border-t border-nature-50 mt-auto">
        {step.details.map((detail: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${step.bgColor} ${step.accentColor}`}>
              <CheckCircle2 size={16} strokeWidth={3} />
            </div>
            <span className="text-xs font-black text-nature-900/80">{detail}</span>
          </div>
        ))}
      </div>

      {/* Winner Badge for Step 03 */}
      {step.isWinner && (
        <div className="absolute -top-3 -right-3 bg-sun-400 text-nature-900 px-3 py-1.5 rounded-xl font-black text-[9px] flex items-center gap-2 shadow-xl rotate-12 border-2 border-white">
          <Star size={12} fill="currentColor" /> VICTORY STAGE
        </div>
      )}

      {/* Subtle Background Glow */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[70px] opacity-20 ${step.bgColor}`} />
    </motion.div>
  );
}