import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SoilCTA } from "@/components/ui/SoilCTA";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { site } from "@/config/site";
import { essais } from "@/data/essais";
import { faq } from "@/data/faq";
import { realisations } from "@/data/realisations";
import { services } from "@/data/services";
import heroRig from "@/assets/hero-rig.jpg";
import concreteCubes from "@/assets/concrete-cubes.jpg";
import roadWorks from "@/assets/road-works.jpg";
import siteAerial from "@/assets/site-aerial.jpg";
import soilCores from "@/assets/soil-cores.jpg";
import buildingWorks from "@/assets/building-works.jpg";
import bridgeWorks from "@/assets/bridge-works.jpg";
import damSite from "@/assets/dam-site.jpg";
import industrialPlatform from "@/assets/industrial-platform.jpg";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Droplets,
  Factory,
  LandPlot,
  MapPin,
  MessageCircle,
  MoveHorizontal,
  Phone,
  Route as RouteIcon,
  Waypoints,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LM2G — Études géotechniques, essais & contrôle qualité au Maroc" },
      {
        name: "description",
        content:
          "Laboratoire Marocain de Géotechnique et de Génie Civil à Casablanca : études géotechniques, essais de laboratoire, contrôle qualité chantier et expertise technique depuis 2014.",
      },
      {
        property: "og:title",
        content: "LM2G — Études géotechniques, essais & contrôle qualité au Maroc",
      },
      {
        property: "og:description",
        content:
          "Des fondations solides pour des ouvrages durables : études géotechniques, laboratoire d'essais et contrôle qualité pour le bâtiment et les routes au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "LM2G — Laboratoire Marocain de Géotechnique et de Génie Civil",
          legalName: "LM2G SARL",
          foundingDate: "2014",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hay Essafa, Lot N° E42, Appt N° 1, Lissasfa",
            addressLocality: "Casablanca",
            addressCountry: "MA",
          },
          telephone: "+212661890187",
          email: "contact@lm2g.com",
          areaServed: "MA",
          geo: { "@type": "GeoCoordinates", latitude: 33.54861667, longitude: -7.68878652 },
          hasMap: "https://maps.app.goo.gl/T7Pbnp6sNVo41wUp7",
        }),
      },
    ],
  }),
  component: Index,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

const PHONE_DISPLAY = "06 61 89 01 87";
const PHONE_HREF = "tel:+212661890187";
const WHATSAPP_HREF =
  "https://wa.me/212661890187?text=" +
  encodeURIComponent("Bonjour LM2G, je souhaite obtenir un devis pour un projet.");

/** Coupe de sol illustrative du hero (profondeurs en mètres). */
const MAX_DEPTH = 12;
const soilLayers = [
  {
    name: "Remblai",
    from: 0,
    to: 1.5,
    color: "#A88A5E",
    pattern: "dots",
    note: "Matériaux rapportés hétérogènes, à purger sous les fondations.",
  },
  {
    name: "Argile limoneuse",
    from: 1.5,
    to: 4,
    color: "#8B6428",
    pattern: "dash",
    note: "Sol plastique et sensible à l'eau : tassements à vérifier.",
  },
  {
    name: "Marne",
    from: 4,
    to: 7,
    color: "#6B4F2A",
    pattern: "hatch",
    note: "Compacte et peu perméable : bonne portance.",
  },
  {
    name: "Grès",
    from: 7,
    to: 10,
    color: "#523A1C",
    pattern: "cross",
    note: "Horizon rocheux : assise possible pour fondations profondes.",
  },
  {
    name: "Substratum calcaire",
    from: 10,
    to: MAX_DEPTH,
    color: "#2E2416",
    pattern: "dots",
    note: "Horizon de référence du modèle géotechnique.",
  },
] as const;

const manifesto =
  "Depuis 2014, LM2G accompagne promoteurs, entreprises du BTP et maîtres d'ouvrage. Nous sondons, nous testons, nous contrôlons — pour que chaque ouvrage repose sur une donnée fiable, de la conception jusqu'à la réception.";
const manifestoAccents = new Set(["sondons,", "testons,", "contrôlons", "fiable,"]);

const processSteps = [
  {
    depth: "0 m",
    title: "Analyse du besoin",
    text: "Compréhension du projet, du site et des exigences du maître d'ouvrage. Nous définissons la mission adaptée.",
  },
  {
    depth: "2 m",
    title: "Reconnaissance & sondages",
    text: "Sondages carottés et destructifs, essais in situ, prélèvements d'échantillons intacts et remaniés.",
  },
  {
    depth: "5 m",
    title: "Essais en laboratoire",
    text: "Identification, mécanique des sols, matériaux : chaque échantillon est tracé jusqu'au résultat signé.",
  },
  {
    depth: "8 m",
    title: "Rapport & recommandations",
    text: "Modèle géotechnique, principes de fondation et prescriptions directement exploitables par vos équipes.",
  },
  {
    depth: "10 m",
    title: "Suivi jusqu'à la réception",
    text: "Contrôle qualité en chantier, procès-verbaux et assistance technique jusqu'à la réception des travaux.",
  },
];

