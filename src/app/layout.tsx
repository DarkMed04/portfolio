import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/CustomCursor";
import { FilmGrain } from "@/components/FilmGrain";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mohamed Baha — Full-Stack Developer & @medshashin",
  description:
    "Interactive portfolio of Mohamed Baha: Computer Engineering, Full-Stack Web Development, Data & 35mm Visual Archive.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="relative min-h-screen overflow-x-hidden bg-[#090b10] text-slate-100 antialiased selection:bg-cyan-300 selection:text-slate-950 md:cursor-none">
        {/* Ambient Fantasy Glows (Cyan + Violet + Amber) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -top-32 left-1/4 z-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-1/3 right-1/6 z-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-1/2 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/[0.06] blur-[120px]"
        />

        <LanguageProvider>
          <FilmGrain />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:px-8">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}