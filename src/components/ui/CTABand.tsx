import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/Reveal";
import { waLink, whatsappDefaultMessage } from "@/config/site";

/** Bandeau d'appel à l'action sur fond navy avec motif de courbes de niveau. */
export function CTABand({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="relative bg-navy text-steel-light">
      <div className="contour-lines">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-steel sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sand hover:text-earth"
              >
                Demander un devis
              </Link>
              <a
                href={waLink(whatsappDefaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-steel/40 px-6 py-3 text-sm font-semibold text-steel-light transition-colors hover:border-sand hover:text-sand"
              >
                Écrire sur WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
