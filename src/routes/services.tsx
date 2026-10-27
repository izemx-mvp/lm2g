import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { services } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "Services — Études géotechniques, essais, contrôle qualité | LM2G",
      },
      {
        name: "description",
        content:
          "Quatre expertises complémentaires : études géotechniques G1 à G5, essais de laboratoire, contrôle qualité sur chantier et expertise & assistance technique.",
      },
      {
        property: "og:title",
        content: "Nos services — Études, essais, contrôle qualité & expertise | LM2G",
      },
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

function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep text-white">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand">Services</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-bold sm:text-5xl">
              Quatre expertises, une seule exigence : la fiabilité
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-steel">
              De la reconnaissance du site à la réception des travaux, nous couvrons toute la chaîne
              géotechnique avec des prestations articulées entre elles.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:gap-14">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <article
                className={
                  "grid overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:grid-cols-2 " +
                  (i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "")
                }
              >
                <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    width={1920}
                    height={1088}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
                    {String(i + 1).padStart(2, "0")} · {s.titleShort}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.tagline}</p>
                  <ul className="mt-5 space-y-2">
                    {s.prestations.slice(0, 4).map((p) => (
                      <li key={p.title} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ochre" aria-hidden />
                        {p.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre"
                  >
                    Détails de la prestation
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Quelle prestation correspond à votre besoin ?"
        text="Décrivez-nous votre projet et son stade d'avancement : nous vous orientons vers la bonne mission, sans survente."
      />
    </>
  );
}
