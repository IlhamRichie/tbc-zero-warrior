"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  MapPin, Hospital, Stethoscope, Building2, Pill, Search, Navigation,
  Phone, Clock, Star, X, ChevronUp, ChevronDown, Sparkles, Loader2, CheckCircle2
} from "lucide-react";

type Category = "Puskesmas" | "Rumah Sakit" | "Dokter" | "Apotek";

type Place = {
  id: string;
  name: string;
  category: Category;
  distanceKm: number;
  rating: number;
  openNow: boolean;
  address: string;
  phone: string;
  etaMin: number;
  x: number; // 0..100%
  y: number; // 0..100%
  services?: string[];
  class?: string;
};

const CATS: { cat: Category; icon: any; pill: string; glow: string }[] = [
  { cat: "Puskesmas", icon: Building2, pill: "bg-emerald-100 text-emerald-900 border-emerald-200", glow: "shadow-emerald-500/20" },
  { cat: "Rumah Sakit", icon: Hospital, pill: "bg-rose-100 text-rose-900 border-rose-200", glow: "shadow-rose-500/20" },
  { cat: "Dokter", icon: Stethoscope, pill: "bg-blue-100 text-blue-900 border-blue-200", glow: "shadow-blue-500/20" },
  { cat: "Apotek", icon: Pill, pill: "bg-amber-100 text-amber-900 border-amber-200", glow: "shadow-amber-500/20" },
];

