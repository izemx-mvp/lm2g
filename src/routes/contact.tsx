import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Droplets,
  Factory,
  HelpCircle,
  LandPlot,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Route as RouteIcon,
  Waypoints,
  X,
  type LucideIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui/Reveal";
import { site, waLink } from "@/config/site";
import { essais, type Essai } from "@/data/essais";
import { services } from "@/data/services";
import buildingWorks from "@/assets/building-works.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Devis études géotechniques & essais à Casablanca | LM2G" },
      {
        name: "description",
        content:
          "Contactez LM2G à Casablanca : demande de devis pour études géotechniques, essais de laboratoire et contrôle qualité. Téléphone, WhatsApp, e-mail et formulaire.",
      },
      { property: "og:title", content: "Contact — Demande de devis | LM2G Casablanca" },
      {
        property: "og:description",
        content:
          "Études géotechniques, essais, contrôle qualité : demandez votre devis par téléphone, WhatsApp, e-mail ou formulaire.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

/* -------------------------------------------------------------------------- */
/*                                   Données                                  */
/* -------------------------------------------------------------------------- */

const AUTRE = "autre";

const prestations = [
  ...services.map((s) => ({ value: s.slug, label: s.titleShort })),
  { value: AUTRE, label: "Je ne sais pas encore" },
];

const ouvrages: { label: string; icon: LucideIcon }[] = [
  { label: "Bâtiment", icon: Building2 },
  { label: "Route / voirie", icon: RouteIcon },
  { label: "Ouvrage d'art", icon: Waypoints },
  { label: "Barrage / hydraulique", icon: Droplets },
  { label: "Lotissement / VRD", icon: LandPlot },
  { label: "Industriel", icon: Factory },
  { label: "Autre", icon: HelpCircle },
];

const stades = ["Achat du terrain", "Conception", "Chantier en cours", "Ouvrage existant"];

const steps = [
  { depth: "0 m", title: "Votre besoin" },
  { depth: "5 m", title: "Votre projet" },
  { depth: "10 m", title: "Vos coordonnées" },
];

const MAX_MESSAGE = 1500;

/** Fiche Google Maps officielle de LM2G (épingle exacte du laboratoire). */
const MAP_URL = "https://maps.app.goo.gl/T7Pbnp6sNVo41wUp7";
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.1831803127666!2d-7.688786524304958!3d33.54861667335067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d2fab83c4f7%3A0x788f28be4be08cec!2sLM2G!5e0!3m2!1sfr!2sma!4v1793105632313!5m2!1sfr!2sma";

type FormState = {
  prestation: string;
  essais: string[];
  ouvrage: string;
  stade: string;
  ville: string;
  message: string;
  nom: string;
  societe: string;
  telephone: string;
  email: string;
};

const initialForm: FormState = {
  prestation: "",
  essais: [],
  ouvrage: "",
  stade: "",
  ville: "",
  message: "",
  nom: "",
  societe: "",
  telephone: "",
  email: "",
};

type Errors = { [K in keyof FormState]?: string | undefined };

const essaiById = (id: string): Essai | undefined => essais.find((e) => e.id === id);
const prestationLabel = (v: string) => prestations.find((p) => p.value === v)?.label ?? "";

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  // Préremplissage depuis ?service= et ?essai=id1,id2 (liens des autres pages)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const ids = (params.get("essai") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter((id) => id && essaiById(id));
    setForm((f) => ({
      ...f,
      prestation:
        service && prestations.some((p) => p.value === service)
          ? service
          : ids.length
            ? "essais-laboratoire"
            : f.prestation,
      essais: ids.length ? ids : f.essais,
    }));
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(s: number): boolean {
    const next: Errors = {};
    if (s === 0 && !form.prestation) next.prestation = "Choisissez une prestation (ou « Je ne sais pas encore »).";
    if (s === 1) {
      if (!form.message.trim()) next.message = "Décrivez brièvement votre projet.";
      if (form.message.length > MAX_MESSAGE) next.message = `Maximum ${MAX_MESSAGE} caractères.`;
    }
    if (s === 2) {
      if (!form.nom.trim()) next.nom = "Veuillez indiquer votre nom.";
      if (!form.telephone.trim()) next.telephone = "Veuillez indiquer un numéro de téléphone.";
      else if (form.telephone.replace(/\D/g, "").length < 9) next.telephone = "Numéro de téléphone incomplet.";
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        next.email = "Adresse e-mail invalide.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const nextStep = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const message = useMemo(() => {
    const essaisNoms = form.essais.map((id) => essaiById(id)?.nom).filter(Boolean);
    return [
      "Bonjour LM2G, je souhaite demander un devis.",
      "",
      `Prestation : ${prestationLabel(form.prestation) || "—"}`,
      essaisNoms.length ? `Essais souhaités : ${essaisNoms.join(", ")}` : null,
      form.ouvrage ? `Type d'ouvrage : ${form.ouvrage}` : null,
      form.stade ? `Stade du projet : ${form.stade}` : null,
      form.ville.trim() ? `Ville du projet : ${form.ville.trim()}` : null,
      "",
      `Projet : ${form.message.trim()}`,
      "",
      `Nom : ${form.nom.trim()}`,
      form.societe.trim() ? `Société : ${form.societe.trim()}` : null,
      `Téléphone : ${form.telephone.trim()}`,
      form.email.trim() ? `E-mail : ${form.email.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
  }, [form]);

  const send = (channel: "whatsapp" | "email") => {
    if (!validate(2)) return;
    if (channel === "whatsapp") {
      window.open(waLink(message), "_blank", "noopener,noreferrer");
    } else {
      const subject = `Demande de devis — ${prestationLabel(form.prestation) || "LM2G"}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
    setSent(channel);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(0);
    setSent(null);
  };

  return (
    <>
      <style>{pageStyles}</style>
      <Hero />

      <section id="devis" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          {/* Formulaire guidé */}
          <div className="rounded-3xl border border-border bg-card shadow-sm">
            {sent ? (
              <SuccessState channel={sent} onReset={reset} />
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step < steps.length - 1) nextStep();
                  else send("whatsapp");
                }}
              >
                <Progress step={step} setStep={(s) => (s < step ? setStep(s) : undefined)} />

                <div key={step} className="ct-step p-6 sm:p-8">
                  {step === 0 && <StepBesoin form={form} update={update} errors={errors} />}
                  {step === 1 && <StepProjet form={form} update={update} errors={errors} />}
                  {step === 2 && <StepCoordonnees form={form} update={update} errors={errors} />}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      <ArrowLeft className="size-4" aria-hidden />
                      Retour
                    </button>
                  ) : (
                    <p className="text-xs text-muted-foreground">Environ 1 minute · aucune donnée stockée sur ce site</p>
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ochre"
                    >
                      Continuer
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => send("email")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-ochre hover:text-ochre"
                      >
                        <Mail className="size-4" aria-hidden />
                        Envoyer par e-mail
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        <MessageCircle className="size-4" aria-hidden />
                        Envoyer sur WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Récapitulatif en direct */}
          <aside className="lg:sticky lg:top-28">
            <Summary form={form} step={step} onRemoveEssai={(id) => update("essais", form.essais.filter((x) => x !== id))} />
          </aside>
        </div>
      </section>

      <FindUs />
    </>
  );
}

