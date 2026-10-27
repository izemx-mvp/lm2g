import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  DraftingCompass,
  HardHat,
  MapPin,
  SearchCheck,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SoilCTA } from "@/components/ui/SoilCTA";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { services, type Service } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Études géotechniques, essais, contrôle qualité | LM2G" },
      {
        name: "description",
        content:
          "Quatre expertises complémentaires : études géotechniques G1 à G5, essais de laboratoire, contrôle qualité sur chantier et expertise & assistance technique.",
      },
      { property: "og:title", content: "Nos services — Études, essais, contrôle qualité & expertise | LM2G" },
      {
        property: "og:description",
        content:
          "Études géotechniques, essais de laboratoire, contrôle qualité chantier et expertise technique pour vos projets au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

const phases = ["Faisabilité", "Conception", "Exécution", "Réception", "Exploitation"];

/** Position de chaque service dans le cycle de vie d'un projet (index de phases, fin exclue). */
const timeline: Record<string, { start: number; end: number; color: string; marks: string[]; dashed?: boolean }> = {
  "etudes-geotechniques": { start: 0, end: 3, color: "#283F6B", marks: ["G1", "G2", "G3"] },
  "essais-laboratoire": { start: 1, end: 4, color: "#8B6428", marks: ["Identification", "Matériaux", "Contrôles"] },
  "controle-qualite": { start: 2, end: 4, color: "#6B4F2A", marks: ["Compactage · béton", "PV de réception"] },
  "expertise-assistance": { start: 0, end: 5, color: "#A88A5E", marks: ["AMO tout au long du projet", "G5"], dashed: true },
};

const situations = [
  {
    id: "terrain",
    icon: MapPin,
    label: "Je vais acheter un terrain",
    mission: "Mission G1",
    text: "Avant d'acheter ou de lancer les études, une reconnaissance préliminaire identifie les risques du site : nature des sols, présence d'eau, zones à éviter. Une petite dépense qui évite les mauvaises surprises.",
    services: ["etudes-geotechniques"],
  },
  {
    id: "conception",
    icon: DraftingCompass,
    label: "Je conçois mon projet",
    mission: "Mission G2 + essais",
    text: "Au stade de la conception, l'étude G2 établit le modèle géotechnique et les principes de fondation, sur la base de sondages et d'essais de laboratoire. C'est elle qui sécurise le dimensionnement.",
    services: ["etudes-geotechniques", "essais-laboratoire"],
  },
  {
    id: "chantier",
    icon: HardHat,
    label: "Mon chantier démarre",
    mission: "Contrôle qualité + G3",
    text: "Pendant les travaux, nous vérifions les fonds de fouilles, le compactage et les bétons livrés, et adaptons le projet géotechnique aux conditions réellement rencontrées.",
    services: ["controle-qualite", "essais-laboratoire"],
  },
  {
    id: "desordres",
    icon: SearchCheck,
    label: "Mon ouvrage présente des désordres",
    mission: "Diagnostic G5",
    text: "Fissures, tassements, désordres de chaussée : un diagnostic identifie la cause géotechnique, puis hiérarchise les solutions de reprise ou de renforcement.",
    services: ["expertise-assistance"],
  },
];

const bySlug = (slug: string): Service | undefined => services.find((s) => s.slug === slug);

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function Services() {
  return (
    <>
      <style>{pageStyles}</style>
      <LifecycleHero />
      <SituationFinder />
      <StrataDivider top="var(--background)" bottom="var(--navy)" />
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">
              03 — Nos expertises en détail
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-white sm:text-5xl">
              Ce que nous faisons, <span className="text-sand">et ce que vous recevez.</span>
            </h2>
          </Reveal>
        </div>
      </section>
      <ServiceChapters />
      <SoilCTA
        eyebrow="Besoin d'un avis ?"
        title="Pas sûr de la"
        highlight="bonne mission ?"
        text="Décrivez-nous votre projet et son stade d'avancement : nous vous orientons vers la bonne mission, sans survente."
      />
    </>
  );
}

/* --------------------------- Hero : cycle de vie --------------------------- */

function LifecycleHero() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div className="contour-lines absolute inset-0 -z-10 opacity-50" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-40">
        <nav aria-label="Fil d'Ariane" className="sv-rise font-mono text-[11px] uppercase tracking-widest text-steel/70">
          <Link to="/" className="transition-colors hover:text-sand">
            Accueil
          </Link>
          <span className="mx-2 text-steel/40">/</span>
          <span className="text-sand">Services</span>
        </nav>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="sv-rise block" style={{ animationDelay: "80ms" }}>
            Quatre expertises.
          </span>
          <span className="sv-rise block text-sand" style={{ animationDelay: "180ms" }}>
            Un seul fil : votre sol.
          </span>
        </h1>
        <p className="sv-rise mt-7 max-w-2xl text-lg leading-relaxed text-steel" style={{ animationDelay: "280ms" }}>
          De la faisabilité à l'exploitation, chaque étape de votre projet appelle une intervention
          précise. Voici où nous intervenons.
        </p>

        {/* Diagramme de Gantt */}
        <div className="sv-rise mt-14" style={{ animationDelay: "380ms" }}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-steel/60">
            01 — Le cycle de vie de votre projet
          </p>
          <div className="mt-4 overflow-x-auto pb-2 [scrollbar-width:none]">
            <div className="min-w-[760px] rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
              {/* Phases */}
              <div className="grid grid-cols-[13rem_1fr] gap-4">
                <span />
                <div className="grid grid-cols-5">
                  {phases.map((p, i) => (
                    <div key={p} className="border-l border-white/10 pl-3 first:border-l-0 first:pl-0">
                      <span className="font-mono text-[10px] text-sand">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-sm font-semibold text-steel-light">{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barres */}
              <ul className="mt-5 space-y-3" onMouseLeave={() => setHovered(null)}>
                {services.map((s, i) => {
                  const t = timeline[s.slug];
                  if (!t) return null;
                  const dim = hovered !== null && hovered !== s.slug;
                  return (
                    <li
                      key={s.slug}
                      onMouseEnter={() => setHovered(s.slug)}
                      className={`grid grid-cols-[13rem_1fr] items-center gap-4 transition-opacity duration-300 ${
                        dim ? "opacity-35" : "opacity-100"
                      }`}
                    >
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group flex items-center gap-2 text-sm font-semibold text-white"
                      >
                        <span className="font-mono text-xs text-steel/60">0{i + 1}</span>
                        <span className="transition-colors group-hover:text-sand">{s.titleShort}</span>
                      </Link>
                      <div className="relative h-11">
                        <div className="absolute inset-0 grid grid-cols-5" aria-hidden>
                          {phases.map((p) => (
                            <span key={p} className="border-l border-white/5 first:border-l-0" />
                          ))}
                        </div>
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className={`gantt-bar absolute inset-y-1 flex items-center gap-4 overflow-hidden rounded-full px-4 text-xs font-semibold whitespace-nowrap shadow-lg transition-transform hover:scale-y-110 ${
                            t.dashed ? "border-2 border-dashed" : ""
                          }`}
                          style={{
                            left: `${(t.start / phases.length) * 100}%`,
                            width: `${((t.end - t.start) / phases.length) * 100}%`,
                            backgroundColor: t.dashed ? "transparent" : t.color,
                            borderColor: t.dashed ? t.color : undefined,
                            color: t.dashed ? t.color : "#fff",
                            animationDelay: `${600 + i * 150}ms`,
                          }}
                          aria-label={`${s.title} : de ${phases[t.start]} à ${phases[t.end - 1]}`}
                        >
                          {t.marks.map((m, j) => (
                            <span key={m} className="flex items-center gap-4">
                              {j > 0 && <span className="opacity-50">·</span>}
                              {m}
                            </span>
                          ))}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Sélecteur : où en est le projet ------------------- */

function SituationFinder() {
  const [activeId, setActiveId] = useState(situations[0]?.id ?? "");
  const active = situations.find((s) => s.id === activeId) ?? situations[0]!;
  const recommended = active.services.map(bySlug).filter((s): s is Service => Boolean(s));
  const firstSlug = recommended[0]?.slug ?? "";

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
          02 — Où en est votre projet ?
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-foreground sm:text-5xl">
          Dites-nous où vous en êtes, <span className="text-ochre">nous vous disons par où commencer.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
        {/* Choix */}
        <div className="grid gap-3" role="tablist" aria-label="Situation de votre projet">
          {situations.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(s.id)}
                className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-navy bg-navy text-white shadow-xl shadow-navy/20"
                    : "border-border bg-card text-foreground hover:border-ochre"
                }`}
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-ochre text-white" : "bg-secondary text-navy group-hover:bg-ochre group-hover:text-white"
                  }`}
                >
                  <s.icon className="size-5" aria-hidden />
                </span>
                <span className="flex-1 font-display text-lg font-semibold">{s.label}</span>
                <ArrowRight
                  className={`size-5 transition-all ${isActive ? "translate-x-0 text-sand opacity-100" : "-translate-x-2 opacity-0"}`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        {/* Recommandation */}
        <div key={active.id} role="tabpanel" className="sv-panel relative overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-10">
          <span
            className="pointer-events-none absolute -top-4 -right-2 font-display text-[9rem] leading-none font-bold text-secondary select-none"
            aria-hidden
          >
            {String(situations.indexOf(active) + 1).padStart(2, "0")}
          </span>
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-ochre/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-ochre">
              Recommandation · {active.mission}
            </span>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground">{active.text}</p>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {recommended.length > 1 ? "Prestations concernées" : "Prestation concernée"}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {recommended.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border p-2 pr-4 transition-colors hover:border-ochre"
                >
                  <img src={s.image} alt="" aria-hidden loading="lazy" className="size-16 shrink-0 rounded-xl object-cover" />
                  <span className="flex-1 font-display font-semibold text-foreground transition-colors group-hover:text-ochre">
                    {s.titleShort}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-ochre" aria-hidden />
                </Link>
              ))}
            </div>

            <a
              href={`/contact?service=${firstSlug}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              Demander un devis pour cette mission
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Chapitres (scrollytelling) ---------------------- */

function ServiceChapters() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset["index"] ?? 0));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  const current = services[active] ?? services[0];

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        {/* Visuel fixe (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 flex h-[calc(100vh-8rem)] flex-col py-12">
            <div className="relative flex-1 overflow-hidden rounded-3xl">
              {services.map((s, i) => (
                <img
                  key={s.slug}
                  src={s.image}
                  alt={i === active ? s.imageAlt : ""}
                  aria-hidden={i !== active}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
                <span key={active} className="sv-panel font-display text-8xl leading-none font-bold text-sand">
                  0{active + 1}
                </span>
                <span className="pb-2 font-mono text-[10px] uppercase tracking-widest text-steel-light">
                  {current?.titleShort}
                </span>
              </div>
            </div>
            <ol className="mt-5 grid grid-cols-4 gap-2">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => scrollTo(i)}
                    className="group w-full text-left"
                    aria-label={`Aller à ${s.title}`}
                  >
                    <span className="block h-1 overflow-hidden rounded-full bg-white/15">
                      <span
                        className={`block h-full rounded-full bg-sand transition-all duration-500 ${
                          i <= active ? "w-full" : "w-0"
                        }`}
                      />
                    </span>
                    <span
                      className={`mt-2 block truncate text-xs font-semibold transition-colors ${
                        i === active ? "text-white" : "text-steel/60 group-hover:text-steel-light"
                      }`}
                    >
                      {s.titleShort}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Chapitres */}
        <div>
          {services.map((s, i) => (
            <article
              key={s.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className={`flex min-h-[85vh] flex-col justify-center py-14 transition-opacity duration-500 lg:py-20 ${
                i === active ? "lg:opacity-100" : "lg:opacity-35"
              } ${i > 0 ? "border-t border-white/10" : ""}`}
            >
              <img
                src={s.image}
                alt={s.imageAlt}
                loading="lazy"
                className="mb-8 aspect-[16/10] w-full rounded-2xl object-cover lg:hidden"
              />
              <p className="font-mono text-xs uppercase tracking-widest text-sand">
                0{i + 1} — {s.titleShort}
              </p>
              <h3 className="mt-3 font-display text-4xl leading-tight font-bold sm:text-5xl">{s.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-steel-light">{s.tagline}</p>
              {s.intro[0] && <p className="mt-4 leading-relaxed text-steel">{s.intro[0]}</p>}

              <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                {s.prestations.map((p, j) => (
                  <li key={p.title} className="flex gap-3 text-sm text-steel-light">
                    <span className="font-mono text-xs text-sand">{String(j + 1).padStart(2, "0")}</span>
                    {p.title}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-steel/60">Vous recevez</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <span key={d} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-steel-light">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group inline-flex items-center gap-2 rounded-lg bg-ochre px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sand hover:text-earth"
                >
                  Détails de la prestation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
                <a
                  href={`/contact?service=${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-sand hover:text-sand"
                >
                  Demander un devis
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes sv-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.sv-rise { opacity: 0; animation: sv-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes sv-grow { from { clip-path: inset(0 100% 0 0 round 999px); } to { clip-path: inset(0 0 0 0 round 999px); } }
.gantt-bar { animation: sv-grow 1s cubic-bezier(.2,.7,.2,1) both; }

@keyframes sv-panel { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.sv-panel { animation: sv-panel .45s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .sv-rise, .gantt-bar, .sv-panel { animation: none !important; opacity: 1 !important; clip-path: none !important; }
}
`;