const reportPoints = [
  {
    title: "Rigueur normative",
    text: "Chaque essai est réalisé et référencé selon la norme applicable (NM, NF, EN).",
  },
  {
    title: "Résultats interprétés",
    text: "Pas de chiffres bruts : des courbes, des valeurs caractéristiques et leur signification pour votre projet.",
  },
  {
    title: "Conclusions exploitables",
    text: "Des recommandations claires que votre bureau d'études et votre entreprise peuvent appliquer directement.",
  },
  {
    title: "Responsabilité assumée",
    text: "Des documents signés, datés et tracés, de la réception de l'échantillon au procès-verbal.",
  },
];

// CONTENU EXEMPLE À REMPLACER — chiffres à valider avec le client
const stats = [
  { value: 10, suffix: "+", label: "Années d'expérience", strate: "Strate 01 · Remblai" },
  { value: 1200, suffix: "+", label: "Sondages réalisés", strate: "Strate 02 · Argile" },
  { value: 15000, suffix: "+", label: "Essais de laboratoire", strate: "Strate 03 · Marne" },
  { value: 300, suffix: "+", label: "Chantiers contrôlés", strate: "Strate 04 · Grès" },
];
const strataStyles = [
  "bg-sand/20 text-foreground",
  "bg-sand/45 text-foreground",
  "bg-sand text-earth",
  "bg-earth text-white",
];

const domaines = [
  {
    icon: Building2,
    label: "Bâtiment",
    text: "Immeubles, équipements publics et complexes résidentiels : étude G2, expertise des fonds de fouilles et suivi du béton.",
    image: buildingWorks,
  },
  {
    icon: RouteIcon,
    label: "Routes & voiries",
    text: "Autoroutes, routes et voiries urbaines : portance des plateformes, compactage couche par couche et contrôle des enrobés.",
    image: roadWorks,
  },
  {
    icon: Waypoints,
    label: "Ouvrages d'art",
    text: "Ponts, dalots et murs de soutènement : reconnaissance des appuis, fondations profondes et contrôle des bétons.",
    image: bridgeWorks,
  },
  {
    icon: Droplets,
    label: "Barrages & hydraulique",
    text: "Barrages, retenues et canaux : caractérisation des matériaux, contrôle des remblais et des fondations.",
    image: damSite,
  },
  {
    icon: LandPlot,
    label: "Lotissements & VRD",
    text: "Lotissements, assainissement et réseaux : contrôle qualité jusqu'à la réception des voiries.",
    image: roadWorks,
  },
  {
    icon: Factory,
    label: "Industriel",
    text: "Plateformes logistiques et dallages à forte charge : portance des sols et résistance des bétons.",
    image: industrialPlatform,
  },
];

const realisationImages: Record<string, string> = {
  "road-works": roadWorks,
  "site-aerial": siteAerial,
  "soil-cores": soilCores,
  "concrete-cubes": concreteCubes,
  "building-works": buildingWorks,
  "bridge-works": bridgeWorks,
  "dam-site": damSite,
  "industrial-platform": industrialPlatform,
};

const cleanLieu = (lieu: string) => lieu.replace(/\s*\(CONTENU EXEMPLE À REMPLACER\)/i, "");
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Génère un tracé SVG de strate à limite supérieure ondulée. */
function wavePath(base: number, amp: number, freq: number, phase: number, width = 1440, height = 600) {
  let d = `M0,${height}`;
  for (let x = 0; x <= width; x += 24) {
    const t = (x / width) * Math.PI * 2 * freq;
    const y = base + amp * Math.sin(t + phase) + amp * 0.4 * Math.sin(t * 2.7 + phase * 1.3);
    d += ` L${x},${y.toFixed(1)}`;
  }
  return `${d} L${width},${height} Z`;
}