// ==========================================
// 🔴 PASTE DATA MOCK_DB KAMU DI SINI 🔴
// ==========================================
const MOCK_DB: Place[] = [
  { id: "rs1", name: "RS Paru Dr. H. A. Rotinsulu", category: "Rumah Sakit", distanceKm: 2.4, rating: 4.8, openNow: true, address: "Jl. Bukit Jarian No. 40", phone: "(022) 2034446", etaMin: 12, x: 25, y: 35, services: ["Spesialis Paru", "IGD 24 Jam"] },
  { id: "pk1", name: "Puskesmas Kecamatan Duren Sawit", category: "Puskesmas", distanceKm: 1.1, rating: 4.5, openNow: true, address: "Jl. H. Dogol No. 15", phone: "(021) 86602333", etaMin: 5, x: 45, y: 55, services: ["Poli Umum", "Cek Dahak"] },
  { id: "ap1", name: "Apotek K-24 Merdeka", category: "Apotek", distanceKm: 0.8, rating: 4.6, openNow: true, address: "Jl. Merdeka Barat No. 2", phone: "0812-3333-4444", etaMin: 3, x: 15, y: 75, services: ["Obat Lengkap", "Antar Obat"] },
  { id: "doc1", name: "Praktik dr. Budi Santoso, Sp.P", category: "Dokter", distanceKm: 3.2, rating: 4.9, openNow: false, address: "Klinik Sejahtera, Lt. 2", phone: "0811-9988-7766", etaMin: 18, x: 65, y: 25, services: ["Konsultasi TBC", "Rontgen"] },
  { id: "rs2", name: "RSUD Tarakan", category: "Rumah Sakit", distanceKm: 5.6, rating: 4.7, openNow: true, address: "Jl. Kyai Caringin No. 7", phone: "(021) 3503003", etaMin: 25, x: 80, y: 60, services: ["Rawat Inap", "Lab Lengkap"] },
  { id: "pk2", name: "Puskesmas Kelurahan Menteng", category: "Puskesmas", distanceKm: 4.1, rating: 4.3, openNow: true, address: "Jl. Pegangsaan Barat", phone: "(021) 319089", etaMin: 20, x: 35, y: 85, services: ["Poli TBC", "Konseling"] },
  { id: "ap2", name: "Apotek Kimia Farma", category: "Apotek", distanceKm: 1.5, rating: 4.7, openNow: true, address: "Jl. Cikini Raya No. 10", phone: "(021) 333333", etaMin: 8, x: 55, y: 40, services: ["Resep Dokter", "Vitamin"] },
  { id: "rs3", name: "RS Hermina", category: "Rumah Sakit", distanceKm: 6.2, rating: 4.6, openNow: true, address: "Jl. Jatinegara Barat", phone: "(021) 8888999", etaMin: 30, x: 90, y: 20, services: ["Fasilitas Lengkap"] },
  { id: "doc2", name: "Klinik Paru Sehat", category: "Dokter", distanceKm: 2.8, rating: 4.8, openNow: true, address: "Ruko Grand Wijaya", phone: "0812-5555-6666", etaMin: 15, x: 10, y: 50, services: ["Nebulizer", "Tes Mantoux"] },
  { 
    id: "rs-mis", 
    name: "RSUD Indramayu (Mursid Ibnu Syafiuddin)", 
    category: "Rumah Sakit", 
    distanceKm: 2.1, 
    rating: 4.7, 
    openNow: true, 
    address: "Jl. Murah Nara No. 7, Sindang", 
    phone: "(0234) 272655", 
    etaMin: 8, 
    x: 50, 
    y: 40, 
    services: ["Pusat Rujukan Paru", "Poli DOTS TBC", "IGD 24 Jam"] 
  },
  { 
    id: "rs-bhayangkara", 
    name: "RS Bhayangkara Indramayu", 
    category: "Rumah Sakit", 
    distanceKm: 15.4, 
    rating: 4.6, 
    openNow: true, 
    address: "Jl. Raya Losarang, Krimun", 
    phone: "(0234) 555666", 
    etaMin: 25, 
    x: 20, 
    y: 25, 
    services: ["Trauma Center", "Rontgen Thorax", "Rawat Inap"] 
  },
  { 
    id: "rs-mm", 
    name: "RS MM Indramayu", 
    category: "Rumah Sakit", 
    distanceKm: 3.5, 
    rating: 4.5, 
    openNow: true, 
    address: "Jl. Letjen Suprapto No. 292", 
    phone: "(0234) 277666", 
    etaMin: 12, 
    x: 75, 
    y: 30, 
    services: ["Spesialis Penyakit Dalam", "Fasilitas VIP"] 
  },
  { 
    id: "rs-sentot", 
    name: "RSUD Pantura M.A. Sentot", 
    category: "Rumah Sakit", 
    distanceKm: 28.2, 
    rating: 4.4, 
    openNow: true, 
    address: "Jl. Raya Patrol, Pantura", 
    phone: "(0234) 611222", 
    etaMin: 45, 
    x: 10, 
    y: 80, 
    services: ["Rujukan Pantura", "Unit Gawat Darurat"] 
  },
  { 
    id: "rs-hasna", 
    name: "RS Jantung Hasna Medika", 
    category: "Rumah Sakit", 
    distanceKm: 18.5, 
    rating: 4.8, 
    openNow: true, 
    address: "Jl. Ki Hajar Dewantara, Palimanan", 
    phone: "(0231) 333444", 
    etaMin: 30, 
    x: 85, 
    y: 65, 
    services: ["Spesialis Jantung & Paru", "ICU Modern"] 
  },
  // Klinik & BP kita masukkan kategori 'Dokter' atau 'Puskesmas' biar icon-nya beda
  { 
    id: "klinik-sentra", 
    name: "Klinik Sentra Medika Langut", 
    category: "Dokter", 
    distanceKm: 9.2, 
    rating: 4.5, 
    openNow: true, 
    address: "Jl. Raya Langut, Lohbener", 
    phone: "0812-9988-7766", 
    etaMin: 15, 
    x: 35, 
    y: 55, 
    services: ["Dokter Umum 24 Jam", "Nebulizer"] 
  },
  { 
    id: "klinik-avicenna", 
    name: "Klinik Avicenna", 
    category: "Dokter", 
    distanceKm: 4.0, 
    rating: 4.6, 
    openNow: false, 
    address: "Jl. DI Panjaitan, Indramayu", 
    phone: "0811-2233-4455", 
    etaMin: 10, 
    x: 60, 
    y: 50, 
    services: ["Praktek Dokter Bersama", "Farmasi"] 
  },
  { 
    id: "bp-aurel", 
    name: "BP Aurel (Balai Pengobatan)", 
    category: "Dokter", 
    distanceKm: 6.5, 
    rating: 4.3, 
    openNow: true, 
    address: "Kawasan Balongan", 
    phone: "-", 
    etaMin: 14, 
    x: 90, 
    y: 45, 
    services: ["Pengobatan Umum", "Cek Tensi"] 
  },
  // Tambahan Puskesmas dekat Polindra biar makin real
  { 
    id: "pk-lohbener", 
    name: "Puskesmas Lohbener", 
    category: "Puskesmas", 
    distanceKm: 1.5, // Dekat banget sama Polindra
    rating: 4.4, 
    openNow: true, 
    address: "Jl. Raya Lohbener (Dekat Kampus)", 
    phone: "(0234) 777888", 
    etaMin: 5, 
    x: 40, 
    y: 60, 
    services: ["BPJS Kesehatan", "Program TBC Nasional"] 
  },
  { 
    id: "apotek-kimia", 
    name: "Apotek Kimia Farma Indramayu", 
    category: "Apotek", 
    distanceKm: 2.3, 
    rating: 4.7, 
    openNow: true, 
    address: "Jl. Jend. Sudirman", 
    phone: "(0234) 272727", 
    etaMin: 8, 
    x: 55, 
    y: 35, 
    services: ["Obat Resep", "Vitamin Lengkap"] 
  },
  { 
    id: "rs-soeselo", 
    name: "RSUD dr. Soeselo (Rujukan Utama)", 
    category: "Rumah Sakit", 
    distanceKm: 4.2, 
    rating: 4.7, 
    openNow: true, 
    address: "Jl. Dr. Soeselo, Slawi", 
    phone: "(0283) 491016", 
    etaMin: 12, 
    x: 30, 
    y: 85, 
    services: ["Pusat Rujukan TBC", "IGD 24 Jam", "BPJS Kelas A"] 
  },
  { 
    id: "rs-kardinah", 
    name: "RSUD Kardinah Kota Tegal", 
    category: "Rumah Sakit", 
    distanceKm: 5.8, 
    rating: 4.6, 
    openNow: true, 
    address: "Jl. KS Tubun, Tegal Timur", 
    phone: "(0283) 350477", 
    etaMin: 15, 
    x: 80, 
    y: 30, 
    services: ["Spesialis Paru", "ICU Modern", "Laboratorium Lengkap"] 
  },
  { 
    id: "rs-islam", 
    name: "RSI Harapan Anda", 
    category: "Rumah Sakit", 
    distanceKm: 3.5, 
    rating: 4.5, 
    openNow: true, 
    address: "Jl. Sultan Agung, Tegal Selatan", 
    phone: "(0283) 358244", 
    etaMin: 10, 
    x: 65, 
    y: 50, 
    services: ["Layanan Gawat Darurat", "Klinik Paru"] 
  },
  { 
    id: "rs-pku", 
    name: "RSU PKU Muhammadiyah Singkil", 
    category: "Rumah Sakit", 
    distanceKm: 2.1, // Dekat dari Dukuhturi/Adiwerna
    rating: 4.6, 
    openNow: true, 
    address: "Jl. Raya Singkil, Adiwerna", 
    phone: "(0283) 3448131", 
    etaMin: 6, 
    x: 45, 
    y: 60, 
    services: ["IGD 24 Jam", "Ambulans Cepat"] 
  },
  { 
    id: "rs-mitra", 
    name: "RS Mitra Keluarga Tegal", 
    category: "Rumah Sakit", 
    distanceKm: 6.5, 
    rating: 4.8, 
    openNow: true, 
    address: "Jl. Sipelem, Tegal Barat", 
    phone: "(0283) 324777", 
    etaMin: 18, 
    x: 20, 
    y: 20, 
    services: ["Fasilitas VIP", "Dokter Spesialis Lengkap"] 
  },
  { 
    id: "rsia-pala", 
    name: "RSIA Pala Raya", 
    category: "Rumah Sakit", 
    distanceKm: 7.2, 
    rating: 4.4, 
    openNow: true, 
    address: "Jl. Pala Raya, Mejasem", 
    phone: "(0283) 356009", 
    etaMin: 20, 
    x: 90, 
    y: 40, 
    services: ["Ibu & Anak", "Rawat Inap"] 
  },

  // --- PUSKESMAS KABUPATEN (Fokus Sekitar Dukuhturi) ---
  { 
    id: "pk-dukuhturi", 
    name: "Puskesmas Dukuhturi", 
    category: "Puskesmas", 
    distanceKm: 0.8, // SANGAT DEKAT (Karena lokasi kamu di Dukuhturi)
    rating: 4.5, 
    openNow: true, 
    address: "Jl. Raya Dukuhturi", 
    phone: "(0283) 333222", 
    etaMin: 2, 
    x: 50, 
    y: 50, // Posisi tengah peta
    services: ["Poli Umum", "Program DOTS TB", "BPJS"] 
  },
  { 
    id: "pk-kupu", 
    name: "Puskesmas Kupu Dukuhturi", 
    category: "Puskesmas", 
    distanceKm: 2.5, 
    rating: 4.3, 
    openNow: true, 
    address: "Desa Kupu, Kec. Dukuhturi", 
    phone: "-", 
    etaMin: 7, 
    x: 40, 
    y: 40, 
    services: ["Layanan Dasar", "Posyandu"] 
  },
  { 
    id: "pk-adiwerna", 
    name: "Puskesmas Adiwerna", 
    category: "Puskesmas", 
    distanceKm: 3.2, 
    rating: 4.4, 
    openNow: true, 
    address: "Kec. Adiwerna", 
    phone: "(0283) 444555", 
    etaMin: 9, 
    x: 55, 
    y: 70, 
    services: ["UGD 24 Jam", "Cek Lab Sederhana"] 
  },
  { 
    id: "pk-slawi", 
    name: "Puskesmas Slawi", 
    category: "Puskesmas", 
    distanceKm: 5.0, 
    rating: 4.5, 
    openNow: true, 
    address: "Kota Slawi", 
    phone: "(0283) 666777", 
    etaMin: 14, 
    x: 35, 
    y: 90, 
    services: ["Pusat Kesehatan Kota", "Vaksinasi"] 
  },

  // --- PUSKESMAS KOTA TEGAL ---
  { 
    id: "pk-tegbar", 
    name: "Puskesmas Tegal Barat", 
    category: "Puskesmas", 
    distanceKm: 6.8, 
    rating: 4.2, 
    openNow: true, 
    address: "Jl. Hang Tuah", 
    phone: "(0283) 888999", 
    etaMin: 19, 
    x: 15, 
    y: 35, 
    services: ["Kesehatan Ibu Anak", "Umum"] 
  },
  { 
    id: "pk-margadana", 
    name: "Puskesmas Margadana", 
    category: "Puskesmas", 
    distanceKm: 7.5, 
    rating: 4.3, 
    openNow: true, 
    address: "Jl. Ki Hajar Dewantoro", 
    phone: "-", 
    etaMin: 22, 
    x: 10, 
    y: 10, 
    services: ["Rawat Jalan", "Gigi"] 
  },
  
  // --- APOTEK (PELENGKAP) ---
  { 
    id: "ap-kimia", 
    name: "Apotek Kimia Farma Slawi", 
    category: "Apotek", 
    distanceKm: 4.5, 
    rating: 4.7, 
    openNow: true, 
    address: "Jl. Jend. Sudirman, Slawi", 
    phone: "(0283) 492222", 
    etaMin: 13, 
    x: 28, 
    y: 75, 
    services: ["Obat Resep", "Alkes"] 
  },
  { 
    id: "ap-k24", 
    name: "Apotek K-24 Tegal", 
    category: "Apotek", 
    distanceKm: 5.2, 
    rating: 4.6, 
    openNow: true, 
    address: "Jl. AR. Hakim", 
    phone: "(0283) 322322", 
    etaMin: 15, 
    x: 75, 
    y: 45, 
    services: ["Buka 24 Jam", "Antar Obat"] 
  },
];

