"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PORTFOLIO_DATA, type PhotoItem } from "@/data/portfolioData";
import { soundFx } from "@/utils/soundFx";

type FilmMode = "vintage" | "mono" | "raw";

export default function PhotographyPage() {
  const { lang } = useLanguage();
  const { system, photos: fallbackPhotos } = PORTFOLIO_DATA;

  const [photos, setPhotos] = useState<PhotoItem[]>(fallbackPhotos);
  const [filmMode, setFilmMode] = useState<FilmMode>("vintage");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<"local" | "synced" | "syncing">("local");

  const loadInstagramFeed = useCallback(async () => {
    setSyncStatus("syncing");
    try {
      const res = await fetch("/api/instagram", { cache: "no-store" });
      if (!res.ok) {
        setSyncStatus("local");
        return;
      }
      const payload = await res.json();

      if (Array.isArray(payload.posts) && payload.posts.length > 0) {
        const mapped: PhotoItem[] = payload.posts
          .filter((post: Record<string, string>) => Boolean(post.image))
          .map((post: Record<string, string>, idx: number) => ({
            id: post.id || `ig-${idx + 1}`,
            code: post.code || `IG_SYNC_0${idx + 1} // 35MM`,
            title: {
              fr: post.title_fr || `Capture #0${idx + 1}`,
              en: post.title_en || `Frame #0${idx + 1}`,
            },
            caption: {
              fr: post.caption_fr || "Archive synchronisée depuis @medshashin.",
              en: post.caption_en || "Synced frame from @medshashin.",
            },
            location: post.location || "Morocco",
            filmProfile: post.tag || "IG LIVE SYNC",
            camera: post.camera || "FUJIFILM FinePix / 35mm",
            aperture: post.aperture || "f/2.8",
            shutter: post.shutter || "1/500s",
            iso: post.iso || "ISO 400",
            aspect: "portrait",
            imageUrl: post.image,
            fallbackGradient: "from-cyan-950 via-slate-900 to-violet-950",
            instagramUrl: post.permalink || system.instagramUrl,
          }));

        if (mapped.length > 0) {
          setPhotos(mapped);
          setSyncStatus("synced");
          return;
        }
      }
      setSyncStatus("local");
    } catch {
      setSyncStatus("local");
    }
  }, [system.instagramUrl]);

  useEffect(() => {
    loadInstagramFeed();
  }, [loadInstagramFeed]);

  // Keyboard navigation inside Lightbox (Escape, Left, Right)
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        soundFx.playShutter();
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
      } else if (e.key === "ArrowLeft") {
        soundFx.playShutter();
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev - 1 + photos.length) % photos.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos.length]);

  const filterClasses: Record<FilmMode, string> = {
    vintage: "contrast-110 saturate-95",
    mono: "grayscale contrast-125",
    raw: "contrast-100 saturate-100",
  };

  const openLightbox = (index: number) => {
    soundFx.playShutter();
    setActiveIndex(index);
  };

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <div className="space-y-10">
      {/* ============================================================
          1. VIEWFINDER HEADER
         ============================================================ */}
      <section className="space-y-5 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span>MODULE_03 // VISUAL ARCHIVE ({system.handle})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-cyan-200">
              {syncStatus === "syncing"
                ? "SYNCING..."
                : syncStatus === "synced"
                ? "IG FEED: LIVE SYNCED"
                : lang === "fr"
                ? "MODE: ARCHIVE CURATÉE"
                : "MODE: CURATED ARCHIVE"}
            </span>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                loadInstagramFeed();
              }}
              className="rounded border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-0.5 text-[10px] text-cyan-200 transition hover:bg-cyan-300/20"
            >
              ↻ SYNC
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {lang === "fr"
                ? "Regard Minimaliste & Pellicule 1990s"
                : "Minimalist Eye & 1990s Film Mood"}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {lang === "fr"
                ? "L'espace photographique de Mohamed Baha (@medshashin) : synchronisation directe avec Instagram, contrastes marqués et esthétique rétro."
                : "The photography side of Mohamed Baha (@medshashin): direct Instagram feed synchronization, bold contrasts, and retro aesthetics."}
            </p>
          </div>

          <a
            href={system.instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playShutter()}
            data-cursor="lens"
            data-cursor-label="FOLLOW IG"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:opacity-90 lg:self-auto"
          >
            <span>Instagram {system.handle}</span>
            <span>↗</span>
          </a>
        </div>
      </section>

      {/* ============================================================
          2. FILM STOCK & CAMERA HUD BAR
         ============================================================ */}
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-white/12 bg-[#10141d]/90 p-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="mr-1 text-slate-500">
            {lang === "fr" ? "PELLICULE :" : "FILM STOCK:"}
          </span>
          {(
            [
              { key: "vintage", label: "35MM VINTAGE" },
              { key: "mono", label: "B&W TRI-X 400" },
              { key: "raw", label: "DIGITAL RAW" },
            ] as { key: FilmMode; label: string }[]
          ).map((mode) => (
            <button
              key={mode.key}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setFilmMode(mode.key);
              }}
              data-cursor="badge"
              data-cursor-label={mode.key.toUpperCase()}
              className={`rounded-lg px-3 py-1.5 text-[11px] tracking-wider transition ${
                filmMode === mode.key
                  ? "bg-gradient-to-r from-cyan-300 to-violet-300 font-bold text-slate-950"
                  : "border border-white/10 bg-black/40 text-slate-400 hover:border-cyan-300/35 hover:text-white"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
          <span>FRAMES: {photos.length}</span>
          <span>RATIO: 35MM</span>
          <span className="hidden text-cyan-300 sm:inline">IG BRIDGE: READY</span>
        </div>
      </section>

      {/* ============================================================
          3. CONTACT SHEET GALLERY GRID
         ============================================================ */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            onClick={() => openLightbox(index)}
            data-cursor="lens"
            data-cursor-label="INSPECT 35MM"
            className="group cursor-pointer overflow-hidden rounded-2xl border border-white/12 bg-[#10141d]/90 transition hover:border-cyan-300/40"
          >
            {/* Top Film Strip Sprocket Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#080a0f] px-4 py-2 font-mono text-[10px] tracking-widest text-slate-400">
              <span>{photo.code}</span>
              <span className="text-cyan-300">{photo.filmProfile}</span>
            </div>

            {/* Image Container with Viewfinder Corner Reticles */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#090b10]">
              <img
                src={photo.imageUrl}
                alt={photo.title[lang]}
                className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${filterClasses[filmMode]}`}
              />

              {/* Subtle Viewfinder Crosshair Overlay on Hover */}
              <div className="pointer-events-none absolute inset-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-300/80" />
                <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-300/80" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-300/80" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-300/80" />
              </div>

              {/* Bottom EXIF Telemetry Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/15 bg-black/70 px-3 py-1.5 font-mono text-[10px] text-slate-200 backdrop-blur-md">
                <span>
                  {photo.aperture} • {photo.shutter} • {photo.iso}
                </span>
                <span>{photo.location}</span>
              </div>
            </div>

            {/* Caption & Instagram Link */}
            <div className="flex items-start justify-between gap-4 p-5">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white">
                  {photo.title[lang]}
                </h2>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {photo.caption[lang]}
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-slate-300 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                {lang === "fr" ? "AGRANDIR" : "EXPAND"}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* ============================================================
          4. FULLSCREEN VIEWFINDER LIGHTBOX MODAL
         ============================================================ */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-lg sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#0d1017] shadow-2xl"
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-xs text-slate-300">
              <span>
                {activePhoto.code} • [{activeIndex + 1}/{photos.length}]
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-full border border-white/20 px-3 py-1 text-[11px] hover:bg-white hover:text-slate-950"
              >
                ESC / ✕
              </button>
            </div>

            {/* Photo Stage */}
            <div className="relative flex max-h-[62vh] items-center justify-center bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title[lang]}
                className={`max-h-[62vh] w-auto object-contain ${filterClasses[filmMode]}`}
              />
            </div>

            {/* Metadata & Controls Footer */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/10 p-5 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  {activePhoto.title[lang]} —{" "}
                  <span className="font-mono text-xs font-normal text-cyan-300">
                    {activePhoto.location}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">{activePhoto.caption[lang]}</p>
                <p className="pt-1 font-mono text-[11px] text-slate-300">
                  {activePhoto.camera} • {activePhoto.aperture} • {activePhoto.shutter} •{" "}
                  {activePhoto.iso}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playShutter();
                    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
                  }}
                  className="rounded-full border border-white/20 px-3.5 py-2 font-mono text-xs text-white hover:bg-white hover:text-slate-950"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playShutter();
                    setActiveIndex((activeIndex + 1) % photos.length);
                  }}
                  className="rounded-full border border-white/20 px-3.5 py-2 font-mono text-xs text-white hover:bg-white hover:text-slate-950"
                >
                  NEXT →
                </button>
                <a
                  href={activePhoto.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 px-4 py-2 font-mono text-xs font-bold text-slate-950 hover:opacity-90"
                >
                  IG ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}