"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Github, Instagram, Mail, ArrowUpRight, Sparkles, CheckCircle2, UserPlus, X, Coins } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openVolunteer, setOpenVolunteer] = useState(false);
  const [openDonation, setOpenDonation] = useState(false);

  return (
    <footer className="relative bg-nature-900 text-nature-50 pt-32 pb-12 rounded-t-[4rem] -mt-16 z-30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-nature-400/30 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-nature-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Vision Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
              Indonesia<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 via-sun-300 to-emerald-400 italic">
                Bebas TBC 2030
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-nature-100/40 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              Perjalanan menuju napas yang lebih segar dimulai dari satu langkah kecil: <br className="hidden md:block"/>
              <span className="text-nature-100/80 italic font-serif tracking-wide">Kepedulian dan aksi nyata darimu.</span>
            </p>
          </motion.div>

          {/* Action Buttons (Trigger Modals) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-32 w-full max-w-lg"
          >
            <button 
                onClick={() => setOpenVolunteer(true)}
                className="group relative px-10 py-5 bg-nature-50 text-nature-900 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-white/5 hover:scale-105 active:scale-95 transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Daftar Relawan <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-sun-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button 
                onClick={() => setOpenDonation(true)}
                className="px-10 py-5 border-2 border-nature-100/10 text-nature-100 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              Donasi Oksigen <Sparkles size={16} className="text-sun-300" />
            </button>
          </motion.div>

          {/* Bottom Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16 items-start text-left">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xl font-black tracking-tighter">
                <div className="w-8 h-8 bg-nature-400 rounded-lg flex items-center justify-center text-white">
                    <Heart size={16} fill="currentColor" />
                </div>
                RESPIRE
              </div>
              <p className="text-sm text-nature-100/30 max-w-xs leading-relaxed font-medium">
                Platform digital untuk mendukung eliminasi TBC melalui pendekatan Organic Recovery dan visualisasi data yang manusiawi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:justify-self-center">
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-400">Navigasi</p>
                <div className="flex flex-col gap-2 text-sm font-bold text-nature-100/50">
                  <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
                  <a href="#cek-gejala" className="hover:text-white transition-colors">Cek Gejala</a>
                  <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-400">Media</p>
                <div className="flex flex-col gap-2 text-sm font-bold text-nature-100/50">
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={14}/> Instagram</a>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Github size={14}/> GitHub</a>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14}/> Email</a>
                </div>
              </div>
            </div>

            <div className="md:text-right flex flex-col md:items-end gap-4">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-400">Institutional</p>
               <p className="text-sm font-bold text-nature-100/80 uppercase">Universitas Harkat Negeri</p>
               <p className="text-[10px] text-nature-100/30 font-black uppercase tracking-widest">
                 Designed for Techsoft Competition <br/> 
                 {currentYear} © TBC Warrior Team
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* === MODAL: RELAWAN === */}
      <AnimatePresence>
        {openVolunteer && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nature-950/80 backdrop-blur-sm"
                onClick={() => setOpenVolunteer(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative overflow-hidden"
                >
                    <button onClick={() => setOpenVolunteer(false)} className="absolute top-6 right-6 p-2 bg-nature-50 rounded-full hover:bg-nature-100"><X size={20} className="text-nature-900"/></button>
                    
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                            <UserPlus size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-nature-900">Gabung Relawan</h3>
                        <p className="text-nature-900/50 text-sm mt-2">Jadilah bagian dari gerakan #IndonesiaBebasTBC. Data Anda aman bersama kami.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Terima kasih! Anda Akan dihubungi pihak kami"); setOpenVolunteer(false); }}>
                        <input type="text" placeholder="Nama Lengkap" className="w-full p-4 rounded-xl bg-nature-50 border border-nature-100 font-bold text-nature-900 placeholder:text-nature-900/30 focus:outline-none focus:ring-2 focus:ring-nature-400" required />
                        <input type="email" placeholder="Alamat Email" className="w-full p-4 rounded-xl bg-nature-50 border border-nature-100 font-bold text-nature-900 placeholder:text-nature-900/30 focus:outline-none focus:ring-2 focus:ring-nature-400" required />
                        <button type="submit" className="w-full py-4 bg-nature-900 text-white rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition">Kirim Data</button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* === MODAL: DONASI === */}
      <AnimatePresence>
        {openDonation && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nature-950/80 backdrop-blur-sm"
                onClick={() => setOpenDonation(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-nature-900 w-full max-w-md rounded-[2.5rem] p-8 relative overflow-hidden border border-white/10"
                >
                    <button onClick={() => setOpenDonation(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"><X size={20}/></button>
                    
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-sun-400 rounded-full mb-4 shadow-[0_0_40px_rgba(250,204,21,0.4)]">
                            <Sparkles size={40} className="text-nature-900" />
                        </div>
                        <h3 className="text-3xl font-black text-white">Impact Calculator</h3>
                        <p className="text-white/50 text-sm mt-2">Lihat dampak nyata dari donasi Anda.</p>
                    </div>

                    <DonationSlider />

                    <button className="w-full mt-8 py-4 bg-white text-nature-900 rounded-xl font-black uppercase tracking-widest hover:bg-sun-300 transition shadow-lg">
                        Lanjut Donasi
                    </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}

// Sub-component untuk Slider Donasi yang interaktif
function DonationSlider() {
    const [amount, setAmount] = useState(1);
    
    // Asumsi: 1 Tabung Oksigen = Rp 500.000 = Menolong 5 Pasien
    const price = amount * 500000;
    const patients = amount * 5;

    return (
        <div className="space-y-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="flex justify-between text-sm font-bold text-white/60 mb-2">
                    <span>Jumlah Tabung</span>
                    <span className="text-white">{amount} Unit</span>
                </div>
                <input 
                    type="range" min="1" max="10" step="1" 
                    value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-sun-400"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-500/30 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Pasien Terbantu</p>
                    <p className="text-3xl font-black text-white">{patients}+</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Estimasi Biaya</p>
                    <p className="text-lg font-bold text-white">Rp {(price/1000).toFixed(0)}k</p>
                </div>
            </div>
        </div>
    )
}