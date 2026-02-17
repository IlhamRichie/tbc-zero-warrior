"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingParticles() {
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  // Generate partikel acak hanya di Client (biar ga error hydration)
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Posisi X (0-100%)
      y: Math.random() * 100, // Posisi Y (0-100%)
      size: Math.random() * 10 + 2, // Ukuran 2px - 12px
      duration: Math.random() * 20 + 10, // Durasi animasi melayang
      delay: Math.random() * 5, // Delay biar ga barengan
    }));
    setParticles(newParticles);
  }, []);

  // Parallax Effect: Scroll cepat -> Partikel gerak cepat
  // Kita bagi jadi 2 layer biar ada kedalaman (Depth)
  const y1 = useTransform(scrollY, [0, 5000], [0, -500]); // Layer Belakang (Lambat)
  const y2 = useTransform(scrollY, [0, 5000], [0, -1000]); // Layer Depan (Cepat)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => {
        // Bagi partikel jadi 2 grup buat efek parallax beda speed
        const yMove = i % 2 === 0 ? y1 : y2; 
        
        return (
          <motion.div
            key={p.id}
            style={{ 
              top: `${p.y}%`, 
              left: `${p.x}%`,
              y: yMove 
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0], // Kedap-kedip pelan
              y: [0, -100], // Gerak ke atas pelan (natural float)
              x: [0, Math.random() * 50 - 25] // Goyang kiri-kanan
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-nature-400/30 blur-[1px]"
          >
            {/* Variasi bentuk: Ada yang bulat, ada yang kayak daun kecil */}
            <div 
              style={{ width: p.size, height: p.size }} 
              className={`rounded-full ${i % 3 === 0 ? 'bg-sun-300/40' : 'bg-nature-400/30'}`} 
            />
          </motion.div>
        );
      })}
    </div>
  );
}