const heroLayerPaths = soilLayers.map((l, i) =>
  wavePath(i === 0 ? 6 : (l.from / MAX_DEPTH) * 600, i === 0 ? 3 : 10, 1.4 + i * 0.35, i * 1.7),
);

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Progression (0 → 1) d'un élément dans le viewport, mise à jour en rAF. */
function useSectionProgress<T extends HTMLElement>(anchorRatio = 0.6) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const value = (window.innerHeight * anchorRatio - rect.top) / rect.height;
        setProgress(clamp(value, 0, 1));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [anchorRatio]);
  return { ref, progress };
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function Index() {
  return (
    <>
      <style>{pageStyles}</style>
      <SoilHero />
      <Manifesto />
      <ServicesIndex />
      <StrataDivider top="var(--background)" bottom="var(--navy)" />
      <MethodBorehole />
      <StrataDivider top="var(--navy)" bottom="var(--background)" flip />
      <ReportSection />
      <StatsStrata />
      <ProjectsRail />
      <DomainesExplorer />
      <FaqSection />
      <SoilCTA
        title="Commençons"
        highlight="par votre sol."
        text="Décrivez-nous votre projet et sa localisation : nous vous proposons la mission adaptée et un devis détaillé, rapidement."
      />
    </>
  );
}

/* ------------------------------ Hero : coupe ------------------------------ */

