"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { TiltCard } from "@/components/TiltCard";
import { soundFx } from "@/utils/soundFx";

const FORMSPREE_URL = "https://formspree.io/f/xgakpdew";

export default function ContactPage() {
  const { lang } = useLanguage();
  const { system, about, experience, education, certifications, languages } =
    PORTFOLIO_DATA;

  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState<"job" | "project" | "photo">("job");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const copyText = async (text: string, field: "email" | "phone") => {
    soundFx.playClick();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback ignored
    }
  };

  const handlePrintCv = () => {
    soundFx.playClick();
    window.print();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;

    soundFx.playClick();
    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          topic: subject.toUpperCase(),
          message,
          _subject: `[Portfolio - ${subject.toUpperCase()}] ${senderName}`,
        }),
      });

      if (response.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-12">
      {/* ============================================================
1. PAGE HEADER
         ============================================================ */}
      <section className="space-y-4 border-b border-white/10 pb-8 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-neutral-400">
          <span>MODULE_04 // CONTACT & INTERACTIVE RESUME</span>
          <span className="text-emerald-400">{system.availability[lang]}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {lang === "fr"
            ? "Travaillons ensemble ou téléchargez mon CV"
            : "Let's collaborate or export my Resume"}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          {lang === "fr"
            ? "Disponible pour des opportunités en développement Full-Stack, génie logiciel, gestion des données ou collaborations visuelles (@medshashin)."
            : "Open to opportunities in Full-Stack development, software engineering, data organization, or visual collaborations (@medshashin)."}
        </p>
      </section>

      {/* ============================================================
2. DIRECT CHANNELS & MESSAGE TERMINAL (2 COLUMNS)
         ============================================================ */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 print:hidden">
        {/* Left: Direct Coordinates & Socials (5 cols) */}
        <div className="space-y-5 lg:col-span-5">
          <TiltCard className="space-y-5" cursorMode="badge" cursorLabel="COPY">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              01 // {lang === "fr" ? "COORDONNÉES DIRECTES" : "DIRECT CHANNELS"}
            </span>

            {/* Email Box */}
            <div className="rounded-xl border border-white/10 bg-black/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                E-MAIL
              </p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <a
                  href={`mailto:${system.email}`}
                  className="truncate font-mono text-sm font-semibold text-white hover:underline"
                >
                  {system.email}
                </a>
                <button
                  type="button"
                  onClick={() => copyText(system.email, "email")}
                  className="shrink-0 rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] text-neutral-200 transition hover:bg-white hover:text-black"
                >
                  {copiedField === "email"
                    ? lang === "fr"
                      ? "COPIÉ ✓"
                      : "COPIED ✓"
                    : lang === "fr"
                    ? "COPIER"
                    : "COPY"}
                </button>
              </div>
            </div>

            {/* Phone Box */}
            <div className="rounded-xl border border-white/10 bg-black/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                {lang === "fr" ? "TÉLÉPHONE / WHATSAPP" : "PHONE / WHATSAPP"}
              </p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <a
                  href={`tel:${system.phone.replace(/\s+/g, "")}`}
                  className="font-mono text-sm font-semibold text-white hover:underline"
                >
                  {system.phone}
                </a>
                <button
                  type="button"
                  onClick={() => copyText(system.phone, "phone")}
                  className="shrink-0 rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] text-neutral-200 transition hover:bg-white hover:text-black"
                >
                  {copiedField === "phone"
                    ? lang === "fr"
                      ? "COPIÉ ✓"
                      : "COPIED ✓"
                    : lang === "fr"
                    ? "COPIER"
                    : "COPY"}
                </button>
              </div>
            </div>

            {/* Location & Social Links */}
            <div className="space-y-2 border-t border-white/10 pt-4 font-mono text-xs text-neutral-300">
              <p>
                <span className="text-neutral-500">BASE:</span> {system.location[lang]}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={system.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white transition hover:bg-white hover:text-black"
                >
                  GitHub ↗
                </a>
                <a
                  href={system.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white transition hover:bg-white hover:text-black"
                >
                  Instagram {system.handle} ↗
                </a>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right: Interactive Message Terminal (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-neutral-950/90 p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-neutral-400">
              <span>02 // MESSAGE TERMINAL</span>
              <span className="text-emerald-400">FORMSPREE_LIVE</span>
            </div>

            {status === "sent" ? (
              <div className="space-y-4 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.05] p-6">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                  {lang === "fr" ? "MESSAGE ENVOYÉ ✓" : "MESSAGE DELIVERED ✓"}
                </p>
                <p className="text-sm text-neutral-200">
                  {lang === "fr"
                    ? `Merci ${senderName}. Votre message a bien été transmis directement à ${system.name}.`
                    : `Thank you ${senderName}. Your message has been delivered directly to ${system.name}.`}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setSenderName("");
                      setSenderEmail("");
                      setMessage("");
                    }}
                    className="rounded-full bg-white px-5 py-2 font-mono text-xs font-bold text-black transition hover:bg-neutral-200"
                  >
                    {lang === "fr" ? "Nouveau message" : "Send another message"}
                  </button>
                  <a
                    href={`mailto:${system.email}?subject=${encodeURIComponent(
                      `[Portfolio - ${subject.toUpperCase()}] ${senderName}`
                    )}&body=${encodeURIComponent(message)}`}
                    className="rounded-full border border-white/20 px-4 py-2 font-mono text-xs text-neutral-300 transition hover:bg-white hover:text-black"
                  >
                    {lang === "fr" ? "Ouvrir dans Mail ↗" : "Open in Mail App ↗"}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Topic Selector */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                    {lang === "fr" ? "SUJET" : "TOPIC"}
                  </label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {(
                      [
                        { key: "job", label: { fr: "Recrutement", en: "Hiring" } },
                        { key: "project", label: { fr: "Projet Web", en: "Web Project" } },
                        { key: "photo", label: { fr: "Photo 35mm", en: "35mm Shoot" } },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setSubject(item.key);
                        }}
                        className={`rounded-xl py-2.5 text-center transition ${
                          subject === item.key
                            ? "bg-white font-bold text-black"
                            : "border border-white/15 bg-black/50 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {item.label[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                      {lang === "fr" ? "NOM COMPLET" : "FULL NAME"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                      className="w-full rounded-xl border border-white/15 bg-black/70 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                      E-MAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full rounded-xl border border-white/15 bg-black/70 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === "fr"
                        ? "Décrivez votre besoin ou opportunité..."
                        : "Describe your opportunity or project..."
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/70 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                  />
                </div>

                {status === "error" && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 font-mono text-xs text-red-300">
                    {lang === "fr"
                      ? `Échec de l'envoi. Réessayez ou écrivez directement à ${system.email}.`
                      : `Delivery failed. Please try again or email ${system.email} directly.`}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor="badge"
                  data-cursor-label="SEND"
                  className="w-full rounded-full bg-white py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending"
                    ? lang === "fr"
                      ? "Envoi en cours..."
                      : "Transmitting..."
                    : lang === "fr"
                    ? "Envoyer le message →"
                    : "Transmit message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
3. INTERACTIVE PRINTABLE CV SHEET (EXPORTABLE AS PDF)
         ============================================================ */}
      <section className="space-y-6 rounded-2xl border border-white/15 bg-neutral-950 p-6 sm:p-8 print:border-none print:bg-white print:p-0 print:text-black">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 print:border-neutral-300">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 print:text-neutral-600">
              03 // CURRICULUM VITAE ({lang.toUpperCase()})
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white print:text-black">
              {system.name} — Développeur Full-Stack
            </h2>
            <p className="mt-0.5 font-mono text-xs text-neutral-400 print:text-neutral-700">
              {system.email} • {system.phone} • {system.location[lang]}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrintCv}
            data-cursor="badge"
            data-cursor-label="EXPORT PDF"
            className="rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200 print:hidden"
          >
            {lang === "fr" ? "Imprimer / Sauvegarder PDF" : "Print / Save as PDF"}
          </button>
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-neutral-300 print:text-neutral-800">
          {about.description[lang]}
        </p>

        {/* Two Column CV Details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Experience Column */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 print:text-black">
              {lang === "fr" ? "EXPÉRIENCES PROFESSIONNELLES" : "WORK EXPERIENCE"}
            </h3>
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="space-y-1 border-l border-white/15 pl-3.5 print:border-neutral-400"
              >
                <p className="text-sm font-bold text-white print:text-black">
                  {exp.role[lang]} — {exp.organization}
                </p>
                <p className="font-mono text-[11px] text-neutral-400 print:text-neutral-600">
                  {exp.period[lang]}
                </p>
                <ul className="list-disc space-y-1 pl-4 text-xs text-neutral-300 print:text-neutral-800">
                  {exp.points[lang].map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education + Certifications + Languages Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 print:text-black">
                {lang === "fr" ? "FORMATION" : "EDUCATION"}
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <p className="text-sm font-semibold text-white print:text-black">
                    {edu.degree[lang]}
                  </p>
                  <p className="text-xs text-neutral-400 print:text-neutral-700">
                    {edu.institution} ({edu.period[lang]})
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 print:text-black">
                CERTIFICATIONS
              </h3>
              <ul className="list-disc space-y-1 pl-4 text-xs text-neutral-300 print:text-neutral-800">
                {certifications.map((cert, idx) => (
                  <li key={idx}>
                    {cert.name} ({cert.issuer})
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 print:text-black">
                {lang === "fr" ? "LANGUES" : "LANGUAGES"}
              </h3>
              <div className="flex flex-wrap gap-3 text-xs text-neutral-300 print:text-neutral-800">
                {languages.map((l, idx) => (
                  <span key={idx}>
                    <strong>{l.name[lang]}:</strong> {l.level[lang]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}