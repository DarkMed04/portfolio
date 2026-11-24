"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      data-cursor="badge"
      data-cursor-label={lang === "en" ? "FRANÇAIS" : "ENGLISH"}
      className="inline-flex items-center rounded-full border border-white/15 bg-neutral-900/90 p-1 text-xs font-mono tracking-wider backdrop-blur-md"
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={`rounded-full px-3 py-1 transition-all duration-200 ${
          lang === "fr"
            ? "bg-white text-black font-semibold shadow-sm"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition-all duration-200 ${
          lang === "en"
            ? "bg-white text-black font-semibold shadow-sm"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}