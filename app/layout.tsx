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

export const metadata: Metadata = {
  title: "TBC Warrior | Organic Recovery & Healing Journey",
  description: "Platform edukasi interaktif untuk kesadaran TBC dengan pendekatan Organic Recovery. Mari kenali, cegah, dan lawan TBC bersama-sama.",
  keywords: ["TBC", "Kesehatan Paru", "Edukasi TBC", "Techsoft 2026", "Web Design Competition"],
  authors: [{ name: "Tim AmGa" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-nature-400 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}