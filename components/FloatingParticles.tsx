"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function FloatingParticles() {
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<{ 
    id: number; x: number; y: number; size: number; duration: number; 
    delay: number; layer: number; type: "circle" | "leaf" 
  }[]>([]);

  // Generate partikel hanya di Client
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      layer: i % 3, // 0: Belakang, 1: Tengah, 2: Depan
      type: i % 4 === 0 ? "leaf" : "circle" as "circle" | "leaf",
    }));
    setParticles(newParticles);
  }, []);

  // Smooth out the scroll value for parallax
  const smoothScrollY = useSpring(scrollY, { stiffness: 50, damping: 20 });

  // 3 Layer Parallax untuk efek 3D yang nyata
  const yBack = useTransform(smoothScrollY, [0, 5000], [0, -300]);
  const yMid = useTransform(smoothScrollY, [0, 5000], [0, -700]);
  const yFront = useTransform(smoothScrollY, [0, 5000], [0, -1200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {particles.map((p) => {
        // Pilih kecepatan dan blur berdasarkan layer
        const yMove = p.layer === 0 ? yBack : p.layer === 1 ? yMid : yFront;
        const blurAmount = p.layer === 0 ? "blur(4px)" : p.layer === 1 ? "blur(1px)" : "blur(0px)";
        const zIndex = p.layer === 0 ? 0 : p.layer === 1 ? 10 : 20;
        const opacityBase = p.layer === 0 ? 0.1 : p.layer === 1 ? 0.3 : 0.5;

        return (
          <motion.div
            key={p.id}
            style={{ 
              top: `${p.y}%`, 
              left: `${p.x}%`,
              y: yMove,
              filter: blurAmount,
              zIndex: zIndex
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, opacityBase, 0],
              scale: [0.8, 1, 0.8],
              rotate: p.type === "leaf" ? [0, 45, 0] : 0,
              x: [0, Math.random() * 80 - 40], // Goyangan horizontal lebih lebar
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            className="absolute flex items-center justify-center"
          >
            {p.type === "leaf" ? (
              // BENTUK DAUN (Organic Recovery)
              <div 
                style={{ width: p.size * 1.5, height: p.size }} 
                className="bg-nature-400/20 rounded-tl-full rounded-br-full rotate-45 border border-nature-300/10"
              />
            ) : (
              // BENTUK POLLEN (Glowing Spores)
              <div 
                style={{ width: p.size, height: p.size }} 
                className={`rounded-full relative ${
                  p.id % 3 === 0 ? 'bg-sun-300/30' : 'bg-nature-300/30'
                }`} 
              >
                {/* Efek Glow di dalam partikel */}
                <div className="absolute inset-0 rounded-full bg-inherit blur-[2px] animate-pulse" />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* VIGNETTE EFFECT: Biar partikel seolah-olah hilang di pinggir layar */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,255,255,0.5)]" />
    </div>
  );
}