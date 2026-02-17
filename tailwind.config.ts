import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet: Organic Recovery
        nature: {
          50: '#F7F9FB',  // Cloud (Background Utama)
          100: '#E2EBE5', // Mint Tipis
          400: '#7FB069', // Eucalyptus (Primary - Paru Sehat)
          500: '#649452', // Eucalyptus Darker
          900: '#2D5D41', // Deep Forest (Text biar kebaca)
        },
        sun: {
          300: '#F3DE8A', // Sunlight (Aksen Hangat)
          400: '#EAC435', // Sun Darker
        },
        glass: {
          surface: 'rgba(255, 255, 255, 0.4)', // Buat Glassmorphism
          border: 'rgba(255, 255, 255, 0.6)',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      animation: {
        'breathe': 'breathe 6s ease-in-out infinite', // 6 detik (tarik-buang napas)
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.15)', opacity: '1' }, // Mengembang (Inhale)
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;