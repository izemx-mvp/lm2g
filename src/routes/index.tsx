import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BoreholeLogCard } from "@/components/ui/BoreholeLogCard";
import { CTABand } from "@/components/ui/CTABand";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { site } from "@/config/site";
import { faq } from "@/data/faq";
import { realisations } from "@/data/realisations";
import { services } from "@/data/services";
import heroRig from "@/assets/hero-rig.jpg";
import roadWorks from "@/assets/road-works.jpg";
import siteAerial from "@/assets/site-aerial.jpg";
import soilCores from "@/assets/soil-cores.jpg";
import {
  Building2,
  ClipboardCheck,
  DraftingCompass,
  FlaskConical,
  SearchCheck,
  ArrowRight,
  Landmark,
  Route as RouteIcon,
  Bridge,
  Droplets,
  LandPlot,
  Factory,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "LM2G — Études géotechniques, essais & contrôle qualité au Maroc",
      },
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
        }),
      },
    ],
  }),
  component: Index,
});

const serviceIcons = [DraftingCompass, FlaskConical, ClipboardCheck, SearchCheck];

const trustItems = [
  { icon: Landmark, label: `Depuis ${site.founded}` },
  { icon: RouteIcon, label: "Bâtiment & routes" },
  { icon: FlaskConical, label: "Laboratoire équipé" },
  { icon: ClipboardCheck, label: "De la conception à la réception" },
];

const processSteps = [
  {
    title: "Analyse du besoin",
    text: "Compréhension du projet, du site et des exigences techniques du maître d'ouvrage.",
  },
  {
    title: "Sondages",
    text: "Campagne de reconnaissance sur site : sondages carottés, essais in situ, prélèvements.",
  },
  {
    title: "Essais",
    text: "Essais de laboratoire normalisés sur sols, granulats, bétons et enrobés.",
  },
  {
    title: "Rapport",
    text: "Interprétation des résultats et rapport technique signé, avec recommandations.",
  },
  {
    title: "Suivi jusqu'à la réception",
    text: "Contrôle qualité en chantier et assistance technique jusqu'à la réception des travaux.",
  },
];

const domaines = [
  { icon: Building2, label: "Bâtiment" },
  { icon: RouteIcon, label: "Routes" },
  { icon: Bridge, label: "Ouvrages d'art" },
  { icon: Droplets, label: "Barrages & hydraulique" },
  { icon: LandPlot, label: "VRD" },
  { icon: Factory, label: "Industriel" },
];

const realisationImages: Record<string, string> = {
  "road-works": roadWorks,
  "site-aerial": siteAerial,
  "soil-cores": soilCores,
};

const stats = [
  { value: 10, suffix: "+", label: "Années d'expérience" },
  { value: 1200, suffix: "+", label: "Sondages réalisés" },
  { value: 15000, suffix: "+", label: "Essais de laboratoire" },
  { value: 300, suffix: "+", label: "Chantiers contrôlés" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <img
          src={heroRig}
          alt="Foreuse géotechnique en fonctionnement sur un chantier au Maroc"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-steel/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sand">
              {site.name} · Casablanca · Depuis {site.founded}
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
              Des fondations solides pour des ouvrages durables
            </h1>
            <p className="mt-6 max-w-xl text-lg text-steel">
              Laboratoire Marocain de Géotechnique et de Génie Civil : études géotechniques, essais
              de laboratoire, contrôle qualité sur chantier et expertise technique, de la conception
              à la réception de vos projets de bâtiment et de routes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sand hover:text-earth"
              >
                Demander un devis
              </Link>
              <Link
                to="/services"
                className="rounded-lg border border-steel/40 px-6 py-3 text-sm font-semibold text-steel-light transition-colors hover:border-sand hover:text-sand"
              >
                Nos services
              </Link>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <BoreholeLogCard className="max-w-sm" />
          </div>
        </div>
      </section>

      {/* Bandeau de confiance */}
      <section className="border-b border-border bg-background">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                <item.icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-ochre">Nos services</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold text-foreground sm:text-4xl">
            Quatre expertises, une seule exigence : la fiabilité
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = serviceIcons[i] ?? DraftingCompass;
            return (
              <Reveal key={service.slug} delay={i * 0.08}>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 card-lift hover:-translate-y-1 hover:border-ochre hover:shadow-lg"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-navy transition-colors group-hover:bg-ochre group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {service.titleShort}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-ochre">
                    En savoir plus
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <StrataDivider top="var(--background)" bottom="var(--navy)" />

      {/* Méthodologie */}
      <section className="bg-navy text-steel-light">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-sand">
                Notre méthode
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                De l'analyse du besoin au suivi jusqu'à la réception
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="relative h-full rounded-xl border border-steel/25 bg-navy-deep/60 p-5">
                    <span className="font-mono text-2xl font-semibold text-sand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{step.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <StrataDivider top="var(--navy)" bottom="var(--background)" flip />

      {/* Statistiques */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              LM2G en chiffres
            </h2>
            <span className="rounded-full border border-dashed border-ochre px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ochre">
              Contenu exemple à remplacer
            </span>
          </div>
        </Reveal>
        <dl className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <dt className="order-2 mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-4xl font-bold text-navy sm:text-5xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Réalisations phares */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ochre">
                  Réalisations
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  Des projets variés, une même rigueur
                </h2>
              </div>
              <Link
                to="/realisations"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-ochre hover:text-ochre"
              >
                Toutes les réalisations
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {realisations.slice(0, 3).map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08}>
                <Link
                  to="/realisations"
                  className="group block h-full overflow-hidden rounded-xl border border-border bg-card card-lift hover:-translate-y-1 hover:border-ochre hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={realisationImages[r.image] ?? siteAerial}
                      alt={r.imageAlt}
                      width={1920}
                      height={1088}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy">
                      {r.domaine}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                      {r.titre}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.resume}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Domaines */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-ochre">Domaines</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Nous intervenons sur tous vos ouvrages
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {domaines.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.05}>
              <li className="flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center card-lift hover:-translate-y-1 hover:border-ochre">
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-navy">
                  <d.icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-foreground">{d.label}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
              Questions fréquentes
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="mt-10">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-ochre hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.reponse}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Un projet en préparation ? Parlons de votre sol."
        text="Décrivez-nous votre projet : nous vous proposons une étude technique et un devis adaptés, rapidement."
      />
    </>
  );
}
