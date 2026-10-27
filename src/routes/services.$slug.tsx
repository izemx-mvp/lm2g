import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SoilCTA } from "@/components/ui/SoilCTA";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { essais } from "@/data/essais";
import { getService, services, type Service } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.metaTitle ?? "Nos services | LM2G";
    const description =
      loaderData?.metaDescription ??
      "Études géotechniques, essais de laboratoire, contrôle qualité et expertise technique au Maroc.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
  errorComponent: ServiceError,
  notFoundComponent: ServiceNotFound,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

const WHATSAPP = "212661890187";

/** Hauteur du header sticky du site : ajuster si le menu de section passe dessous. */
const STICKY_TOP = "top-[4.5rem]";

const sections = [
  { id: "approche", label: "Approche" },
  { id: "prestations", label: "Prestations" },
  { id: "essais", label: "Essais" },
  { id: "livrables", label: "Livrables" },
  { id: "faq", label: "Questions" },
];

const processSteps = [
  { title: "Demande", text: "Vous nous transmettez la localisation, les plans et le stade du projet." },
  { title: "Proposition", text: "Nous définissons le programme d'intervention et un devis détaillé." },
  { title: "Intervention", text: "Nos équipes réalisent sondages, essais ou contrôles sur site et au laboratoire." },
  { title: "Restitution", text: "Vous recevez un rapport signé, que nous vous présentons et expliquons." },
];

