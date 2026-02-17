"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Check, X, RefreshCw, AlertCircle, HeartPulse } from "lucide-react";

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
    <section className="py-24 px-4 overflow-hidden bg-nature-50 relative min-h-[850px] flex flex-col items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nature-400/10 rounded-full blur-[120px]" 
      />

      <div className="text-center mb-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-nature-200 shadow-sm mb-4">
          <HeartPulse size={16} className="text-tbc-danger" />
          <span className="text-xs font-bold text-nature-900 uppercase tracking-widest">Self-Assessment v1.0</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-nature-900 mb-4 tracking-tight">Quick Screen</h2>
        <p className="text-nature-900/50 max-w-xs mx-auto leading-relaxed">Geser kartu untuk mendeteksi dini kesehatan paru-paru Anda.</p>
      </div>

      <div className="relative w-full max-w-sm h-[450px] flex items-center justify-center">
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
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="text-center p-10 bg-white rounded-[2.5rem] shadow-xl border border-white relative z-50 overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-2 ${result === "risk" ? 'bg-tbc-danger' : 'bg-tbc-safe'}`} />
            {result === "risk" ? (
              <div className="relative">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-tbc-danger"><AlertCircle size={40} /></div>
                <h3 className="text-3xl font-black text-nature-900 mb-3">Butuh Atensi</h3>
                <p className="text-nature-900/60 mb-8">Beberapa gejala memerlukan konsultasi medis profesional segera.</p>
                <button className="w-full bg-nature-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-95">Hubungi Dokter</button>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-tbc-safe"><Check size={40} /></div>
                <h3 className="text-3xl font-black text-nature-900 mb-3">Paru Sehat</h3>
                <p className="text-nature-900/60 mb-8">Hasil skrining rendah. Tetap jaga pola makan dan udara bersih!</p>
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 mx-auto text-nature-900 font-bold bg-nature-100 px-6 py-3 rounded-xl hover:bg-nature-200 transition-all"><RefreshCw size={18} /> Cek Ulang</button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

const Card = ({ data, active, index, totalCards, removeCard }: any) => {
  const x = useMotionValue(0);
  
  // SEMUA HOOKS WAJIB DI SINI (Diatas return manapun)
  const rotate = useTransform(x, [-200, 200], [-25, 25]); 
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]); 
  const bg = useTransform(x, [-150, 0, 150], ["#FDA4AF", "#FFFFFF", "#6EE7B7"]);
  const yesOpacity = useTransform(x, [40, 100], [0, 1]);
  const noOpacity = useTransform(x, [-40, -100], [0, 1]);
  const scaleIcon = useTransform(x, [-100, 0, 100], [1.2, 1, 1.2]);
  
  // Fix Glint Hook: pindah ke atas
  const glintX = useTransform(x, [-200, 200], [100, -100]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 120) removeCard(data.id, "yes");
    else if (info.offset.x < -120) removeCard(data.id, "no");
  };

  // Logic tumpukan kartu
  if (!active) {
    const isNext = index === totalCards - 2;
    return (
      <motion.div 
        animate={{ 
          scale: isNext ? 0.94 : 0.88, 
          y: isNext ? 15 : 30,
          opacity: isNext ? 0.6 : 0.3
        }}
        className="absolute top-0 w-full h-full bg-white rounded-[2.5rem] shadow-md border border-nature-100 -z-10"
      />
    );
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, backgroundColor: bg }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileDrag={{ scale: 1.05 }}
      onDragEnd={handleDragEnd}
      className="absolute top-0 w-full h-full p-10 rounded-[2.5rem] shadow-2xl border border-nature-100 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing overflow-hidden"
    >
      {/* Glint Effect */}
      <motion.div style={{ x: glintX }} className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* YES/NO Labels */}
      <motion.div style={{ opacity: yesOpacity, x: 20 }} className="absolute top-10 right-10 bg-tbc-safe text-white font-black py-1 px-4 rounded-lg rotate-12 shadow-lg">YA</motion.div>
      <motion.div style={{ opacity: noOpacity, x: -20 }} className="absolute top-10 left-10 bg-tbc-danger text-white font-black py-1 px-4 rounded-lg -rotate-12 shadow-lg">TIDAK</motion.div>

      <motion.div style={{ scale: scaleIcon }} className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${data.color} mb-8 flex items-center justify-center text-white shadow-lg relative`}>
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse" />
        <span className="text-4xl font-black relative z-10">?</span>
      </motion.div>

      <h3 className="text-2xl md:text-3xl font-black text-nature-900 leading-[1.2] select-none tracking-tight">{data.text}</h3>
      <div className="mt-8 flex gap-1">
        {[1, 2, 3].map((s) => <div key={s} className="w-1.5 h-1.5 rounded-full bg-nature-200" />)}
      </div>
    </motion.div>
  );
};