<div align="center">

# `MED.BAHA` // PORTFOLIO & 35MM ARCHIVE

**Full-Stack Engineering × Visual Storytelling (`@medshashin`)**

[![Live Demo](https://img.shields.io/badge/LIVE_SITE-VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-seven-rho-60.vercel.app)
[![Next.js](https://img.shields.io/badge/NEXT.JS-APP_ROUTER-111111?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-STRICT-111111?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TAILWIND-CSS-111111?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

### Overview

A dark, high-contrast personal portfolio engineered to showcase full-stack software projects alongside a curated 35mm photography archive. Built with a modular data architecture, bilingual switching (`FR` / `EN`), subtle sound feedback, and an interactive printable resume.

---

### Core Features & Functions

- **Bilingual Engine (`FR` / `EN`)** — Instant language switching powered by React Context (`LanguageContext`) across all routes, project descriptions, and CV sections.
- **Interactive 3D Tilt Cards & Custom Cursor** — Physics-inspired hover interactions (`TiltCard`, `CustomCursor`) paired with film-grain texture overlays (`FilmGrain`) and subtle UI audio (`soundFx`).
- **35mm Visual Archive (`/photography`)** — Curated photo gallery linked to `@medshashin`, served directly from local static assets (`public/images/`) for zero-latency loading.
- **Message Terminal (`/contact`)** — Topic-aware contact form (`Hiring`, `Web Project`, `35mm Shoot`) integrated with **Formspree** for direct email delivery, plus one-click coordinate copying.
- **Printable PDF Resume** — Clean print-stylesheet layout allowing recruiters to export a formatted CV directly from `/contact`.

---

### Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Core** | Next.js (App Router), React, TypeScript |
| **Styling & UI** | Tailwind CSS, Custom CSS Animations, Film Grain Overlay |
| **State & Audio** | React Context API, Web Audio / Ambient Sound FX |
| **Form & Delivery** | Formspree REST API |
| **Hosting & CI/CD** | GitHub (`DarkMed04/portfolio`) → Vercel Auto-Deploy |

---

### Architecture

```text
PORTFOLIO/
├── public/
│   ├── audio/              # Ambient background track
│   └── images/             # Curated 35mm photography & project assets
├── src/
│   ├── app/
│   │   ├── contact/        # Message terminal + printable CV
│   │   ├── photography/    # Visual gallery route
│   │   └── projects/       # Engineering showcase route
│   ├── components/         # Navbar, TiltCard, CustomCursor, FilmGrain, LanguageSwitcher
│   ├── context/            # Bilingual FR/EN provider
│   ├── data/               # Centralized typed content (portfolioData.ts)
│   └── utils/              # UI sound effects (soundFx.ts)
└── package.json