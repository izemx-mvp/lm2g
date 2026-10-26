import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import logoAsset from "@/assets/lm2g-logo.png.asset.json";
import { site } from "@/config/site";
import { services } from "@/data/services";

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-muted data-[status=active]:text-ochre data-[status=active]:font-semibold";

const mobileLinkClass =
  "rounded-lg px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-muted data-[status=active]:text-ochre";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b border-transparent transition-all " +
        (scrolled || open ? "header-glass border-border" : "")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="LM2G — Accueil">
          <img
            src={logoAsset.url}
            alt="Logo LM2G — Laboratoire Marocain de Géotechnique & Génie Civil"
            width={1863}
            height={787}
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          <Link to="/" className={navLinkClass}>
            Accueil
          </Link>
          <Link to="/a-propos" className={navLinkClass}>
            À propos
          </Link>

          <div className="group relative">
            <Link to="/services" className={navLinkClass}>
              <span className="inline-flex items-center gap-1">
                Services
                <ChevronDown
                  className="size-3.5 transition-transform group-hover:rotate-180"
                  aria-hidden
                />
              </span>
            </Link>
            <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="block rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {s.titleShort}
                </Link>
              ))}
              <Link
                to="/services"
                className="mt-1 block border-t border-border px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-ochre"
              >
                Tous nos services
              </Link>
            </div>
          </div>

          <Link to="/essais" className={navLinkClass}>
            Essais
          </Link>
          <Link to="/realisations" className={navLinkClass}>
            Réalisations
          </Link>
          <Link to="/contact" className={navLinkClass}>
            Contact
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${site.phoneIntl}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy transition-colors hover:text-ochre md:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden xl:inline">{site.phone}</span>
            <span className="xl:hidden">Appeler</span>
          </a>
          <Link
            to="/contact"
            className="hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre sm:inline-flex"
          >
            Demander un devis
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-border p-2.5 text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <img
              src={logoAsset.url}
              alt="Logo LM2G"
              width={1863}
              height={787}
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-border p-2.5 text-foreground transition-colors hover:bg-muted"
              aria-label="Fermer le menu"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-1">
              <Link to="/" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Accueil
              </Link>
              <Link to="/a-propos" className={mobileLinkClass} onClick={() => setOpen(false)}>
                À propos
              </Link>
              <p className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Services
              </p>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="rounded-lg px-4 py-2.5 text-base text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {s.titleShort}
                </Link>
              ))}
              <Link to="/essais" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Essais
              </Link>
              <Link to="/realisations" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Réalisations
              </Link>
              <Link to="/contact" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Contact
              </Link>
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <a
                href={`tel:${site.phoneIntl}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-navy"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ochre"
                onClick={() => setOpen(false)}
              >
                Demander un devis
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