function SoilHero() {
  const reduced = usePrefersReducedMotion();
  const isWide = useMediaQuery("(min-width: 640px)");
  const groundRef = useRef<HTMLDivElement>(null);
  const [probe, setProbe] = useState({ x: 0.64, d: 5.4 });
  const [interacting, setInteracting] = useState(false);

  // Balayage automatique de la sonde tant que l'utilisateur n'interagit pas
  useEffect(() => {
    if (reduced || interacting) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const s = (now - start) / 1000;
      setProbe({ x: 0.62 + 0.2 * Math.sin(s * 0.3), d: 6 + 4.6 * Math.sin(s * 0.55) });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, interacting]);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = groundRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setInteracting(true);
    setProbe({
      x: clamp((e.clientX - rect.left) / rect.width, 0.03, 0.97),
      d: clamp((e.clientY - rect.top) / rect.height, 0.02, 0.98) * MAX_DEPTH,
    });
  };

  const layerIndex = Math.max(
    0,
    soilLayers.findIndex((l) => probe.d >= l.from && probe.d < l.to),
  );
  const layer = soilLayers[layerIndex] ?? soilLayers[0];
  const depthFrac = probe.d / MAX_DEPTH;
  const cardTop = clamp(depthFrac, 0.2, 0.8);
  const cardOnLeft = probe.x > 0.58;
  const ticker = essais.map((e) => ({ nom: e.nom, norme: e.norme }));

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-white lg:h-[100svh] lg:min-h-[760px]">
      {/* Ciel / chantier */}
      <img
        src={heroRig}
        alt="Foreuse géotechnique en fonctionnement sur un chantier au Maroc"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-top opacity-50"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/75 to-navy-deep/10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-deep/80 to-transparent" />

      {/* Texte */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-0">
        <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-steel/30 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-sand backdrop-blur-sm">
          <span className="size-1.5 animate-pulse rounded-full bg-ochre" />
          Laboratoire de géotechnique · Casablanca · Depuis {site.founded}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1] font-bold tracking-tight sm:text-6xl xl:text-7xl">
          <span className="hero-rise block" style={{ animationDelay: "80ms" }}>
            Nous lisons le sol
          </span>
          <span className="hero-rise block text-sand" style={{ animationDelay: "180ms" }}>
            avant que vous ne construisiez.
          </span>
        </h1>
        <p
          className="hero-rise mt-5 max-w-xl text-base leading-relaxed text-steel sm:text-lg"
          style={{ animationDelay: "280ms" }}
        >
          Études géotechniques, essais de laboratoire et contrôle qualité pour des fondations
          solides et des ouvrages durables, partout au Maroc.
        </p>
        <div className="hero-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "380ms" }}>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-sand hover:text-earth"
          >
            Demander un devis
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link
            to="/services"
            className="rounded-lg border border-steel/40 bg-navy-deep/30 px-6 py-3.5 text-sm font-semibold text-steel-light backdrop-blur-sm transition-colors hover:border-sand hover:text-sand"
          >
            Nos services
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-steel-light transition-colors hover:text-sand"
          >
            <Phone className="size-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Coupe géologique interactive */}
      <div
        ref={groundRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setInteracting(false)}
        className="relative mt-auto mb-12 h-72 w-full cursor-crosshair select-none sm:h-96 lg:absolute lg:inset-x-0 lg:bottom-12 lg:mb-0 lg:h-[46%]"
        aria-label="Coupe de sol illustrative : déplacez la souris pour lire les couches"
        role="img"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <pattern id="p-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.3" fill="#fff" />
              <circle cx="10" cy="10" r="0.9" fill="#fff" />
            </pattern>
            <pattern id="p-dash" width="26" height="12" patternUnits="userSpaceOnUse">
              <line x1="2" y1="6" x2="14" y2="6" stroke="#fff" strokeWidth="1.2" />
            </pattern>
            <pattern id="p-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#fff" strokeWidth="1" />
            </pattern>
            <pattern id="p-cross" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M9 5v8M5 9h8" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          {soilLayers.map((l, i) => (
            <g key={l.name}>
              <path d={heroLayerPaths[i]} fill={l.color} />
              <path d={heroLayerPaths[i]} fill={`url(#p-${l.pattern})`} opacity={0.14} />
              <path
                d={heroLayerPaths[i]}
                fill="#fff"
                className="transition-opacity duration-300"
                opacity={i === layerIndex ? 0.07 : 0}
              />
            </g>
          ))}
        </svg>

        {/* Légende des couches */}
        <ul className="pointer-events-none absolute inset-y-0 left-0 hidden w-64 sm:block" aria-hidden>
          {soilLayers.map((l, i) => {
            const mid = ((l.from + l.to) / 2 / MAX_DEPTH) * 100;
            return (
              <li
                key={l.name}
                className={`absolute left-4 flex -translate-y-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors lg:left-8 ${
                  i === layerIndex ? "text-white" : "text-white/45"
                }`}
                style={{ top: `${mid}%` }}
              >
                <span className={`h-px transition-all ${i === layerIndex ? "w-6 bg-white" : "w-3 bg-white/40"}`} />
                −{l.from.toFixed(1)} m · {l.name}
              </li>
            );
          })}
        </ul>

        {/* Échelle de profondeur */}
        <div className="pointer-events-none absolute inset-y-0 right-3 hidden w-10 sm:block lg:right-6" aria-hidden>
          {[0, 2, 4, 6, 8, 10, 12].map((m) => (
            <span
              key={m}
              className="absolute right-0 flex -translate-y-1/2 items-center gap-1.5 font-mono text-[9px] text-white/40"
              style={{ top: `${(m / MAX_DEPTH) * 100}%` }}
            >
              {m}
              <span className="h-px w-2 bg-white/40" />
            </span>
          ))}
        </div>

        {/* Sonde */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-x-0 h-px bg-white/25"
            style={{ top: `${depthFrac * 100}%` }}
          />
          <div
            className="absolute top-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-white to-white/70 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
            style={{ left: `${probe.x * 100}%`, height: `${depthFrac * 100}%` }}
          />
          <div
            className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-white bg-ochre"
            style={{ left: `${probe.x * 100}%`, top: `${depthFrac * 100}%` }}
          />
          <div
            className="absolute top-0 -translate-x-1/2 -translate-y-full pb-1.5"
            style={{ left: `${probe.x * 100}%` }}
          >
            <span className="block rounded bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-navy-deep">
              SC-01
            </span>
          </div>

          {/* Lecture */}
          <div
            className="absolute w-52 rounded-xl border border-white/20 bg-navy-deep/85 p-3.5 shadow-2xl backdrop-blur-md sm:w-64 sm:p-4"
            style={
              isWide
                ? {
                    left: `${probe.x * 100}%`,
                    top: `${cardTop * 100}%`,
                    transform: cardOnLeft ? "translate(calc(-100% - 22px), -50%)" : "translate(22px, -50%)",
                  }
                : { right: 12, bottom: 12 }
            }
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-steel/70">Profondeur</span>
              <span className="font-mono text-lg font-semibold text-sand tabular-nums">
                −{probe.d.toFixed(1)} m
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="size-3 rounded-sm border border-white/30" style={{ backgroundColor: layer.color }} />
              <span className="font-display text-base font-semibold">{layer.name}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-steel">{layer.note}</p>
          </div>
        </div>

        <p className="pointer-events-none absolute top-0 right-4 hidden -translate-y-[calc(100%+14px)] items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60 lg:right-8 lg:flex">
          <MoveHorizontal className="size-3.5" aria-hidden />
          Déplacez la sonde pour lire le sol
        </p>
      </div>

      {/* Bandeau des essais */}
      <div className="absolute inset-x-0 bottom-0 flex h-12 items-center border-t border-white/10 bg-navy-deep">
        <div className="marquee-mask w-full overflow-hidden">
          <div className="lm2g-marquee flex w-max gap-10">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex shrink-0 items-center gap-3 text-sm whitespace-nowrap">
                <span className="text-steel-light">{t.nom}</span>
                <span className="font-mono text-xs text-sand">{t.norme}</span>
                <span className="text-steel/40">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Manifeste -------------------------------- */

function Manifesto() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>(0.75);
  const words = manifesto.split(" ");
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
        00 — Le laboratoire
      </p>
      <div ref={ref}>
        <p className="mt-6 font-display text-3xl leading-[1.15] font-semibold sm:text-5xl lg:text-6xl">
          {words.map((w, i) => {
            const lit = progress * 1.35 > i / words.length;
            const accent = manifestoAccents.has(w);
            return (
              <span
                key={i}
                className={`transition-colors duration-500 ${
                  lit ? (accent ? "text-ochre" : "text-foreground") : "text-foreground/15"
                }`}
              >
                {w}{" "}
              </span>
            );
          })}
        </p>
      </div>
      <dl className="mt-14 grid grid-cols-2 gap-y-6 border-t border-border pt-8 lg:grid-cols-4">
        {[
          { k: "Création", v: `${site.founded}` },
          { k: "Siège & laboratoire", v: "Casablanca" },
          { k: "Interventions", v: "Tout le Maroc" },
          { k: "Missions", v: "G1 → G5" },
        ].map((f) => (
          <div key={f.k}>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{f.k}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-navy">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ----------------------------- Services : index ---------------------------- */

function ServicesIndex() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
              01 — Nos services
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-foreground sm:text-5xl">
              Quatre expertises, <span className="text-ochre">une seule exigence</span>.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-ochre"
          >
            Vue d'ensemble des services
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>

      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
        className="relative mt-12 border-b border-border"
      >
        {services.map((service, i) => (
          <Link
            key={service.slug}
            to="/services/$slug"
            params={{ slug: service.slug }}
            onPointerEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 border-t border-border py-8 sm:grid-cols-[5rem_1fr_auto] sm:py-10"
          >
            <span className="pt-2 font-mono text-sm text-muted-foreground transition-colors group-hover:text-ochre sm:pt-4">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-3xl font-bold text-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-ochre sm:text-5xl lg:text-6xl">
                {service.titleShort}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {service.tagline}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-navy/70">
                {service.relatedTests.slice(0, 3).map((t, j) => (
                  <span key={t}>
                    {j > 0 && <span className="mr-3 text-ochre">/</span>}
                    {t}
                  </span>
                ))}
              </p>
            </div>
            <span className="mt-1 flex size-12 items-center justify-center rounded-full border border-border text-navy transition-all duration-300 group-hover:rotate-45 group-hover:border-ochre group-hover:bg-ochre group-hover:text-white sm:size-14">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </Link>
        ))}

        {/* Image qui suit le curseur */}
        <div
          className="pointer-events-none absolute top-0 left-0 z-20 hidden w-64 overflow-hidden rounded-2xl shadow-2xl transition-[opacity,scale] duration-300 lg:block"
          style={{
            transform: `translate3d(${pos.x + 40}px, ${pos.y - 130}px, 0) rotate(-4deg)`,
            opacity: hovered === null ? 0 : 1,
            scale: hovered === null ? "0.85" : "1",
          }}
          aria-hidden
        >
          <div className="relative aspect-[4/5]">
            {services.map((s, i) => (
              <img
                key={s.slug}
                src={s.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  hovered === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-sand">
                {hovered !== null ? services[hovered]?.titleShort : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Méthode (forage) ---------------------------- */

function MethodBorehole() {
  const { ref, progress } = useSectionProgress<HTMLOListElement>();
  return (
    <section className="bg-navy text-steel-light">
      <div className="contour-lines">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">
                02 — Notre méthode
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">
                Chaque projet est une coupe, que nous lisons couche par couche.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-steel">
                Cinq étapes, du besoin du maître d'ouvrage jusqu'à la réception des travaux. Faites
                défiler : le forage avance avec vous.
              </p>
              <div className="mt-10 flex items-end gap-4">
                <span className="font-display text-7xl leading-none font-bold text-sand tabular-nums sm:text-8xl">
                  {(progress * 10).toFixed(1)}
                </span>
                <span className="pb-2 font-mono text-sm text-steel/70">m de profondeur</span>
              </div>
            </Reveal>
          </div>

          <ol ref={ref} className="relative pl-14 sm:pl-20">
            <div className="absolute top-2 bottom-2 left-4 w-3 overflow-hidden rounded-full bg-navy-deep sm:left-7" aria-hidden>
              <div
                className="w-full rounded-full bg-gradient-to-b from-sand via-ochre to-earth"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
            {processSteps.map((step, i) => {
              const reached = progress >= i / (processSteps.length - 0.5);
              return (
                <li key={step.title} className="relative pb-14 last:pb-0">
                  <span
                    className={`absolute top-2 -left-[2.65rem] flex size-6 items-center justify-center rounded-full border-2 transition-colors duration-300 sm:-left-[3.4rem] ${
                      reached ? "border-sand bg-ochre" : "border-steel/40 bg-navy-deep"
                    }`}
                    aria-hidden
                  >
                    <span className={`size-1.5 rounded-full ${reached ? "bg-white" : "bg-steel/40"}`} />
                  </span>
                  <div className={`transition-opacity duration-500 ${reached ? "opacity-100" : "opacity-40"}`}>
                    <span className="font-mono text-sm text-sand">−{step.depth}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-steel">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Pourquoi LM2G : le rapport annoté --------------------- */

function ReportSection() {
  const [active, setActive] = useState(0);
  const Marker = ({ n }: { n: number }) => (
    <span
      className={`absolute -left-4 top-0 flex size-7 items-center justify-center rounded-full font-mono text-xs font-semibold text-white transition-all duration-300 ${
        active === n ? "scale-125 bg-ochre ring-4 ring-ochre/25" : "bg-navy"
      }`}
      aria-hidden
    >
      {n + 1}
    </span>
  );

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:px-8">
      {/* Document */}
      <Reveal>
        <div className="relative mx-auto max-w-md">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-sm bg-secondary" aria-hidden />
          <div className="relative -rotate-1 rounded-sm bg-white p-7 text-[#1A2233] shadow-2xl ring-1 ring-black/5 sm:p-9">
            <div className="flex items-start justify-between gap-4 border-b border-[#1A2233]/10 pb-4">
              <div>
                <p className="font-display text-2xl font-bold text-navy">
                  LM<span className="text-ochre">2</span>G
                </p>
                <p className="text-[10px] leading-tight text-[#5B6475]">
                  Laboratoire Marocain de Géotechnique
                  <br />& Génie Civil
                </p>
              </div>
              <p className="text-right font-mono text-[10px] text-[#5B6475]">
                PV N° 2026-0142
                <br />
                Page 1/1
              </p>
            </div>

            <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">
              Procès-verbal d'essai
            </p>

            <div className="relative mt-4">
              <Marker n={0} />
              <dl className="grid grid-cols-[6.5rem_1fr] gap-y-1.5 pl-5 text-xs">
                <dt className="text-[#5B6475]">Chantier</dt>
                <dd className="font-medium">Immeuble R+6 — Casablanca</dd>
                <dt className="text-[#5B6475]">Échantillon</dt>
                <dd className="font-mono">SC-01 · 2,0 – 2,5 m</dd>
                <dt className="text-[#5B6475]">Essai</dt>
                <dd className="font-medium">Proctor modifié</dd>
                <dt className="text-[#5B6475]">Norme</dt>
                <dd className={`font-mono transition-colors ${active === 0 ? "text-ochre" : ""}`}>NF P94-093</dd>
              </dl>
            </div>

            <div className="relative mt-6">
              <Marker n={1} />
              <div className="pl-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#5B6475]">Courbe Proctor</p>
                <svg viewBox="0 0 300 140" className="mt-2 w-full" aria-hidden>
                  <path d="M20 10 V130 H290" fill="none" stroke="#1A2233" strokeOpacity="0.3" />
                  {[60, 100, 140, 180, 220, 260].map((x) => (
                    <line key={x} x1={x} y1="128" x2={x} y2="132" stroke="#1A2233" strokeOpacity="0.3" />
                  ))}
                  <path d="M20 20 H144 V130" fill="none" stroke="#8B6428" strokeDasharray="4 4" strokeOpacity="0.7" />
                  <path
                    d="M24 118 C70 52 104 24 144 20 S226 46 286 112"
                    fill="none"
                    stroke="#283F6B"
                    strokeWidth="2.5"
                    className="report-curve"
                  />
                  {[
                    [40, 92],
                    [80, 47],
                    [144, 20],
                    [205, 34],
                    [260, 84],
                  ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#283F6B" />
                  ))}
                  <circle cx="144" cy="20" r="6" fill="#8B6428" />
                  <text x="292" y="138" fontSize="8" textAnchor="end" fill="#5B6475">w (%)</text>
                  <text x="24" y="8" fontSize="8" fill="#5B6475">γd</text>
                </svg>
              </div>
            </div>

            <div className="relative mt-5">
              <Marker n={2} />
              <div className="grid grid-cols-2 gap-3 pl-5">
                {[
                  { k: "γd max", v: "1,98 t/m³" },
                  { k: "w opt", v: "9,5 %" },
                ].map((r) => (
                  <div key={r.k} className={`rounded-md border px-3 py-2 transition-colors ${active === 2 ? "border-ochre bg-ochre/5" : "border-[#1A2233]/10"}`}>
                    <p className="font-mono text-[10px] text-[#5B6475]">{r.k}</p>
                    <p className="font-display text-lg font-bold text-navy">{r.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-6 flex items-end justify-between border-t border-[#1A2233]/10 pt-4">
              <Marker n={3} />
              <div className="pl-5">
                <svg viewBox="0 0 120 40" className="h-8 w-24" aria-hidden>
                  <path
                    d="M4 30 C14 6 22 34 32 18 S48 6 54 26 S72 34 80 14 S100 20 116 22"
                    fill="none"
                    stroke="#283F6B"
                    strokeWidth="1.8"
                  />
                </svg>
                <p className="text-[10px] text-[#5B6475]">Ingénieur responsable</p>
              </div>
              <span className="-rotate-12 rounded border-2 border-ochre px-3 py-1 font-mono text-xs font-bold tracking-widest text-ochre">
                CONFORME
              </span>
            </div>

            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-[#5B6475]/70">
              Document d'illustration
            </p>
          </div>
        </div>
      </Reveal>

      {/* Points */}
      <div>
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
            03 — Pourquoi LM2G
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
            Ce que vous recevez, c'est une décision fiable.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Une erreur sur le sol se paie toujours plus tard, et plus cher. Chacun de nos documents
            est pensé pour que vous puissiez décider et construire en confiance.
          </p>
        </Reveal>
        <ol className="mt-10 border-b border-border">
          {reportPoints.map((p, i) => (
            <li key={p.title}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full gap-5 border-t border-border py-5 text-left"
              >
                <span
                  className={`mt-0.5 font-mono text-sm transition-colors ${active === i ? "text-ochre" : "text-muted-foreground"}`}
                >
                  0{i + 1}
                </span>
                <span>
                  <span
                    className={`block font-display text-xl font-semibold transition-colors ${
                      active === i ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span
                    className={`grid transition-all duration-300 ${active === i ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <span className="overflow-hidden text-sm leading-relaxed text-muted-foreground">{p.text}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------- Chiffres en strates --------------------------- */

function StatsStrata() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
              04 — En chiffres
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
              Plus de dix ans, strate après strate.
            </h2>
          </div>
          <span className="rounded-full border border-dashed border-ochre px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ochre">
            Contenu exemple à remplacer
          </span>
        </div>
      </Reveal>
      <dl className="mt-12 overflow-hidden rounded-3xl">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div
              className={`strata-row grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-6 sm:grid-cols-[12rem_1fr_auto] sm:px-10 sm:py-8 ${strataStyles[i] ?? ""}`}
            >
              <span className="hidden font-mono text-[11px] uppercase tracking-widest opacity-70 sm:block">
                {stat.strate}
              </span>
              <dt className="text-sm font-semibold sm:text-base">{stat.label}</dt>
              <dd className="text-right font-display text-4xl leading-none font-bold tabular-nums sm:text-6xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

/* --------------------- Réalisations : défilement horizontal -------------------- */

function ProjectsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const on = () => setPinned(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!pinned) {
      setOffset(0);
      return;
    }
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        const p = clamp(-rect.top / total, 0, 1);
        const max = Math.max(0, track.scrollWidth - window.innerWidth);
        setProgress(p);
        setOffset(-p * max);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pinned]);

  const total = realisations.length;

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-deep text-white"
      style={pinned ? { height: `${100 + total * 45}vh` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20"}>
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">
              05 — Réalisations
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
              Des projets variés, une même rigueur.
            </h2>
          </div>
          <Link
            to="/realisations"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-sand hover:text-sand"
          >
            Toutes les réalisations
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className={pinned ? "mt-10" : "mt-10 snap-x snap-mandatory overflow-x-auto pb-4"}>
          <div
            ref={trackRef}
            className="flex w-max gap-6 px-4 sm:px-6 lg:px-8"
            style={pinned ? { transform: `translate3d(${offset}px, 0, 0)` } : undefined}
          >
            {realisations.map((r, i) => (
              <Link
                key={r.id}
                to="/realisations"
                className="group relative h-[26rem] w-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[26rem] lg:h-[58vh] lg:max-h-[36rem] lg:w-[34rem]"
              >
                <img
                  src={realisationImages[r.image] ?? siteAerial}
                  alt={r.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                <span className="absolute top-6 left-6 font-mono text-sm text-white/80">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition-colors group-hover:bg-ochre">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ochre px-3 py-1 text-xs font-semibold">{r.domaine}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-steel-light">
                      <MapPin className="size-3.5" aria-hidden />
                      {cleanLieu(r.lieu)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{r.titre}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-steel">{r.resume}</p>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <ul className="overflow-hidden text-sm text-steel-light">
                      {r.prestations.map((p) => (
                        <li key={p} className="mt-1.5 flex gap-2 first:mt-4">
                          <span className="text-sand">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
            <Link
              to="/realisations"
              className="group flex w-[70vw] shrink-0 snap-start flex-col justify-center gap-6 rounded-3xl border border-white/15 p-8 sm:w-[20rem]"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-ochre transition-transform group-hover:scale-110">
                <ArrowRight className="size-6" aria-hidden />
              </span>
              <span className="font-display text-3xl font-bold">
                Voir toutes
                <br />
                les réalisations
              </span>
            </Link>
          </div>
        </div>

        {pinned && (
          <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8" aria-hidden>
            <div className="h-px w-full bg-white/15">
              <div className="h-px bg-sand" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- Domaines -------------------------------- */

function DomainesExplorer() {
  const [active, setActive] = useState(0);
  const current = domaines[active] ?? domaines[0]!;
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
          06 — Domaines d'intervention
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-foreground sm:text-5xl">
          Sous chaque ouvrage, un sol à comprendre.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <ul className="divide-y divide-border border-y border-border" role="tablist" aria-label="Domaines d'intervention">
          {domaines.map((d, i) => {
            const isActive = i === active;
            return (
              <li key={d.label}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                >
                  <span className={`font-mono text-xs transition-colors ${isActive ? "text-ochre" : "text-muted-foreground"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
                      isActive ? "bg-ochre text-white" : "bg-secondary text-navy"
                    }`}
                  >
                    <d.icon className="size-5" aria-hidden />
                  </span>
                  <span
                    className={`flex-1 font-display text-lg font-semibold transition-all sm:text-2xl ${
                      isActive ? "translate-x-1 text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {d.label}
                  </span>
                  <ArrowRight
                    className={`size-5 transition-all ${isActive ? "translate-x-0 text-ochre opacity-100" : "-translate-x-2 opacity-0"}`}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative min-h-[24rem] overflow-hidden rounded-3xl bg-navy-deep text-white" role="tabpanel">
          {domaines.map((d, i) => (
            <img
              key={d.label}
              src={d.image}
              alt=""
              aria-hidden
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                i === active ? "scale-100 opacity-75" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
          <div className="relative flex h-full min-h-[24rem] flex-col justify-end p-7">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sand">
              Domaine {String(active + 1).padStart(2, "0")} / {String(domaines.length).padStart(2, "0")}
            </p>
            <h3 key={current.label} className="domain-fade mt-2 font-display text-3xl font-bold">
              {current.label}
            </h3>
            <p key={`${current.label}-t`} className="domain-fade mt-3 max-w-md text-sm leading-relaxed text-steel">
              {current.text}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-ochre"
            >
              Parler de mon projet
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

function FaqSection() {
  return (
    <section className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
              07 — Questions fréquentes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
              Vos questions, nos réponses.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              Une question précise sur votre terrain ou votre chantier ? Un ingénieur vous répond
              directement.
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ochre"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-ochre hover:text-ochre"
              >
                <Phone className="size-4" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="border-b border-border">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-t border-border">
                <AccordionTrigger className="gap-4 py-6 text-left font-display text-lg font-semibold text-foreground hover:text-ochre hover:no-underline sm:text-xl">
                  <span className="flex items-start gap-5">
                    <span className="mt-1 font-mono text-xs text-ochre">{String(i + 1).padStart(2, "0")}</span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-base leading-relaxed text-muted-foreground">
                  {item.reponse}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes lm2g-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.lm2g-marquee { animation: lm2g-marquee 60s linear infinite; }
.lm2g-marquee:hover { animation-play-state: paused; }
.marquee-mask { mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }

@keyframes lm2g-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.hero-rise { opacity: 0; animation: lm2g-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes lm2g-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.domain-fade { animation: lm2g-fade .45s ease-out both; }

.report-curve { stroke-dasharray: 400; stroke-dashoffset: 400; animation: lm2g-draw 2s .4s ease-out forwards; }
@keyframes lm2g-draw { to { stroke-dashoffset: 0; } }

.strata-row { position: relative; }
.strata-row::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: var(--ochre, #8B6428); transform: scaleY(0); transform-origin: top; transition: transform .4s ease;
}
.strata-row:hover::before { transform: scaleY(1); }

@media (prefers-reduced-motion: reduce) {
  .lm2g-marquee, .hero-rise, .domain-fade, .report-curve { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; }
  .strata-row::before { transition: none; }
}
`;