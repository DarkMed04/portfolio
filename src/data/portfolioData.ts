export type Lang = "fr" | "en";

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface ExperienceItem {
  id: string;
  period: LocalizedText;
  role: LocalizedText;
  organization: string;
  location: string;
  tags: string[];
  points: {
    fr: string[];
    en: string[];
  };
}

export interface EducationItem {
  id: string;
  period: LocalizedText;
  degree: LocalizedText;
  institution: string;
  status: LocalizedText;
}

export interface ProjectItem {
  id: string;
  slug: string;
  year: string;
  category: "web" | "data" | "systems";
  title: LocalizedText;
  client: string;
  summary: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  impact: LocalizedText;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface PhotoItem {
  id: string;
  code: string;
  title: LocalizedText;
  caption: LocalizedText;
  location: string;
  filmProfile: string;
  camera: string;
  aperture: string;
  shutter: string;
  iso: string;
  aspect: "portrait" | "landscape" | "square";
  imageUrl: string;
  fallbackGradient: string;
  instagramUrl: string;
}

export const PORTFOLIO_DATA = {
  system: {
    brand: "MED.BAHA_OS",
    version: "v2.7.0",
    name: "Mohamed Baha",
    handle: "@medshashin",
    instagramUrl: "https://instagram.com/medshashin",
    githubUrl: "https://github.com/DarkMed04",
    email: "baha.moha@outlook.com",
    phone: "+212 626-060-501",
    location: {
      fr: "Laâyoune / Rabat, Maroc",
      en: "Laâyoune / Rabat, Morocco",
    },
    availability: {
      fr: "Disponible pour opportunités & collaborations",
      en: "Available for opportunities & collaborations",
    },
  },
  nav: {
    home: { fr: "Accueil", en: "Home" },
    projects: { fr: "Projets", en: "Projects" },
    photography: { fr: "Photo", en: "35mm" },
    contact: { fr: "Contact", en: "Contact" },
  },
  hero: {
    eyebrow: {
      fr: "DÉVELOPPEUR FULL-STACK • GÉNIE INFORMATIQUE • @MEDSHASHIN",
      en: "FULL-STACK DEVELOPER • COMPUTER ENGINEERING • @MEDSHASHIN",
    },
    headline: {
      fr: "Architecture web moderne, clarté des données & esthétique 1990s.",
      en: "Modern web architecture, data clarity & 1990s visual craft.",
    },
    subheadline: {
      fr: "Développeur Full-Stack et étudiant en Licence Professionnelle en Génie Informatique à l'École High-Technologie (Rabat). Créateur de plateformes web et d'archives visuelles sur @medshashin.",
      en: "Full-Stack Developer and Professional Bachelor's student in Computer Engineering at École High-Technologie (Rabat). Creator of web platforms and visual stories on @medshashin.",
    },
    primaryCta: {
      fr: "Explorer les projets",
      en: "Explore projects",
    },
    secondaryCta: {
      fr: "Côté photo [35MM]",
      en: "Photo side [35MM]",
    },
    stats: [
      {
        value: "04+",
        label: { fr: "Expériences Terrain", en: "Field Experiences" },
      },
      {
        value: "09",
        label: { fr: "Certifications Vérifiées", en: "Verified Certifications" },
      },
      {
        value: "02",
        label: { fr: "Diplômes TS + LP", en: "Tech Degrees + BSc" },
      },
      {
        value: "35MM",
        label: { fr: "Archive @medshashin", en: "@medshashin Archive" },
      },
    ],
  },
  about: {
    title: {
      fr: "Profil & Vision Technique",
      en: "Profile & Technical Vision",
    },
    description: {
      fr: "Développeur web ayant une expérience concrète dans la conception et le développement d'applications web avec PHP, JavaScript, HTML, CSS, Bootstrap et MySQL. Spécialisé dans les solutions de gestion du personnel, la digitalisation des documents administratifs et l'organisation structurée des données.",
      en: "Web developer with hands-on experience designing and building web applications with PHP, JavaScript, HTML, CSS, Bootstrap, and MySQL. Focused on staff management systems, administrative document digitalization, and structured data organization.",
    },
    hardSkills: [
      {
        category: { fr: "Développement Web", en: "Web Development" },
        items: ["PHP", "JavaScript / TypeScript", "HTML5 / CSS3", "Bootstrap / Tailwind", "Next.js"],
      },
      {
        category: { fr: "Données & Outils", en: "Data & Tooling" },
        items: ["MySQL / SQL", "Advanced Microsoft Excel", "Git & GitHub", "ChatGPT for Data Science"],
      },
      {
        category: { fr: "Systèmes & Diagnostic", en: "Systems & Diagnostics" },
        items: ["Électronique Embarquée", "Diagnostic Technique", "Digitalisation Documentaire", "Gestion de Stock"],
      },
    ],
    softSkills: [
      { fr: "Esprit d'analyse et résolution de problèmes", en: "Analytical thinking & problem solving" },
      { fr: "Organisation et gestion des priorités", en: "Organization & priority management" },
      { fr: "Communication et relations interpersonnelles", en: "Communication & interpersonal skills" },
      { fr: "Autonomie et sens des responsabilités", en: "Autonomy & strong sense of ownership" },
      { fr: "Travail en équipe et collaboration", en: "Teamwork & cross-functional collaboration" },
      { fr: "Gestion du temps et respect des délais", en: "Time management & deadline reliability" },
    ],
  },
  experience: [
    {
      id: "exp-justice",
      period: { fr: "Avr 2024 - Mai 2024", en: "Apr 2024 - May 2024" },
      role: { fr: "Développeur d'une application web", en: "Web Application Developer" },
      organization: "Ministère de la Justice",
      location: "Laâyoune",
      tags: ["PHP", "MySQL", "Bootstrap", "Digitalisation"],
      points: {
        fr: [
          "Développement d'une application web PHP pour la gestion du personnel et des documents administratifs.",
          "Participation active à la digitalisation, l'indexation et l'organisation des dossiers internes.",
        ],
        en: [
          "Developed a PHP web application for staff management and administrative document tracking.",
          "Contributed to the digitalization, indexing, and structuring of internal records.",
        ],
      },
    },
    {
      id: "exp-danone",
      period: { fr: "Avr 2024 - Mai 2024", en: "Apr 2024 - May 2024" },
      role: { fr: "Assistant de gestion de stock", en: "Inventory Management Assistant" },
      organization: "Danone",
      location: "Laâyoune",
      tags: ["Excel", "Inventaire", "Logistique", "Suivi RH"],
      points: {
        fr: [
          "Suivi rigoureux des stocks en chambre froide et participation aux opérations d'inventaire.",
          "Création d'un fichier Excel structuré pour le suivi des présences du personnel.",
        ],
        en: [
          "Monitored cold-room inventory levels and participated in stock audit operations.",
          "Built a structured Excel workbook to monitor staff attendance.",
        ],
      },
    },
    {
      id: "exp-elharti",
      period: { fr: "Nov 2023 - Fév 2024", en: "Nov 2023 - Feb 2024" },
      role: { fr: "Assistant pédagogique", en: "Teaching Assistant" },
      organization: "École El Harti",
      location: "Laâyoune",
      tags: ["Pédagogie", "Initiation IT", "Accompagnement"],
      points: {
        fr: [
          "Accompagnement des élèves du primaire dans leurs activités scolaires quotidiennes.",
          "Initiation pratique aux bases de l'informatique et des outils numériques.",
        ],
        en: [
          "Supported elementary school students throughout their daily academic activities.",
          "Introduced practical computing fundamentals and digital literacy.",
        ],
      },
    },
    {
      id: "exp-narsa",
      period: { fr: "Mar 2023 - Avr 2023", en: "Mar 2023 - Apr 2023" },
      role: { fr: "Développeur d'une application web", en: "Web Application Developer" },
      organization: "NARSA",
      location: "Laâyoune",
      tags: ["PHP", "MySQL", "HTML/CSS", "Administration"],
      points: {
        fr: [
          "Conception d'une solution PHP dédiée à l'organisation des informations et documents du personnel.",
          "Amélioration de la gestion, de la recherche et de l'accès aux données administratives.",
        ],
        en: [
          "Designed a PHP solution to organize staff records and administrative documents.",
          "Improved management efficiency and retrieval speed for administrative data.",
        ],
      },
    },
  ] as ExperienceItem[],
  education: [
    {
      id: "edu-lp",
      period: { fr: "2026 - En cours", en: "2026 - In Progress" },
      degree: {
        fr: "Licence Professionnelle en Génie Informatique",
        en: "Professional Bachelor's in Computer Engineering",
      },
      institution: "Ecole High-Technologie - Rabat",
      status: { fr: "En cours", en: "Active" },
    },
    {
      id: "edu-ista",
      period: { fr: "2023 - 2025", en: "2023 - 2025" },
      degree: {
        fr: "Technicien Spécialisé en Diagnostic et Électronique Embarquée",
        en: "Specialized Technician in Diagnostics & Embedded Electronics",
      },
      institution: "ISTA - Laâyoune",
      status: { fr: "Diplômé", en: "Graduated" },
    },
    {
      id: "edu-esgi",
      period: { fr: "2021 - 2023", en: "2021 - 2023" },
      degree: {
        fr: "Technicien Spécialisé en Développement Informatique",
        en: "Specialized Technician in Software Development",
      },
      institution: "ESGI - Laâyoune",
      status: { fr: "Diplômé", en: "Graduated" },
    },
    {
      id: "edu-bac",
      period: { fr: "2020 - 2021", en: "2020 - 2021" },
      degree: {
        fr: "Baccalauréat - Sciences Physiques et Chimiques",
        en: "High School Diploma - Physical & Chemical Sciences",
      },
      institution: "Attanmia - Laâyoune",
      status: { fr: "Obtenu", en: "Completed" },
    },
  ] as EducationItem[],
  certifications: [
    { name: "SQL", issuer: "365 Data Science", badge: "NEW" },
    { name: "Git & GitHub", issuer: "365 Data Science", badge: "NEW" },
    { name: "Advanced Microsoft Excel", issuer: "365 Data Science", badge: "NEW" },
    { name: "ChatGPT for Data Science", issuer: "365 Data Science", badge: "NEW" },
    { name: "AI for Business Professionals", issuer: "HP LIFE", badge: "VERIFIED" },
    { name: "Agile Project Management", issuer: "HP LIFE", badge: "VERIFIED" },
    { name: "Effective Leadership", issuer: "HP LIFE", badge: "VERIFIED" },
    { name: "TOEIC — English for International Communication", issuer: "ETS", badge: "VERIFIED" },
    { name: "PIE — Programme d'Innovation et d'Entrepreneuriat", issuer: "OFPPT / PIE", badge: "VERIFIED" },
  ],
  languages: [
    { name: { fr: "Arabe", en: "Arabic" }, level: { fr: "Langue maternelle", en: "Native" }, percent: 100 },
    { name: { fr: "Anglais", en: "English" }, level: { fr: "Intermédiaire supérieur (B2)", en: "Upper-Intermediate (B2)" }, percent: 82 },
    { name: { fr: "Français", en: "French" }, level: { fr: "Intermédiaire (B1)", en: "Intermediate (B1)" }, percent: 68 },
  ],
  projects: [
    {
      id: "proj-konkours",
      slug: "konkours-exam-prep-platform",
      year: "2026",
      category: "systems",
      title: {
        fr: "KonKours.ma — Plateforme des Concours Publics",
        en: "KonKours.ma — Public Sector Exam Platform",
      },
      client: "KonKours.ma",
      summary: {
        fr: "Plateforme web dédiée aux diplômés Technicien Spécialisé (Bac+2) et candidats aux concours publics au Maroc, avec navigation mobile fluide.",
        en: "Web platform dedicated to Technicien Spécialisé (Bac+2) graduates and public exam candidates in Morocco, featuring smooth mobile navigation.",
      },
      challenge: {
        fr: "Rassembler les concours, les informations utiles et une navigation ergonomique sur smartphone dans un seul espace rapide.",
        en: "Bring public exams, key resources, and ergonomic smartphone navigation together in one fast hub.",
      },
      solution: {
        fr: "Architecture web moderne avec barre de navigation inférieure flottante sur mobile, organisation claire des rubriques et déploiement continu sur Vercel.",
        en: "Modern web architecture featuring a floating mobile bottom dock, clear section hierarchy, and continuous deployment on Vercel.",
      },
      impact: {
        fr: "Mise en ligne active sur konkour.vercel.app avec accès rapide et intuitif depuis mobile et ordinateur.",
        en: "Live on konkour.vercel.app with fast, intuitive access across mobile and desktop screens.",
      },
      stack: ["HTML/CSS", "JS/JSON", "PYTHON"],
      repoUrl: "https://github.com/DarkMed04/KonKour",
      liveUrl: "https://konkour.vercel.app",
      featured: true,
    },
    {
      id: "proj-justice",
      slug: "justice-staff-portal",
      year: "2024",
      category: "web",
      title: {
        fr: "Portail de Gestion du Personnel & Archives",
        en: "Staff Management & Digital Archive Portal",
      },
      client: "Ministère de la Justice",
      summary: {
        fr: "Application web PHP/MySQL conçue pour centraliser les dossiers du personnel et accélérer la numérisation des documents administratifs.",
        en: "PHP/MySQL web application built to centralize staff files and accelerate administrative document digitalization.",
      },
      challenge: {
        fr: "Les dossiers administratifs papier ralentissaient la recherche d'informations et le suivi quotidien du personnel.",
        en: "Paper-based administrative folders slowed down record retrieval and daily staff tracking.",
      },
      solution: {
        fr: "Développement d'une interface sécurisée avec recherche multicritère, classement numérique des pièces et gestion des rôles.",
        en: "Built a secure interface with multi-criteria search, digital document classification, and role-based access.",
      },
      impact: {
        fr: "Réduction significative du temps de consultation des archives et structuration complète des dossiers.",
        en: "Significantly reduced archive lookup time and brought full structure to staff records.",
      },
      stack: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML/CSS"],
      repoUrl: "https://github.com/DarkMed04",
      featured: true,
    },
    {
      id: "proj-narsa",
      slug: "narsa-admin-hub",
      year: "2023",
      category: "web",
      title: {
        fr: "Système d'Organisation des Données Administratives",
        en: "Administrative Data Organization System",
      },
      client: "NARSA",
      summary: {
        fr: "Solution web sur mesure permettant de structurer les fiches du personnel et d'améliorer l'accès aux documents internes.",
        en: "Custom web solution designed to structure staff profiles and streamline access to internal documents.",
      },
      challenge: {
        fr: "Besoin d'un outil centralisé pour organiser les informations du personnel et fluidifier l'accès aux données.",
        en: "Needed a centralized tool to organize staff information and streamline administrative data access.",
      },
      solution: {
        fr: "Architecture relationnelle MySQL couplée à une interface PHP claire pour l'ajout, la mise à jour et le filtrage rapide.",
        en: "Relational MySQL schema paired with a clean PHP interface for fast creation, updates, and filtering.",
      },
      impact: {
        fr: "Fiabilisation de la base documentaire et gain d'efficacité pour le suivi administratif.",
        en: "Increased document database reliability and improved administrative tracking efficiency.",
      },
      stack: ["PHP", "MySQL", "JavaScript", "CSS3"],
      repoUrl: "https://github.com/DarkMed04",
      featured: false,
    },
    {
      id: "proj-danone",
      slug: "cold-chain-attendance-tracker",
      year: "2024",
      category: "data",
      title: {
        fr: "Suivi d'Inventaire Chambre Froide & Présences RH",
        en: "Cold-Room Inventory & Staff Attendance Tracker",
      },
      client: "Danone",
      summary: {
        fr: "Modèle de suivi opérationnel combinant contrôle des stocks en chambre froide et tableau de bord Excel automatisé des présences.",
        en: "Operational tracking model combining cold-room stock control and an automated Excel staff attendance dashboard.",
      },
      challenge: {
        fr: "Assurer la cohérence des inventaires en chambre froide tout en suivant quotidiennement la présence des équipes.",
        en: "Maintain accurate cold-room inventory logs while tracking daily team attendance.",
      },
      solution: {
        fr: "Conception d'un classeur Excel avancé avec formules dynamiques, contrôles de saisie et indicateurs de présence.",
        en: "Designed an advanced Excel workbook with dynamic formulas, validation rules, and attendance indicators.",
      },
      impact: {
        fr: "Visibilité immédiate sur les effectifs et amélioration de la traçabilité des opérations d'inventaire.",
        en: "Immediate visibility into staffing levels and improved traceability across inventory audits.",
      },
      stack: ["Advanced Excel", "Data Structuring", "Inventory Audit"],
      repoUrl: "https://github.com/DarkMed04",
      featured: false,
    },
  ] as ProjectItem[],

  // =========================================================================
  // 📸 PHOTOS GALLERY (MANUAL)
  // 1. 7ett tsawer dyalek f folder: public/images/ (ex: pic1.jpg, pic2.jpg)
  // 2. Copy/Paste l-template li l-te7t o bdel l-ma3loumat w imageUrl
  // =========================================================================
  photos: [
    
    {
      id: "ph-pxl-01",
      code: "PXL_RAW_01 // 35MM",
      title: {
        fr: "Crépuscule Pourpre & Café",
        en: "Crimson Dusk & Coffee",
      },
      caption: {
        fr: "Ciel rouge profond au crépuscule, silhouettes de palmiers et reflets sur le toit de la voiture.",
        en: "Deep crimson twilight sky, palm silhouettes, and warm reflections across the car roof.",
      },
      location: "Laayoune, Morocco",
      filmProfile: "CRIMSON TWILIGHT / RAW",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/250s",
      iso: "ISO 100",
      aspect: "landscape",
      imageUrl: "/images/PXL_RAW-01.jpeg",
      fallbackGradient: "from-rose-950 via-slate-900 to-amber-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-02",
      code: "PXL_RAW_02 // 35MM",
      title: {
        fr: "Orage Doré & Éclairage Urbain",
        en: "Golden Storm & Street Lamps",
      },
      caption: {
        fr: "Nuages ambrés denses, lueur bleue discrète à l'horizon et alignement des lampadaires.",
        en: "Dense amber clouds, a quiet blue break on the horizon, and a line of glowing street lamps.",
      },
      location: "Laayoune, Morocco",
      filmProfile: "AMBER STORM / RAW",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/500s",
      iso: "ISO 100",
      aspect: "landscape",
      imageUrl: "/images/PXL_RAW-02.jpeg",
      fallbackGradient: "from-amber-950 via-slate-900 to-cyan-950",
      instagramUrl: "https://instagram.com/medshashin",
    },

    {
      id: "ph-pxl-17",
      code: "PXL_RAW_17 // 35MM",
      title: {
        fr: "Arc-en-Ciel sur Ciel Écarlate",
        en: "Rainbow Over Crimson Sky",
      },
      caption: {
        fr: "Un arc-en-ciel lumineux qui traverse un ciel rouge-orangé dramatique au-dessus d'une avenue bordée de palmiers et de lampadaires.",
        en: "A vivid rainbow arching across a dramatic crimson-orange sky above a palm-lined avenue and glowing street lamps.",
      },
      location: "Maroc",
      filmProfile: "CRIMSON ARC / RAW",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/500s",
      iso: "ISO 100",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-017.jpeg",
      fallbackGradient: "from-rose-950 via-slate-900 to-amber-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-16",
      code: "PXL_RAW_16 // 35MM",
      title: {
        fr: "Port & Chalutiers au Matin",
        en: "Harbor & Trawlers in Mist",
      },
      caption: {
        fr: "Atmosphère brumeuse et texturée au port avec mâts, bouées orangées et cabine du bateau ATHENA-3.",
        en: "Misty, textured harbor scene featuring rigging, orange buoys, and the cabin of the ATHENA-3 vessel.",
      },
      location: "Maroc",
      filmProfile: "HARBOR FOG / 35MM",
      camera: "Pixel RAW / Mobile",
      aperture: "f/2.0",
      shutter: "1/250s",
      iso: "ISO 200",
      aspect: "landscape",
      imageUrl: "/images/PXL_RAW-16.jpeg",
      fallbackGradient: "from-slate-900 via-teal-950 to-amber-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-dome-gold",
      code: "PXL_RAW_DOME // 35MM",
      title: {
        fr: "Coupole Dorée & Vitraux Saphir",
        en: "Golden Dome & Sapphire Stained Glass",
      },
      caption: {
        fr: "Symétrie géométrique, dorures complexes et vitraux bleu-cobalt illuminés de l'intérieur.",
        en: "Geometric symmetry, intricate goldwork, and cobalt-blue stained glass glowing from within.",
      },
      location: "Maroc",
      filmProfile: "ROYAL GOLD / EDITORIAL",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/125s",
      iso: "ISO 250",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-15.jpeg",
      fallbackGradient: "from-amber-950 via-indigo-950 to-slate-900",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-blood-moon",
      code: "PXL_RAW_MOON // 35MM",
      title: {
        fr: "Lune Cuivrée dans la Brume Nocturne",
        en: "Copper Moon in Night Clouds",
      },
      caption: {
        fr: "Un disque lunaire cuivré et éclatant suspendu au milieu de nuages sombres et cotonneux.",
        en: "A glowing copper-and-white moon suspended amid dense, drifting night clouds.",
      },
      location: "Maroc",
      filmProfile: "NOCTURNE ECLIPSE / RAW",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/1000s",
      iso: "ISO 100",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-14.jpeg",
      fallbackGradient: "from-slate-950 via-rose-950/50 to-indigo-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-08",
      code: "PXL_RAW_08 // 35MM",
      title: {
        fr: "Vestige de Terre & Verdure",
        en: "Earthen Ruin & Foliage",
      },
      caption: {
        fr: "Une tour en pisé aux textures naturelles encadrée par des palmiers et un feuillage vert intense.",
        en: "A textured earthen tower framed by palm fronds and lush green foliage under a soft sky.",
      },
      location: "Maroc",
      filmProfile: "TERRA COTTA / 90s",
      camera: "Pixel RAW / Mobile",
      aperture: "f/2.0",
      shutter: "1/500s",
      iso: "ISO 100",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-08.jpeg",
      fallbackGradient: "from-amber-950 via-emerald-950/60 to-slate-900",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-07",
      code: "PXL_RAW_07 // 35MM",
      title: {
        fr: "Toit Vert & Lumière d'Argentique",
        en: "Green Roof & Film Light",
      },
      caption: {
        fr: "Architecture blanche épurée, tuiles vertes et garde royale sur fond clair au rendu argentique doux.",
        en: "Clean white architecture, green roof tiles, and mounted guards in a soft analog-toned scene.",
      },
      location: "Rabat, MA",
      filmProfile: "ANALOG PRINT / 35MM",
      camera: "Pixel RAW / Mobile",
      aperture: "f/2.8",
      shutter: "1/800s",
      iso: "ISO 100",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-07.jpeg",
      fallbackGradient: "from-emerald-950 via-stone-900 to-amber-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-06",
      code: "PXL_RAW_06 // 35MM",
      title: {
        fr: "Courbes Urbaines sous Ciel Bleu",
        en: "Urban Curves Under Clear Sky",
      },
      caption: {
        fr: "Les courbes d'une voie urbaine et d'une ligne de tramway contrastant avec un ciel bleu profond et des tons chauds au premier plan.",
        en: "Sweeping roadway and transit curves beneath a clear blue sky with warm sunlit ground tones.",
      },
      location: "Rabat, MA",
      filmProfile: "SUNLIT SKY / 35MM",
      camera: "Pixel RAW / Mobile",
      aperture: "f/2.0",
      shutter: "1/1000s",
      iso: "ISO 100",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-06.jpeg",
      fallbackGradient: "from-cyan-950 via-slate-900 to-amber-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-05",
      code: "PXL_RAW_05 // 35MM",
      title: {
        fr: "Tour Hassan & Tramway",
        en: "Hassan Tower & Tramway",
      },
      caption: {
        fr: "Rencontre entre le patrimoine historique de la Tour Hassan et la mobilité moderne du tramway dans une lumière douce.",
        en: "Historic stonework of Hassan Tower meeting modern tramway lines in gentle daylight.",
      },
      location: "Rabat, MA",
      filmProfile: "SANDSTONE / 35MM",
      camera: "Pixel RAW / Mobile",
      aperture: "f/2.8",
      shutter: "1/800s",
      iso: "ISO 100",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-05.jpeg",
      fallbackGradient: "from-amber-950 via-slate-900 to-emerald-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-04",
      code: "PXL_RAW_04 // 35MM",
      title: {
        fr: "Ampoule à Filament & Tableaux",
        en: "Filament Lamp & Framed Art",
      },
      caption: {
        fr: "Lueur chaude d'une ampoule géométrique au milieu d'œuvres encadrées dans une pièce sombre et intime.",
        en: "Warm glow from a geometric cage bulb alongside framed artworks in an intimate dark interior.",
      },
      location: "Maroc",
      filmProfile: "WARM FILAMENT / RAW",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/60s",
      iso: "ISO 400",
      aspect: "portrait",
      imageUrl: "/images/PXL_RAW-04.jpg",
      fallbackGradient: "from-amber-950 via-slate-900 to-indigo-950",
      instagramUrl: "https://instagram.com/medshashin",
    },
    {
      id: "ph-pxl-03",
      code: "PXL_RAW_03 // 35MM",
      title: {
        fr: "Double Arc sous Ciel d'Orage",
        en: "Arc Under Stormy Blue Sky",
      },
      caption: {
        fr: "Nuages sombres et bleus chargés d'orage traversés par un arc coloré au-dessus de l'avenue.",
        en: "Deep storm-blue clouds broken by a vivid color arc stretching across the avenue.",
      },
      location: "Maroc",
      filmProfile: "STORM ARCH / RAW",
      camera: "Pixel RAW / Mobile",
      aperture: "f/1.9",
      shutter: "1/500s",
      iso: "ISO 100",
      aspect: "landscape",
      imageUrl: "/images/PXL_RAW-03.jpeg",
      fallbackGradient: "from-blue-950 via-slate-900 to-cyan-950",
      instagramUrl: "https://instagram.com/medshashin",
    },

  ] as PhotoItem[],
};