import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, Eye, ShieldCheck, Users } from "lucide-react";

import { CountUp } from "@/components/ui/CountUp";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { site } from "@/config/site";
import heroRig from "@/assets/hero-rig.jpg";
import soilCores from "@/assets/soil-cores.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      {
        title: "À propos — LM2G, laboratoire de géotechnique à Casablanca depuis 2014",
      },
      {
        name: "description",
        content:
          "Découvrez LM2G : une équipe d'ingénieurs et de techniciens géotechniciens au service du bâtiment et des routes au Maroc, depuis 2014.",
      },
      {
        property: "og:title",
        content: "À propos — LM2G, laboratoire de géotechnique à Casablanca",
      },
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

const etapes = [
  {
    annee: "2014",
    titre: "Création du laboratoire",
    text: "Fondation de LM2G à Casablanca pour répondre aux besoins d'essais et d'études géotechniques du bâtiment.",
  },
  {
    annee: "2017",
    titre: "Extension du parc d'essais",
    text: "Montée en puissance du laboratoire : mécanique des sols, granulats, bétons et enrobés sous un même toit.",
  },
  {
    annee: "2020",
    titre: "Contrôle qualité à l'échelle du Royaume",
    text: "Déploiement des équipes de contrôle sur les chantiers routiers et les grands projets d'infrastructure.",
  },
  {
    annee: "Aujourd'hui",
    titre: "Un partenaire de projet complet",
    text: "De l'étude de faisabilité à la réception : études, essais, contrôle et expertise sous une seule responsabilité.",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Années d'expérience" },
  { value: 1200, suffix: "+", label: "Sondages réalisés" },
  { value: 15000, suffix: "+", label: "Essais de laboratoire" },
  { value: 300, suffix: "+", label: "Chantiers contrôlés" },
];

function APropos() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <img
          src={soilCores}
          alt="Carottes de sondage disposées en caisses d'observation"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sand">À propos</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-bold sm:text-5xl">
            Un laboratoire né du terrain, construit pour durer
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-steel">
            Depuis {site.founded}, LM2G accompagne maîtres d'ouvrage, bureaux d'études et entreprises
            sur leurs projets de bâtiment, de routes et d'infrastructures au Maroc.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-ochre">
              Notre histoire
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Des fondations solides, d'abord dans notre métier
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                LM2G — Laboratoire Marocain de Géotechnique et de Génie Civil — est né d'un constat
                simple : trop d'ouvrages souffrent de pathologies qui une étude de sol sérieuse
                aurait évitées. Nous avons bâti notre laboratoire pour changer cela, essai après
                essai.
              </p>
              <p>
                Installés à Casablanca, nous conjugons deux cultures : celle du laboratoire, où la
                norme et la traçabilité commandent, et celle du chantier, où les réalités du terrain
                imposent pragmatisme et réactivité. Nos ingénieurs font le lien entre les deux, de la
                reconnaissance du site jusqu'à la réception des travaux.
              </p>
              <p>
                Bâtiment, routes, ouvrages d'art, barrages, VRD ou projets industriels : quelle que
                soit la taille du projet, nous appliquons la même exigence — des données fiables,
                interprétées par des ingénieurs, restituées dans des documents qui servent à décider.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-border shadow-lg">
              <img
                src={heroRig}
                alt="Foreuse géotechnique en fonctionnement sur un chantier"
                width={1920}
                height={1088}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card p-4 text-center"
                >
                  <dd className="font-display text-2xl font-bold text-navy">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-ochre">
              Contenu exemple à remplacer
            </p>
          </Reveal>
        </div>
      </section>

      <StrataDivider top="var(--background)" bottom="var(--navy)" />

      {/* Valeurs */}
      <section className="bg-navy text-steel-light">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-sand">
                Nos valeurs
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Quatre principes qui guident chaque intervention
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {valeurs.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="h-full rounded-xl border border-steel/25 bg-navy-deep/60 p-6">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-sand/15 text-sand">
                      <v.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StrataDivider top="var(--navy)" bottom="var(--background)" flip />

      {/* Parcours */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-ochre">
            Notre parcours
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Dix ans de croissance, un cap constant
          </h2>
        </Reveal>
        <ol className="mt-12 space-y-0">
          {etapes.map((e, i) => (
            <Reveal key={e.annee} delay={i * 0.06}>
              <li className="relative grid gap-4 border-l-2 border-ochre/40 py-6 pl-8 sm:grid-cols-[120px_1fr] sm:gap-8">
                <span className="absolute top-8 -left-[9px] size-4 rounded-full border-2 border-ochre bg-background" />
                <span className="font-mono text-sm font-semibold text-ochre sm:pt-1 sm:text-right">
                  {e.annee}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{e.titre}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre"
            >
              Découvrir nos services
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Nous rencontrer
            </Link>
          </div>
        </Reveal>
      </section>

      <CTABand
        title="Envie de travailler avec un laboratoire de confiance ?"
        text="Parlez-nous de votre projet : nous vous dirons honnêtement ce dont il a besoin, ni plus ni moins."
      />
    </>
  );
}
