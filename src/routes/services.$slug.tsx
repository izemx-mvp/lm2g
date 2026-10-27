import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, FlaskConical } from "lucide-react";
import type { ErrorComponentProps } from "@tanstack/react-router";

import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.metaTitle },
      { name: "description", content: loaderData.metaDescription },
      { property: "og:title", content: loaderData.metaTitle },
      { property: "og:description", content: loaderData.metaDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServiceDetail,
  errorComponent: ServiceError,
  notFoundComponent: ServiceNotFound,
});

function ServiceError({ error, reset }: ErrorComponentProps) {
  console.error(error);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Cette page n'a pas pu être chargée
      </h1>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre"
      >
        Réessayer
      </button>
    </div>
  );
}

function ServiceNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="font-mono text-sm text-ochre">Erreur 404</p>
      <h1 className="font-display text-3xl font-bold text-foreground">Service introuvable</h1>
      <p className="max-w-md text-muted-foreground">
        Cette prestation n'existe pas ou a été renommée. Consultez la liste de nos services pour
        trouver ce que vous cherchez.
      </p>
      <Link
        to="/services"
        className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre"
      >
        Voir tous nos services
      </Link>
    </div>
  );
}

function ServiceDetail() {
  const service = Route.useLoaderData();
  const autres = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="font-mono text-xs text-steel">
            <Link to="/" className="hover:text-sand">
              Accueil
            </Link>
            <span className="mx-2 text-sand">/</span>
            <Link to="/services" className="hover:text-sand">
              Services
            </Link>
            <span className="mx-2 text-sand">/</span>
            <span className="text-sand">{service.titleShort}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-bold sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-steel">{service.tagline}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              {service.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <FileText className="size-5 text-ochre" aria-hidden />
                Livrables
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ochre" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <StrataDivider top="var(--background)" bottom="var(--navy)" />

      {/* Prestations */}
      <section className="bg-navy text-steel-light">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-sand">
                Nos prestations
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Ce que comprend cette prestation
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.prestations.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="h-full rounded-xl border border-steel/25 bg-navy-deep/60 p-6">
                    <span className="font-mono text-sm font-semibold text-sand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StrataDivider top="var(--navy)" bottom="var(--background)" flip />

      {/* Essais associés + autres services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              <FlaskConical className="size-6 text-ochre" aria-hidden />
              Essais associés
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Les essais de laboratoire et in situ mobilisés pour cette prestation :
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.relatedTests.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-ochre" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/essais"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-ochre"
            >
              Voir le catalogue complet des essais
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Autres prestations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nos expertises s'articulent entre elles au fil du projet :
            </p>
            <ul className="mt-6 space-y-3">
              {autres.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 card-lift hover:-translate-y-0.5 hover:border-ochre hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {s.titleShort}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                    </div>
                    <ArrowRight
                      className="size-5 shrink-0 text-navy transition-colors group-hover:text-ochre"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABand
        title={`Besoin d'une prestation « ${service.titleShort} » ?`}
        text="Envoyez-nous les données de votre projet : localisation, nature de l'ouvrage et stade d'avancement. Nous revenons vers vous avec une proposition adaptée."
      />
    </>
  );
}
