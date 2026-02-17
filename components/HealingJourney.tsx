"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, Pill, CheckCircle2, Mountain, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Fase Intensif",
    month: "Bulan 1-2",
    desc: "Masa paling krusial. Bakteri masih aktif menular. Wajib minum obat setiap hari di jam yang sama tanpa terlewat.",
    icon: AlertCircle,
    color: "bg-red-50 text-tbc-danger border-red-100",
    details: ["Minum obat tiap pagi", "Cek dahak berkala", "Gunakan masker"]
  },
  {
    id: "02",
    title: "Fase Lanjutan",
    month: "Bulan 3-5",
    desc: "Tubuh mulai terasa enak, tapi bakteri belum mati total. Jangan berhenti atau bakteri akan kebal (MDR-TB)!",
    icon: Pill,
    color: "bg-sun-300/20 text-nature-900 border-sun-300/30",
    details: ["Nutrisi tinggi protein", "Jaga kebersihan udara", "Tetap disiplin obat"]
  },
  {
    id: "03",
    title: "Garis Finish",
    month: "Bulan 6",
    desc: "Paru-paru bersih. Tes laboratorium negatif. Kamu resmi menjadi TBC Warrior yang menang dan sehat kembali!",
    icon: CheckCircle2,
    color: "bg-nature-400 text-white border-nature-500",
    details: ["Sembuh Total", "Imun Kuat", "Inspirasi Sesama"]
  },
];

export default function HealingJourney() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Gunakan spring agar pergeseran kartu terasa "kenyal" dan halus
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]), {
    stiffness: 100,
    damping: 20,
  });

  // Animasi untuk angka latar belakang (Paralaks)
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-nature-50">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Latar Belakang: Angka Raksasa (Paralaks) */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute inset-0 flex items-center gap-[40vw] whitespace-nowrap pointer-events-none opacity-[0.03] select-none"
        >
          {steps.map((step) => (
            <span key={step.id} className="text-[40vw] font-black text-nature-900 leading-none">
              {step.id}
            </span>
          ))}
        </motion.div>

        {/* Header Section */}
        <div className="absolute top-12 left-12 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-nature-900/40 mb-3"
          >
            <div className="h-[1px] w-12 bg-nature-200" />
            <span className="font-black uppercase tracking-[0.3em] text-[10px]">The Roadmap</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-nature-900 tracking-tighter leading-none">
            6 Bulan Menuju <br />
            <span className="text-nature-400 italic">Napas Baru.</span>
          </h2>
        </div>

        {/* Konten Horizontal */}
        <motion.div style={{ x }} className="flex gap-20 pl-[40vw] items-center relative z-10">
          {/* Garis Konektor Panjang di Belakang */}
          <div className="absolute top-1/2 left-[45vw] right-0 h-0.5 border-t-2 border-dashed border-nature-200 -z-10" />

          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
          ))}
          
          {/* Final Message */}
          <div className="flex flex-col items-center justify-center w-[60vw] md:w-[600px] shrink-0">
             <motion.div
               whileInView={{ scale: [0.9, 1.1, 1], rotate: [0, 5, 0] }}
               className="w-32 h-32 bg-sun-300 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-sun-300/40"
             >
               <Mountain size={48} className="text-nature-900" />
             </motion.div>
             <h3 className="text-4xl md:text-6xl font-black text-nature-900 text-center leading-tight">
               Waktunya<br/><span className="text-nature-400 underline decoration-sun-300">Menang.</span>
             </h3>
          </div>
        </motion.div>

        {/* Bottom Progress Bar */}
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
  // Menghitung animasi per kartu berdasarkan posisi scroll
  const range = [index * 0.25, (index + 1) * 0.25];
  const scale = useTransform(scrollYProgress, range, [0.85, 1]);
  const opacity = useTransform(scrollYProgress, range, [0.4, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`relative w-[85vw] md:w-[550px] shrink-0 p-10 rounded-[3rem] bg-white border-2 shadow-2xl flex flex-col ${step.color}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-inherit">
          <step.icon size={36} />
        </div>
        <span className="text-6xl font-black opacity-10 leading-none">{step.id}</span>
      </div>
      
      <span className="font-black uppercase tracking-widest text-xs mb-2 opacity-60">
        {step.month}
      </span>
      <h3 className="text-4xl font-black mb-6 tracking-tight leading-none">{step.title}</h3>
      <p className="text-lg font-medium leading-relaxed mb-8 opacity-80">
        {step.desc}
      </p>

      {/* Checklist Details */}
      <div className="space-y-3 pt-6 border-t border-current/10">
        {step.details.map((detail: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-current/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
            <span className="text-sm font-bold opacity-70">{detail}</span>
          </div>
        ))}
      </div>

      {/* Decoration Hover */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-current opacity-5 blur-3xl rounded-full" />
    </motion.div>
  );
}