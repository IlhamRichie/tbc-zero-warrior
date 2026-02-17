import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// IMPROVEMENT 1: Metadata yang Menjual
// Ini bakal bikin tab browser kamu kelihatan profesional
export const metadata: Metadata = {
  title: "TBC Warrior | Organic Recovery & Healing Journey",
  description: "Platform edukasi interaktif untuk kesadaran TBC dengan pendekatan Organic Recovery. Mari kenali, cegah, dan lawan TBC bersama-sama.",
  keywords: ["TBC", "Kesehatan Paru", "Edukasi TBC", "Techsoft 2026", "Web Design Competition"],
  authors: [{ name: "Nama Tim Kamu" }],
  icons: {
    icon: "/favicon.ico", // Pastikan taruh file icon medis di folder public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // IMPROVEMENT 2: Lang diubah ke "id" (Indonesia)
    // IMPROVEMENT 3: Tambah suppressHydrationWarning 
    // biar ga error kalau ada ekstensi browser juri yang aneh-aneh
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-nature-400 selection:text-white`}
      >
        {/* Children di sini adalah semua section yang kita buat di page.tsx 
          Background dasar sudah diatur di globals.css tadi
        */}
        {children}
      </body>
    </html>
  );
}