/* ---------------------------------- Hero ----------------------------------- */

function Hero() {
  const actions = [
    {
      icon: Phone,
      label: "Appeler",
      value: site.phone,
      href: `tel:${site.phoneIntl}`,
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Réponse la plus rapide",
      href: waLink("Bonjour LM2G, je souhaite demander un devis pour mon projet."),
      external: true,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={buildingWorks}
        alt="Chantier de construction d'un immeuble à Casablanca"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="ct-zoom absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 lg:px-8 lg:pt-40">
        <nav aria-label="Fil d'Ariane" className="ct-rise font-mono text-[11px] uppercase tracking-widest text-steel/70">
          <Link to="/" className="transition-colors hover:text-sand">
            Accueil
          </Link>
          <span className="mx-2 text-steel/40">/</span>
          <span className="text-sand">Contact</span>
        </nav>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="ct-rise block" style={{ animationDelay: "80ms" }}>
            Parlons de
          </span>
          <span className="ct-rise block text-sand" style={{ animationDelay: "180ms" }}>
            votre sol.
          </span>
        </h1>
        <p className="ct-rise mt-7 max-w-xl text-lg leading-relaxed text-steel" style={{ animationDelay: "280ms" }}>
          Une question rapide ? Appelez-nous ou écrivez sur WhatsApp. Un projet à chiffrer ? Remplissez
          la demande de devis guidée ci-dessous.
        </p>

        <div className="ct-rise mt-12 grid gap-3 sm:grid-cols-3" style={{ animationDelay: "380ms" }}>
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-navy-deep/70 p-4 transition-colors hover:border-sand"
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                  a.label === "WhatsApp" ? "bg-whatsapp" : "bg-ochre"
                }`}
              >
                <a.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-semibold">{a.label}</span>
                <span className="block truncate text-sm text-steel">{a.value}</span>
              </span>
              <ArrowRight className="ml-auto size-4 shrink-0 text-steel transition-all group-hover:translate-x-1 group-hover:text-sand" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Progression ------------------------------- */

function Progress({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  return (
    <div className="border-b border-border p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Demande de devis</h2>
        <span className="font-mono text-xs text-muted-foreground">
          Étape {step + 1} / {steps.length}
        </span>
      </div>
      <ol className="mt-6 grid grid-cols-3 gap-2">
        {steps.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
                disabled={i >= step}
                className="w-full text-left disabled:cursor-default"
              >
                <span className="block h-2 overflow-hidden rounded-full bg-secondary">
                  <span
                    className={`block h-full rounded-full transition-all duration-500 ${
                      done ? "w-full bg-ochre" : current ? "w-1/2 bg-sand" : "w-0"
                    }`}
                  />
                </span>
                <span className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">−{s.depth}</span>
                  <span
                    className={`truncate text-sm font-semibold ${
                      current ? "text-foreground" : done ? "text-ochre" : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------------------------- Étapes --------------------------------- */

type StepProps = {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  errors: Errors;
};

function FieldError({ msg }: { msg?: string | undefined }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-2 text-sm text-destructive">
      {msg}
    </p>
  );
}

function ChoiceChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
        active ? "border-navy bg-navy text-white" : "border-border bg-background text-foreground hover:border-ochre"
      }`}
    >
      {children}
    </button>
  );
}

function StepBesoin({ form, update, errors }: StepProps) {
  return (
    <div>
      <p className="font-display text-xl font-semibold text-foreground">De quoi avez-vous besoin ?</p>
      <p className="mt-1 text-sm text-muted-foreground">Une hésitation ? Choisissez « Je ne sais pas encore », nous vous orienterons.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Prestation">
        {prestations.map((p) => {
          const active = form.prestation === p.value;
          const service = services.find((s) => s.slug === p.value);
          return (
            <button
              key={p.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => update("prestation", p.value)}
              className={`flex items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                active ? "border-ochre bg-ochre/[0.06] ring-2 ring-ochre/25" : "border-border hover:border-ochre"
              } ${p.value === AUTRE ? "sm:col-span-2" : ""}`}
            >
              {service ? (
                <img src={service.image} alt="" aria-hidden className="size-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-navy">
                  <HelpCircle className="size-6" aria-hidden />
                </span>
              )}
              <span className="flex-1 font-display font-semibold text-foreground">{p.label}</span>
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  active ? "border-ochre bg-ochre" : "border-border"
                }`}
                aria-hidden
              >
                {active && <span className="size-1.5 rounded-full bg-white" />}
              </span>
            </button>
          );
        })}
      </div>
      <FieldError msg={errors.prestation} />

      {form.essais.length > 0 && (
        <div className="mt-6 rounded-2xl bg-secondary p-4">
          <p className="text-sm font-semibold text-foreground">
            Essais sélectionnés depuis le catalogue ({form.essais.length})
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {form.essais.map((id) => {
              const e = essaiById(id);
              if (!e) return null;
              return (
                <span key={id} className="flex items-center gap-1.5 rounded-full bg-card py-1 pr-1.5 pl-3 text-xs font-medium text-foreground">
                  {e.nom}
                  <button
                    type="button"
                    onClick={() => update("essais", form.essais.filter((x) => x !== id))}
                    aria-label={`Retirer ${e.nom}`}
                    className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X className="size-3" aria-hidden />
                  </button>
                </span>
              );
            })}
          </div>
          <Link to="/essais" className="mt-3 inline-block text-xs font-semibold text-navy hover:text-ochre">
            Modifier dans le catalogue →
          </Link>
        </div>
      )}
    </div>
  );
}

