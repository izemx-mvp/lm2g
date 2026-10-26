import { site } from "@/config/site";

const strates = [
  { nom: "Remblai", profondeur: "0,00 – 1,50 m", couleur: "var(--sand)" },
  { nom: "Argile", profondeur: "1,50 – 4,00 m", couleur: "var(--ochre)" },
  { nom: "Marne", profondeur: "4,00 – 7,50 m", couleur: "var(--earth)" },
  { nom: "Grès", profondeur: "7,50 – 10,00 m", couleur: "var(--steel)" },
];

/** Carte décorative « log de sondage » — motif signature du site. */
export function BoreholeLogCard({ className }: { className?: string }) {
  return (
    <figure
      className={
        "rounded-xl border border-border bg-card/90 p-5 shadow-xl backdrop-blur " + (className ?? "")
      }
    >
      <figcaption className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
        <span className="font-display text-sm font-semibold text-foreground">
          Log de sondage — SC1
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">0 – 10 m</span>
      </figcaption>
      <ul className="mt-3 space-y-2">
        {strates.map((s) => (
          <li key={s.nom} className="flex items-center gap-3">
            <span
              className="h-6 w-10 shrink-0 rounded-sm border border-black/10"
              style={{ background: s.couleur }}
              aria-hidden
            />
            <span className="flex-1 text-sm font-medium text-foreground">{s.nom}</span>
            <span className="font-mono text-xs text-muted-foreground">{s.profondeur}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-border pt-3 text-[11px] leading-snug text-muted-foreground">
        Exemple illustratif de restitution des terrains — {site.name}, {site.address.split(",").pop()?.trim()}
      </p>
    </figure>
  );
}
