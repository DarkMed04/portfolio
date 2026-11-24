"use client";

import React, { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PORTFOLIO_DATA, type ProjectItem } from "@/data/portfolioData";
import { TiltCard } from "@/components/TiltCard";
import { soundFx } from "@/utils/soundFx";

type CategoryFilter = "all" | "web" | "data" | "systems";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const { projects, system } = PORTFOLIO_DATA;

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filterOptions: { key: CategoryFilter; label: { fr: string; en: string } }[] = [
    { key: "all", label: { fr: "Tous les projets", en: "All Projects" } },
    { key: "web", label: { fr: "Web & Admin", en: "Web & Admin" } },
    { key: "data", label: { fr: "Données & Excel", en: "Data & Excel" } },
    { key: "systems", label: { fr: "Plateformes & Systèmes", en: "Platforms & Systems" } },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const q = query.trim().toLowerCase();
      if (!q) return matchesCategory;

      const inTitle =
        item.title.fr.toLowerCase().includes(q) ||
        item.title.en.toLowerCase().includes(q);
      const inClient = item.client.toLowerCase().includes(q);
      const inStack = item.stack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && (inTitle || inClient || inStack);
    });
  }, [projects, category, query]);

  const openInspector = (project: ProjectItem) => {
    soundFx.playClick();
    setSelectedProject(project);
  };

  const closeInspector = () => {
    soundFx.playClick();
    setSelectedProject(null);
  };

  return (
    <div className="space-y-10">
      {/* ============================================================
          1. PAGE HEADER
         ============================================================ */}
      <section className="space-y-4 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-400">
          <span>MODULE_02 // PROJECTS & CASE STUDIES</span>
          <span>
            {filteredProjects.length} / {projects.length}{" "}
            {lang === "fr" ? "ARCHIVES" : "ARCHIVES"}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {lang === "fr"
            ? "Projets, Digitalisation & Systèmes"
            : "Projects, Digitalization & Systems"}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {lang === "fr"
            ? "Sélection de réalisations en développement web (PHP/MySQL), structuration de données et suivi opérationnel, avec accès direct au code GitHub et aux démos."
            : "Selected work across web development (PHP/MySQL), data structuring, and operational tracking, with direct access to GitHub repos and live demos."}
        </p>
      </section>

      {/* ============================================================
          2. FILTER BAR & TECH SEARCH
         ============================================================ */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => {
            const active = category === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setCategory(opt.key);
                }}
                data-cursor="badge"
                data-cursor-label={opt.key.toUpperCase()}
                className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
                  active
                    ? "bg-gradient-to-r from-cyan-300 to-violet-300 font-bold text-slate-950"
                    : "border border-white/15 bg-white/[0.04] text-slate-300 hover:border-cyan-300/40 hover:text-white"
                }`}
              >
                {opt.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "fr"
                ? "Filtrer par stack (PHP, Excel, SQL...)"
                : "Filter by stack (PHP, Excel, SQL...)"
            }
            className="w-full rounded-full border border-white/15 bg-[#10141d] px-4 py-2 font-mono text-xs text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-slate-400 hover:text-white"
            >
              CLR
            </button>
          )}
        </div>
      </section>

      {/* ============================================================
          3. PROJECTS GRID
         ============================================================ */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#10141d]/60 p-10 text-center">
          <p className="font-mono text-sm text-slate-300">
            {lang === "fr"
              ? "Aucun projet ne correspond à ce filtre."
              : "No projects match the current filter."}
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="mt-4 rounded-full bg-white px-4 py-2 font-mono text-xs font-bold text-slate-950"
          >
            {lang === "fr" ? "Réinitialiser les filtres" : "Reset filters"}
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openInspector(project)}
              className="cursor-pointer"
            >
              <TiltCard
                className="flex h-full flex-col justify-between space-y-6"
                cursorMode="badge"
                cursorLabel="INSPECT"
              >
                <div className="space-y-4">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                    <span>
                      PRJ_0{index + 1} // {project.year}
                    </span>
                    <span className="rounded border border-cyan-300/20 bg-cyan-300/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase text-cyan-200">
                      {project.client}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                      {project.title[lang]}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {project.summary[lang]}
                    </p>
                  </div>

                  {/* Impact Preview Box */}
                  <div className="rounded-xl border border-white/10 bg-black/50 p-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                      {lang === "fr" ? "IMPACT CLÉ" : "KEY OUTCOME"}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {project.impact[lang]}
                    </p>
                  </div>
                </div>

                {/* Footer: Tech Stack + GitHub / Demo Links + Case Study */}
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Direct GitHub & Live Demo Links */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.05] px-3 py-1.5 text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-300/10"
                      >
                        <span>GitHub</span>
                        <span>↗</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => soundFx.playClick()}
                          className="inline-flex items-center gap-1 rounded-lg border border-violet-300/25 bg-violet-300/[0.08] px-3 py-1.5 text-violet-200 transition hover:border-violet-300 hover:bg-violet-300/15"
                        >
                          <span>Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => openInspector(project)}
                      className="text-slate-200 underline underline-offset-4 transition hover:text-cyan-300"
                    >
                      {lang === "fr" ? "Étude de cas →" : "Case study →"}
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </section>
      )}

      {/* ============================================================
          4. GITHUB REPOSITORY BANNER
         ============================================================ */}
      <section className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#131926] via-[#0e131d] to-[#090b10] p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">
              SOURCE & CODEBASE
            </p>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              {lang === "fr"
                ? "Retrouvez mes dépôts et expérimentations sur GitHub"
                : "Explore repositories and experiments on GitHub"}
            </h3>
          </div>

          <a
            href={system.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            data-cursor="badge"
            data-cursor-label="GITHUB"
            className="rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:opacity-90"
          >
            GitHub (@DarkMed04) ↗
          </a>
        </div>
      </section>

      {/* ============================================================
          5. CASE STUDY INSPECTOR MODAL
         ============================================================ */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeInspector}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-[#0d1017] p-6 text-slate-100 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs text-cyan-300">
                  {selectedProject.client} • {selectedProject.year}
                </p>
                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  {selectedProject.title[lang]}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeInspector}
                className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs text-slate-300 transition hover:bg-white hover:text-slate-950"
              >
                ESC / ✕
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm leading-relaxed">
              <div className="space-y-1.5">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                  01 // {lang === "fr" ? "CONTEXTE & PROBLÉMATIQUE" : "CHALLENGE"}
                </h3>
                <p className="text-slate-300">{selectedProject.challenge[lang]}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                  02 // {lang === "fr" ? "SOLUTION MISE EN ŒUVRE" : "IMPLEMENTED SOLUTION"}
                </h3>
                <p className="text-slate-300">{selectedProject.solution[lang]}</p>
              </div>

              <div className="space-y-1.5 rounded-xl border border-cyan-300/25 bg-cyan-300/[0.05] p-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
                  03 // {lang === "fr" ? "RÉSULTAT & IMPACT" : "IMPACT & RESULTS"}
                </h3>
                <p className="text-slate-200">{selectedProject.impact[lang]}</p>
              </div>

              <div className="space-y-2 pt-1">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                  TECH STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-xs text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-slate-200"
                >
                  {lang === "fr" ? "GitHub Repo ↗" : "GitHub Repo ↗"}
                </a>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-300/20"
                  >
                    {lang === "fr" ? "Ouvrir Démo ↗" : "Live Demo ↗"}
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={closeInspector}
                className="rounded-full border border-white/20 px-4 py-2 font-mono text-xs text-slate-300 hover:border-white hover:text-white"
              >
                {lang === "fr" ? "Fermer" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}