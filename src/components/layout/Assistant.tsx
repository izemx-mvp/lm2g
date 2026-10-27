import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, RotateCcw, Send, X } from "lucide-react";
import { site, waLink } from "@/config/site";
import { essais } from "@/data/essais";
import { faq } from "@/data/faq";
import { services } from "@/data/services";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Card = { title: string; subtitle?: string | undefined; tag?: string | undefined; href: string; image?: string | undefined };
type Action = { label: string; href: string; external?: boolean | undefined; primary?: boolean | undefined };
type BotReply = { text: string; cards?: Card[] | undefined; quick?: string[] | undefined; actions?: Action[] | undefined };
type Msg = BotReply & { id: number; from: "bot" | "user" };
type Flow = {
  step: "nom" | "tel" | "type" | "ville";
  nom?: string | undefined;
  tel?: string | undefined;
  type?: string | undefined;
  slug?: string | undefined;
};

/* -------------------------------------------------------------------------- */
/*                         Moteur de réponses (local)                          */
/* -------------------------------------------------------------------------- */

const ROOT_QUICK = ["Nos services", "Faire une étude de sol", "Liste des essais", "Délais & devis", "Nous contacter"];
const START_DEVIS = "Lancer ma demande de devis";
const CANCEL = "Annuler";
const UNSURE = "Je ne sais pas encore";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[’']/g, " ");
const has = (t: string, words: string[]) => words.some((w) => t.includes(w));

const STOP = new Set([
  "essai", "essais", "test", "tests", "faire", "quel", "quelle", "quels", "pour", "votre", "vous", "mon", "une",
  "des", "les", "sur", "avec", "est", "qui", "que", "comment", "faut", "il", "dans", "par", "aux", "nous", "mes",
  "avez", "pouvez", "fait", "faites", "bonjour", "merci", "besoin", "voudrais", "veux", "cherche",
  "une", "sol", "sols", "etude", "etudes", "projet", "nos", "service", "services", "liste", "entre",
]);

const serviceCard = (slug: string): Card | null => {
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.titleShort, subtitle: s.tagline, href: `/services/${s.slug}`, image: s.image } : null;
};
const cards = (...slugs: string[]) => slugs.map(serviceCard).filter((c): c is Card => Boolean(c));

const contactActions: Action[] = [
  { label: `Appeler le ${site.phone}`, href: `tel:${site.phoneIntl}`, primary: true },
  { label: "Écrire sur WhatsApp", href: waLink("Bonjour LM2G, j'ai une question."), external: true },
];

const WELCOME: BotReply = {
  text:
    "Bonjour 👋 Je suis l'assistant de LM2G. Je peux vous orienter vers la bonne prestation, vous présenter nos essais ou préparer votre demande de devis.",
  quick: ROOT_QUICK,
};

function findEssais(q: string) {
  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length >= 2 && !STOP.has(t));
  if (!tokens.length) return [];
  return essais
    .filter((e) => {
      const hay = norm(`${e.nom} ${e.norme}`);
      return tokens.some((t) => (t.length >= 3 ? hay.includes(t) : hay.split(/[^a-z0-9]+/).includes(t)));
    })
    .slice(0, 4);
}

