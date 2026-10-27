import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  DraftingCompass,
  Eye,
  FlaskConical,
  HardHat,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SoilCTA } from "@/components/ui/SoilCTA";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { site } from "@/config/site";
import heroRig from "@/assets/hero-rig.jpg";
import labTest from "@/assets/lab-test.jpg";
import soilCores from "@/assets/soil-cores.jpg";
import buildingWorks from "@/assets/building-works.jpg";
import labInterior from "@/assets/lab-interior.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — LM2G, laboratoire de géotechnique à Casablanca depuis 2014" },
      {
        name: "description",
        content:
          "Découvrez LM2G : une équipe d'ingénieurs et de techniciens géotechniciens au service du bâtiment et des routes au Maroc, depuis 2014.",
      },
      { property: "og:title", content: "À propos — LM2G, laboratoire de géotechnique à Casablanca" },
      {
        property: "og:description",
        content:
          "Une équipe d'ingénieurs et de techniciens géotechniciens au service du bâtiment et des routes au Maroc, depuis 2014.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: APropos,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

const LAYER_COLORS = ["#A88A5E", "#8B6428", "#6B4F2A", "#523A1C", "#2E2416"];
const LAYER_PATTERNS = [
  "radial-gradient(rgba(255,255,255,.22) 1px, transparent 1.6px) 0 0 / 12px 12px",
  "repeating-linear-gradient(0deg, transparent 0 9px, rgba(255,255,255,.16) 9px 10px)",
  "repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 1px, transparent 1px 9px)",
  "repeating-linear-gradient(90deg, rgba(255,255,255,.1) 0 1px, transparent 1px 14px), repeating-linear-gradient(0deg, rgba(255,255,255,.1) 0 1px, transparent 1px 14px)",
  "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.6px) 0 0 / 16px 16px",
];

/** La « carotte » du hero : chaque tronçon = un trait d'identité. */
const coreSegments = [
  { depth: "0,0 m", label: `Fondé en ${site.founded}`, grow: 1 },
  { depth: "1,5 m", label: "Casablanca", grow: 1 },
  { depth: "4,0 m", label: "Bâtiment · Routes · Ouvrages", grow: 1.6 },
  { depth: "7,0 m", label: "Laboratoire & terrain", grow: 1.3 },
  { depth: "10,0 m", label: "Tout le Maroc", grow: 1 },
];

const cultures = [
  {
    key: "lab",
    tag: "Culture 01 · Laboratoire",
    title: "La norme et la traçabilité commandent.",
    image: labTest,
    alt: "Technicienne réalisant un essai au laboratoire",
    items: [
      "Essais normalisés NM · NF · EN",
      "Échantillons tracés de la réception au procès-verbal",
      "Résultats interprétés par des ingénieurs",
    ],
  },
  {
    key: "site",
    tag: "Culture 02 · Chantier",
    title: "Le terrain impose réactivité et pragmatisme.",
    image: heroRig,
    alt: "Foreuse géotechnique en fonctionnement sur un chantier",
    items: [
      "Sondeurs et contrôleurs présents sur site",
      "Interventions dans tout le Royaume",
      "Dialogue direct avec les équipes d'exécution",
    ],
  },
] as const;

const valeurs = [
  {
    icon: ShieldCheck,
    title: "Rigueur normative",
    text: "Chaque essai suit une norme identifiée, chaque résultat est tracé, chaque rapport est signé et daté.",
  },
  {
    icon: Eye,
    title: "Indépendance",
    text: "Nos conclusions s'appuient sur les mesures, pas sur les convenances : un contrôle qui ne plaît pas toujours, mais qui protège toujours.",
  },
  {
    icon: Target,
    title: "Utilité pour l'ouvrage",
    text: "Un rapport qui ne sert pas à décider est un rapport inutile. Nous rédigeons pour que le maître d'ouvrage, le bureau d'études et l'entreprise agissent.",
  },
  {
    icon: Users,
    title: "Proximité chantier",
    text: "Nos contrôleurs sont sur le terrain, pas seulement au laboratoire : réactivité, présence et dialogue direct avec les équipes.",
  },
];

// CONTENU EXEMPLE À REMPLACER — dates intermédiaires à confirmer avec LM2G
const etapes = [
  {
    annee: "2014",
    titre: "Création du laboratoire",
    text: "Fondation de LM2G à Casablanca pour répondre aux besoins d'essais et d'études géotechniques du bâtiment.",
    confirmed: true,
  },
  {
    annee: "2017",
    titre: "Extension du parc d'essais",
    text: "Montée en puissance du laboratoire : mécanique des sols, granulats, bétons et enrobés sous un même toit.",
    confirmed: false,
  },
  {
    annee: "2020",
    titre: "Contrôle qualité à l'échelle du Royaume",
    text: "Déploiement des équipes de contrôle sur les chantiers routiers et les grands projets d'infrastructure.",
    confirmed: false,
  },
  {
    annee: "Aujourd'hui",
    titre: "Un partenaire de projet complet",
    text: "De l'étude de faisabilité à la réception : études, essais, contrôle et expertise sous une seule responsabilité.",
    confirmed: true,
  },
];

// CONTENU EXEMPLE À REMPLACER — parc d'équipements à valider avec le client
const equipements = [
  { nom: "Sondeuse géotechnique", domaine: "Terrain", essais: "Sondages carottés et destructifs, prélèvements" },
  { nom: "Pénétromètre dynamique", domaine: "In situ", essais: "Résistance de pointe, contrôle de densification" },
  { nom: "Pressiomètre Ménard", domaine: "In situ", essais: "Module pressiométrique, pression limite" },
  { nom: "Bâti œdométrique", domaine: "Sols", essais: "Compressibilité, calcul des tassements" },
  { nom: "Boîte de cisaillement", domaine: "Sols", essais: "Cohésion et angle de frottement" },
  { nom: "Moules Proctor & CBR", domaine: "Sols", essais: "Compactage, portance des plateformes" },
  { nom: "Machine Los Angeles", domaine: "Granulats", essais: "Résistance à la fragmentation" },
  { nom: "Presse de compression", domaine: "Bétons", essais: "Écrasement des éprouvettes à 7 et 28 jours" },
  { nom: "Étuves & séries de tamis", domaine: "Identification", essais: "Teneur en eau, granulométrie" },
];

const normes = [
  { code: "NM", label: "Normes marocaines" },
  { code: "NF", label: "Normes françaises" },
  { code: "EN", label: "Normes européennes" },
  { code: "ASTM", label: "Selon cahier des charges" },
];

const equipe = [
  {
    icon: DraftingCompass,
    title: "Ingénieurs géotechniciens",
    roles: ["Programmes de reconnaissance", "Interprétation et modèles géotechniques", "Recommandations de fondations"],
  },
  {
    icon: FlaskConical,
    title: "Laboratoire",
    roles: ["Techniciens d'essais", "Traçabilité des échantillons", "Procès-verbaux d'essais"],
  },
  {
    icon: HardHat,
    title: "Équipe terrain",
    roles: ["Sondeurs", "Contrôleurs de chantier", "Essais in situ"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function APropos() {
  return (
    <>
      <style>{pageStyles}</style>
      <CoreHero />
      <Histoire />
      <StrataDivider top="var(--background)" bottom="var(--navy)" />
      <DeuxCultures />
      <StrataDivider top="var(--navy)" bottom="var(--background)" flip />
      <Principes />
      <Parcours />
      <Laboratoire />
      <Equipe />
      <SoilCTA
        eyebrow="Travaillons ensemble"
        title="Construisons"
        highlight="sur des bases solides."
        text="Parlez-nous de votre projet : nous vous dirons honnêtement ce dont il a besoin, ni plus ni moins."
        image={soilCores}
      />
    </>
  );
}

/* ------------------------------ Hero : carotte ----------------------------- */

function CoreHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={soilCores}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" />
      <div className="contour-lines absolute inset-0 -z-10 opacity-40" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 lg:px-8 lg:pt-40">
        <nav aria-label="Fil d'Ariane" className="ap-rise font-mono text-[11px] uppercase tracking-widest text-steel/70">
          <Link to="/" className="transition-colors hover:text-sand">
            Accueil
          </Link>
          <span className="mx-2 text-steel/40">/</span>
          <span className="text-sand">À propos</span>
        </nav>
        <h1 className="mt-6 font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="ap-rise block" style={{ animationDelay: "80ms" }}>
            Né du terrain.
          </span>
          <span className="ap-rise block text-sand" style={{ animationDelay: "180ms" }}>
            Construit pour durer.
          </span>
        </h1>
        <p className="ap-rise mt-7 max-w-2xl text-lg leading-relaxed text-steel" style={{ animationDelay: "280ms" }}>
          Depuis {site.founded}, LM2G accompagne maîtres d'ouvrage, bureaux d'études et entreprises sur
          leurs projets de bâtiment, de routes et d'infrastructures au Maroc.
        </p>
      </div>

      {/* Carotte de sondage */}
      <div className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-steel/60">
            <span>Carotte SC-LM2G</span>
            <span>Lecture : gauche → droite</span>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8 [scrollbar-width:none]">
          <div className="mx-auto max-w-7xl min-w-[880px]">
            {/* Graduations */}
            <div className="relative h-5" aria-hidden>
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className={`absolute bottom-0 w-px bg-steel/40 ${i % 4 === 0 ? "h-3" : "h-1.5"}`}
                  style={{ left: `${(i / 24) * 100}%` }}
                />
              ))}
            </div>
            <ol className="core-tube flex h-24 overflow-hidden rounded-full ring-1 ring-white/15 sm:h-28">
              {coreSegments.map((seg, i) => (
                <li
                  key={seg.label}
                  className="core-seg relative flex flex-col justify-center border-r border-black/25 px-5 last:border-r-0"
                  style={{
                    flexGrow: seg.grow,
                    flexBasis: 0,
                    backgroundColor: LAYER_COLORS[i],
                    background: `${LAYER_PATTERNS[i]}, ${LAYER_COLORS[i]}`,
                    animationDelay: `${400 + i * 140}ms`,
                  }}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${i === 0 ? "text-earth/80" : "text-white/60"}`}>
                    −{seg.depth}
                  </span>
                  <span className={`mt-1 font-display text-base leading-tight font-semibold sm:text-lg ${i === 0 ? "text-earth" : "text-white"}`}>
                    {seg.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Histoire -------------------------------- */

function Histoire() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:px-8">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
            01 — Notre histoire
          </p>
          <blockquote className="relative mt-8">
            <span
              className="absolute -top-10 -left-2 font-display text-[9rem] leading-none text-sand/30 select-none"
              aria-hidden
            >
              “
            </span>
            <p className="relative font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-5xl">
              Trop d'ouvrages souffrent de pathologies qu'une étude de sol sérieuse aurait{" "}
              <span className="text-ochre">évitées.</span>
            </p>
            <footer className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              — Le constat fondateur de LM2G
            </footer>
          </blockquote>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p className="first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:font-bold first-letter:text-navy">
            LM2G — Laboratoire Marocain de Géotechnique et de Génie Civil — est né de ce constat.
            Nous avons bâti notre laboratoire pour changer les choses, essai après essai, chantier
            après chantier.
          </p>
          <p>
            Installés à Casablanca, nous conjuguons deux cultures : celle du laboratoire, où la norme
            et la traçabilité commandent, et celle du chantier, où les réalités du terrain imposent
            pragmatisme et réactivité. Nos ingénieurs font le lien entre les deux, de la
            reconnaissance du site jusqu'à la réception des travaux.
          </p>
          <p>
            Bâtiment, routes, ouvrages d'art, barrages, VRD ou projets industriels : quelle que soit
            la taille du projet, nous appliquons la même exigence — des données fiables, interprétées
            par des ingénieurs, restituées dans des documents qui servent à décider.
          </p>
        </div>
        <figure className="mt-10">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={buildingWorks}
              alt="Chantier de construction d'un immeuble à Casablanca"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-ochre" />
            Sous chaque ouvrage, un sol à comprendre
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Deux cultures ----------------------------- */

function DeuxCultures() {
  const [focus, setFocus] = useState<string | null>(null);
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">
            02 — Deux cultures
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-5xl">
            Le laboratoire et le chantier. <span className="text-sand">Nous parlons les deux langues.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative flex flex-col lg:h-[36rem] lg:flex-row" onMouseLeave={() => setFocus(null)}>
        {cultures.map((c, i) => {
          const grow = focus === null ? "lg:flex-1" : focus === c.key ? "lg:flex-[1.7]" : "lg:flex-[0.8]";
          return (
            <div
              key={c.key}
              onMouseEnter={() => setFocus(c.key)}
              className={`group relative min-h-[26rem] overflow-hidden transition-[flex-grow] duration-700 ease-out lg:min-h-0 ${grow}`}
            >
              <img
                src={c.image}
                alt={c.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20" />
              <div className={`relative flex h-full flex-col justify-end p-7 sm:p-10 ${i === 1 ? "lg:items-end lg:text-right" : ""}`}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-sand">{c.tag}</p>
                <h3 className="mt-3 max-w-md font-display text-2xl font-bold sm:text-4xl">{c.title}</h3>
                <ul className="mt-5 space-y-2 text-sm text-steel-light">
                  {c.items.map((item) => (
                    <li key={item} className={`flex gap-3 ${i === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <span className="text-sand">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Jonction */}
        <div
          className="pointer-events-none absolute top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 transition-[left] duration-700 ease-out lg:block"
          style={{ left: focus === "lab" ? "68%" : focus === "site" ? "32%" : "50%" }}
          aria-hidden
        >
          <div className="flex size-36 items-center justify-center rounded-full bg-ochre p-5 text-center shadow-2xl ring-8 ring-navy/60">
            <span className="font-display text-sm leading-tight font-semibold">
              Nos ingénieurs font le lien
            </span>
          </div>
        </div>
      </div>
      <div className="h-12 sm:h-16" />
    </section>
  );
}

/* --------------------------------- Principes ------------------------------- */

function Principes() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
          03 — Nos principes
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-foreground sm:text-5xl">
          Quatre principes, <span className="text-ochre">aucune exception.</span>
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3 lg:h-[26rem] lg:flex-row">
        {valeurs.map((v, i) => {
          const isOpen = open === i;
          return (
            <button
              key={v.title}
              type="button"
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              aria-expanded={isOpen}
              className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 ease-out lg:p-8 ${
                isOpen
                  ? "border-navy bg-navy text-white lg:flex-[3]"
                  : "border-border bg-card text-foreground hover:border-ochre lg:flex-1"
              }`}
            >
              <span
                className={`font-display text-6xl leading-none font-bold transition-colors lg:text-7xl ${
                  isOpen ? "text-sand" : "text-navy/15"
                }`}
              >
                0{i + 1}
              </span>

              <span className={`mt-6 block lg:mt-auto ${isOpen ? "" : "lg:hidden"}`}>
                <span className="flex items-center gap-3">
                  <v.icon className={`size-5 shrink-0 ${isOpen ? "text-sand" : "text-ochre"}`} aria-hidden />
                  <span className="font-display text-xl font-semibold sm:text-2xl">{v.title}</span>
                </span>
                <span className={`mt-3 block max-w-md text-sm leading-relaxed ${isOpen ? "text-steel-light" : "text-muted-foreground"}`}>
                  {v.text}
                </span>
              </span>

              {!isOpen && (
                <span className="absolute bottom-8 left-8 hidden rotate-180 font-display text-xl font-semibold whitespace-nowrap [writing-mode:vertical-rl] lg:block">
                  {v.title}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------------- Parcours -------------------------------- */

function Parcours() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
              04 — Notre parcours
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
              Dix ans de croissance, déposés couche après couche.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              Comme un sol se lit de la surface vers la profondeur, notre histoire se lit de nos débuts
              jusqu'à aujourd'hui.
            </p>
            <span className="mt-6 inline-block rounded-full border border-dashed border-ochre px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ochre">
              Dates intermédiaires à confirmer
            </span>
          </Reveal>
        </div>

        <ol>
          {etapes.map((e, i) => (
            <Reveal key={e.annee} delay={i * 0.06}>
              <li className="grid grid-cols-[4.5rem_1fr] gap-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
                <div
                  className={`flex flex-col items-center pt-6 ${i === 0 ? "rounded-t-2xl" : ""} ${
                    i === etapes.length - 1 ? "rounded-b-2xl pb-6" : ""
                  }`}
                  style={{
                    background: `${LAYER_PATTERNS[i]}, ${LAYER_COLORS[i]}`,
                  }}
                >
                  <span
                    className={`font-mono text-xs font-semibold ${i === 0 ? "text-earth" : "text-white"} ${
                      e.annee.length > 4 ? "rotate-180 [writing-mode:vertical-rl]" : ""
                    }`}
                  >
                    {e.annee}
                  </span>
                </div>
                <div className={`py-8 ${i < etapes.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-semibold text-foreground">{e.titre}</h3>
                    {!e.confirmed && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ochre">
                        À confirmer
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">{e.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- Laboratoire ------------------------------ */

function Laboratoire() {
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
                05 — Le laboratoire
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-foreground sm:text-5xl">
                Un parc d'essais complet, sous un même toit.
              </h2>
            </div>
            <span className="rounded-full border border-dashed border-ochre px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ochre">
              Contenu exemple à remplacer
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <figure className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl lg:min-h-[34rem]">
              <img
                src={labInterior}
                alt="Laboratoire d'essais géotechniques LM2G"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="font-mono text-[10px] uppercase tracking-widest text-sand">Inventaire</p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {equipements.length} familles d'équipements
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="grid grid-cols-[1fr_auto] border-b border-border bg-secondary/60 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:px-6">
                <span>Équipement · Essais associés</span>
                <span>Domaine</span>
              </div>
              <ul>
                {equipements.map((eq, i) => (
                  <li
                    key={eq.nom}
                    className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-l-2 border-b-border border-l-transparent px-5 py-4 transition-colors last:border-b-0 hover:border-l-ochre hover:bg-secondary/40 sm:px-6"
                  >
                    <div className="flex gap-4">
                      <span className="pt-0.5 font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground transition-colors group-hover:text-ochre">{eq.nom}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{eq.essais}</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-navy">
                      {eq.domaine}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/essais"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-ochre"
            >
              Voir le catalogue des essais
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Références normatives */}
      <div className="border-t border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {normes.map((n, i) => (
            <div
              key={n.code}
              className={`group py-10 ${i % 2 === 1 ? "border-l border-border pl-6" : ""} ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              } ${i > 1 ? "border-t border-border lg:border-t-0" : ""}`}
            >
              <span className="norme-outline block font-display text-6xl leading-none font-bold transition-colors group-hover:text-ochre sm:text-7xl">
                {n.code}
              </span>
              <span className="mt-3 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Équipe --------------------------------- */

function Equipe() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">06 — L'équipe</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-foreground sm:text-5xl">
          Une organisation pensée pour le projet, <span className="text-ochre">pas pour l'organigramme.</span>
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
          Ingénieurs et techniciens qualifiés, réunis autour d'une direction technique unique qui
          valide et signe chaque rapport.
        </p>
      </Reveal>

      <div className="mt-16">
        {/* Nœud racine */}
        <Reveal>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 rounded-2xl bg-navy px-6 py-5 text-white shadow-xl shadow-navy/20">
              <span className="flex size-11 items-center justify-center rounded-xl bg-ochre">
                <ClipboardCheck className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-xl font-semibold">Direction technique</p>
                <p className="text-sm text-steel">Validation et signature des rapports</p>
              </div>
            </div>
            <span className="h-12 w-px bg-border" aria-hidden />
          </div>
        </Reveal>

        {/* Branches */}
        <div className="relative grid gap-6 lg:grid-cols-3">
          <span className="absolute top-0 right-[16.66%] left-[16.66%] hidden h-px bg-border lg:block" aria-hidden />
          {equipe.map((pole, i) => (
            <Reveal key={pole.title} delay={i * 0.08}>
              <div className="relative flex flex-col items-center lg:pt-12">
                <span className="absolute top-0 left-1/2 hidden h-12 w-px bg-border lg:block" aria-hidden />
                <div className="group w-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-ochre">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-navy transition-colors group-hover:bg-ochre group-hover:text-white">
                      <pole.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">{pole.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-2 border-t border-border pt-4">
                    {pole.roles.map((r) => (
                      <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="text-ochre">—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes ap-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.ap-rise { opacity: 0; animation: ap-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

/* La carotte « sort » du tube, tronçon par tronçon */
@keyframes core-extract { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: none; } }
.core-seg { opacity: 0; animation: core-extract .7s cubic-bezier(.2,.7,.2,1) forwards; }
.core-seg::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,.28), transparent 38%, transparent 62%, rgba(0,0,0,.35));
}

.norme-outline { color: transparent; -webkit-text-stroke: 1.5px var(--navy, #283F6B); }
.group:hover .norme-outline { -webkit-text-stroke-color: var(--ochre, #8B6428); }

@media (prefers-reduced-motion: reduce) {
  .ap-rise, .core-seg { animation: none !important; opacity: 1 !important; }
}
`;