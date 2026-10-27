import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MapPin, X } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SoilCTA } from "@/components/ui/SoilCTA";
import { realisations, realisationsDomaines, type Realisation } from "@/data/realisations";
import concreteCubes from "@/assets/concrete-cubes.jpg";
import roadWorks from "@/assets/road-works.jpg";
import siteAerial from "@/assets/site-aerial.jpg";
import soilCores from "@/assets/soil-cores.jpg";
import buildingWorks from "@/assets/building-works.jpg";
import bridgeWorks from "@/assets/bridge-works.jpg";
import damSite from "@/assets/dam-site.jpg";
import industrialPlatform from "@/assets/industrial-platform.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — Projets géotechniques & contrôle qualité | LM2G" },
      {
        name: "description",
        content:
          "Projets menés par LM2G : routes et autoroutes, bâtiments, ouvrages d'art, barrages, plateformes industrielles et VRD. Études géotechniques, essais et contrôle qualité au Maroc.",
      },
      { property: "og:title", content: "Nos réalisations — Projets géotechniques au Maroc | LM2G" },
      {
        property: "og:description",
        content:
          "Routes, bâtiments, ouvrages d'art, barrages, industriel et VRD : un aperçu des projets accompagnés par LM2G, de l'étude à la réception.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Realisations,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

const images: Record<string, string> = {
  "road-works": roadWorks,
  "site-aerial": siteAerial,
  "soil-cores": soilCores,
  "concrete-cubes": concreteCubes,
  "building-works": buildingWorks,
  "bridge-works": bridgeWorks,
  "dam-site": damSite,
  "industrial-platform": industrialPlatform,
};
const imageOf = (r: Realisation) => images[r.image] ?? siteAerial;

const domainColors: Record<string, string> = {
  Bâtiment: "#8B6428",
  Routes: "#283F6B",
  "Ouvrages d'art": "#6B4F2A",
  "Barrages & hydraulique": "#3D5A80",
  VRD: "#523A1C",
  Industriel: "#5B6475",
};
const colorOf = (d: string) => domainColors[d] ?? "#283F6B";

type Filtre = "Tous" | (typeof realisationsDomaines)[number];

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function Realisations() {
  const [domaine, setDomaine] = useState<Filtre>("Tous");
  const [openId, setOpenId] = useState<string | null>(null);

  const visibles = useMemo(
    () => (domaine === "Tous" ? realisations : realisations.filter((r) => r.domaine === domaine)),
    [domaine],
  );
  const [featured, ...rest] = visibles;
  const hasExamples = realisations.some((r) => r.exemple);

  return (
    <>
      <style>{pageStyles}</style>
      <Hero />

      <section id="projets" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Filtres */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">Nos projets</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Filtrer par domaine
            </h2>
          </Reveal>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground">{visibles.length}</span> projet
            {visibles.length > 1 ? "s" : ""}
          </p>
        </div>
        <div role="tablist" aria-label="Filtrer par domaine" className="mt-6 flex flex-wrap gap-2">
          {(["Tous", ...realisationsDomaines] as Filtre[]).map((d) => {
            const isActive = domaine === d;
            const n = d === "Tous" ? realisations.length : realisations.filter((r) => r.domaine === d).length;
            if (n === 0) return null;
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setDomaine(d)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-card text-foreground hover:border-ochre hover:text-ochre"
                }`}
              >
                {d !== "Tous" && <span className="size-2 rounded-full" style={{ backgroundColor: colorOf(d) }} />}
                {d}
                <span className={`text-xs ${isActive ? "text-sand" : "text-muted-foreground"}`}>{n}</span>
              </button>
            );
          })}
        </div>

        {/* Projet à la une */}
        {featured && (
          <div key={`f-${domaine}`} className="rz-in mt-10">
            <FeaturedCard project={featured} onOpen={() => setOpenId(featured.id)} />
          </div>
        )}

        {/* Grille */}
        {rest.length > 0 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((r, i) => (
              <div key={`${domaine}-${r.id}`} className="rz-in" style={{ animationDelay: `${(i + 1) * 70}ms` }}>
                <ProjectCard project={r} onOpen={() => setOpenId(r.id)} />
              </div>
            ))}
          </div>
        )}

        {hasExamples && (
          <p className="mt-10 rounded-xl border border-dashed border-ochre/50 px-4 py-3 text-center text-xs text-muted-foreground">
            Projets présentés à titre illustratif, en attendant la publication des références de LM2G.
          </p>
        )}
      </section>

      <Approach />

      <SoilCTA
        eyebrow="Votre projet"
        title="Le prochain"
        highlight="dossier, c'est le vôtre."
        text="Contrôle qualité, études ou expertise : décrivez-nous votre chantier, nous proposons une intervention adaptée."
        image={damSite}
      />

      {openId && (
        <CaseModal
          list={visibles.length ? visibles : realisations}
          openId={openId}
          setOpenId={setOpenId}
        />
      )}
    </>
  );
}

/* ---------------------------------- Hero ----------------------------------- */

function Hero() {
  const domainesCount = new Set(realisations.map((r) => r.domaine)).size;
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={damSite}
        alt="Remblai compacté d'un barrage en construction"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="rz-zoom absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-deep to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 lg:px-8 lg:pt-44 lg:pb-16">
        <nav aria-label="Fil d'Ariane" className="rz-rise font-mono text-[11px] uppercase tracking-widest text-steel/70">
          <Link to="/" className="transition-colors hover:text-sand">
            Accueil
          </Link>
          <span className="mx-2 text-steel/40">/</span>
          <span className="text-sand">Réalisations</span>
        </nav>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="rz-rise block" style={{ animationDelay: "80ms" }}>
            Des chantiers,
          </span>
          <span className="rz-rise block text-sand" style={{ animationDelay: "180ms" }}>
            des sols, des preuves.
          </span>
        </h1>
        <p className="rz-rise mt-7 max-w-xl text-lg leading-relaxed text-steel" style={{ animationDelay: "280ms" }}>
          Autoroutes, bâtiments, ouvrages d'art, barrages ou lotissements : chaque projet bénéficie de la
          même exigence, de l'étude à la réception.
        </p>

        <div className="rz-rise mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6" style={{ animationDelay: "380ms" }}>
          <dl className="flex gap-10">
            <div>
              <dd className="font-display text-4xl font-bold text-sand">{String(realisations.length).padStart(2, "0")}</dd>
              <dt className="text-sm text-steel">projets présentés</dt>
            </div>
            <div>
              <dd className="font-display text-4xl font-bold text-sand">{String(domainesCount).padStart(2, "0")}</dd>
              <dt className="text-sm text-steel">domaines d'intervention</dt>
            </div>
          </dl>
          <a
            href="#projets"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-sand hover:text-sand"
          >
            Parcourir les projets
            <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Cartes ---------------------------------- */

function DomainBadge({ domaine, light = false }: { domaine: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        light ? "bg-white/15 text-white backdrop-blur-sm" : "text-white"
      }`}
      style={light ? undefined : { backgroundColor: colorOf(domaine) }}
    >
      {light && <span className="size-2 rounded-full" style={{ backgroundColor: colorOf(domaine) }} />}
      {domaine}
    </span>
  );
}

function FeaturedCard({ project, onOpen }: { project: Realisation; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group grid w-full overflow-hidden rounded-3xl bg-navy-deep text-left text-white lg:grid-cols-[1.4fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[28rem]">
        <img
          src={imageOf(project)}
          alt={project.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-5 left-5 rounded-full bg-ochre px-3 py-1 text-xs font-semibold">À la une</span>
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <DomainBadge domaine={project.domaine} light />
          <span className="flex items-center gap-1 text-sm text-steel">
            <MapPin className="size-4" aria-hidden />
            {project.lieu}
          </span>
        </div>
        <h3 className="mt-5 font-display text-3xl leading-tight font-bold sm:text-4xl">{project.titre}</h3>
        <p className="mt-4 leading-relaxed text-steel-light">{project.resume}</p>
        <ul className="mt-6 space-y-2.5">
          {project.prestations.map((p) => (
            <li key={p} className="flex gap-3 text-sm text-steel-light">
              <Check className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-sand">
          Ouvrir le dossier
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </button>
  );
}

function ProjectCard({ project, onOpen }: { project: Realisation; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-navy-deep text-left text-white sm:aspect-[4/5]"
    >
      <img
        src={imageOf(project)}
        alt={project.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent" />
      <span className="absolute top-4 left-4">
        <DomainBadge domaine={project.domaine} />
      </span>
      <span className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors group-hover:bg-ochre">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="flex items-center gap-1 text-sm text-steel-light">
          <MapPin className="size-4" aria-hidden />
          {project.lieu}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-bold">{project.titre}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel">{project.resume}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sand opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Ouvrir le dossier
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </div>
    </button>
  );
}

/* ------------------------------ Dossier (modal) ---------------------------- */

function CaseModal({
  list,
  openId,
  setOpenId,
}: {
  list: Realisation[];
  openId: string;
  setOpenId: (id: string | null) => void;
}) {
  const index = Math.max(0, list.findIndex((r) => r.id === openId));
  const project = list[index] ?? list[0];
  const total = list.length;

  const go = useCallback(
    (delta: number) => {
      const next = list[(index + delta + total) % total];
      if (next) setOpenId(next.id);
    },
    [index, list, setOpenId, total],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, setOpenId]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={project.titre}>
      <button type="button" className="rz-fade absolute inset-0 bg-navy-deep/70" onClick={() => setOpenId(null)} aria-label="Fermer" />

      <article key={project.id} className="rz-modal relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl">
        <div className="overflow-y-auto">
          {/* En-tête image */}
          <header className="relative aspect-[16/9] text-white sm:aspect-[21/9]">
            <img src={imageOf(project)} alt={project.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
            <button
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Fermer le dossier"
              className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-navy-deep/60 backdrop-blur transition-colors hover:bg-ochre"
            >
              <X className="size-5" aria-hidden />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="font-mono text-xs text-white/70">
                Dossier {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-3xl leading-tight font-bold sm:text-5xl">{project.titre}</h2>
            </div>
          </header>

          {/* Corps */}
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="text-lg leading-relaxed text-foreground">{project.resume}</p>

              <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Déroulement de la mission
              </h3>
              <ol className="relative mt-4 space-y-5 border-l-2 border-border pl-6">
                {project.details.map((d, i) => (
                  <li key={d} className="relative">
                    <span className="absolute top-0.5 -left-[2.05rem] flex size-6 items-center justify-center rounded-full bg-ochre text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="space-y-5">
              <dl className="overflow-hidden rounded-2xl border border-border">
                {[
                  { k: "Domaine", v: <DomainBadge domaine={project.domaine} /> },
                  { k: "Localisation", v: project.lieu },
                  { k: "Prestations", v: `${project.prestations.length} interventions` },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0">
                    <dt className="text-sm text-muted-foreground">{row.k}</dt>
                    <dd className="text-right text-sm font-semibold text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="rounded-2xl bg-secondary p-5">
                <h3 className="font-display font-semibold text-foreground">Prestations réalisées</h3>
                <ul className="mt-3 space-y-2.5">
                  {project.prestations.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-ochre" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/contact"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-navy p-5 text-white transition-colors hover:bg-ochre"
              >
                <span>
                  <span className="block text-xs text-white/70">Un projet similaire ?</span>
                  <span className="font-display font-semibold">Demander un devis</span>
                </span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>

              {project.exemple && (
                <p className="text-xs text-muted-foreground">Projet présenté à titre illustratif.</p>
              )}
            </aside>
          </div>
        </div>

        {/* Navigation */}
        {total > 1 && (
          <footer className="flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">Précédent</span>
            </button>
            <div className="flex gap-1.5" aria-hidden>
              {list.map((r, i) => (
                <span key={r.id} className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-ochre" : "w-1.5 bg-border"}`} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </footer>
        )}
      </article>
    </div>
  );
}

/* ------------------------------- Notre approche ----------------------------- */

function Approach() {
  const steps = [
    { n: "01", t: "Comprendre le site", d: "Visite, données existantes et reconnaissance adaptée à l'ouvrage." },
    { n: "02", t: "Mesurer", d: "Sondages, essais in situ et essais de laboratoire normalisés." },
    { n: "03", t: "Recommander", d: "Un rapport clair, avec des prescriptions directement applicables." },
    { n: "04", t: "Contrôler", d: "Un suivi sur chantier jusqu'à la réception des travaux." },
  ];
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">Ce qu'ils ont en commun</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Des ouvrages différents, <span className="text-ochre">une même méthode.</span>
          </h2>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-ochre"
          >
            Découvrir nos services
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <li className="border-t-2 border-ochre/40 pt-5">
                <span className="font-display text-3xl font-bold text-ochre">{s.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{s.t}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes rz-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.rz-rise { opacity: 0; animation: rz-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes rz-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
.rz-zoom { animation: rz-zoom 2.4s cubic-bezier(.2,.7,.2,1) both; }

@keyframes rz-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.rz-in { animation: rz-in .5s cubic-bezier(.2,.7,.2,1) both; }

@keyframes rz-fade { from { opacity: 0; } to { opacity: 1; } }
.rz-fade { animation: rz-fade .3s ease-out both; }

@keyframes rz-modal { from { opacity: 0; transform: translateY(24px) scale(.98); } to { opacity: 1; transform: none; } }
.rz-modal { animation: rz-modal .4s cubic-bezier(.2,.7,.2,1) both; }

@media (prefers-reduced-motion: reduce) {
  .rz-rise, .rz-zoom, .rz-in, .rz-fade, .rz-modal { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;