function reply(input: string): BotReply {
  const q = norm(input);

  if (has(q, ["bonjour", "salut", "salam", "bonsoir", "hello", "coucou"]) && q.length < 25) return WELCOME;

  if (q === norm("Délais & devis") || has(q, ["devis", "prix", "tarif", "cout", "combien", "delai", "budget"])) {
    return {
      text:
        "Chaque devis est établi sur mesure : il dépend du type d'ouvrage, de la surface, du nombre de sondages et des essais nécessaires. Les délais sont annoncés dans la proposition. Je peux préparer votre demande en 4 questions.",
      quick: [START_DEVIS, "Nos services"],
    };
  }

  if (q === norm("Nous contacter") || has(q, ["telephone", "appeler", "adresse", "horaire", "email", "mail", "contact", "joindre", "whatsapp", "numero"])) {
    return {
      text: `Vous pouvez nous joindre au ${site.phone} (mobile) ou au ${site.phoneFixe} (fixe), par e-mail à ${site.email}. Notre laboratoire se trouve à ${site.address}. Horaires : ${site.hours}.`,
      actions: contactActions,
      quick: [START_DEVIS],
    };
  }

  if (has(q, ["ville", "region", "intervenez", "deplac", "zone", "partout", "tanger", "marrakech", "agadir", "rabat", "fes"])) {
    return {
      text:
        "Notre laboratoire est à Casablanca, et nos équipes interviennent sur l'ensemble du Maroc : bâtiment, routes, ouvrages d'art, barrages et projets industriels.",
      quick: [START_DEVIS, "Nos services"],
    };
  }

  if (has(q, ["fissure", "tassement", "desordre", "pathologie", "amo", "diagnostic", "g5", "expertise", "affaissement"])) {
    return {
      text:
        "Pour un ouvrage qui présente des désordres (fissures, tassements, chaussée dégradée), nous réalisons un diagnostic : visite, reconnaissances et essais ciblés, puis un rapport qui identifie la cause et hiérarchise les solutions.",
      cards: cards("expertise-assistance"),
      quick: [START_DEVIS, "Nous contacter"],
    };
  }

  if (/\bg[123]\b/.test(q) || has(q, ["mission g"])) {
    return {
      text:
        "La G1 intervient en faisabilité ou avant l'achat d'un terrain. La G2 accompagne la conception et fixe les principes de fondation. La G3 adapte le projet géotechnique pendant l'exécution. La G5 est un diagnostic sur ouvrage existant.",
      cards: cards("etudes-geotechniques"),
      quick: [START_DEVIS, "Liste des essais"],
    };
  }

  if (has(q, ["controle", "compactage", "chantier", "fouille", "reception", "suivi", "beton livre"])) {
    return {
      text:
        "Nos contrôleurs interviennent sur vos chantiers : compactage couche par couche, réception et suivi des bétons, expertise des fonds de fouilles. Chaque intervention donne lieu à un procès-verbal.",
      cards: cards("controle-qualite"),
      quick: [START_DEVIS, "Liste des essais"],
    };
  }

  const found = q === norm("Liste des essais") ? [] : findEssais(q);
  if (found.length) {
    return {
      text:
        found.length === 1
          ? `Oui, nous réalisons cet essai. ${found[0]?.objet ?? ""}`
          : "Voici les essais qui correspondent à votre recherche :",
      cards: found.map((e) => ({
        title: e.nom,
        subtitle: e.norme,
        tag: e.categorie,
        href: `/essais?q=${encodeURIComponent(e.nom)}`,
      })),
      quick: [START_DEVIS, "Liste des essais"],
    };
  }

  if (q === norm("Liste des essais") || has(q, ["essai", "catalogue", "laboratoire", "test", "norme", "granulat", "enrobe", "beton"])) {
    return {
      text: `Notre catalogue compte ${essais.length} essais normalisés, classés par matériau (sols, granulats, bétons, enrobés, terrain en place) et par question : identification, portance, résistance, tassement, perméabilité.`,
      cards: [{ title: "Le tableau des essais", subtitle: "Trouvez l'essai qui répond à votre question", href: "/essais" }],
      quick: [START_DEVIS, "Faire une étude de sol"],
    };
  }

  if (q === norm("Faire une étude de sol") || has(q, ["etude", "sol", "geotech", "fondation", "sondage", "terrain", "construire", "batir", "immeuble", "villa", "maison"])) {
    return {
      text:
        "Une étude de sol identifie la nature des terrains et leurs caractéristiques pour dimensionner des fondations adaptées. Elle comprend des sondages, des essais en laboratoire et un rapport avec des recommandations claires.",
      cards: cards("etudes-geotechniques"),
      quick: [START_DEVIS, "Différence entre G1, G2 et G3 ?"],
    };
  }

  if (q === norm("Nos services") || has(q, ["service", "prestation", "proposez", "activite", "quoi"])) {
    return {
      text: "LM2G intervient sur quatre expertises complémentaires, de l'étude préalable jusqu'à la réception :",
      cards: cards(...services.map((s) => s.slug)),
      quick: [START_DEVIS, "Liste des essais"],
    };
  }

  // FAQ : meilleure question par mots communs
  const qTokens = new Set(q.split(/[^a-z0-9]+/).filter((t) => t.length >= 4 && !STOP.has(t)));
  let best: { score: number; i: number } = { score: 0, i: -1 };
  faq.forEach((f, i) => {
    const score = norm(f.question)
      .split(/[^a-z0-9]+/)
      .filter((t) => qTokens.has(t)).length;
    if (score > best.score) best = { score, i };
  });
  const bestFaq = faq[best.i];
  if (best.score >= 2 && bestFaq) return { text: bestFaq.reponse, quick: [START_DEVIS, "Nos services"] };

  return {
    text:
      "Je ne suis pas sûr de bien comprendre. Pour une réponse précise, un ingénieur peut vous répondre directement. Vous pouvez aussi choisir un sujet ci-dessous.",
    actions: contactActions,
    quick: ROOT_QUICK,
  };
}

/* -------------------------------------------------------------------------- */
/*                                  Composant                                 */
/* -------------------------------------------------------------------------- */

