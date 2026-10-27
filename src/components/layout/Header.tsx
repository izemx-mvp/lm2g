import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import logoAsset from "@/assets/lm2g-logo.png";
import { site, waLink, whatsappDefaultMessage } from "@/config/site";
import { services } from "@/data/services";

/**
 * Pages dont le hero est sombre : le header y est transparent par-dessus le hero.
 * Sur les autres pages (mentions légales, 404…), il est plein dès le départ et un espaceur est ajouté.
 */
const DARK_HERO_PREFIXES = ["/a-propos", "/services", "/essais", "/realisations", "/contact"];
const hasDarkHero = (path: string) => path === "/" || DARK_HERO_PREFIXES.some((p) => path.startsWith(p));

const nav = [
  { to: "/", label: "Accueil", exact: true },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services", mega: true },
  { to: "/essais", label: "Essais" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/contact", label: "Contact" },
] as const;

const linkClass =
  "relative rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white data-[status=active]:text-white " +
  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-ochre after:transition-transform hover:after:scale-x-100 data-[status=active]:after:scale-x-100";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const darkHero = hasDarkHero(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 12);
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Fermer le menu mobile au changement de page / avec Échap
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || !darkHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? "border-b border-white/10 bg-navy-deep/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-xl bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
            aria-label="LM2G — Accueil"
          >
            <img
              src={logoAsset}
              alt="LM2G — Laboratoire Marocain de Géotechnique & Génie Civil"
              width={1863}
              height={787}
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              "mega" in item ? (
                <ServicesMenu key={item.to} className={linkClass} />
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: "exact" in item && item.exact }}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${site.phoneIntl}`}
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:text-sand md:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              <span className="hidden xl:inline">{site.phone}</span>
              <span className="xl:hidden">Appeler</span>
            </a>
            <Link
              to="/contact"
              className="group hidden items-center gap-2 rounded-lg bg-ochre px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sand hover:text-earth sm:inline-flex"
            >
              Demander un devis
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-lg border border-white/20 p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Progression de lecture : le « forage » de la page */}
        <div className="absolute inset-x-0 bottom-0 h-0.5" aria-hidden>
          <div
            className={`h-full bg-gradient-to-r from-sand via-ochre to-earth transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {!darkHero && <div aria-hidden className="h-[4.5rem]" />}

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}

/* ------------------------------ Méga-menu services ------------------------- */

function ServicesMenu({ className }: { className: string }) {
  return (
    <div className="group relative">
      <Link to="/services" className={`${className} inline-flex items-center gap-1`}>
        Services
        <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
      </Link>

      <div className="invisible absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="grid grid-cols-[1fr_15rem] gap-2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl">
          <ul className="grid grid-cols-2 gap-1">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group/item flex gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                >
                  <img src={s.image} alt="" aria-hidden className="size-14 shrink-0 rounded-lg object-cover" />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-display text-sm font-semibold text-foreground transition-colors group-hover/item:text-ochre">
                      <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                      {s.titleShort}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">{s.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/services"
            className="group/cta relative flex flex-col justify-between overflow-hidden rounded-xl bg-navy p-5 text-white"
          >
            <div className="contour-lines absolute inset-0 opacity-40" aria-hidden />
            <span className="relative font-mono text-[10px] uppercase tracking-widest text-sand">Pas sûr ?</span>
            <span className="relative">
              <span className="block font-display text-lg leading-snug font-semibold">
                Trouvez la bonne mission pour votre projet
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sand">
                Tous nos services
                <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Menu mobile ----------------------------- */

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="mm-in fixed inset-0 z-[60] flex flex-col overflow-hidden bg-navy-deep text-white lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <style>{menuStyles}</style>
      <div className="contour-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative flex h-[4.5rem] items-center justify-between px-4 sm:px-6">
        <span className="rounded-xl bg-white px-2.5 py-1.5">
          <img src={logoAsset} alt="LM2G" width={1863} height={787} className="h-8 w-auto" />
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/20 p-2.5 transition-colors hover:bg-white/10"
          aria-label="Fermer le menu"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav aria-label="Menu mobile" className="relative flex-1 overflow-y-auto px-4 pt-4 pb-8 sm:px-6">
        <ul>
          {nav.map((item, i) => (
            <li key={item.to} className="mm-link border-b border-white/10" style={{ animationDelay: `${80 + i * 55}ms` }}>
              <Link
                to={item.to}
                activeOptions={{ exact: "exact" in item && item.exact }}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-4 data-[status=active]:text-sand"
              >
                <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                <span className="font-display text-3xl font-bold sm:text-4xl">{item.label}</span>
              </Link>
              {"mega" in item && (
                <div className="-mt-1 flex flex-wrap gap-2 pb-4 pl-9">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      onClick={onClose}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-steel-light transition-colors hover:border-sand hover:text-sand data-[status=active]:border-sand data-[status=active]:text-sand"
                    >
                      {s.titleShort}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mm-link mt-8 grid gap-3" style={{ animationDelay: "480ms" }}>
          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ochre px-4 py-4 font-semibold"
          >
            Demander un devis
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <div className="grid grid-cols-3 gap-3">
            <a href={`tel:${site.phoneIntl}`} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 py-3 text-xs font-semibold">
              <Phone className="size-5 text-sand" aria-hidden />
              Appeler
            </a>
            <a
              href={waLink(whatsappDefaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 py-3 text-xs font-semibold"
            >
              <MessageCircle className="size-5 text-sand" aria-hidden />
              WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 py-3 text-xs font-semibold">
              <Mail className="size-5 text-sand" aria-hidden />
              E-mail
            </a>
          </div>
        </div>
      </nav>

      {/* Strates en pied de menu */}
      <div className="relative flex h-3" aria-hidden>
        {["#A88A5E", "#8B6428", "#6B4F2A", "#523A1C"].map((c) => (
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

const menuStyles = `
@keyframes mm-in { from { opacity: 0; } to { opacity: 1; } }
.mm-in { animation: mm-in .25s ease-out both; }
@keyframes mm-link { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.mm-link { animation: mm-link .45s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .mm-in, .mm-link { animation: none !important; } }
`;