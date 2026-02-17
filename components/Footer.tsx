export default function Footer() {
  return (
    <footer className="relative bg-nature-900 text-nature-50 pt-20 pb-10 rounded-t-[3rem] -mt-10 z-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">
          Indonesia<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 to-sun-300">Bebas TBC 2030</span>
        </h2>
        
        <p className="text-xl text-nature-100/60 max-w-2xl mx-auto mb-12">
          Perjalanan ini dimulai dari satu langkah kecil: <br/>Kepedulianmu.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
          <button className="px-8 py-4 bg-nature-50 text-nature-900 rounded-full font-bold hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Daftar Relawan
          </button>
          <button className="px-8 py-4 border border-nature-50/20 text-nature-50 rounded-full font-bold hover:bg-nature-50/10 transition">
            Donasi Oksigen
          </button>
        </div>

        <div className="border-t border-nature-50/10 pt-10 flex flex-col md:flex-row justify-between items-center text-sm opacity-50">
          <p>© 2026 TBC Warrior. Design for Techsoft Competition.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-sun-300">Instagram</a>
            <a href="#" className="hover:text-sun-300">GitHub</a>
            <a href="#" className="hover:text-sun-300">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}