/** FAQ spécifique à chaque prestation (3 questions). */
const serviceFaq: Record<string, { q: string; a: string }[]> = {
  "etudes-geotechniques": [
    {
      q: "Quelle mission choisir : G1, G2 ou G3 ?",
      a: "La G1 intervient au stade de la faisabilité ou avant l'achat d'un terrain. La G2 accompagne la conception et fixe les principes de fondation. La G3 est réalisée en phase d'exécution pour adapter le projet géotechnique aux conditions réellement rencontrées.",
    },
    {
      q: "Combien de sondages faut-il prévoir ?",
      a: "Cela dépend de la surface du projet, de la nature de l'ouvrage et de l'hétérogénéité attendue des terrains. Nous définissons le nombre et la profondeur des sondages dans notre proposition, après analyse de vos plans.",
    },
    {
      q: "Que contient le rapport d'étude ?",
      a: "Le contexte du site, les logs de sondages, les résultats d'essais, le modèle géotechnique retenu et des recommandations de fondations argumentées, directement exploitables par votre bureau d'études.",
    },
  ],
  "essais-laboratoire": [
    {
      q: "Comment vous transmettre des échantillons ?",
      a: "Vous pouvez déposer vos échantillons à notre laboratoire de Casablanca, ou nous confier le prélèvement sur site. Chaque échantillon est identifié, enregistré et suivi jusqu'au procès-verbal.",
    },
    {
      q: "Quels sont les délais pour obtenir les résultats ?",
      a: "Ils dépendent des essais : certains sont rapides, d'autres ont une durée imposée par la norme (compression du béton à 7 et 28 jours, essais œdométriques sur plusieurs jours). Le délai est annoncé dans le devis.",
    },
    {
      q: "Selon quelles normes travaillez-vous ?",
      a: "Selon les normes applicables à chaque essai (NM, NF, EN) ou celles imposées par le cahier des charges de votre marché. La référence normative figure sur chaque procès-verbal.",
    },
  ],
  "controle-qualite": [
    {
      q: "À quelle fréquence intervenez-vous sur le chantier ?",
      a: "La fréquence est définie avec le maître d'ouvrage selon le planning des travaux et les exigences du marché : interventions ponctuelles aux points d'arrêt ou suivi régulier tout au long de l'exécution.",
    },
    {
      q: "Que se passe-t-il en cas de non-conformité ?",
      a: "Nous alertons immédiatement les intervenants concernés, consignons le constat dans un procès-verbal et proposons, si nécessaire, des contre-essais ou des mesures correctives.",
    },
    {
      q: "Travaillez-vous pour le maître d'ouvrage ou pour l'entreprise ?",
      a: "Les deux, selon les projets. Dans tous les cas, nos mesures et nos conclusions restent indépendantes : c'est ce qui donne de la valeur à nos procès-verbaux.",
    },
  ],
  "expertise-assistance": [
    {
      q: "Une fissure est-elle forcément grave ?",
      a: "Non. Le diagnostic permet de distinguer les fissures sans gravité des désordres évolutifs, en croisant observations, mesures et reconnaissances ciblées, puis d'adapter la réponse à la situation réelle.",
    },
    {
      q: "Combien de temps dure un diagnostic G5 ?",
      a: "Il comprend une visite, des reconnaissances et essais ciblés, puis l'analyse et la rédaction du rapport. Le calendrier dépend de l'ouvrage et des investigations nécessaires ; il est précisé dans notre proposition.",
    },
    {
      q: "En quoi consiste une mission d'AMO ?",
      a: "Nous apportons au maître d'ouvrage un appui technique indépendant : analyse des offres, revue des études géotechniques des entreprises, participation aux réunions et assistance aux réceptions.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                               États d'erreur                               */
/* -------------------------------------------------------------------------- */

function ServiceError({ error, reset }: ErrorComponentProps) {
  console.error(error);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <h1 className="font-display text-2xl font-semibold text-foreground">Cette page n'a pas pu être chargée</h1>
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
        Cette prestation n'existe pas ou a été renommée. Consultez la liste de nos services pour trouver
        ce que vous cherchez.
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

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

type ServiceData = Service;

function ServiceDetail() {
  const service = Route.useLoaderData();
  const index = Math.max(0, services.findIndex((s) => s.slug === service.slug));
  const next = services[(index + 1) % services.length] ?? services[0]!;
  const devisHref = `/contact?service=${service.slug}`;

  return (
    <>
      <style>{pageStyles}</style>
      <DossierHero service={service} index={index} devisHref={devisHref} />
      <SectionNav key={service.slug} />
      <Approche service={service} />
      <Prestations key={`p-${service.slug}`} service={service} />
      <StrataDivider top="var(--background)" bottom="var(--navy)" />
      <EssaisAssocies service={service} />
      <StrataDivider top="var(--navy)" bottom="var(--background)" flip />
      <Livrables service={service} />
      <Deroulement />
      <FaqService service={service} />
      <NextService next={next} index={(index + 1) % services.length} />
      <SoilCTA
        eyebrow={service.titleShort}
        title="Parlons de"
        highlight="votre projet."
        text="Envoyez-nous la localisation, la nature de l'ouvrage et son stade d'avancement : nous revenons vers vous avec une proposition adaptée."
        image={service.image}
        devisHref={devisHref}
      />
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function DossierHero({ service, index, devisHref }: { service: ServiceData; index: number; devisHref: string }) {
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Bonjour LM2G, je souhaite un devis pour : ${service.title}.`,
  )}`;
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div className="contour-lines absolute inset-0 -z-10 opacity-40" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:pt-40 lg:pb-24">
        <div>
          <nav aria-label="Fil d'Ariane" className="sd-rise font-mono text-[11px] uppercase tracking-widest text-steel/70">
            <Link to="/" className="transition-colors hover:text-sand">
              Accueil
            </Link>
            <span className="mx-2 text-steel/40">/</span>
            <Link to="/services" className="transition-colors hover:text-sand">
              Services
            </Link>
            <span className="mx-2 text-steel/40">/</span>
            <span className="text-sand">{service.titleShort}</span>
          </nav>

          <div className="sd-rise mt-8 flex items-baseline gap-3" style={{ animationDelay: "60ms" }}>
            <span className="font-display text-2xl font-bold text-sand">0{index + 1}</span>
            <span className="font-mono text-xs text-steel/60">/ 0{services.length} · Prestation</span>
          </div>

          <h1
            className="sd-rise mt-3 font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            {service.title}
          </h1>
          <p className="sd-rise mt-6 max-w-xl text-lg leading-relaxed text-steel" style={{ animationDelay: "220ms" }}>
            {service.tagline}
          </p>
          <div className="sd-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
            <a
              href={devisHref}
              className="group inline-flex items-center gap-2 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-sand hover:text-earth"
            >
              Demander un devis
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-steel/40 px-6 py-3.5 text-sm font-semibold text-steel-light transition-colors hover:border-sand hover:text-sand"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Image cadrée façon planche technique */}
        <div className="sd-rise relative" style={{ animationDelay: "260ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src={service.image}
              alt={service.imageAlt}
              width={1600}
              height={900}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-white/80">
              <span>Réf. LM2G-{service.slug.slice(0, 2).toUpperCase()}-0{index + 1}</span>
              <span className="flex items-center gap-2">
                <span className="flex h-1.5 w-16 overflow-hidden rounded-sm border border-white/60">
                  <span className="w-1/2 bg-white/80" />
                </span>
                0 — 10 m
              </span>
            </div>
          </div>
          {/* Repères de coupe */}
          {["-top-3 -left-3 border-t-2 border-l-2", "-top-3 -right-3 border-t-2 border-r-2", "-bottom-3 -left-3 border-b-2 border-l-2", "-bottom-3 -right-3 border-b-2 border-r-2"].map(
            (pos) => (
              <span key={pos} className={`absolute size-6 border-sand ${pos}`} aria-hidden />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Menu de section (scrollspy) --------------------- */

function SectionNav() {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections de la page"
      className={`sticky z-30 border-b border-border bg-background ${STICKY_TOP}`}
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8 [scrollbar-width:none]">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative flex items-center gap-2 px-3 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`font-mono text-[10px] ${isActive ? "text-ochre" : ""}`}>0{i + 1}</span>
                {s.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-ochre transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* --------------------------------- Approche -------------------------------- */

function Approche({ service }: { service: ServiceData }) {
  const [lead, ...rest] = service.intro;
  const facts = [
    { k: "Prestation", v: service.title },
    { k: "Prestations incluses", v: String(service.prestations.length) },
    { k: "Essais associés", v: String(service.relatedTests.length) },
    { k: "Livrables", v: String(service.deliverables.length) },
    { k: "Zone d'intervention", v: "Tout le Maroc" },
  ];
  return (
    <section id="approche" className="scroll-mt-36 mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">01 — Notre approche</p>
        {lead && (
          <p className="mt-6 font-display text-2xl leading-snug font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {lead}
          </p>
        )}
        {rest.map((p, i) => (
          <p key={i} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <aside className="rounded-2xl border border-border bg-card lg:sticky lg:top-40">
          <p className="border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Fiche technique
          </p>
          <dl>
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-3.5 last:border-b-0">
                <dt className="text-sm text-muted-foreground">{f.k}</dt>
                <dd className="text-right font-display text-base font-semibold text-foreground">{f.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Prestations ------------------------------ */

function Prestations({ service }: { service: ServiceData }) {
  const [selected, setSelected] = useState(0);
  const current = service.prestations[selected] ?? service.prestations[0];

  return (
    <section id="prestations" className="scroll-mt-36 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">02 — Prestations</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-foreground sm:text-5xl">
            Ce que comprend <span className="text-ochre">cette prestation.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ol className="border-t border-border">
            {service.prestations.map((p, i) => {
              const isActive = selected === i;
              return (
                <li key={p.title} className="border-b border-border">
                  <button
                    type="button"
                    onMouseEnter={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    onClick={() => setSelected(i)}
                    className="group flex w-full items-start gap-5 py-5 text-left"
                  >
                    <span className={`mt-1 font-mono text-xs transition-colors ${isActive ? "text-ochre" : "text-muted-foreground"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-display text-lg font-semibold transition-all sm:text-xl ${
                          isActive ? "translate-x-1 text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-muted-foreground lg:hidden">
                        {p.description}
                      </span>
                    </span>
                    <ArrowRight
                      className={`mt-1 hidden size-5 transition-all lg:block ${
                        isActive ? "translate-x-0 text-ochre opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          {current && (
            <div className="hidden lg:block">
              <div className="sticky top-40 overflow-hidden rounded-3xl bg-navy-deep text-white">
                <img src={service.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
                <div className="contour-lines absolute inset-0 opacity-40" aria-hidden />
                <div key={selected} className="sd-panel relative flex min-h-[24rem] flex-col p-10">
                  <span className="font-display text-8xl leading-none font-bold text-sand/90">
                    {String(selected + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-auto font-display text-3xl font-bold">{current.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-steel-light">{current.description}</p>
                  <div className="mt-8 flex gap-1.5" aria-hidden>
                    {service.prestations.map((_, i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full ${i === selected ? "bg-sand" : "bg-white/15"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Essais associés ---------------------------- */

function EssaisAssocies({ service }: { service: ServiceData }) {
  const rows = service.relatedTests.map((nom) => {
    const match = essais.find((e) => e.nom === nom);
    return { nom, norme: match?.norme, categorie: match?.categorie };
  });

  return (
    <section id="essais" className="scroll-mt-36 bg-navy text-white">
      <div className="contour-lines">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">03 — Essais associés</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Les essais mobilisés.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-steel">
              Les essais de laboratoire et in situ sur lesquels repose cette prestation, avec leur
              référence normative.
            </p>
            <Link
              to="/essais"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-sand hover:text-sand"
            >
              Catalogue complet des essais
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-white/10">
              {rows.map((r, i) => {
                const href = r.categorie ? `/essais?categorie=${encodeURIComponent(r.categorie)}` : "/essais";
                return (
                  <li key={r.nom}>
                    <a
                      href={href}
                      className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[2.5rem_1fr_9rem_auto]"
                    >
                      <span className="font-mono text-xs text-steel/60">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-display text-lg font-semibold transition-colors group-hover:text-sand">
                          {r.nom}
                        </span>
                        {r.categorie && (
                          <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-steel/60">
                            {r.categorie}
                          </span>
                        )}
                      </span>
                      <span className="hidden font-mono text-xs text-sand sm:block">{r.norme ?? "Sur demande"}</span>
                      <ArrowUpRight
                        className="size-4 text-steel/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sand"
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Livrables ------------------------------- */

function Livrables({ service }: { service: ServiceData }) {
  const docs = service.deliverables;
  return (
    <section id="livrables" className="scroll-mt-36 mx-auto grid max-w-7xl items-center gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">04 — Livrables</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
          Le dossier que <span className="text-ochre">vous recevez.</span>
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
          Des documents signés, datés et tracés, rédigés pour que chaque intervenant du projet puisse
          agir.
        </p>
        <ol className="mt-8 border-t border-border">
          {docs.map((d, i) => (
            <li key={d} className="flex gap-4 border-b border-border py-4">
              <span className="font-mono text-xs text-ochre">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-foreground">{d}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Pile de documents */}
      <Reveal delay={0.1}>
        <div className="doc-stack group relative mx-auto h-[26rem] w-full max-w-sm sm:h-[28rem]" aria-hidden>
          {docs.map((d, i) => {
            const fromTop = docs.length - 1 - i;
            return (
              <div
                key={d}
                className="doc-sheet absolute inset-x-0 top-0 h-[20rem] rounded-sm bg-white p-6 text-[#1A2233] shadow-xl ring-1 ring-black/5 sm:h-[22rem]"
                style={
                  {
                    "--r": `${(i % 2 === 0 ? -1 : 1) * (fromTop * 2.5)}deg`,
                    "--y": `${fromTop * 14}px`,
                    "--y-open": `${fromTop * 46}px`,
                    zIndex: i,
                  } as CSSProperties
                }
              >
                <div className="flex items-center justify-between border-b border-[#1A2233]/10 pb-3">
                  <span className="font-display text-sm font-bold text-navy">
                    LM<span className="text-ochre">2</span>G
                  </span>
                  <span className="font-mono text-[9px] text-[#5B6475]">DOC {String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-4 font-display text-lg leading-snug font-semibold">{d}</p>
                <div className="mt-5 space-y-2">
                  {[92, 78, 85, 60, 88, 70].map((w, j) => (
                    <span key={j} className="block h-1.5 rounded-full bg-[#1A2233]/10" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                  <span className="h-px w-20 bg-[#1A2233]/20" />
                  <span className="-rotate-12 rounded border-2 border-ochre/70 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-ochre/80">
                    SIGNÉ
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------- Déroulement d'une mission --------------------- */

function Deroulement() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
            Déroulement d'une mission
          </p>
        </Reveal>
        <ol className="relative mt-10 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="absolute top-3 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-sand via-ochre to-earth md:block" aria-hidden />
          {processSteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-ochre bg-background">
                  <span className="size-2 rounded-full bg-ochre" />
                </span>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Étape {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:mx-auto md:max-w-[15rem]">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ---------------------------------- */

function FaqService({ service }: { service: ServiceData }) {
  const items = serviceFaq[service.slug] ?? [];
  if (items.length === 0) return null;
  return (
    <section id="faq" className="scroll-mt-36 mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">05 — Questions</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
          Ce qu'on nous demande souvent.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible defaultValue="q-0" className="border-b border-border">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`} className="border-t border-border">
              <AccordionTrigger className="gap-4 py-6 text-left font-display text-lg font-semibold text-foreground hover:text-ochre hover:no-underline sm:text-xl">
                <span className="flex items-start gap-5">
                  <span className="mt-1 font-mono text-xs text-ochre">{String(i + 1).padStart(2, "0")}</span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-10 text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

/* ----------------------------- Prestation suivante ------------------------- */

function NextService({ next, index }: { next: ServiceData; index: number }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: next.slug }}
      className="group relative block overflow-hidden bg-navy-deep text-white"
    >
      <img
        src={next.image}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sand">
            Prestation suivante · 0{index + 1}
          </p>
          <p className="mt-3 font-display text-4xl leading-none font-bold transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl lg:text-7xl">
            {next.title}
          </p>
          <p className="mt-4 max-w-lg text-steel">{next.tagline}</p>
        </div>
        <span className="flex size-20 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-ochre group-hover:bg-ochre sm:size-24">
          <ArrowRight className="size-7" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes sd-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.sd-rise { opacity: 0; animation: sd-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes sd-panel { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.sd-panel { animation: sd-panel .45s ease-out both; }

/* Pile de documents : elle se déploie au survol */
.doc-sheet {
  transform: translateY(var(--y)) rotate(var(--r));
  transition: transform .6s cubic-bezier(.2,.7,.2,1);
}
.doc-stack:hover .doc-sheet { transform: translateY(var(--y-open)) rotate(calc(var(--r) * .4)); }

@media (prefers-reduced-motion: reduce) {
  .sd-rise, .sd-panel { animation: none !important; opacity: 1 !important; }
  .doc-sheet { transition: none; }
}
`;