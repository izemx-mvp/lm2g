import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";

import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { realisations, realisationsDomaines } from "@/data/realisations";
import concreteCubes from "@/assets/concrete-cubes.jpg";
import roadWorks from "@/assets/road-works.jpg";
import siteAerial from "@/assets/site-aerial.jpg";
import soilCores from "@/assets/soil-cores.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      {
        title: "Réalisations — Projets géotechniques & contrôle qualité | LM2G",
      },
      {
        name: "description",
        content:
          "Projets menés par LM2G : routes et autoroutes, bâtiments, barrages, plateformes industrielles et VRD. Études géotechniques, essais et contrôle qualité au Maroc.",
      },
      {
        property: "og:title",
        content: "Nos réalisations — Projets géotechniques au Maroc | LM2G",
      },
      {
        property: "og:description",
        content:
          "Routes, bâtiments, barrages, industriel et VRD : un aperçu des projets accompagnés par LM2G, de l'étude à la réception.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Realisations,
});

const realisationImages: Record<string, string> = {
  "road-works": roadWorks,
  "site-aerial": siteAerial,
  "soil-cores": soilCores,
  "concrete-cubes": concreteCubes,
};

function Realisations() {
  const [domaine, setDomaine] = useState<string>("Tous");
  const visibles =
    domaine === "Tous" ? realisations : realisations.filter((r) => r.domaine === domaine);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep text-white">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand">
              Réalisations
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-bold sm:text-5xl">
              Des projets variés, une même rigueur
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-steel">
              Autoroutes, bâtiments, barrages, plateformes industrielles ou lotissements : chaque
              projet bénéficie du même niveau d'exigence, quelle que soit sa taille.
            </p>
          </div>
        </div>
      </section>

      {/* Filtre + liste */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div
            role="tablist"
            aria-label="Filtrer les réalisations par domaine"
            className="flex flex-wrap gap-2"
          >
            {(["Tous", ...realisationsDomaines] as const).map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={domaine === d}
                onClick={() => setDomaine(d)}
                className={
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors " +
                  (domaine === d
                    ? "bg-primary text-primary-foreground hover:bg-ochre"
                    : "border border-border bg-card text-foreground hover:border-ochre hover:text-ochre")
                }
              >
                {d}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((r, i) => (
            <Reveal key={r.id} delay={Math.min(i, 6) * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card card-lift hover:-translate-y-1 hover:border-ochre hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={realisationImages[r.image] ?? siteAerial}
                    alt={r.imageAlt}
                    width={1920}
                    height={1088}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy">
                      {r.domaine}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" aria-hidden />
                      {r.lieu.split("(")[0].trim()}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
                    {r.titre}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.resume}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {r.prestations.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-xs text-foreground/80"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ochre" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-wider text-ochre">
            Projets illustratifs — contenu exemple à remplacer
          </p>
        </Reveal>
      </section>

      <StrataDivider top="var(--background)" bottom="var(--navy)" />

      {/* Rassurance */}
      <section className="bg-navy text-steel-light">
        <div className="contour-lines">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Et votre projet, comment l'aborderions-nous ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-steel">
                Chaque projet commence par une écoute : le stade d'avancement, les contraintes du
                site, les exigences du marché. Ensuite, une méthode éprouvée.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sand hover:text-earth"
                >
                  Découvrir notre méthode
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-steel/40 px-6 py-3 text-sm font-semibold text-steel-light transition-colors hover:border-sand hover:text-sand"
                >
                  Discuter de votre projet
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Un chantier à sécuriser ? Parlons-en."
        text="Contrôle qualité, études ou expertise : décrivez-nous votre besoin, nous proposons une intervention adaptée."
      />
    </>
  );
}