function StepProjet({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="font-display text-xl font-semibold text-foreground">Parlez-nous de votre projet</p>
        <p className="mt-1 text-sm text-muted-foreground">Ces informations nous permettent de préparer une proposition juste.</p>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Type d'ouvrage</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ouvrages.map((o) => (
            <ChoiceChip key={o.label} active={form.ouvrage === o.label} onClick={() => update("ouvrage", form.ouvrage === o.label ? "" : o.label)}>
              <o.icon className="size-4" aria-hidden />
              {o.label}
            </ChoiceChip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Où en est le projet ?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {stades.map((s) => (
            <ChoiceChip key={s} active={form.stade === s} onClick={() => update("stade", form.stade === s ? "" : s)}>
              {s}
            </ChoiceChip>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="ville">Ville ou commune du projet</Label>
        <Input
          id="ville"
          value={form.ville}
          onChange={(e) => update("ville", e.target.value)}
          placeholder="Ex. Casablanca, Berrechid, Settat…"
          maxLength={80}
          className="h-12"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Décrivez votre projet *</Label>
        <Textarea
          id="message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Ex. Immeuble R+4 avec un sous-sol sur un terrain de 600 m², démarrage prévu dans 3 mois."
          aria-invalid={!!errors.message}
        />
        <div className="flex items-start justify-between gap-3">
          <FieldError msg={errors.message} />
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">
            {form.message.length}/{MAX_MESSAGE}
          </span>
        </div>
      </div>
    </div>
  );
}

function StepCoordonnees({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-xl font-semibold text-foreground">Comment vous joindre ?</p>
        <p className="mt-1 text-sm text-muted-foreground">Un ingénieur vous rappelle pour préciser votre besoin.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="nom">Nom complet *</Label>
          <Input id="nom" autoComplete="name" maxLength={100} value={form.nom} onChange={(e) => update("nom", e.target.value)} aria-invalid={!!errors.nom} className="h-12" />
          <FieldError msg={errors.nom} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="societe">Société (facultatif)</Label>
          <Input id="societe" autoComplete="organization" maxLength={120} value={form.societe} onChange={(e) => update("societe", e.target.value)} className="h-12" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input
            id="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="06 00 00 00 00"
            value={form.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            aria-invalid={!!errors.telephone}
            className="h-12"
          />
          <FieldError msg={errors.telephone} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail (facultatif)</Label>
          <Input id="email" type="email" autoComplete="email" maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} className="h-12" />
          <FieldError msg={errors.email} />
        </div>
      </div>
      <p className="rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
        Votre demande s'ouvre dans WhatsApp ou dans votre messagerie, préremplie avec ces informations.
        Vous la relisez avant de l'envoyer.
      </p>
    </div>
  );
}

/* ----------------------------- Récapitulatif ------------------------------- */

function Summary({ form, step, onRemoveEssai }: { form: FormState; step: number; onRemoveEssai: (id: string) => void }) {
  const ready = !!form.prestation && !!form.message.trim() && !!form.nom.trim() && !!form.telephone.trim();
  const rows: { k: string; v: string }[] = [
    { k: "Prestation", v: prestationLabel(form.prestation) },
    { k: "Ouvrage", v: form.ouvrage },
    { k: "Stade", v: form.stade },
    { k: "Ville", v: form.ville.trim() },
    { k: "Contact", v: [form.nom.trim(), form.societe.trim()].filter(Boolean).join(" · ") },
    { k: "Téléphone", v: form.telephone.trim() },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-1 rounded-2xl bg-secondary" aria-hidden />
      <div className="relative rounded-2xl border border-border bg-[#FFFEFB] p-6 text-[#1A2233] shadow-lg">
        <div className="flex items-start justify-between border-b border-dashed border-[#1A2233]/15 pb-4">
          <div>
            <p className="font-display text-xl font-bold text-navy">
              LM<span className="text-ochre">2</span>G
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#5B6475]">Votre demande</p>
          </div>
          <span
            className={`rounded border-2 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest transition-all ${
              ready ? "-rotate-6 border-ochre text-ochre" : "border-[#1A2233]/20 text-[#5B6475]"
            }`}
          >
            {ready ? "PRÊTE" : "BROUILLON"}
          </span>
        </div>

        <dl className="mt-4 space-y-2.5">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-4 text-sm">
              <dt className="shrink-0 text-[#5B6475]">{r.k}</dt>
              <dd className={`text-right font-medium ${r.v ? "" : "text-[#1A2233]/25"}`}>{r.v || "—"}</dd>
            </div>
          ))}
        </dl>

        {form.essais.length > 0 && (
          <div className="mt-4 border-t border-dashed border-[#1A2233]/15 pt-4">
            <p className="text-sm text-[#5B6475]">Essais ({form.essais.length})</p>
            <ul className="mt-2 space-y-1.5">
              {form.essais.map((id) => {
                const e = essaiById(id);
                if (!e) return null;
                return (
                  <li key={id} className="group flex items-center justify-between gap-2 text-sm">
                    <span className="truncate">{e.nom}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveEssai(id)}
                      aria-label={`Retirer ${e.nom}`}
                      className="shrink-0 rounded p-0.5 text-[#5B6475] opacity-60 transition-opacity hover:opacity-100"
                    >
                      <X className="size-3.5" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {form.message.trim() && (
          <div className="mt-4 border-t border-dashed border-[#1A2233]/15 pt-4">
            <p className="text-sm text-[#5B6475]">Projet</p>
            <p className="mt-1 line-clamp-4 text-sm leading-relaxed">{form.message.trim()}</p>
          </div>
        )}

        <div className="mt-5 flex gap-1" aria-hidden>
          {steps.map((s, i) => (
            <span key={s.title} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-ochre" : "bg-[#1A2233]/10"}`} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 px-1">
        <Clock className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Nous revenons vers vous avec une proposition technique et commerciale détaillée.{" "}
          <span className="text-foreground">{site.hours}</span>
        </p>
      </div>
    </div>
  );
}

/* --------------------------------- Succès ---------------------------------- */

function SuccessState({ channel, onReset }: { channel: "whatsapp" | "email"; onReset: () => void }) {
  return (
    <div className="ct-step flex flex-col items-center px-6 py-16 text-center sm:px-10">
      <span className="flex size-16 items-center justify-center rounded-full bg-ochre/10 text-ochre">
        <CheckCircle2 className="size-8" aria-hidden />
      </span>
      <h2 className="mt-6 font-display text-3xl font-bold text-foreground">Votre demande est prête</h2>
      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
        {channel === "whatsapp"
          ? "WhatsApp s'est ouvert avec votre demande préremplie : relisez le message et envoyez-le."
          : "Votre messagerie s'est ouverte avec votre demande préremplie : relisez l'e-mail et envoyez-le."}{" "}
        Si rien ne s'est ouvert, appelez-nous au{" "}
        <a href={`tel:${site.phoneIntl}`} className="font-semibold text-navy hover:text-ochre">
          {site.phone}
        </a>
        .
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-ochre hover:text-ochre"
      >
        Faire une nouvelle demande
      </button>
    </div>
  );
}

/* -------------------------------- Nous trouver ------------------------------ */

function FindUs() {
  const mapSrc = MAP_EMBED_URL;
  const mapLink = MAP_URL;
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ochre">Nous trouver</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Le laboratoire, à Casablanca.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <ul className="h-full divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
              <li className="flex gap-4 p-6">
                <MapPin className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="mt-1 font-medium text-foreground">{site.address}</p>
                  <a href={mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-navy hover:text-ochre">
                    Itinéraire →
                  </a>
                </div>
              </li>
              <li className="flex gap-4 p-6">
                <Phone className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <a href={`tel:${site.phoneIntl}`} className="mt-1 block font-medium text-foreground hover:text-ochre">
                    {site.phone} <span className="text-sm text-muted-foreground">· mobile</span>
                  </a>
                  <a href={`tel:${site.phoneFixe.replace(/\s/g, "")}`} className="block font-medium text-foreground hover:text-ochre">
                    {site.phoneFixe} <span className="text-sm text-muted-foreground">· fixe</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-4 p-6">
                <Mail className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <a href={`mailto:${site.email}`} className="mt-1 block font-medium text-foreground hover:text-ochre">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 p-6">
                <Clock className="mt-0.5 size-5 shrink-0 text-ochre" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">Horaires</p>
                  <p className="mt-1 font-medium text-foreground">{site.hours}</p>
                  {site.hoursNote && <p className="mt-0.5 text-xs text-ochre">{site.hoursNote}</p>}
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl border border-border bg-card">
              <iframe
                title="Localisation du laboratoire LM2G"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full grayscale-[35%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const pageStyles = `
@keyframes ct-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.ct-rise { opacity: 0; animation: ct-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes ct-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
.ct-zoom { animation: ct-zoom 2.4s cubic-bezier(.2,.7,.2,1) both; }

@keyframes ct-step { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
.ct-step { animation: ct-step .4s cubic-bezier(.2,.7,.2,1) both; }

@media (prefers-reduced-motion: reduce) {
  .ct-rise, .ct-zoom, .ct-step { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;