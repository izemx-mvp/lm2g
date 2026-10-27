import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical, FileText } from "lucide-react";
import { useState } from "react";

import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { essaiCategories, essais } from "@/data/essais";

export const Route = createFileRoute("/essais")({
  head: () => ({
    meta: [
      {
        title: "Essais de laboratoire — Sols, granulats, bétons, enrobés | LM2G",
      },
      {
        name: "description",
        content:
          "Catalogue des essais normalisés du laboratoire LM2G : sols, granulats, bétons et mortiers, enrobés bitumineux et essais in situ, avec les normes NM, NF et EN.",
      },
      {
        property: "og:title",
        content: "Catalogue des essais — Sols, granulats, bétons, enrobés | LM2G",
      },
      {
        property: "og:description",
        content:
          "Essais normalisés sur sols, granulats, bétons et enrobés : granulométrie, Atterberg, Proctor, CBR, Los Angeles, compression…",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Essais,
});

function Essais() {
  const [categorie, setCategorie] = useState<string>("Tous");
  const visibles = categorie === "Tous" ? essais : essais.filter((e) => e.categorie === categorie);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep text-white">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand">Essais</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-bold sm:text-5xl">
              Un catalogue d'essais normalisés, tracés de bout en bout
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-steel">
              Sols, granulats, bétons et enrobés : chaque essai est réalisé selon une norme
              identifiée, de la réception de l'échantillon jusqu'au rapport signé.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div
            role="tablist"
            aria-label="Filtrer les essais par catégorie"
            className="flex flex-wrap gap-2"
          >
            {(["Tous", ...essaiCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={categorie === c}
                onClick={() => setCategorie(c)}
                className={
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors " +
                  (categorie === c
                    ? "bg-primary text-primary-foreground hover:bg-ochre"
                    : "border border-border bg-card text-foreground hover:border-ochre hover:text-ochre")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i, 6) * 0.04}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 card-lift hover:-translate-y-1 hover:border-ochre hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy">
                    {e.categorie}
                  </span>
                  <span className="font-mono text-xs font-semibold text-ochre">{e.norme}</span>
                </div>
                <h2 className="mt-4 flex items-start gap-2 font-display text-lg font-semibold text-foreground">
                  <FlaskConical className="mt-1 size-4 shrink-0 text-ochre" aria-hidden />
                  {e.nom}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {e.objet}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-dashed border-ochre/60 bg-secondary/50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Vous ne trouvez pas un essai dans cette liste ? Notre laboratoire couvre d'autres
                essais à la demande. Décrivez votre besoin et nous confirmons la faisabilité et la
                norme applicable.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre"
            >
              Demander un essai
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      <StrataDivider top="var(--background)" bottom="var(--navy)" />

      {/* Rassurance */}
      <section className="bg-navy text-steel-light">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl grid gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3 lg:px-8">
            <Reveal>
              <div className="h-full rounded-xl border border-steel/25 bg-navy-deep/60 p-6">
                <h2 className="font-display text-lg font-semibold text-white">Normes appliquées</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  Nos essais référencent les normes marocaines, françaises (NF) et européennes (EN)
                  en vigueur. La référence normative figure sur chaque rapport.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-xl border border-steel/25 bg-navy-deep/60 p-6">
                <h2 className="font-display text-lg font-semibold text-white">Traçabilité</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  Chaque échantillon est enregistré à sa réception avec son origine, sa date et son
                  état. Les résultats sont rattachés à ce dossier jusqu'au rapport signé.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="h-full rounded-xl border border-steel/25 bg-navy-deep/60 p-6">
                <h2 className="font-display text-lg font-semibold text-white">Délais annoncés</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  Le délai de chaque essai est annoncé au devis et tenu. Les résultats critiques sont
                  transmis dès leur validation, sans attendre le rapport complet.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Un programme d'essais à établir ?"
        text="Transmettez la nature de vos matériaux et les exigences du marché : nous composons le programme d'essais adapté, avec les délais et le budget."
      />
    </>
  );
}
