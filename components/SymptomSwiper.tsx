"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { Check, X, RefreshCw, AlertCircle, HeartPulse, Sparkles, ArrowRight, Leaf } from "lucide-react";

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
  
  // State untuk background satu section
  const [bgState, setBgState] = useState(0); // -1 (Kiri/Merah), 0 (Netral), 1 (Kanan/Hijau)
  
  const currentCardIndex = questions.length - cards.length;

  const removeCard = (id: number, answer: "yes" | "no") => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (answer === "yes") setYesCount((prev) => prev + 1);
    setBgState(0); // Reset background

    if (cards.length === 1) {
      setTimeout(() => {
        setResult(yesCount + (answer === "yes" ? 1 : 0) >= 2 ? "risk" : "safe");
      }, 600);
    }
  };

  // Background Transition Smooth
  const bgColors = ["#fff1f2", "#f8fafc", "#f0fdf4"]; // Merah - Putih - Hijau
  
  return (
    <motion.section 
      animate={{ backgroundColor: bgColors[bgState + 1] }}
      transition={{ duration: 0.5 }}
      className="py-24 px-4 overflow-hidden relative min-h-[900px] flex flex-col items-center justify-center transition-colors"
    >
      {/* Background Decor */}
      <motion.div 
        animate={{ 
           scale: bgState !== 0 ? 1.2 : 1, 
           rotate: bgState === 1 ? 20 : bgState === -1 ? -20 : 0 
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nature-400/10 rounded-full blur-[120px] -z-10" 
      />

      <div className="text-center mb-16 relative z-10 w-full max-w-sm">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {questions.map((_, i) => (
            <motion.div 
              key={i} 
              initial={false}
              animate={{ 
                width: i === currentCardIndex ? 48 : 12,
                backgroundColor: i < currentCardIndex ? "#7fb069" : i === currentCardIndex ? "#f3de8a" : "#e2e8f0"
              }}
              className="h-2 rounded-full transition-all duration-500"
            />
          ))}
        </div>
        
        <h2 className="text-5xl font-black text-nature-900 mb-2 tracking-tighter italic leading-none">Quick Check.</h2>
        <p className="text-nature-900/40 text-xs font-bold uppercase tracking-[0.3em]">Geser atau klik untuk diagnosa</p>
      </div>

      <div className="relative w-full max-w-sm h-[520px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              data={card} 
              active={index === cards.length - 1}
              index={index}
              totalCards={cards.length}
              removeCard={removeCard}
              onDragChange={(v: number) => setBgState(v > 0.5 ? 1 : v < -0.5 ? -1 : 0)}
            />
          ))}
        </AnimatePresence>

        {/* HASIL AKHIR */}
        {cards.length === 0 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full text-center p-12 bg-white rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border-2 border-nature-100 relative z-50 overflow-hidden"
          >
            {result === "risk" ? (
              <div className="relative z-10">
                <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-rose-600 shadow-inner relative">
                  <AlertCircle size={48} />
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-rose-400/20 rounded-[2.5rem]" />
                </div>
                <h3 className="text-4xl font-black text-nature-900 mb-3 leading-none tracking-tight">Butuh <br/><span className="text-rose-600">Perhatian.</span></h3>
                <p className="text-nature-900/50 mb-10 text-sm font-medium leading-relaxed px-2">Beberapa gejala mengarah pada indikasi TBC. Tenang, ini langkah awal menuju kesembuhan.</p>
                <button className="w-full bg-nature-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rose-600 transition-colors shadow-xl shadow-rose-900/20 group">
                   Konsultasi Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner">
                  <Sparkles size={48} />
                </div>
                <h3 className="text-4xl font-black text-nature-900 mb-3 leading-none tracking-tight">Napas <br/><span className="text-emerald-600">Lega.</span></h3>
                <p className="text-nature-900/50 mb-10 text-sm font-medium leading-relaxed px-2">Kondisi Anda terlihat baik. Tetap jaga sirkulasi udara di rumah agar paru-paru selalu segar!</p>
                <button onClick={() => window.location.reload()} className="w-full bg-nature-100 text-nature-900 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-nature-200 transition-all">
                   <RefreshCw size={18} /> Ulangi Test
                </button>
                {/* Deco Leaves */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -right-10 opacity-5 text-emerald-900"><Leaf size={100} /></motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ACTION BUTTONS (Magnet Effect) */}
      {cards.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 flex items-center gap-12 relative z-20">
          
          <motion.button 
            animate={{ scale: bgState === -1 ? 1.2 : 1 }}
            onClick={() => removeCard(cards[cards.length - 1].id, "no")}
            className="flex flex-col items-center gap-4 group cursor-pointer"
          >
             <div className="w-20 h-20 rounded-full border-4 border-rose-50 bg-white flex items-center justify-center text-rose-300 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-300 shadow-xl shadow-rose-900/5"><X size={28} strokeWidth={3} /></div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nature-900/20 group-hover:text-rose-500 transition-colors">TIDAK</span>
          </motion.button>
          
          <motion.button 
            animate={{ scale: bgState === 1 ? 1.2 : 1 }}
            onClick={() => removeCard(cards[cards.length - 1].id, "yes")}
            className="flex flex-col items-center gap-4 group cursor-pointer"
          >
             <div className="w-20 h-20 rounded-full border-4 border-emerald-50 bg-white flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300 shadow-xl shadow-emerald-900/5"><Check size={28} strokeWidth={3} /></div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nature-900/20 group-hover:text-emerald-500 transition-colors">YA</span>
          </motion.button>

        </motion.div>
      )}
    </motion.section>
  );
}

const Card = ({ data, active, index, totalCards, removeCard, onDragChange }: any) => {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 50 }); // Lebih smooth
  
  const rotateY = useTransform(springX, [-200, 200], [-25, 25]);
  const rotateZ = useTransform(springX, [-200, 200], [-10, 10]);
  const bg = useTransform(x, [-150, 0, 150], ["#fff1f2", "#FFFFFF", "#f0fdf4"]);
  
  const shadow = useTransform(
    x, 
    [-150, 0, 150], 
    ["0 30px 60px -12px rgba(225,29,72,0.2)", "0 20px 40px -12px rgba(0,0,0,0.06)", "0 30px 60px -12px rgba(5,150,105,0.2)"]
  );
  
  const glintX = useTransform(x, [-200, 200], [-150, 150]);
  const yesOpacity = useTransform(x, [40, 100], [0, 1]);
  const noOpacity = useTransform(x, [-40, -100], [0, 1]);

  // Hook untuk deteksi posisi drag real-time
  useEffect(() => {
    return x.on("change", (latestX) => {
      if (active) {
        onDragChange(latestX / 150); // Normalize -1 to 1
      }
    });
  }, [x, active, onDragChange]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 120) removeCard(data.id, "yes");
    else if (info.offset.x < -120) removeCard(data.id, "no");
    else onDragChange(0); // Reset kalau gak jadi swipe
  };

  if (!active) {
    const isNext = index === totalCards - 2;
    return (
      <motion.div 
        animate={{ 
          scale: isNext ? 0.94 : 0.88, 
          y: isNext ? 15 : 30,
          opacity: isNext ? 0.6 : 0.2,
          filter: isNext ? "blur(0px)" : "blur(2px)"
        }}
        className="absolute top-0 w-full h-full bg-white rounded-[4rem] shadow-xl border border-nature-100/50 -z-10"
      />
    );
  }

  return (
    <div className="perspective-[1200px] w-full h-full">
      <motion.div
        style={{ x: springX, rotateY, rotateZ, backgroundColor: bg, boxShadow: shadow }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7} // Karetnya pas
        whileDrag={{ scale: 1.05 }}
        onDragEnd={handleDragEnd}
        className="absolute top-0 w-full h-full p-12 rounded-[4.5rem] border-[4px] border-white flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing overflow-hidden shadow-2xl"
      >
        <motion.div style={{ x: glintX }} className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Labels yang muncul pas di-drag */}
        <motion.div style={{ opacity: yesOpacity }} className="absolute top-14 right-10 bg-emerald-500 text-white font-black px-6 py-2 rounded-full text-xs shadow-xl rotate-6 border-2 border-white">YA</motion.div>
        <motion.div style={{ opacity: noOpacity }} className="absolute top-14 left-10 bg-rose-500 text-white font-black px-6 py-2 rounded-full text-xs shadow-xl -rotate-6 border-2 border-white">TIDAK</motion.div>

        {/* Icon Container */}
        <motion.div 
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className={`w-36 h-36 rounded-[3rem] bg-gradient-to-br ${data.color} mb-12 flex items-center justify-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative border-4 border-white/20`}
        >
           <HeartPulse size={56} className="relative z-10 drop-shadow-md" />
           <div className="absolute inset-0 bg-white/20 rounded-[2.8rem] blur-xl animate-pulse" />
        </motion.div>

        <h3 className="text-3xl font-black text-nature-900 leading-[1.1] tracking-tighter select-none px-2 mb-8 drop-shadow-sm">
          {data.text}
        </h3>
        
        {/* Loading Dots Kecil */}
        <div className="flex gap-2 opacity-30">
           {[0, 1, 2].map(i => (
             <motion.div 
               key={i}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
               className="w-2 h-2 rounded-full bg-nature-900" 
             />
           ))}
        </div>
      </motion.div>
    </div>
  );
};