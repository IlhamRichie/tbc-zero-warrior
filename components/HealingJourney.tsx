"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, Pill, CheckCircle2, Mountain } from "lucide-react";

// Data Fase Pengobatan TBC
const steps = [
  {
    title: "Fase Intensif",
    month: "Bulan 1-2",
    desc: "Masa paling krusial. Bakteri masih aktif menular. Wajib minum obat setiap hari di jam yang sama.",
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Fase Lanjutan",
    month: "Bulan 3-5",
    desc: "Tubuh mulai terasa enak, TAPI bakteri belum mati total. Jangan berhenti atau bakteri akan kebal!",
    icon: Pill,
    color: "bg-sun-300 text-nature-900", // Warna Kuning Matahari
  },
  {
    title: "Garis Finish",
    month: "Bulan 6",
    desc: "Paru-paru bersih. Tes laboratorium negatif. Kamu resmi menjadi TBC Warrior yang menang!",
    icon: CheckCircle2,
    color: "bg-nature-400 text-white", // Warna Hijau Eucalyptus
  },
];

export default function HealingJourney() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Logika: Scroll ke bawah 1px = Geser ke kiri 1%
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-nature-50">
      {/* Container Sticky biar layar diem dulu pas di-scroll */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Judul Section */}
        <div className="absolute top-10 left-10 z-10 max-w-md">
          <div className="flex items-center gap-2 text-nature-900 mb-2">
            <Mountain size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Roadmap Kesembuhan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-nature-900">
            6 Bulan Menuju <br />
            <span className="text-nature-400">Napas Baru.</span>
          </h2>
        </div>

        {/* Horizontal Moving Cards */}
        <motion.div style={{ x }} className="flex gap-10 pl-[50vw]">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative w-[80vw] md:w-[600px] h-[50vh] flex flex-col justify-center p-10 rounded-[3rem] bg-white border border-nature-100 shadow-xl"
            >
              {/* Garis Konektor */}
              <div className="absolute top-1/2 -left-10 w-10 h-1 bg-nature-100" />
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${step.color}`}>
                <step.icon size={32} />
              </div>
              
              <span className="text-nature-900/50 font-bold tracking-wider mb-2">{step.month}</span>
              <h3 className="text-3xl md:text-4xl font-bold text-nature-900 mb-4">{step.title}</h3>
              <p className="text-lg text-nature-900/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
          
          {/* Card Penutup (Motivasi) */}
          <div className="relative w-[80vw] md:w-[500px] h-[50vh] flex items-center justify-center">
            <h3 className="text-4xl md:text-6xl font-bold text-nature-900/20 text-center leading-tight">
              Kisahmu<br/>Dimulai<br/>Di Sini.
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}