function catIcon(cat: Category) {
  return (CATS.find((c) => c.cat === cat)?.icon ?? MapPin) as any;
}
function catPill(cat: Category) {
  return CATS.find((c) => c.cat === cat)?.pill ?? "bg-slate-100 text-slate-900 border-slate-200";
}

export default function NearbyCareMap() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "Semua">("Semua");
  const [activeId, setActiveId] = useState<string>("");
  const [openDetail, setOpenDetail] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(true);

  // --- NAVIGATION STATE ---
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollY } = useScroll();
  const par1 = useTransform(scrollY, [0, 2500], [0, -120]);
  const par2 = useTransform(scrollY, [0, 2500], [0, -220]);

  // Reset Navigasi saat ganti lokasi
  useEffect(() => {
    setIsNavigating(false);
    setProgress(0);
  }, [activeId]);

  // Loop Animasi Jalan
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isNavigating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100; // Stop di 100
          return prev + 0.4; // Kecepatan jalan mobil
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isNavigating]);

  // Fetch Simulation
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = MOCK_DB.filter((p) => {
            const matchCat = cat === "Semua" ? true : p.category === cat;
            const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) || 
                           p.address.toLowerCase().includes(q.toLowerCase());
            return matchCat && matchQ;
        }).sort((a, b) => a.distanceKm - b.distanceKm);
        setPlaces(filtered);
        setIsLoading(false);
      }, 600);
    };
    fetchData();
  }, [q, cat]);

  const active = useMemo(
    () => places.find((p) => p.id === activeId) ?? null,
    [places, activeId]
  );

  const me = { x: 50, y: 85 }; 

  // Manhattan Routing Logic (Siku-siku)
  const routePath = useMemo(() => {
    if (!active) return null;
    const midY = (me.y + active.y) / 2;
    // Path: Start -> Tengah Vertikal -> Belok Horizontal -> Tujuan
    return `M ${me.x} ${me.y} L ${me.x} ${midY} L ${active.x} ${midY} L ${active.x} ${active.y}`;
  }, [active]);

  return (
    <div className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Navigation size={14} className="text-nature-500" />
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
              Smart Health Map
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Peta Faskes <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-500 to-emerald-600">Terintegrasi</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg">
            Navigasi cepat ke fasilitas kesehatan rujukan TBC dan apotek di sekitar Anda.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAP CANVAS CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // 3D TILT ANIMATION SAAT NAVIGASI
            animate={isNavigating ? { scale: 1.05, rotateX: 40, y: 40 } : { scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.2, type: "spring" }}
            style={{ transformPerspective: 1200 }} 
            className="lg:col-span-7 relative overflow-hidden rounded-[3rem] border-4 border-white bg-slate-100 shadow-2xl z-10 h-[600px] group transform-gpu"
          >
            {/* HUD OVERLAY (Muncul saat Navigasi) */}
            <AnimatePresence>
                {isNavigating && (
                    <motion.div 
                        initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
                        className="absolute top-6 left-6 right-6 z-50 bg-nature-900/90 backdrop-blur text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                            <Navigation size={24} className="transform -rotate-45" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-nature-200 uppercase tracking-widest">Menuju Lokasi</p>
                            <p className="text-lg font-black leading-tight">{active?.name}</p>
                        </div>
                        <button onClick={() => setIsNavigating(false)} className="bg-red-500/20 hover:bg-red-500 p-2 rounded-lg transition"><X size={20}/></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAP BACKGROUND (City Grid) */}
            <div className="absolute inset-0 z-0 bg-[#f0f4f8]">
               {/* Grid Pattern */}
               <motion.div 
                    animate={isNavigating ? { y: [0, 50] } : { y: 0 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="absolute inset-0 opacity-10" 
                    style={{ 
                        backgroundImage: `linear-gradient(#94a3b8 2px, transparent 2px), linear-gradient(90deg, #94a3b8 2px, transparent 2px)`,
                        backgroundSize: '50px 50px' 
                    }} 
               />
               {/* Landmark: Jalan Pantura */}
               <div className="absolute top-[40%] left-0 w-full h-12 bg-yellow-500/5 border-y-2 border-yellow-500/10 flex items-center justify-center overflow-hidden">
                  <span className="text-[80px] font-black text-yellow-500/5 tracking-[80px] whitespace-nowrap">JALANPANTURA</span>
               </div>
            </div>

            {/* INTERACTIVE LAYER */}
            <div className="absolute inset-0 z-0">
              
              {/* SVG ROUTE */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                {active && routePath && (
                  <>
                    <motion.path d={routePath} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="translate-y-1" />
                    <motion.path
                      d={routePath}
                      fill="none"
                      stroke={isNavigating ? "#10b981" : "#cbd5e1"}
                      strokeWidth={isNavigating ? "6" : "4"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                    />
                  </>
                )}
              </svg>

              {/* USER / CAR MARKER */}
              {active && routePath && (
                  <div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none z-30"
                    style={{
                        offsetPath: `path("${routePath}")`, // Magic CSS
                        offsetDistance: `${isNavigating ? progress : 0}%`,
                        transition: isNavigating ? 'none' : 'offset-distance 1s ease-in-out'
                    }}
                  >
                      <div className="relative -ml-3 -mt-3"> 
                          {isNavigating ? (
                              // Mobil/Panah Navigasi
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-12 h-12 bg-nature-900 rounded-full border-4 border-white shadow-2xl flex items-center justify-center relative z-50">
                                  <Navigation size={20} className="text-white fill-white transform rotate-45" />
                              </motion.div>
                          ) : (
                              // Titik User Biasa
                              <div className="w-6 h-6 bg-blue-600 border-4 border-white rounded-full shadow-lg relative z-20">
                                <div className="absolute -inset-4 bg-blue-500/30 rounded-full animate-ping" />
                              </div>
                          )}
                      </div>
                  </div>
              )}

              {/* DESTINATION PINS */}
              <AnimatePresence>
              {places.map((p, i) => {
                const Icon = catIcon(p.category);
                const isActive = active?.id === p.id;
                // Sembunyikan pin lain saat navigasi biar bersih
                if (isNavigating && !isActive) return null;

                return (
                  <motion.button
                    key={p.id}
                    onClick={() => setActiveId(p.id)}
                    className="absolute -translate-x-1/2 -translate-y-full z-20 group"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", delay: i * 0.05 }}
                  >
                    <div className={`relative transition-all duration-300 ${isActive ? 'scale-125 -translate-y-2 z-30' : 'group-hover:scale-110 z-20'}`}>
                        {/* Label Hover */}
                        <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 flex flex-col items-center min-w-[100px] transition-all ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}`}>
                            <p className="text-[10px] font-bold text-slate-800 text-center leading-tight">{p.name}</p>
                            <p className="text-[9px] font-mono text-slate-400">{p.distanceKm} km</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                        </div>

                        {/* Pin Circle */}
                        <div className={`w-10 h-10 rounded-full border-[3px] border-white shadow-lg flex items-center justify-center transition-colors ${isActive ? 'bg-nature-900 text-white' : 'bg-white text-slate-600'}`}>
                            <Icon size={18} />
                        </div>
                        
                        {/* Arrival Badge (Muncul saat sampai) */}
                        {isNavigating && isActive && progress >= 99 && (
                            <motion.div 
                                initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full shadow-xl font-black text-xs whitespace-nowrap z-50"
                            >
                                TUJUAN DICAPAI
                            </motion.div>
                        )}

                        <div className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${isActive ? 'border-t-nature-900' : 'border-t-white'}`} />
                    </div>
                  </motion.button>
                );
              })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT PANEL (LIST) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block lg:col-span-5 h-[600px] flex flex-col"
          >
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full">
                <PanelList
                  q={q} setQ={setQ} cat={cat} setCat={setCat} places={places} activeId={active?.id ?? ""} setActiveId={setActiveId}
                  openDetail={() => setOpenDetail(true)} isLoading={isLoading}
                />
            </div>
          </motion.div>
        </div>

        {/* MOBILE LIST */}
        <div className="lg:hidden mt-6">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                <PanelList
                  q={q} setQ={setQ} cat={cat} setCat={setCat} places={places} activeId={active?.id ?? ""} setActiveId={setActiveId}
                  openDetail={() => setOpenDetail(true)} compact isLoading={isLoading}
                />
             </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {openDetail && active && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-nature-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
                <div className="h-28 bg-nature-100 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-nature-200 rounded-full" />
                    <button onClick={() => setOpenDetail(false)} className="absolute top-4 right-4 bg-white/50 p-2 rounded-full text-nature-900 hover:bg-white"><X size={20}/></button>
                </div>
                <div className="px-8 pb-8 -mt-10 relative">
                    <div className="flex justify-between items-end mb-4">
                        <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-lg flex items-center justify-center border-4 border-white">
                            {(() => { const Icon = catIcon(active.category); return <Icon size={32} className="text-nature-900" />; })()}
                        </div>
                        <span className={`px-3 py-1 mb-2 rounded-full text-[10px] font-black uppercase tracking-widest ${catPill(active.category)}`}>{active.category}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{active.name}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-6">{active.address}</p>
                    
                    {active.services && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {active.services.map(s => (
                                <span key={s} className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                                    <CheckCircle2 size={10} className="text-nature-500" /> {s}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="space-y-3">
                        <InfoRow icon={<Phone size={16}/>} label="Kontak Darurat" value={active.phone} />
                        <InfoRow icon={<Clock size={16}/>} label="Jarak & Waktu" value={`${active.distanceKm} km (±${active.etaMin} menit)`} />
                    </div>
                    
                    <button 
                        onClick={() => {
                            setOpenDetail(false);
                            setIsNavigating(true);
                        }}
                        className="w-full mt-6 py-4 bg-nature-900 text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
                    >
                        <Navigation size={18} />
                        Mulai Navigasi
                    </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PanelList({ q, setQ, cat, setCat, places, activeId, setActiveId, openDetail, compact, isLoading }: any) {
  return (
    <div className="flex flex-col h-full">
      <div className={`p-6 border-b border-slate-100 ${compact ? 'pb-4' : ''}`}>
        <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari lokasi, dokter, poli..." 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-nature-500/20 transition"
            />
        </div>
        <div className="flex flex-wrap gap-2">
            <Chip active={cat === "Semua"} onClick={() => setCat("Semua")} label="Semua" />
            {CATS.map(c => (
                <Chip key={c.cat} active={cat === c.cat} onClick={() => setCat(c.cat)} label={c.cat} />
            ))}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-2 ${compact ? 'max-h-[400px]' : ''}`}>
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 opacity-50 gap-3">
                <Loader2 className="animate-spin text-nature-500" size={32} />
                <p className="text-xs font-bold text-slate-400">Mencari lokasi terdekat...</p>
            </div>
        ) : places.length === 0 ? (
            <div className="text-center py-10 opacity-50">
                <p>Tidak ada fasilitas kesehatan ditemukan</p>
            </div>
        ) : (
            places.map((p: Place) => {
                const Icon = catIcon(p.category);
                const isActive = p.id === activeId;
                return (
                    <button
                        key={p.id}
                        onClick={() => { setActiveId(p.id); if(compact) openDetail(); }}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group ${
                            isActive 
                                ? 'bg-nature-900 border-nature-900 shadow-lg scale-[1.02]' 
                                : 'bg-white border-slate-100 hover:border-nature-200 hover:shadow-md'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                                isActive ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-500'
                            }`}>
                                <Icon size={22} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className={`font-black text-sm truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
                                <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-white/60' : 'text-slate-500'}`}>{p.address}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>{p.distanceKm} km</span>
                                    {p.class && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'}`}>Kelas {p.class}</span>}
                                </div>
                            </div>
                        </div>
                    </button>
                )
            })
        )}
      </div>
      
      {!compact && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <button 
                onClick={openDetail}
                disabled={!activeId}
                className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                  Lihat Detail Lokasi
              </button>
          </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all ${
        active
          ? "bg-nature-900 text-white border-nature-900 shadow-md scale-105"
          : "bg-white text-slate-600 border-slate-200 hover:border-nature-300 hover:text-nature-700"
      }`}
    >
      {label}
    </button>
  );
}

function InfoRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="text-nature-500">{icon}</div>
        <div>
            <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
            <p className="text-sm font-bold text-slate-800 line-clamp-1">{value}</p>
        </div>
    </div>
  );
}