let uid = 0;
const nextId = () => ++uid;

export function AssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>(() => [{ id: nextId(), from: "bot", ...WELCOME }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [flow, setFlow] = useState<Flow | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const botSay = (r: BotReply, delay = 550) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), from: "bot", ...r }]);
    }, delay);
  };

  /** Parcours devis en 4 questions. */
  const handleFlow = (text: string, f: Flow) => {
    if (norm(text) === norm(CANCEL)) {
      setFlow(null);
      botSay({ text: "Pas de souci, demande annulée. Puis-je vous aider autrement ?", quick: ROOT_QUICK });
      return;
    }
    if (f.step === "nom") {
      setFlow({ ...f, step: "tel", nom: text.trim() });
      botSay({ text: `Merci ${text.trim().split(" ")[0]}. Quel est votre numéro de téléphone ?`, quick: [CANCEL] });
      return;
    }
    if (f.step === "tel") {
      if (text.replace(/\D/g, "").length < 9) {
        botSay({ text: "Ce numéro semble incomplet. Pouvez-vous le vérifier ? (ex. 06 12 34 56 78)", quick: [CANCEL] });
        return;
      }
      setFlow({ ...f, step: "type", tel: text.trim() });
      botSay({ text: "Quelle prestation vous intéresse ?", quick: [...services.map((s) => s.titleShort), UNSURE] });
      return;
    }
    if (f.step === "type") {
      const s = services.find((x) => norm(x.titleShort) === norm(text) || norm(x.title) === norm(text));
      setFlow({ ...f, step: "ville", type: s ? s.title : text.trim(), slug: s?.slug });
      botSay({ text: "Dernière question : dans quelle ville se situe votre projet ?", quick: ["Casablanca", "Rabat", "Berrechid", CANCEL] });
      return;
    }
    // ville → récapitulatif
    const done = { ...f, ville: text.trim() };
    setFlow(null);
    const msg = [
      "Bonjour LM2G, je souhaite demander un devis.",
      "",
      `Nom : ${done.nom}`,
      `Téléphone : ${done.tel}`,
      `Prestation : ${done.type}`,
      `Ville du projet : ${done.ville}`,
    ].join("\n");
    botSay(
      {
        text: `Parfait, votre demande est prête :\n• ${done.nom} · ${done.tel}\n• ${done.type}\n• ${done.ville}\n\nEnvoyez-la sur WhatsApp, ou complétez le formulaire pour ajouter les détails du projet.`,
        actions: [
          { label: "Envoyer sur WhatsApp", href: waLink(msg), external: true, primary: true },
          { label: "Compléter le formulaire", href: done.slug ? `/contact?service=${done.slug}` : "/contact" },
        ],
        quick: ["Nos services"],
      },
      800,
    );
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
    setInput("");

    if (flow) {
      handleFlow(text, flow);
      return;
    }
    if (norm(text) === norm(START_DEVIS) || has(norm(text), ["demande de devis", "demander un devis", "je veux un devis"])) {
      setFlow({ step: "nom" });
      botSay({ text: "Avec plaisir ! Commençons : quel est votre nom ?", quick: [CANCEL] });
      return;
    }
    botSay(reply(text));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const goTo = (href: string) => {
    router.history.push(href);
    if (window.innerWidth < 640) onClose();
  };

  const reset = () => {
    setFlow(null);
    setTyping(false);
    setMessages([{ id: nextId(), from: "bot", ...WELCOME }]);
  };

  const last = messages[messages.length - 1];
  const placeholder =
    flow?.step === "nom"
      ? "Votre nom…"
      : flow?.step === "tel"
        ? "Votre numéro de téléphone…"
        : flow?.step === "ville"
          ? "Ville du projet…"
          : "Posez votre question…";

  if (!open) return null;

  return (
    <div
      className="as-in fixed inset-0 z-[55] flex flex-col overflow-hidden bg-background sm:inset-auto sm:right-5 sm:bottom-24 sm:h-[min(40rem,calc(100vh-8rem))] sm:w-[24rem] sm:rounded-3xl sm:border sm:border-border sm:shadow-2xl"
      role="dialog"
      aria-label="Assistant LM2G"
    >
      <style>{styles}</style>

      {/* En-tête (verre navy) */}
      <div className="relative flex items-center gap-3 bg-navy-deep/95 px-4 py-3.5 text-white backdrop-blur-xl">
        <div className="contour-lines absolute inset-0 opacity-30" aria-hidden />
        <span className="relative flex size-10 items-center justify-center rounded-full bg-white font-display text-xs font-bold text-navy ring-2 ring-ochre">
          LM<span className="text-ochre">2</span>G
        </span>
        <div className="relative min-w-0 flex-1">
          <p className="font-display font-semibold leading-tight">Assistant LM2G</p>
          <p className="flex items-center gap-1.5 text-xs text-steel">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Réponses instantanées
          </p>
        </div>
        <button type="button" onClick={reset} aria-label="Recommencer la conversation" className="relative rounded-full p-2 text-steel transition-colors hover:bg-white/10 hover:text-white">
          <RotateCcw className="size-4" aria-hidden />
        </button>
        <button type="button" onClick={onClose} aria-label="Fermer l'assistant" className="relative rounded-full p-2 text-steel transition-colors hover:bg-white/10 hover:text-white">
          <X className="size-5" aria-hidden />
        </button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-secondary/40 px-4 py-5" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`as-msg flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] ${m.from === "user" ? "" : "w-full"}`}>
              <p
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  m.from === "user"
                    ? "rounded-br-md bg-navy text-white"
                    : "rounded-bl-md border border-border bg-card text-foreground"
                }`}
              >
                {m.text}
              </p>

              {m.cards && m.cards.length > 0 && (
                <div className="mt-2 space-y-2">
                  {m.cards.map((c) => (
                    <a
                      key={c.href + c.title}
                      href={c.href}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(c.href);
                      }}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-2.5 transition-colors hover:border-ochre"
                    >
                      {c.image && <img src={c.image} alt="" aria-hidden className="size-11 shrink-0 rounded-lg object-cover" />}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-foreground group-hover:text-ochre">{c.title}</span>
                        {c.subtitle && (
                          <span className={`block truncate text-xs text-muted-foreground ${c.tag ? "font-mono" : ""}`}>{c.subtitle}</span>
                        )}
                      </span>
                      {c.tag && (
                        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-navy">{c.tag}</span>
                      )}
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-ochre" aria-hidden />
                    </a>
                  ))}
                </div>
              )}

              {m.actions && m.actions.length > 0 && (
                <div className="mt-2 grid gap-2">
                  {m.actions.map((a) => {
                    const internal = a.href.startsWith("/");
                    return (
                      <a
                        key={a.label}
                        href={a.href}
                        {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={
                          internal
                            ? (e) => {
                                e.preventDefault();
                                goTo(a.href);
                              }
                            : undefined
                        }
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                          a.primary
                            ? a.label.includes("WhatsApp")
                              ? "bg-whatsapp text-white hover:opacity-90"
                              : "bg-ochre text-white hover:bg-navy"
                            : "border border-border bg-card text-foreground hover:border-ochre hover:text-ochre"
                        }`}
                      >
                        {a.label.includes("WhatsApp") ? (
                          <MessageCircle className="size-4" aria-hidden />
                        ) : a.href.startsWith("tel:") ? (
                          <Phone className="size-4" aria-hidden />
                        ) : (
                          <ArrowRight className="size-4" aria-hidden />
                        )}
                        {a.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start" aria-label="L'assistant écrit">
            <div className="flex gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="as-dot size-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* Réponses rapides (sous le dernier message du bot) */}
        {!typing && last?.from === "bot" && last.quick && last.quick.length > 0 && (
          <div className="as-msg flex flex-wrap gap-2">
            {last.quick.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  q === START_DEVIS
                    ? "border-ochre bg-ochre text-white hover:bg-navy hover:border-navy"
                    : "border-border bg-card text-foreground hover:border-ochre hover:text-ochre"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Saisie */}
      <form onSubmit={onSubmit} className="border-t border-border bg-card p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-background pr-1.5 pl-4 transition-colors focus-within:border-ochre">
          <label htmlFor="assistant-input" className="sr-only">
            Votre message
          </label>
          <input
            ref={inputRef}
            id="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            inputMode={flow?.step === "tel" ? "tel" : "text"}
            maxLength={400}
            className="h-11 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Envoyer"
            className="flex size-9 items-center justify-center rounded-xl bg-navy text-white transition-colors hover:bg-ochre disabled:opacity-40"
          >
            <Send className="size-4" aria-hidden />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Réponses automatiques indicatives · un ingénieur au {site.phone}
        </p>
      </form>
    </div>
  );
}

const styles = `
@keyframes as-in { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: none; } }
.as-in { animation: as-in .3s cubic-bezier(.2,.7,.2,1) both; transform-origin: bottom right; }
@keyframes as-msg { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.as-msg { animation: as-msg .3s ease-out both; }
@keyframes as-dot { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
.as-dot { animation: as-dot 1.1s infinite ease-in-out; }
@media (prefers-reduced-motion: reduce) { .as-in, .as-msg, .as-dot { animation: none !important; } }
`;