"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { Check, X, RefreshCw, AlertCircle, HeartPulse, Sparkles, ArrowRight } from "lucide-react";

const questions = [
  { id: 1, text: "Apakah kamu batuk lebih dari 2 minggu?", color: "from-rose-400 to-red-500" },
  { id: 2, text: "Sering berkeringat di malam hari tanpa sebab?", color: "from-orange-400 to-amber-500" },
  { id: 3, text: "Berat badan turun drastis padahal makan biasa?", color: "from-yellow-400 to-orange-500" },
  { id: 4, text: "Pernah kontak erat dengan pasien TBC?", color: "from-sky-400 to-blue-500" },
];

export default function SymptomSwiper() {
  const [cards, setCards] = useState(questions);
  const [result, setResult] = useState<"risk" | "safe" | null>(null);
  const [yesCount, setYesCount] = useState(0);
  const currentCardIndex = questions.length - cards.length;

  const removeCard = (id: number, answer: "yes" | "no") => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (answer === "yes") setYesCount((prev) => prev + 1);

    if (cards.length === 1) {
      setTimeout(() => {
        setResult(yesCount + (answer === "yes" ? 1 : 0) >= 2 ? "risk" : "safe");
      }, 600);
    }
  };

  return (
    <section className="py-24 px-4 overflow-hidden bg-nature-50 relative min-h-[900px] flex flex-col items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nature-400/20 rounded-full blur-[120px] -z-10" 
      />

      <div className="text-center mb-12 relative z-10 w-full max-w-sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 mb-6">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i < currentCardIndex ? 'w-8 bg-nature-400' : i === currentCardIndex ? 'w-12 bg-sun-400' : 'w-4 bg-nature-200'
              }`} 
            />
          ))}
        </motion.div>
        
        <h2 className="text-4xl font-black text-nature-900 mb-2 tracking-tighter italic">Quick Check.</h2>
        <p className="text-nature-900/40 text-sm font-bold uppercase tracking-widest">Geser untuk diagnosa mandiri</p>
      </div>

      <div className="relative w-full max-w-sm h-[480px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              data={card} 
              active={index === cards.length - 1}
              index={index}
              totalCards={cards.length}
              removeCard={removeCard} 
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full text-center p-10 bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-white relative z-50 group"
          >
            {result === "risk" ? (
              <div>
                <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-tbc-danger shadow-inner relative">
                  <AlertCircle size={48} />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute inset-0 bg-rose-400/20 rounded-[2rem]" />
                </div>
                <h3 className="text-3xl font-black text-nature-900 mb-2 leading-none">Waspada.</h3>
                <p className="text-nature-900/60 mb-8 text-sm text-center">Hasil menunjukkan indikasi gejala TBC. Segera hubungi fasilitas kesehatan terdekat.</p>
                <button className="w-full bg-nature-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 group-hover:bg-tbc-danger transition-colors">
                   Konsultasi Sekarang <ArrowRight size={20} />
                </button>
              </div>
            ) : (
              <div>
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-tbc-safe shadow-inner">
                  <Sparkles size={48} />
                </div>
                <h3 className="text-3xl font-black text-nature-900 mb-2 leading-none">Napas Lega.</h3>
                <p className="text-nature-900/60 mb-8 text-sm text-center">Risiko TBC Anda tergolong rendah. Terus jaga ventilasi udara rumah Anda!</p>
                <button onClick={() => window.location.reload()} className="w-full bg-nature-100 text-nature-900 py-5 rounded-2xl font-bold flex items-center justify-center gap-3">
                   <RefreshCw size={20} /> Ulangi Test
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {cards.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex items-center gap-20">
          <div className="flex flex-col items-center gap-2 opacity-20">
             <div className="w-10 h-10 rounded-full border-2 border-nature-900 flex items-center justify-center"><X size={18}/></div>
             <span className="text-[10px] font-black uppercase tracking-widest">TIDAK</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-20">
             <div className="w-10 h-10 rounded-full border-2 border-nature-900 flex items-center justify-center"><Check size={18}/></div>
             <span className="text-[10px] font-black uppercase tracking-widest">YA</span>
          </div>
        </motion.div>
      )}
    </section>
  );
}

const Card = ({ data, active, index, totalCards, removeCard }: any) => {
  const x = useMotionValue(0);
  
  // SEMUA HOOKS DI SINI (Harus dipanggil di setiap render, sebelum return apa pun)
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(springX, [-200, 200], [-30, 30]);
  const rotateZ = useTransform(springX, [-200, 200], [-20, 20]);
  const bg = useTransform(x, [-150, 0, 150], ["#FFE4E6", "#FFFFFF", "#DCFCE7"]);
  const shadow = useTransform(
    x, 
    [-150, 0, 150], 
    ["0 20px 50px -10px rgba(244,63,94,0.3)", "0 10px 30px -10px rgba(0,0,0,0.1)", "0 20px 50px -10px rgba(16,185,129,0.3)"]
  );
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const yesLabelOpacity = useTransform(x, [50, 120], [0, 1]);
  const noLabelOpacity = useTransform(x, [-50, -120], [0, 1]);
  const glintX = useTransform(x, [-200, 200], [-100, 100]); // Ini yang tadi bikin error karena di dalam JSX

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 130) removeCard(data.id, "yes");
    else if (info.offset.x < -130) removeCard(data.id, "no");
  };

  // Logic tumpukan kartu (Pindah ke bawah setelah semua Hooks dipanggil)
  if (!active) {
    const isNext = index === totalCards - 2;
    return (
      <motion.div 
        animate={{ 
          scale: isNext ? 0.95 : 0.9, 
          y: isNext ? 10 : 20,
          rotateY: isNext ? 15 : 20,
          opacity: isNext ? 0.4 : 0.1
        }}
        className="absolute top-0 w-full h-full bg-white rounded-[3rem] shadow-xl border border-nature-100 -z-10"
      />
    );
  }

  return (
    <div className="perspective-[1000px] w-full h-full">
      <motion.div
        style={{ x: springX, rotateY, rotateZ, opacity, backgroundColor: bg, boxShadow: shadow }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        whileDrag={{ scale: 1.05 }}
        onDragEnd={handleDragEnd}
        className="absolute top-0 w-full h-full p-12 rounded-[3.5rem] border border-white/50 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing overflow-hidden shadow-2xl"
      >
        {/* Glass Glint Effect - Sekarang pakai glintX dari atas */}
        <motion.div 
          style={{ x: glintX }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" 
        />

        {/* Floating Labels */}
        <motion.div style={{ opacity: yesLabelOpacity }} className="absolute top-12 right-12 bg-emerald-500 text-white font-black px-4 py-1 rounded-full text-sm shadow-lg rotate-12">YA</motion.div>
        <motion.div style={{ opacity: noLabelOpacity }} className="absolute top-12 left-12 bg-rose-500 text-white font-black px-4 py-1 rounded-full text-sm shadow-lg -rotate-12">TIDAK</motion.div>

        {/* Icon & Content */}
        <motion.div className={`w-28 h-28 rounded-[2.5rem] bg-gradient-to-br ${data.color} mb-10 flex items-center justify-center text-white shadow-2xl`}>
           <span className="text-5xl font-black italic">?</span>
        </motion.div>

        <h3 className="text-3xl font-black text-nature-900 leading-tight tracking-tighter select-none">
          {data.text}
        </h3>
        
        <div className="mt-8 flex gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-nature-200" />
           <div className="w-1.5 h-1.5 rounded-full bg-nature-200" />
           <div className="w-1.5 h-1.5 rounded-full bg-nature-200" />
        </div>
      </motion.div>
    </div>
  );
};