type StrataDividerProps = {
  /** Couleur de la section précédente (haut). */
  top?: string;
  /** Couleur de la section suivante (bas). */
  bottom?: string;
  /** Retourne le motif pour un passage section sombre → claire. */
  flip?: boolean;
  className?: string;
};

/**
 * Séparateur signature « strates de sol » : couches ondulées sable → terre
 * entre les sections, en écho au motif du logo LM2G.
 */
export function StrataDivider({ top, bottom, flip = false, className }: StrataDividerProps) {
  return (
    <div
      className={className}
      style={
        {
          "--strata-top": top ?? "var(--background)",
          "--strata-bottom": bottom ?? "var(--navy)",
        } as React.CSSProperties
      }
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={"block h-12 w-full sm:h-16" + (flip ? " rotate-180" : "")}
      >
        <rect width="1440" height="80" fill="var(--strata-top)" />
        <path
          d="M0 30 C180 16 360 46 540 36 C760 24 900 50 1100 38 C1280 28 1380 44 1440 34 L1440 80 L0 80 Z"
          fill="var(--strata-bottom)"
          opacity="0.32"
        />
        <path
          d="M0 48 C200 36 380 60 560 50 C780 38 940 64 1140 52 C1300 42 1380 58 1440 48 L1440 80 L0 80 Z"
          fill="var(--strata-bottom)"
          opacity="0.62"
        />
        <path
          d="M0 64 C220 54 400 76 600 66 C820 56 980 80 1180 68 C1330 60 1400 72 1440 64 L1440 80 L0 80 Z"
          fill="var(--strata-bottom)"
        />
      </svg>
    </div>
  );
}
