"use client";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Navbar() {
    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
        >
            <div className="flex items-center justify-between px-6 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-lg w-full max-w-4xl">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-nature-400 rounded-full text-white">
                        <Activity size={20} />
                    </div>
                    <span className="font-bold text-nature-900 tracking-tight">TBC Warrior</span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium text-nature-900/80">
                    <a href="#" className="hover:text-nature-600 transition">Tentang</a>
                    <a href="#" className="hover:text-nature-600 transition">Gejala</a>
                    <a href="#" className="hover:text-nature-600 transition">Pengobatan</a>
                </div>

                <button className="bg-nature-600 hover:bg-nature-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md">
                    Cek Risiko
                </button>
            </div>
        </motion.nav>
    );
}