import { Link } from "@tanstack/react-router";
import { ArrowUp, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import logoAsset from "@/assets/lm2g-logo.png";
import { site, waLink, whatsappDefaultMessage } from "@/config/site";
import { services } from "@/data/services";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/essais", label: "Essais" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/contact", label: "Contact" },
] as const;

const STRATA = ["#A88A5E", "#8B6428", "#6B4F2A", "#523A1C"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-steel-light">
      {/* Bande de strates */}
      <div className="flex h-2" aria-hidden>
        {STRATA.map((c) => (
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      <div className="contour-lines">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
            {/* Marque */}
            <div>
              <div className="inline-block rounded-2xl bg-white p-3 shadow-lg">
                <img
                  src={logoAsset}
                  alt="LM2G — Laboratoire Marocain de Géotechnique & Génie Civil"
                  width={1863}
                  height={787}
                  loading="lazy"
                  className="h-12 w-auto"
                />
              </div>
              <p className="mt-6 max-w-xs leading-relaxed text-steel">
                Études géotechniques, essais de laboratoire, contrôle qualité et expertise, depuis{" "}
                {site.founded}. Des fondations solides pour des ouvrages durables.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={waLink(whatsappDefaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-sand hover:text-sand"
                >
                  Demander un devis
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <nav aria-label="Liens du pied de page">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-sand">Navigation</h2>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="group inline-flex items-center gap-2 text-steel-light/80 transition-colors hover:text-white">
                      <span className="h-px w-0 bg-ochre transition-all duration-300 group-hover:w-3" aria-hidden />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav aria-label="Nos services">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-sand">Services</h2>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group inline-flex items-center gap-2 text-steel-light/80 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-ochre transition-all duration-300 group-hover:w-3" aria-hidden />
                      {s.titleShort}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-sand">Contact</h2>
              <ul className="mt-5 space-y-4 text-steel-light/85">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                  <span className="leading-relaxed">{site.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                  <span className="flex flex-col">
                    <a href={`tel:${site.phoneIntl}`} className="transition-colors hover:text-white">
                      {site.phone}
                    </a>
                    <a href={`tel:${site.phoneFixe.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                      {site.phoneFixe}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                  <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
                  <span>{site.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mot-symbole géant */}
          <div className="relative mt-16 select-none" aria-hidden>
            <p className="footer-wordmark text-center font-display leading-[0.78] font-bold tracking-tighter">
              LM<span className="footer-two">2</span>G
            </p>
          </div>
        </div>
      </div>

      {/* Barre légale */}
      <div className="relative border-t border-white/10 bg-navy-deep">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-steel-light/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {year} {site.legalName} · Capital {site.capital}
          </p>
          <p>
            {site.rc} · {site.ice} · {site.identifiantFiscal}
          </p>
          <div className="flex items-center gap-5">
            <Link to="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 font-semibold text-steel-light transition-colors hover:text-sand"
            >
              Retour en haut
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wordmark {
          font-size: clamp(5rem, 24vw, 22rem);
          color: transparent;
          -webkit-text-stroke: 1px rgba(185, 205, 224, 0.18);
          margin-bottom: -0.12em;
        }
        .footer-two { -webkit-text-stroke-color: rgba(168, 138, 94, 0.45); }
      `}</style>
    </footer>
  );
}