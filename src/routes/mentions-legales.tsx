import { createFileRoute, Link } from "@tanstack/react-router";

import { site } from "@/config/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      {
        title: "Mentions légales — LM2G Laboratoire Marocain de Géotechnique",
      },
      {
        name: "description",
        content:
          "Mentions légales du site LM2G : éditeur, informations juridiques et contact du Laboratoire Marocain de Géotechnique et de Génie Civil, Casablanca.",
      },
      {
        property: "og:title",
        content: "Mentions légales — LM2G",
      },
      {
        property: "og:description",
        content: "Informations légales et juridiques du site du laboratoire LM2G.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-ochre">Informations</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-foreground sm:text-5xl">
        Mentions légales
      </h1>
      <div className="mt-10 space-y-10">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Éditeur du site</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {site.legalName}
            <br />
            Capital social : {site.capital}
            <br />
            Siège social : {site.address}
            <br />
            Téléphone : {site.phone} / {site.phoneFixe}
            <br />
            E-mail : {site.email}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Informations juridiques
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Registre du commerce : {site.rc}
            <br />
            Identifiant fiscal : {site.identifiantFiscal}
            <br />
            Identifiant commun de l'entreprise (ICE) : {site.ice}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Contenus et informations
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Les informations présentées sur ce site (horaires, chiffres clés, projets réalisés)
            comportent des éléments illustratifs destinés à être remplacés par les données
            définitives de la société. Elles ne constituent pas une offre contractuelle. Pour toute
            demande, contactez-nous directement.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
