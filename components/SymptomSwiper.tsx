"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Check, X, RefreshCw, AlertCircle } from "lucide-react";

// Data Pertanyaan
const questions = [
  { id: 1, text: "Apakah kamu batuk lebih dari 2 minggu?", color: "bg-red-400" },
  { id: 2, text: "Sering berkeringat di malam hari tanpa sebab?", color: "bg-orange-400" },
  { id: 3, text: "Berat badan turun drastis padahal makan biasa?", color: "bg-yellow-400" },
  { id: 4, text: "Pernah kontak erat dengan pasien TBC?", color: "bg-blue-400" },
];

export default function SymptomSwiper() {
  const [cards, setCards] = useState(questions);
  const [result, setResult] = useState<"risk" | "safe" | null>(null);
  const [yesCount, setYesCount] = useState(0);

  // Fungsi saat kartu dilempar
  const removeCard = (id: number, answer: "yes" | "no") => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (answer === "yes") setYesCount((prev) => prev + 1);

    // Cek hasil kalau kartu habis
    if (cards.length === 1) {
      setTimeout(() => {
        setResult(yesCount + (answer === "yes" ? 1 : 0) >= 2 ? "risk" : "safe");
      }, 500);
    }
  };

  return (
    <section className="py-24 px-4 overflow-hidden bg-nature-50 relative min-h-[800px] flex flex-col items-center justify-center">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sun-300/20 rounded-full blur-[100px]" />

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-bold text-nature-900 mb-2">Cek Risiko Kilat</h2>
        <p className="text-nature-900/60">Geser <span className="text-tbc-safe font-bold">KANAN (Ya)</span> atau <span className="text-tbc-danger font-bold">KIRI (Tidak)</span></p>
      </div>

      <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              data={card} 
              active={index === cards.length - 1} 
              removeCard={removeCard} 
            />
          ))}
        </AnimatePresence>

        {/* HASIL AKHIR (Muncul kalau kartu habis) */}
        {cards.length === 0 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white"
          >
            {result === "risk" ? (
              <div className="text-tbc-danger">
                <AlertCircle size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Risiko Terdeteksi</h3>
                <p className="text-nature-900/70 mb-6">Kamu memiliki gejala yang mengarah ke TBC. Segera periksa ke Puskesmas.</p>
                <button className="bg-tbc-danger text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition">
                  Cari Faskes Terdekat
                </button>
              </div>
            ) : (
              <div className="text-tbc-safe">
                <Check size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Paru-paru Aman!</h3>
                <p className="text-nature-900/70 mb-6">Gejalamu minim. Tetap jaga pola hidup sehat ya!</p>
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 mx-auto text-nature-900 font-semibold hover:underline">
                  <RefreshCw size={16} /> Coba Lagi
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// === BAGIAN YANG DIPERBAIKI ===
const Card = ({ data, active, removeCard }: any) => {
  const x = useMotionValue(0);
  
  // SEMUA HOOKS HARUS DIATAS (Sebelum 'return')
  const rotate = useTransform(x, [-200, 200], [-18, 18]); 
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]); 
  const bg = useTransform(x, [-200, 0, 200], ["rgb(239, 68, 68)", "rgb(255, 255, 255)", "rgb(16, 185, 129)"]);
  
  // INI YANG TADI BIKIN ERROR (Sekarang sudah dipindah ke atas)
  const yesOpacity = useTransform(x, [50, 100], [0, 1]);
  const noOpacity = useTransform(x, [-50, -100], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) removeCard(data.id, "yes");
    else if (info.offset.x < -100) removeCard(data.id, "no");
  };

  // Baru boleh return / logic if
  if (!active) return (
    <div className="absolute top-0 w-full h-full bg-white rounded-3xl shadow-sm border border-nature-100 scale-95 -z-10 opacity-50 translate-y-4" />
  );

  return (
    <motion.div
      style={{ x, rotate, opacity, backgroundColor: bg }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute top-0 w-full h-full p-8 rounded-3xl shadow-2xl border border-nature-100 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing"
    >
      {/* Indikator Teks (YES/NO) - Pake variabel yg udah dideclare diatas */}
      <motion.div style={{ opacity: yesOpacity }} className="absolute top-8 right-8 text-tbc-safe font-bold text-2xl border-4 border-tbc-safe rounded-lg px-2 rotate-12">
        YA
      </motion.div>
      <motion.div style={{ opacity: noOpacity }} className="absolute top-8 left-8 text-tbc-danger font-bold text-2xl border-4 border-tbc-danger rounded-lg px-2 -rotate-12">
        TIDAK
      </motion.div>

      <div className={`w-20 h-20 rounded-full ${data.color} mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-inner`}>
        ?
      </div>
      <h3 className="text-2xl font-bold text-nature-900 leading-tight select-none">
        {data.text}
      </h3>
      <p className="mt-4 text-sm text-nature-900/40 select-none">
        Geser kartu untuk menjawab
      </p>
    </motion.div>
  );
};