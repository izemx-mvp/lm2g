import { useCallback, useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { waLink, whatsappDefaultMessage } from "@/config/site";
import { AssistantPanel } from "./Assistant";

const TEASER_KEY = "lm2g-assistant-teaser";

/**
 * Boutons flottants globaux (bas à droite) : Assistant LM2G + WhatsApp.
 * Remplace l'ancien <WhatsAppButton /> dans la mise en page racine.
 */
export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);

  // Bulle d'accroche : une seule fois par session, après quelques secondes
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {
      /* stockage indisponible : on affiche quand même */
    }
    if (seen) return;
    const t = window.setTimeout(() => setTeaser(true), 7000);
    return () => window.clearTimeout(t);
  }, []);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const toggle = () => {
    dismissTeaser();
    setOpen((o) => !o);
  };
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <style>{styles}</style>
      <AssistantPanel open={open} onClose={close} />

      <div className={`fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 ${open ? "max-sm:hidden" : ""}`}>
        {teaser && !open && (
          <div className="fa-teaser relative mr-1 max-w-[15rem] rounded-2xl rounded-br-md border border-border bg-card p-4 pr-8 shadow-xl">
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Masquer"
              className="absolute top-2 right-2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
            </button>
            <button type="button" onClick={toggle} className="text-left">
              <span className="block font-display text-sm font-semibold text-foreground">Une question sur votre sol ?</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                L'assistant vous oriente vers la bonne prestation en quelques secondes.
              </span>
            </button>
          </div>
        )}

        {/* Assistant */}
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant LM2G"}
          aria-expanded={open}
          className="group relative flex size-14 items-center justify-center rounded-full bg-navy text-white shadow-lg ring-2 ring-ochre/70 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {!open && <span className="fa-ping absolute inset-0 rounded-full ring-2 ring-ochre" aria-hidden />}
          {open ? (
            <X className="size-6" aria-hidden />
          ) : (
            <span className="font-display text-sm font-bold tracking-tight">
              LM<span className="text-sand">2</span>G
            </span>
          )}
          <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-navy-deep px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 sm:block">
            Assistant LM2G
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href={waLink(whatsappDefaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous écrire sur WhatsApp"
          className="group relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <MessageCircle className="size-7" aria-hidden />
          <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-navy-deep px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 sm:block">
            WhatsApp
          </span>
        </a>
      </div>
    </>
  );
}

const styles = `
@keyframes fa-teaser { from { opacity: 0; transform: translateY(10px) scale(.96); } to { opacity: 1; transform: none; } }
.fa-teaser { animation: fa-teaser .4s cubic-bezier(.2,.7,.2,1) both; transform-origin: bottom right; }
@keyframes fa-ping { 0% { transform: scale(1); opacity: .7; } 70%, 100% { transform: scale(1.45); opacity: 0; } }
.fa-ping { animation: fa-ping 2.6s cubic-bezier(0,0,.2,1) infinite; }
@media (prefers-reduced-motion: reduce) { .fa-teaser, .fa-ping { animation: none !important; } .fa-ping { display: none; } }
`;