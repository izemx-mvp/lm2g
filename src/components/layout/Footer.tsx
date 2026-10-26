import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/lm2g-logo.png.asset.json";
import { site } from "@/config/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-steel-light">
      <div className="contour-lines">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="inline-block rounded-xl bg-white/95 p-3">
              <img
                src={logoAsset.url}
                alt="Logo LM2G — Laboratoire Marocain de Géotechnique & Génie Civil"
                width={1863}
                height={787}
                className="h-12 w-auto"
                loading="lazy"
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-steel">
              Laboratoire de géotechnique et de génie civil implanté à Casablanca depuis {site.founded}.
              Des fondations solides pour des ouvrages durables.
            </p>
          </div>

          <nav aria-label="Liens du pied de page">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sand">Navigation</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/", label: "Accueil" },
                { to: "/a-propos", label: "À propos" },
                { to: "/services", label: "Services" },
                { to: "/essais", label: "Essais" },
                { to: "/realisations", label: "Réalisations" },
                { to: "/contact", label: "Contact" },
                { to: "/mentions-legales", label: "Mentions légales" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-steel-light/80 transition-colors hover:text-sand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nos services">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sand">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-steel-light/80 transition-colors hover:text-sand"
                  >
                    {s.titleShort}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sand">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-steel-light/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                <span className="flex flex-col">
                  <a href={`tel:${site.phoneIntl}`} className="hover:text-sand">
                    {site.phone}
                  </a>
                  <a
                    href={`tel:${site.phoneFixe.replace(/\s/g, "")}`}
                    className="hover:text-sand"
                  >
                    {site.phoneFixe}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-sand">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-steel-light/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            {site.legalName} · Capital {site.capital}
          </p>
          <p>
            {site.rc} · {site.ice} · {site.identifiantFiscal}
          </p>
          <p>© {year} LM2G — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
