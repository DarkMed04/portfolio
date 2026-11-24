"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "@/utils/soundFx";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [sfxOn, setSfxOn] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);

  const toggleSfx = () => {
    const next = !sfxOn;
    setSfxOn(next);
    soundFx.setSfxEnabled(next);
    if (next) soundFx.playClick();
  };

  const toggleAmbient = () => {
    const next = !ambientOn;
    setAmbientOn(next);
    soundFx.setAmbientEnabled(next);
  };

  const navItems = [
    {
      href: "/",
      label: PORTFOLIO_DATA.nav.home[lang],
      cursor: "badge",
      tag: "HOME",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/projects",
      label: PORTFOLIO_DATA.nav.projects[lang],
      cursor: "badge",
      tag: "WORK",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      href: "/photography",
      label: PORTFOLIO_DATA.nav.photography[lang],
      cursor: "lens",
      tag: "35MM",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      href: "/contact",
      label: PORTFOLIO_DATA.nav.contact[lang],
      cursor: "badge",
      tag: "PING",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-cyan-300/15 bg-[#090b10]/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={() => soundFx.playClick()}
            data-cursor="badge"
            data-cursor-label="ROOT"
            className="font-mono text-sm font-bold tracking-widest text-white"
          >
            MED.BAHA<span className="text-cyan-400">_OS</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => (item.cursor === "lens" ? soundFx.playShutter() : soundFx.playClick())}
                  data-cursor={item.cursor}
                  data-cursor-label={item.tag}
                  className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? "font-semibold text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive ? `[ ${item.label} ]` : item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Background Ambient Sound Toggle */}
            <button
              type="button"
              onClick={toggleAmbient}
              data-cursor="badge"
              data-cursor-label={ambientOn ? "MUTE BG" : "PLAY BG"}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition ${
                ambientOn
                  ? "border-violet-400/60 bg-violet-400/15 text-violet-200"
                  : "border-white/15 bg-white/[0.04] text-slate-400 hover:text-white"
              }`}
            >
              {ambientOn ? "BG:ON" : "BG:MUTE"}
            </button>

            {/* Button SFX Toggle */}
            <button
              type="button"
              onClick={toggleSfx}
              data-cursor="badge"
              data-cursor-label={sfxOn ? "SFX OFF" : "SFX ON"}
              className={`hidden rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition sm:inline-block ${
                sfxOn
                  ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200"
                  : "border-white/15 bg-white/[0.04] text-slate-400 hover:text-white"
              }`}
            >
              {sfxOn ? "SFX:ON" : "SFX:OFF"}
            </button>

            {/* FR / EN Switch */}
            <div
              data-cursor="badge"
              data-cursor-label={lang === "fr" ? "ENGLISH" : "FRANÇAIS"}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] p-1 font-mono text-xs backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => {
                  setLang("fr");
                  soundFx.playClick();
                }}
                className={`rounded-full px-2.5 py-0.5 transition ${
                  lang === "fr"
                    ? "bg-gradient-to-r from-cyan-300 to-violet-300 font-bold text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang("en");
                  soundFx.playClick();
                }}
                className={`rounded-full px-2.5 py-0.5 transition ${
                  lang === "en"
                    ? "bg-gradient-to-r from-cyan-300 to-violet-300 font-bold text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* LIQUID GLASS MOBILE BOTTOM DOCK */}
      <nav
        aria-label="Mobile Liquid Glass Navigation"
        className="fixed inset-x-3 bottom-4 z-40 mx-auto max-w-md rounded-3xl border border-white/20 bg-white/[0.07] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.28)] backdrop-blur-2xl md:hidden"
      >
        <ul className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => (item.cursor === "lens" ? soundFx.playShutter() : soundFx.playClick())}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 font-mono text-[10px] tracking-wide transition-all ${
                    isActive
                      ? "bg-white/25 font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]"
                      : "text-slate-300/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}