import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import labTest from "@/assets/lab-test.jpg";

const PHONE_DISPLAY = "06 61 89 01 87";
const PHONE_HREF = "tel:+212661890187";
const WHATSAPP_HREF =
  "https://wa.me/212661890187?text=" +
  encodeURIComponent("Bonjour LM2G, je souhaite obtenir un devis pour un projet.");

const LAYER_COLORS = ["#A88A5E", "#8B6428", "#6B4F2A", "#523A1C"];

function wavePath(base: number, amp: number, freq: number, phase: number, width = 1440, height = 200) {
  let d = `M0,${height}`;
  for (let x = 0; x <= width; x += 24) {
    const t = (x / width) * Math.PI * 2 * freq;
    const y = base + amp * Math.sin(t + phase) + amp * 0.4 * Math.sin(t * 2.7 + phase * 1.3);
    d += ` L${x},${y.toFixed(1)}`;
  }
  return `${d} L${width},${height} Z`;
}

const layerPaths = [0, 1, 2, 3].map((i) => wavePath(40 + i * 40, 8, 1.2 + i * 0.4, i * 2.1));

type SoilCTAProps = {
  eyebrow?: string;
  title: string;
  highlight: string;
  text: string;
  image?: string;
  /** Lien du bouton devis, ex. "/contact?service=controle-qualite" (par défaut : /contact). */
  devisHref?: string;
};

/** CTA final commun à toutes les pages : grand titre + strates qui montent du bas. */
export function SoilCTA({
  eyebrow = "Prochaine étape",
  title,
  highlight,
  text,
  image = labTest,
  devisHref,
}: SoilCTAProps) {
  const devisClass =
    "group inline-flex items-center gap-2 rounded-lg bg-ochre px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-sand hover:text-earth";
  const devisInner = (
    <>
      Demander un devis
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </>
  );
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <style>{styles}</style>
      <img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-15"
      />
      <div className="contour-lines absolute inset-0 -z-10 opacity-50" aria-hidden />
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-52"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        {layerPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={LAYER_COLORS[i]}
            className="soil-cta-layer"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </svg>

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-56 sm:px-6 sm:pt-32 sm:pb-72 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">{eyebrow}</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
            {title}
            <br />
            <span className="text-sand">{highlight}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">{text}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {devisHref ? (
              <a href={devisHref} className={devisClass}>
                {devisInner}
              </a>
            ) : (
              <Link to="/contact" className={devisClass}>
                {devisInner}
              </Link>
            )}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-4 text-sm font-semibold transition-colors hover:border-sand hover:text-sand"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-3 py-4 text-sm font-semibold text-steel-light transition-colors hover:text-sand"
            >
              <Phone className="size-4" aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const styles = `
@keyframes soil-cta-rise { from { transform: translateY(40px); } to { transform: none; } }
.soil-cta-layer { animation: soil-cta-rise 1.2s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .soil-cta-layer { animation: none !important; } }
`;