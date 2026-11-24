"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { TiltCard } from "@/components/TiltCard";
import { soundFx } from "@/utils/soundFx";

export default function HomePage() {
  const { lang } = useLanguage();
  const {
    system,
    hero,
    about,
    experience,
    education,
    certifications,
    languages,
    projects,
    photos,
  } = PORTFOLIO_DATA;

  const featuredProjects = projects.filter((item) => item.featured).slice(0, 2);
  const previewPhoto = photos[0];

  return (
    <div className="space-y-14">
      {/* ============================================================
          1. HERO SECTION
         ============================================================ */}
      <section className="space-y-6 border-b border-white/10 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] tracking-widest text-neutral-300 sm:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>{hero.eyebrow[lang]}</span>
          </div>

          <span className="font-mono text-xs text-neutral-500">
            {system.location[lang]} • {system.version}
          </span>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-400">
            {system.name} — {system.handle}
          </p>

          <h1 className="max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.headline[lang]}
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base lg:text-lg">
            {hero.subheadline[lang]}
          </p>
        </div>

        {/* Primary & Secondary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-1">
          <Link
            href="/projects"
            onClick={() => soundFx.playClick()}
            data-cursor="badge"
            data-cursor-label={lang === "fr" ? "PROJETS" : "PROJECTS"}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200"
          >
            <span>{hero.primaryCta[lang]}</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/photography"
            onClick={() => soundFx.playShutter()}
            data-cursor="lens"
            data-cursor-label="SHUTTER"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-neutral-900/80 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-neutral-900"
          >
            <span>{hero.secondaryCta[lang]}</span>
          </Link>

          <Link
            href="/contact"
            onClick={() => soundFx.playClick()}
            data-cursor="badge"
            data-cursor-label="CV / PING"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-neutral-300 transition hover:border-white/30 hover:text-white"
          >
            <span>{lang === "fr" ? "CV & Contact" : "Resume & Contact"}</span>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
          {hero.stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5"
            >
              <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                {stat.label[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          2. MAIN INTERACTIVE BENTO GRID
         ============================================================ */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {/* CARD 01 // ABOUT & TECHNICAL DOMAINS (7 cols) */}
        <TiltCard
          className="flex flex-col justify-between space-y-6 md:col-span-7"
          cursorMode="badge"
          cursorLabel={lang === "fr" ? "PROFIL" : "PROFILE"}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>01 // {about.title[lang].toUpperCase()}</span>
              <span className="text-emerald-400">{system.availability[lang]}</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {system.name}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-300">
              {about.description[lang]}
            </p>
          </div>

          {/* Hard Skills Grouped by Domain */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {about.hardSkills.map((group, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
              >
                <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  {group.category[lang]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-white/10 bg-black/60 px-2 py-0.5 font-mono text-[11px] text-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* CARD 02 // PHOTOGRAPHY SIDE PORTAL @MEDSHASHIN (5 cols) */}
        <div className="md:col-span-5">
          <Link
            href="/photography"
            onClick={() => soundFx.playShutter()}
            className="block h-full"
          >
            <TiltCard
              cursorMode="lens"
              cursorLabel="VIEWFINDER @MEDSHASHIN"
              className="flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span>02 // VISUAL SIDE</span>
                  <span className="rounded border border-white/25 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-white">
                    @MEDSHASHIN
                  </span>
                </div>

                {previewPhoto && (
                  <div className="group relative h-44 overflow-hidden rounded-xl border border-white/10 bg-black">
                    <img
                      src={previewPhoto.imageUrl}
                      alt={previewPhoto.title[lang]}
                      className="h-full w-full object-cover opacity-80 grayscale contrast-125 transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-neutral-200">
                      <span>{previewPhoto.filmProfile}</span>
                      <span>{previewPhoto.location}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">
                    {lang === "fr"
                      ? "Archive Photo & Esthétique 1990s"
                      : "Photo Archive & 1990s Aesthetic"}
                  </h2>
                  <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
                    {lang === "fr"
                      ? "Explorez mes cadrages minimalistes, contrastes marqués et l'intégration prévue avec mon compte Instagram @medshashin."
                      : "Explore minimalist framing, bold contrast, and the planned sync workflow with my Instagram @medshashin."}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 font-mono text-xs text-white">
                <span>
                  {lang === "fr" ? "Ouvrir le côté photo" : "Open photography side"}
                </span>
                <span>[35MM] →</span>
              </div>
            </TiltCard>
          </Link>
        </div>

        {/* CARD 03 // WORK EXPERIENCE TIMELINE (7 cols) */}
        <TiltCard
          className="space-y-5 md:col-span-7"
          cursorMode="badge"
          cursorLabel={lang === "fr" ? "EXPÉRIENCE" : "EXPERIENCE"}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              03 // {lang === "fr" ? "EXPÉRIENCES PROFESSIONNELLES" : "WORK EXPERIENCE"}
            </span>
            <span className="font-mono text-xs text-neutral-400">
              {experience.length} {lang === "fr" ? "POSTES" : "ROLES"}
            </span>
          </div>

          <div className="space-y-5">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="relative border-l border-white/15 pl-4 transition-colors hover:border-white"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    {exp.role[lang]}
                  </h3>
                  <span className="font-mono text-[11px] text-neutral-400">
                    {exp.period[lang]}
                  </span>
                </div>

                <p className="mt-0.5 font-mono text-xs text-neutral-300">
                  {exp.organization} —{" "}
                  <span className="text-neutral-500">{exp.location}</span>
                </p>

                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-neutral-400">
                  {exp.points[lang].map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* CARD 04 // EDUCATION & LANGUAGES (5 cols) */}
        <TiltCard
          className="flex flex-col justify-between space-y-6 md:col-span-5"
          cursorMode="badge"
          cursorLabel={lang === "fr" ? "FORMATION" : "EDUCATION"}
        >
          {/* Education List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                04 // {lang === "fr" ? "FORMATION ACADÉMIQUE" : "EDUCATION"}
              </span>
              <span className="font-mono text-[11px] text-neutral-400">
                {education.length}
              </span>
            </div>

            <div className="space-y-3.5">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-neutral-400">{edu.period[lang]}</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-white">
                      {edu.status[lang]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold leading-snug text-white sm:text-sm">
                    {edu.degree[lang]}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3 border-t border-white/10 pt-5">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              {lang === "fr" ? "LANGUES" : "LANGUAGES"}
            </span>

            <div className="space-y-2.5">
              {languages.map((l, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">{l.name[lang]}</span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      {l.level[lang]}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{ width: `${l.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* CARD 05 // CERTIFICATIONS (12 cols) */}
        <TiltCard
          className="space-y-4 md:col-span-12"
          cursorMode="badge"
          cursorLabel="CERTIFICATES"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              05 //{" "}
              {lang === "fr"
                ? "CERTIFICATIONS (365 DATA SCIENCE, HP LIFE, TOEIC, PIE)"
                : "CERTIFICATIONS (365 DATA SCIENCE, HP LIFE, TOEIC, PIE)"}
            </span>
            <span className="font-mono text-xs text-emerald-400">
              {certifications.length}{" "}
              {lang === "fr" ? "CERTIFICATS VALIDÉS" : "VERIFIED CERTS"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 transition hover:border-white/30"
              >
                <div className="min-w-0 pr-2">
                  <p className="truncate text-xs font-semibold text-white">
                    {cert.name}
                  </p>
                  <p className="font-mono text-[10px] text-neutral-400">
                    {cert.issuer}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                    cert.badge === "NEW"
                      ? "bg-emerald-400 text-black"
                      : "border border-white/20 text-neutral-300"
                  }`}
                >
                  {cert.badge}
                </span>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* CARD 06 // SOFT SKILLS (6 cols) */}
        <TiltCard
          className="space-y-4 md:col-span-6"
          cursorMode="badge"
          cursorLabel="SOFT SKILLS"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            06 // {lang === "fr" ? "COMPÉTENCES TRANSVERSALES" : "SOFT SKILLS"}
          </span>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {about.softSkills.map((sk, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-neutral-200"
              >
                • {sk[lang]}
              </div>
            ))}
          </div>
        </TiltCard>

        {/* CARD 07 // FEATURED PROJECTS SNAPSHOT (6 cols) */}
        <TiltCard
          className="flex flex-col justify-between space-y-4 md:col-span-6"
          cursorMode="badge"
          cursorLabel="CASE STUDIES"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                07 // {lang === "fr" ? "PROJETS CLÉS" : "FEATURED WORK"}
              </span>
              <Link
                href="/projects"
                onClick={() => soundFx.playClick()}
                className="font-mono text-xs text-white underline underline-offset-4"
              >
                {lang === "fr" ? "Tout voir →" : "View all →"}
              </Link>
            </div>

            <div className="space-y-2.5">
              {featuredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-white sm:text-sm">
                      {proj.title[lang]}
                    </p>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {proj.client}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-400">
                    {proj.summary[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 font-mono text-xs text-neutral-400">
            <span>{system.email}</span>
            <span>{system.phone}</span>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}