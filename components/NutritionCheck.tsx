"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Salad, Ruler, Weight, Activity, Info, Sparkles, Flame, ChevronDown
} from "lucide-react";

type Sex = "male" | "female";
type Goal = "maintain" | "gain" | "cut";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fmt(n: number) {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString("id-ID");
}

function toNum(s: string) {
  const t = s.trim();
  if (t === "") return NaN;
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
}

export default function NutritionCheck() {
  const [sex, setSex] = useState<Sex>("male");
  const [ageStr, setAgeStr] = useState<string>("24");
  const [heightStr, setHeightStr] = useState<string>("170");
  const [weightStr, setWeightStr] = useState<string>("60");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");

  const age = useMemo(() => toNum(ageStr), [ageStr]);
  const heightCm = useMemo(() => toNum(heightStr), [heightStr]);
  const weightKg = useMemo(() => toNum(weightStr), [weightStr]);

  // Logic Perhitungan Nutrisi
  const activityFactor = useMemo(() => {
    switch (activity) {
      case "sedentary": return 1.2;
      case "light": return 1.375;
      case "moderate": return 1.55;
      case "active": return 1.725;
      case "very": return 1.9;
    }
  }, [activity]);

  const bmi = useMemo(() => {
    const h = heightCm / 100;
    if (!Number.isFinite(h) || h <= 0) return NaN;
    if (!Number.isFinite(weightKg) || weightKg <= 0) return NaN;
    return weightKg / (h * h);
  }, [heightCm, weightKg]);

  const bmiLabel = useMemo(() => {
    if (!Number.isFinite(bmi)) return "—";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obesity";
  }, [bmi]);

  const bmr = useMemo(() => {
    if (!Number.isFinite(age) || !Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return NaN;
    if (age <= 0 || heightCm <= 0 || weightKg <= 0) return NaN;
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return sex === "male" ? base + 5 : base - 161;
  }, [sex, age, heightCm, weightKg]);

  const tdee = useMemo(() => {
    if (!Number.isFinite(bmr)) return NaN;
    return bmr * activityFactor;
  }, [bmr, activityFactor]);

  const targetCalories = useMemo(() => {
    if (!Number.isFinite(tdee)) return NaN;
    const delta = goal === "gain" ? 300 : goal === "cut" ? -400 : 0;
    return tdee + delta;
  }, [tdee, goal]);

  const macros = useMemo(() => {
    if (!Number.isFinite(targetCalories) || !Number.isFinite(weightKg)) return null;
    
    // Protein tinggi untuk recovery TBC
    const proteinG = clamp(weightKg * 1.8, weightKg * 1.5, weightKg * 2.2);
    const proteinKcal = proteinG * 4;

    const fatKcal = targetCalories * 0.30;
    const fatG = fatKcal / 9;

    const carbKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
    const carbG = carbKcal / 4;

    return {
      proteinG, fatG, carbG,
      proteinKcal, fatKcal, carbKcal,
      total: targetCalories,
    };
  }, [targetCalories, weightKg]);

  return (
    <section id="nutrisi" className="relative py-28 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 bg-nature-50/50">
        <motion.div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-nature-200/30 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-nature-100 shadow-sm mb-6">
            <Sparkles className="text-nature-500" size={14} />
            <span className="text-[10px] font-black text-nature-900 uppercase tracking-widest">
              Smart Calculator
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-nature-900 leading-tight tracking-tight">
            Hitung <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-500 to-emerald-600">Nutrisi Ideal</span><br/>
            Untuk Pemulihan.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INPUT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-[2.5rem] bg-white border border-nature-100 shadow-xl relative z-10"
          >
            <div className="space-y-8">
              {/* Gender */}
              <div className="p-1 bg-nature-50 rounded-2xl flex relative">
                <motion.div 
                    layout
                    className="absolute top-1 bottom-1 w-[48%] bg-white rounded-xl shadow-sm border border-nature-100"
                    initial={false}
                    animate={{ left: sex === "male" ? "1%" : "51%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button onClick={() => setSex("male")} className="flex-1 py-3 text-sm font-black text-nature-900 relative z-10 transition-colors">Pria</button>
                <button onClick={() => setSex("female")} className="flex-1 py-3 text-sm font-black text-nature-900 relative z-10 transition-colors">Wanita</button>
              </div>

              {/* Sliders with Value Display */}
              <RangeInput label="Usia" icon={<Activity size={16}/>} value={ageStr} onChange={setAgeStr} unit="thn" min={10} max={100} />
              <RangeInput label="Tinggi" icon={<Ruler size={16}/>} value={heightStr} onChange={setHeightStr} unit="cm" min={100} max={220} />
              <RangeInput label="Berat" icon={<Weight size={16}/>} value={weightStr} onChange={setWeightStr} unit="kg" min={30} max={150} />

              {/* Activity & Goal */}
              <div className="grid grid-cols-2 gap-4">
                 <SelectInput 
                    label="Aktivitas" 
                    options={[
                        { val: "sedentary", label: "Santai" },
                        { val: "light", label: "Ringan" },
                        { val: "moderate", label: "Sedang" },
                        { val: "active", label: "Aktif" },
                        { val: "very", label: "Berat" }
                    ]}
                    value={activity}
                    onChange={setActivity}
                 />
                 <SelectInput 
                    label="Target" 
                    options={[
                        { val: "cut", label: "Turun" },
                        { val: "maintain", label: "Stabil" },
                        { val: "gain", label: "Naik" }
                    ]}
                    value={goal}
                    onChange={setGoal}
                 />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: OUTPUT PANEL (3D TILT CARD) */}
          <div className="lg:col-span-7 perspective-1000">
             <TiltCard>
                <div className="p-8 rounded-[2.5rem] bg-nature-900 text-white relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-between">
                    {/* Background Noise & Glow */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/30 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sun-500/30 rounded-full blur-[80px]" />

                    {/* Header Result */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2 opacity-60">
                                <Flame size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Kebutuhan Harian</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <AnimatedNumber value={targetCalories || 0} />
                                <span className="text-xl font-bold text-nature-300">kcal</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`inline-block px-3 py-1 rounded-lg text-xs font-black mb-1 ${
                                bmi < 18.5 ? "bg-yellow-500/20 text-yellow-300" : 
                                bmi < 25 ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                            }`}>
                                BMI: {Number.isFinite(bmi) ? bmi.toFixed(1) : "-"}
                            </div>
                            <p className="text-xs opacity-60">{bmiLabel}</p>
                        </div>
                    </div>

                    {/* Donut Chart Visualization */}
                    <div className="relative z-10 flex justify-center py-8">
                        <DonutChart macros={macros} />
                    </div>

                    {/* Macro Details */}
                    <div className="relative z-10 grid grid-cols-3 gap-3">
                        <MacroStat label="Protein" val={macros?.proteinG} unit="g" color="bg-emerald-400" />
                        <MacroStat label="Karbo" val={macros?.carbG} unit="g" color="bg-yellow-400" />
                        <MacroStat label="Lemak" val={macros?.fatG} unit="g" color="bg-rose-400" />
                    </div>

                    {/* Info Alert */}
                    <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
                        <div className="flex gap-3">
                            <Info size={18} className="text-nature-300 shrink-0 mt-0.5" />
                            <p className="text-xs opacity-60 leading-relaxed">
                                Rekomendasi ini disesuaikan untuk pemulihan (Tinggi Protein). Konsultasikan dengan ahli gizi untuk diet spesifik medis.
                            </p>
                        </div>
                    </div>
                </div>
             </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}

// === SUB COMPONENTS ===

function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="transition-all duration-200 ease-out"
        >
            {children}
        </motion.div>
    );
}

function RangeInput({ label, icon, value, onChange, unit, min, max }: any) {
    return (
        <div className="bg-nature-50 p-4 rounded-2xl border border-nature-100">
            <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-nature-900/60 flex items-center gap-2">
                    {icon} {label}
                </label>
                <span className="text-lg font-black text-nature-900">
                    {value || 0} <span className="text-xs font-medium opacity-50">{unit}</span>
                </span>
            </div>
            <input 
                type="range" min={min} max={max} value={value || min} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer accent-nature-900 shadow-inner"
            />
        </div>
    )
}

function SelectInput({ label, options, value, onChange }: any) {
    return (
        <div>
            <label className="text-xs font-bold text-nature-900/60 mb-2 block">{label}</label>
            <div className="relative">
                <select 
                    value={value} onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-nature-50 border border-nature-100 px-4 py-3 rounded-xl text-sm font-bold text-nature-900 focus:outline-none focus:ring-2 focus:ring-nature-900/10"
                >
                    {options.map((o: any) => <option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-400 pointer-events-none" />
            </div>
        </div>
    )
}

function MacroStat({ label, val, unit, color }: any) {
    return (
        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-[10px] font-bold text-white/60 uppercase">{label}</span>
            </div>
            <p className="text-lg font-black">{val ? Math.round(val) : 0}<span className="text-xs font-medium opacity-50 ml-0.5">{unit}</span></p>
        </div>
    )
}

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { bounce: 0, duration: 1000 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString("id-ID"));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span className="text-5xl font-black tracking-tighter">{display}</motion.span>;
}

function DonutChart({ macros }: any) {
    if (!macros) return <div className="w-40 h-40 bg-white/5 rounded-full animate-pulse" />;

    const p = macros.proteinKcal / macros.total;
    const c = macros.carbKcal / macros.total;
    const f = macros.fatKcal / macros.total;

    // Conic Gradient Logic
    const degP = p * 360;
    const degC = c * 360;
    
    return (
        <div className="relative w-48 h-48">
            {/* Chart */}
            <motion.div 
                className="absolute inset-0 rounded-full"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                style={{
                    background: `conic-gradient(
                        #34d399 0deg ${degP}deg, 
                        #facc15 ${degP}deg ${degP + degC}deg, 
                        #fb7185 ${degP + degC}deg 360deg
                    )`
                }}
            />
            {/* Inner Circle (Hole) */}
            <div className="absolute inset-4 bg-nature-900 rounded-full flex flex-col items-center justify-center border-4 border-nature-800">
                <span className="text-[10px] font-bold text-nature-400 uppercase tracking-widest mb-1">Total Macro</span>
                <div className="flex gap-2 text-xs font-bold text-white/50">
                    <span className="text-emerald-400">{Math.round(p * 100)}%</span>
                    <span className="text-yellow-400">{Math.round(c * 100)}%</span>
                    <span className="text-rose-400">{Math.round(f * 100)}%</span>
                </div>
            </div>
        </div>
    )
}