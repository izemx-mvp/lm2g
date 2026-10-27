import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Droplets,
  Factory,
  Gauge,
  Layers,
  Plus,
  Route as RouteIcon,
  Ruler,
  Search,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SoilCTA } from "@/components/ui/SoilCTA";
import { StrataDivider } from "@/components/ui/StrataDivider";
import { essaiCategories, essais, type Essai } from "@/data/essais";
import soilCores from "@/assets/soil-cores.jpg";
import heroImage from "@/assets/essais-hero.jpg";

export const Route = createFileRoute("/essais")({
  head: () => ({
    meta: [
      { title: "Essais de laboratoire — Sols, granulats, bétons, enrobés | LM2G" },
      {
        name: "description",
        content:
          "Le tableau des essais LM2G : sols, granulats, bétons et mortiers, enrobés et essais in situ, classés par ce que vous cherchez à savoir, avec les normes NM, NF et EN.",
      },
      { property: "og:title", content: "Le tableau des essais — LM2G, laboratoire de géotechnique" },
      {
        property: "og:description",
        content:
          "Identification, portance, résistance, tassement, perméabilité : trouvez l'essai qui répond à votre question.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Essais,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

type Categorie = Essai["categorie"];
type Filtre = "Tous" | Categorie;
type QuestionId = "identifier" | "portance" | "resistance" | "tassement" | "eau" | "formulation";

const categoryMeta: Record<Categorie, { color: string; short: string }> = {
  Sols: { color: "#8B6428", short: "Sols" },
  Granulats: { color: "#A88A5E", short: "Granulats" },
  "Bétons & mortiers": { color: "#6B4F2A", short: "Bétons" },
  Enrobés: { color: "#2E2416", short: "Enrobés" },
  "In situ": { color: "#283F6B", short: "Terrain en place" },
};

/** Les lignes de la matrice : ce que le client cherche à savoir. */
const questions: { id: QuestionId; label: string; ask: string; icon: LucideIcon }[] = [
  { id: "identifier", label: "Identifier & classer", ask: "De quoi est fait le matériau ?", icon: Layers },
  { id: "portance", label: "Compactage & portance", ask: "Le sol supporte-t-il la charge ?", icon: Gauge },
  { id: "resistance", label: "Résistance", ask: "Jusqu'où le matériau tient-il ?", icon: ShieldCheck },
  { id: "tassement", label: "Déformation & tassement", ask: "De combien l'ouvrage va-t-il tasser ?", icon: Ruler },
  { id: "eau", label: "Eau & perméabilité", ask: "Comment l'eau circule-t-elle ?", icon: Droplets },
  { id: "formulation", label: "Formulation & mise en œuvre", ask: "Le mélange est-il conforme ?", icon: Sparkles },
];

/** Symbole « tableau périodique » et question de chaque essai (par id). */
const tileMeta: Record<string, { sym: string; q: QuestionId }> = {
  "granulometrie-sols": { sym: "Gr", q: "identifier" },
  "limites-atterberg": { sym: "Ip", q: "identifier" },
  "teneur-eau": { sym: "W", q: "identifier" },
  "valeur-bleu": { sym: "VBS", q: "identifier" },
  "granulometrie-granulats": { sym: "Gg", q: "identifier" },
  "equivalent-sable": { sym: "ES", q: "identifier" },
  proctor: { sym: "Pr", q: "portance" },
  cbr: { sym: "CBR", q: "portance" },
  "densite-in-situ": { sym: "ρd", q: "portance" },
  "essai-plaque": { sym: "EV2", q: "portance" },
  penetrometre: { sym: "Pd", q: "portance" },
  cisaillement: { sym: "Ci", q: "resistance" },
  "los-angeles": { sym: "LA", q: "resistance" },
  "micro-deval": { sym: "MDE", q: "resistance" },
  "compression-beton": { sym: "Rc", q: "resistance" },
  "flexion-beton": { sym: "Rf", q: "resistance" },
  carottage: { sym: "Ca", q: "resistance" },
  marshall: { sym: "Ma", q: "resistance" },
  oedometre: { sym: "Œd", q: "tassement" },
  pressiometre: { sym: "EM", q: "tassement" },
  lefranc: { sym: "K", q: "eau" },
  slump: { sym: "Sl", q: "formulation" },
  "extraction-enrobe": { sym: "Tb", q: "formulation" },
  "masse-volumique-enrobe": { sym: "Cp", q: "formulation" },
};

const metaOf = (e: Essai) =>
  tileMeta[e.id] ?? {
    sym: e.nom
      .split(" ")
      .filter((w) => w.length > 2)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join(""),
    q: "identifier" as QuestionId,
  };

/** Programmes types (indicatifs) : allument les essais utiles pour un type de projet. */
const programmes: { id: string; label: string; icon: LucideIcon; text: string; ids: string[] }[] = [
  {
    id: "fondations",
    label: "Fondations d'un bâtiment",
    icon: Building2,
    text: "Identifier les terrains d'assise, mesurer leur résistance et prévoir les tassements.",
    ids: ["granulometrie-sols", "limites-atterberg", "teneur-eau", "cisaillement", "oedometre", "pressiometre", "penetrometre"],
  },
  {
    id: "plateforme",
    label: "Plateforme & chaussée",
    icon: RouteIcon,
    text: "Classer les matériaux, fixer les objectifs de compactage et vérifier la portance.",
    ids: ["granulometrie-sols", "valeur-bleu", "proctor", "cbr", "densite-in-situ", "essai-plaque"],
  },
  {
    id: "beton",
    label: "Béton de structure",
    icon: Factory,
    text: "Qualifier les granulats, contrôler le béton frais puis sa résistance à 7 et 28 jours.",
    ids: ["granulometrie-granulats", "equivalent-sable", "slump", "compression-beton", "flexion-beton"],
  },
  {
    id: "enrobes",
    label: "Enrobés routiers",
    icon: Layers,
    text: "Vérifier les granulats, la formulation de l'enrobé et le compactage de la couche.",
    ids: ["los-angeles", "micro-deval", "extraction-enrobe", "marshall", "masse-volumique-enrobe"],
  },
  {
    id: "desordres",
    label: "Ouvrage avec désordres",
    icon: SearchCheck,
    text: "Évaluer le béton en place et comprendre le comportement des sols sous l'ouvrage.",
    ids: ["carottage", "penetrometre", "teneur-eau", "limites-atterberg", "oedometre"],
  },
];

const journey = [
  { code: "01", title: "Prélèvement", text: "Sur site par nos équipes, ou dépôt de vos échantillons au laboratoire." },
  { code: "02", title: "Enregistrement", text: "Chaque échantillon reçoit un identifiant, avec son origine, sa date et son état." },
  { code: "03", title: "Essai normalisé", text: "Réalisé selon la norme applicable, par un technicien dédié." },
  { code: "04", title: "Validation", text: "Les résultats sont contrôlés et interprétés par un ingénieur." },
  { code: "05", title: "Procès-verbal", text: "PV signé et daté, avec la référence normative de chaque essai." },
];

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function Essais() {
  const [colonne, setColonne] = useState<Filtre>("Tous");
  const [query, setQuery] = useState("");
  const [programmeId, setProgrammeId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);

  // ?categorie= (liens depuis les pages services) et ?q=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categorie");
    if (cat && (essaiCategories as readonly string[]).includes(cat)) setColonne(cat as Filtre);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (colonne !== "Tous") params.set("categorie", colonne);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    window.history.replaceState(window.history.state, "", qs ? `?${qs}` : window.location.pathname);
  }, [colonne, query]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const programme = programmes.find((p) => p.id === programmeId) ?? null;

  /** Un essai est « actif » s'il passe tous les filtres (les autres sont estompés, pas masqués). */
  const matches = useMemo(() => {
    const q = normalize(query.trim());
    const set = new Set<string>();
    essais.forEach((e) => {
      if (colonne !== "Tous" && e.categorie !== colonne) return;
      if (programme && !programme.ids.includes(e.id)) return;
      if (q && !normalize(`${e.nom} ${e.norme} ${e.objet} ${e.categorie} ${metaOf(e).sym}`).includes(q)) return;
      set.add(e.id);
    });
    return set;
  }, [colonne, query, programme]);

  const toggle = (id: string) =>
    setSelection((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const addProgramme = () => {
    if (!programme) return;
    setSelection((cur) => Array.from(new Set([...cur, ...programme.ids])));
  };

  const openTile = (id: string) => {
    setActiveId(id);
    setSheetOpen(true);
  };

  const active = essais.find((e) => e.id === activeId) ?? null;

  const resetAll = () => {
    setColonne("Tous");
    setQuery("");
    setProgrammeId(null);
  };

  return (
    <>
      <style>{pageStyles}</style>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Programmes
          programmeId={programmeId}
          setProgrammeId={setProgrammeId}
          programme={programme}
          onAdd={addProgramme}
          selection={selection}
        />
        <Toolbar
          query={query}
          setQuery={setQuery}
          count={matches.size}
          filtered={colonne !== "Tous" || !!query.trim() || !!programme}
          onReset={resetAll}
        />

        <div className="mt-6">
          <Matrix
            colonne={colonne}
            setColonne={setColonne}
            matches={matches}
            activeId={activeId}
            selection={selection}
            onOpen={openTile}
            onToggle={toggle}
          />
          <MobileList
            matches={matches}
            activeId={activeId}
            selection={selection}
            onOpen={openTile}
            onToggle={toggle}
          />
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-ochre/60 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-display text-xl font-semibold text-foreground">Un essai absent du tableau ?</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Notre laboratoire réalise d'autres essais à la demande. Décrivez votre besoin : nous
                confirmons la faisabilité et la norme applicable.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ochre"
            >
              Demander un essai sur mesure
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      <StrataDivider top="var(--background)" bottom="var(--navy)" />
      <SampleJourney />
      <SoilCTA
        eyebrow="Programme d'essais"
        title="Un programme"
        highlight="d'essais à établir ?"
        text="Transmettez la nature de vos matériaux et les exigences du marché : nous composons le programme d'essais adapté, avec les délais et le budget."
        image={soilCores}
      />

      {/* Fiche essai : tiroir à droite (desktop) / feuille en bas (mobile) */}
      {sheetOpen && active && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={active.nom}>
          <button
            type="button"
            className="drawer-fade absolute inset-0 bg-navy-deep/50"
            onClick={() => setSheetOpen(false)}
            aria-label="Fermer la fiche"
          />
          <div className="drawer-in absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-card shadow-2xl lg:inset-x-auto lg:top-0 lg:right-0 lg:h-full lg:max-h-none lg:w-[28rem] lg:rounded-none lg:rounded-l-3xl">
            <DetailPanel essai={active} selection={selection} toggle={toggle} onClose={() => setSheetOpen(false)} />
          </div>
        </div>
      )}

      <SelectionTray selection={selection} toggle={toggle} clear={() => setSelection([])} />
    </>
  );
}

/* ---------------------------------- Hero ----------------------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={heroImage}
        alt="Technicien réalisant un essai au laboratoire LM2G"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="hero-zoom absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep to-transparent" />
      <div className="contour-lines absolute inset-0 -z-10 opacity-25" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 pt-32 pb-16 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:pt-40 lg:pb-20">
        <div>
          <nav aria-label="Fil d'Ariane" className="es-rise font-mono text-[11px] uppercase tracking-widest text-steel/70">
            <Link to="/" className="transition-colors hover:text-sand">
              Accueil
            </Link>
            <span className="mx-2 text-steel/40">/</span>
            <span className="text-sand">Essais</span>
          </nav>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="es-rise block" style={{ animationDelay: "80ms" }}>
              Le tableau
            </span>
            <span className="es-rise block text-sand" style={{ animationDelay: "180ms" }}>
              des essais.
            </span>
          </h1>
          <p className="es-rise mt-7 max-w-xl text-lg leading-relaxed text-steel" style={{ animationDelay: "280ms" }}>
            Pas besoin de connaître le nom de l'essai : choisissez le matériau et la question que vous
            vous posez, le tableau vous montre l'essai qui y répond.
          </p>
        </div>

        {/* Comment lire le tableau */}
        <div className="es-rise rounded-2xl border border-white/15 bg-navy-deep/80 p-6 shadow-2xl" style={{ animationDelay: "360ms" }}>
          <p className="font-display text-lg font-semibold">Comment ça marche ?</p>
          <ol className="mt-4 space-y-3 text-steel">
            {[
              "Choisissez votre type de projet : les essais utiles s'allument.",
              "Ou lisez le tableau : une ligne = une question, une colonne = un matériau.",
              "Ajoutez les essais à votre programme et demandez un devis.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sand text-xs font-bold text-earth">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
          <dl className="mt-6 grid grid-cols-3 border-t border-white/10 pt-5 text-center">
            {[
              { k: "essais", v: essais.length },
              { k: "matériaux", v: essaiCategories.length },
              { k: "questions", v: questions.length },
            ].map((x) => (
              <div key={x.k}>
                <dd className="font-display text-3xl font-bold text-sand">{x.v}</dd>
                <dt className="text-xs text-steel">{x.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Programmes types ----------------------------- */

function Programmes({
  programmeId,
  setProgrammeId,
  programme,
  onAdd,
  selection,
}: {
  programmeId: string | null;
  setProgrammeId: (id: string | null) => void;
  programme: (typeof programmes)[number] | null;
  onAdd: () => void;
  selection: string[];
}) {
  const allAdded = programme ? programme.ids.every((id) => selection.includes(id)) : false;
  return (
    <div>
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">
          01 — Votre projet
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-foreground sm:text-4xl">
          Quel type de projet ? <span className="text-ochre">Le tableau s'allume.</span>
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {programmes.map((p) => {
          const isActive = programmeId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setProgrammeId(isActive ? null : p.id)}
              aria-pressed={isActive}
              className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                isActive
                  ? "-translate-y-1 border-ochre bg-ochre text-white shadow-xl shadow-ochre/25"
                  : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-ochre"
              }`}
            >
              <span
                className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-white/20" : "bg-secondary text-navy group-hover:bg-ochre group-hover:text-white"
                }`}
              >
                <p.icon className="size-5" aria-hidden />
              </span>
              <span className="mt-4 font-display text-base leading-snug font-semibold">{p.label}</span>
              <span className={`mt-1 text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                {p.ids.length} essais
              </span>
            </button>
          );
        })}
      </div>

      {programme && (
        <div key={programme.id} className="es-panel mt-5 flex flex-col gap-4 rounded-2xl bg-navy p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-display text-lg font-semibold">
              {programme.label} <span className="text-sand">· {programme.ids.length} essais</span>
            </p>
            <p className="mt-1 max-w-2xl text-steel-light">{programme.text}</p>
            <p className="mt-2 text-xs text-steel">Programme indicatif, ajusté à votre projet lors du devis.</p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            disabled={allAdded}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-ochre px-5 py-3 text-sm font-semibold transition-colors hover:bg-sand hover:text-earth disabled:cursor-default disabled:bg-white/10 disabled:text-steel"
          >
            {allAdded ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            {allAdded ? "Programme ajouté" : "Ajouter tout le programme"}
          </button>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Toolbar --------------------------------- */

function Toolbar({
  query,
  setQuery,
  count,
  filtered,
  onReset,
}: {
  query: string;
  setQuery: (q: string) => void;
  count: number;
  filtered: boolean;
  onReset: () => void;
}) {
  return (
    <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">02 — Le tableau</p>
        <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
          {filtered ? (
            <>
              <span className="font-semibold text-foreground">{count}</span> essai{count > 1 ? "s" : ""} correspond
              {count > 1 ? "ent" : ""} ·{" "}
              <button type="button" onClick={onReset} className="font-semibold text-ochre hover:underline">
                tout afficher
              </button>
            </>
          ) : (
            "Cliquez sur un essai pour voir ce qu'il mesure et sa norme."
          )}
        </p>
      </div>
      <label className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 transition-colors focus-within:border-ochre sm:w-80">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className="sr-only">Rechercher un essai</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Essai, norme, symbole… (ex. CBR, EN 933)"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Effacer" className="text-muted-foreground hover:text-foreground">
            <X className="size-4" aria-hidden />
          </button>
        )}
      </label>
    </div>
  );
}

/* ---------------------------------- Puce ----------------------------------- */

function Chip({
  essai,
  dim,
  active,
  selected,
  onOpen,
  onToggle,
}: {
  essai: Essai;
  dim: boolean;
  active: boolean;
  selected: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const { sym } = metaOf(essai);
  const color = categoryMeta[essai.categorie].color;
  return (
    <div
      className={`chip group relative flex w-full items-center rounded-xl border bg-card transition-all duration-300 ${
        selected ? "border-ochre ring-2 ring-ochre/25" : active ? "border-navy" : "border-border hover:border-ochre hover:shadow-md"
      } ${dim ? "opacity-25 saturate-0" : "opacity-100"}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 p-2 text-left"
        aria-label={`Voir la fiche : ${essai.nom}`}
      >
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {sym}
        </span>
        <span className="line-clamp-2 text-[13px] leading-snug font-medium text-foreground">{essai.nom}</span>
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        aria-label={selected ? `Retirer ${essai.nom} du programme` : `Ajouter ${essai.nom} au programme`}
        className={`mr-2 flex size-7 shrink-0 items-center justify-center rounded-full transition-all ${
          selected
            ? "bg-ochre text-white"
            : "bg-secondary text-navy opacity-100 hover:bg-ochre hover:text-white lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
        }`}
      >
        {selected ? <Check className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
      </button>
    </div>
  );
}

/* --------------------------------- Matrice --------------------------------- */

type GridProps = {
  matches: Set<string>;
  activeId: string | null;
  selection: string[];
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
};

function Matrix({
  colonne,
  setColonne,
  ...props
}: GridProps & { colonne: Filtre; setColonne: (c: Filtre) => void }) {
  return (
    <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:block">
      <div className="grid grid-cols-[14rem_repeat(5,minmax(0,1fr))]">
        {/* Coin */}
        <div className="flex flex-col justify-end border-b border-border p-5">
          <span className="text-xs text-muted-foreground">Votre question ↓</span>
          <span className="text-xs text-muted-foreground">Le matériau →</span>
        </div>

        {/* En-têtes de colonnes */}
        {essaiCategories.map((c) => {
          const isActive = colonne === c;
          const color = categoryMeta[c].color;
          const n = essais.filter((e) => e.categorie === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setColonne(isActive ? "Tous" : c)}
              aria-pressed={isActive}
              className="group relative border-b border-l border-border p-5 pt-6 text-left transition-colors"
              style={{ backgroundColor: isActive ? color : `${color}14` }}
            >
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: color }} />
              <span className={`block font-display text-base font-semibold ${isActive ? "text-white" : "text-foreground"}`}>
                {categoryMeta[c].short}
              </span>
              <span className={`mt-0.5 block text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                {n} essais · {isActive ? "voir tout" : "filtrer"}
              </span>
            </button>
          );
        })}

        {/* Lignes */}
        {questions.map((q, qi) => {
          const rowTests = essais.filter((e) => metaOf(e).q === q.id);
          const rowLit = rowTests.some((e) => props.matches.has(e.id));
          return (
            <Row key={q.id} q={q} qi={qi} rowTests={rowTests} rowLit={rowLit} colonne={colonne} {...props} />
          );
        })}
      </div>
    </div>
  );
}

function Row({
  q,
  qi,
  rowTests,
  rowLit,
  colonne,
  matches,
  activeId,
  selection,
  onOpen,
  onToggle,
}: GridProps & {
  q: (typeof questions)[number];
  qi: number;
  rowTests: Essai[];
  rowLit: boolean;
  colonne: Filtre;
}) {
  return (
    <>
      <div className={`border-t border-border p-5 transition-opacity duration-300 ${rowLit ? "opacity-100" : "opacity-35"}`}>
        <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-ochre">
          <q.icon className="size-[18px]" aria-hidden />
        </span>
        <p className="mt-3 font-display text-base leading-snug font-semibold text-foreground">{q.ask}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {String(qi + 1).padStart(2, "0")} · {q.label}
        </p>
      </div>
      {essaiCategories.map((c) => {
        const cell = rowTests.filter((e) => e.categorie === c);
        const color = categoryMeta[c].color;
        const colDim = colonne !== "Tous" && colonne !== c;
        return (
          <div
            key={c}
            className={`flex flex-col gap-2 border-t border-l border-border p-3 transition-opacity duration-300 ${
              colDim ? "opacity-30" : ""
            }`}
            style={{ backgroundColor: `${color}0A` }}
          >
            {cell.length === 0 ? (
              <span className="m-auto h-px w-6 bg-border" aria-hidden />
            ) : (
              cell.map((e) => (
                <Chip
                  key={e.id}
                  essai={e}
                  dim={!matches.has(e.id)}
                  active={activeId === e.id}
                  selected={selection.includes(e.id)}
                  onOpen={() => onOpen(e.id)}
                  onToggle={() => onToggle(e.id)}
                />
              ))
            )}
          </div>
        );
      })}
    </>
  );
}

/* --------------------------- Liste (mobile/tablette) ----------------------- */

function MobileList({ matches, activeId, selection, onOpen, onToggle }: GridProps) {
  return (
    <div className="space-y-4 lg:hidden">
      <div className="flex flex-wrap gap-2">
        {essaiCategories.map((c) => (
          <span
            key={c}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-foreground"
            style={{ backgroundColor: `${categoryMeta[c].color}1F` }}
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: categoryMeta[c].color }} />
            {categoryMeta[c].short}
          </span>
        ))}
      </div>
      {questions.map((q) => {
        const tests = essais.filter((e) => metaOf(e).q === q.id);
        const lit = tests.some((e) => matches.has(e.id));
        return (
          <div key={q.id} className={`rounded-2xl border border-border bg-card p-4 transition-opacity ${lit ? "" : "opacity-40"}`}>
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-ochre">
                <q.icon className="size-[18px]" aria-hidden />
              </span>
              <div>
                <p className="font-display text-base leading-snug font-semibold text-foreground">{q.ask}</p>
                <p className="text-xs text-muted-foreground">{q.label}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {tests.map((e) => (
                <Chip
                  key={e.id}
                  essai={e}
                  dim={!matches.has(e.id)}
                  active={activeId === e.id}
                  selected={selection.includes(e.id)}
                  onOpen={() => onOpen(e.id)}
                  onToggle={() => onToggle(e.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- Fiche ---------------------------------- */

function DetailPanel({
  essai,
  selection,
  toggle,
  onClose,
}: {
  essai: Essai;
  selection: string[];
  toggle: (id: string) => void;
  onClose: () => void;
}) {
  const { sym, q } = metaOf(essai);
  const question = questions.find((x) => x.id === q);
  const color = categoryMeta[essai.categorie].color;
  const selected = selection.includes(essai.id);

  return (
    <div key={essai.id} className="flex min-h-full flex-col">
      <div className="relative overflow-hidden p-7 pb-8 text-white" style={{ backgroundColor: color }}>
        <div className="contour-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            {categoryMeta[essai.categorie].short}
          </span>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-full p-1.5 transition-colors hover:bg-white/15">
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <p className="relative mt-8 font-display text-7xl leading-none font-bold">{sym}</p>
        <h3 className="relative mt-4 font-display text-2xl leading-tight font-bold">{essai.nom}</h3>
      </div>

      <div className="flex flex-1 flex-col p-7">
        {question && (
          <div className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
            <question.icon className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
            <div>
              <p className="text-xs text-muted-foreground">Cet essai répond à la question</p>
              <p className="font-display font-semibold text-foreground">{question.ask}</p>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ce qu'il mesure</p>
        <p className="mt-2 leading-relaxed text-foreground">{essai.objet}</p>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-border px-4 py-3">
          <span className="text-sm text-muted-foreground">Norme de référence</span>
          <span className="font-mono text-sm font-semibold text-ochre">{essai.norme}</span>
        </div>

        <div className="mt-auto grid gap-2 pt-8">
          <button
            type="button"
            onClick={() => toggle(essai.id)}
            aria-pressed={selected}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
              selected ? "bg-ochre text-white hover:bg-earth" : "bg-navy text-white hover:bg-ochre"
            }`}
          >
            {selected ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            {selected ? "Ajouté à votre programme" : "Ajouter à mon programme"}
          </button>
          <a
            href={`/contact?essai=${essai.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-ochre hover:text-ochre"
          >
            Demander uniquement cet essai
          </a>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Parcours de l'échantillon ------------------------ */

function SampleJourney() {
  return (
    <section className="bg-navy text-white">
      <div className="contour-lines">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sand">03 — Traçabilité</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-5xl">
              Du prélèvement au procès-verbal, <span className="text-sand">chaque échantillon est suivi.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-steel">
              Les délais de chaque essai sont annoncés au devis. Les résultats critiques vous sont transmis
              dès leur validation, sans attendre le rapport complet.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map((step, i) => (
              <Reveal key={step.code} delay={i * 0.08}>
                <li className="sample-tag relative h-full rounded-xl bg-[#F4EFE6] p-5 pt-8 text-[#1A2233] shadow-xl">
                  <span className="absolute top-3 left-1/2 size-3 -translate-x-1/2 rounded-full bg-navy ring-2 ring-[#1A2233]/15" aria-hidden />
                  <div className="flex items-center justify-between border-b border-dashed border-[#1A2233]/20 pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#5B6475]">Étape</span>
                    <span className="font-mono text-sm font-bold text-ochre">{step.code}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5B6475]">{step.text}</p>
                  <p className="mt-4 font-mono text-[9px] tracking-widest text-[#5B6475]/70">
                    ECH-2026-{String(140 + i).padStart(4, "0")}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Programme sélectionné ------------------------- */

function SelectionTray({
  selection,
  toggle,
  clear,
}: {
  selection: string[];
  toggle: (id: string) => void;
  clear: () => void;
}) {
  if (selection.length === 0) return null;
  const items = selection.map((id) => essais.find((e) => e.id === id)).filter((e): e is Essai => Boolean(e));
  const href = `/contact?essai=${encodeURIComponent(selection.join(","))}`;

  return (
    <div
      className="tray-in fixed right-20 bottom-4 left-4 z-40 sm:right-24 lg:right-auto lg:left-1/2 lg:w-[min(56rem,calc(100vw-12rem))] lg:-translate-x-1/2"
      role="region"
      aria-label="Votre programme d'essais"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-navy-deep p-3 text-white shadow-2xl sm:flex-row sm:items-center sm:gap-4 sm:p-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="font-mono text-[10px] uppercase leading-tight tracking-widest whitespace-nowrap text-steel">
            Votre
            <br />
            programme
          </span>
          <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">
            {items.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => toggle(e.id)}
                title={`Retirer ${e.nom}`}
                className="group relative flex size-10 shrink-0 items-center justify-center rounded-md font-display text-sm font-bold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: categoryMeta[e.categorie].color }}
              >
                <span className="group-hover:opacity-0">{metaOf(e).sym}</span>
                <X className="absolute size-4 opacity-0 group-hover:opacity-100" aria-hidden />
                <span className="sr-only">Retirer {e.nom}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={clear} className="px-3 py-2.5 text-xs font-semibold text-steel transition-colors hover:text-white">
            Vider
          </button>
          <a
            href={href}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-ochre px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-sand hover:text-earth sm:flex-none"
          >
            Devis pour {items.length} essai{items.length > 1 ? "s" : ""}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes es-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.es-rise { opacity: 0; animation: es-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes hero-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
.hero-zoom { animation: hero-zoom 2.4s cubic-bezier(.2,.7,.2,1) both; }

@keyframes es-panel { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.es-panel { animation: es-panel .35s ease-out both; }

@keyframes chip-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.chip { animation: chip-in .45s cubic-bezier(.2,.7,.2,1) both; }

@keyframes tray-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
.tray-in > div { animation: tray-in .35s cubic-bezier(.2,.7,.2,1) both; }

@keyframes drawer-up { from { transform: translateY(100%); } to { transform: none; } }
@keyframes drawer-left { from { transform: translateX(100%); } to { transform: none; } }
.drawer-in { animation: drawer-up .4s cubic-bezier(.2,.7,.2,1) both; }
@media (min-width: 1024px) { .drawer-in { animation-name: drawer-left; } }
@keyframes drawer-fade { from { opacity: 0; } to { opacity: 1; } }
.drawer-fade { animation: drawer-fade .3s ease-out both; }

.sample-tag { transition: transform .4s cubic-bezier(.2,.7,.2,1); }
.sample-tag:hover { transform: translateY(-6px) rotate(-1.5deg); }

@media (prefers-reduced-motion: reduce) {
  .es-rise, .hero-zoom, .es-panel, .chip, .tray-in > div, .drawer-in, .drawer-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
  .sample-tag, .sample-tag:hover { transition: none; transform: none; }
}
`;