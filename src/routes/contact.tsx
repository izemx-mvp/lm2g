import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { site, waLink } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact — Devis études géotechniques & essais à Casablanca | LM2G",
      },
      {
        name: "description",
        content:
          "Contactez LM2G à Casablanca : demande de devis pour études géotechniques, essais de laboratoire et contrôle qualité. Téléphone, WhatsApp, e-mail et formulaire.",
      },
      {
        property: "og:title",
        content: "Contact — Demande de devis | LM2G Casablanca",
      },
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

const typesProjet = [
  "Étude géotechnique",
  "Essais de laboratoire",
  "Contrôle qualité chantier",
  "Expertise / AMO",
  "Autre",
];

const MAX_NOM = 100;
const MAX_TEL = 30;
const MAX_EMAIL = 255;
const MAX_MESSAGE = 1500;

type FormState = {
  nom: string;
  telephone: string;
  email: string;
  typeProjet: string;
  message: string;
};

const initialForm: FormState = {
  nom: "",
  telephone: "",
  email: "",
  typeProjet: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.nom.trim()) next.nom = "Veuillez indiquer votre nom.";
    if (form.nom.length > MAX_NOM) next.nom = `Maximum ${MAX_NOM} caractères.`;
    if (!form.telephone.trim()) next.telephone = "Veuillez indiquer un numéro de téléphone.";
    if (form.telephone.length > MAX_TEL) next.telephone = `Maximum ${MAX_TEL} caractères.`;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Adresse e-mail invalide.";
    if (form.email.length > MAX_EMAIL) next.email = `Maximum ${MAX_EMAIL} caractères.`;
    if (!form.typeProjet) next.typeProjet = "Sélectionnez un type de prestation.";
    if (!form.message.trim()) next.message = "Décrivez brièvement votre projet.";
    if (form.message.length > MAX_MESSAGE)
      next.message = `Maximum ${MAX_MESSAGE} caractères (${form.message.length} actuellement).`;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // Composition d'un message WhatsApp prérempli — aucune donnée n'est envoyée ailleurs.
    const lignes = [
      "Bonjour LM2G, je souhaite demander un devis.",
      "",
      `Nom : ${form.nom.trim()}`,
      `Téléphone : ${form.telephone.trim()}`,
      form.email.trim() ? `E-mail : ${form.email.trim()}` : null,
      `Prestation : ${form.typeProjet}`,
      "",
      `Projet : ${form.message.trim()}`,
    ].filter(Boolean);
    window.open(waLink(lignes.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep text-white">
        <div className="contour-lines">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand">Contact</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-bold sm:text-5xl">
              Parlons de votre sol, de votre projet
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-steel">
              Décrivez-nous votre besoin : type d'ouvrage, localisation et stade d'avancement. Nous
              revenons vers vous avec une proposition technique et commerciale détaillée.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          {/* Coordonnées */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Nos coordonnées
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Adresse
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground">{site.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                  <Phone className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Téléphone
                  </h3>
                  <p className="mt-1 flex flex-col text-sm font-medium">
                    <a
                      href={`tel:${site.phoneIntl}`}
                      className="text-foreground transition-colors hover:text-ochre"
                    >
                      {site.phone} (mobile)
                    </a>
                    <a
                      href={`tel:${site.phoneFixe.replace(/\s/g, "")}`}
                      className="text-foreground transition-colors hover:text-ochre"
                    >
                      {site.phoneFixe} (fixe)
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    E-mail
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block text-sm font-medium text-foreground transition-colors hover:text-ochre"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                  <Clock className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Horaires
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground">{site.hours}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ochre">
                    {site.hoursNote}
                  </p>
                </div>
              </li>
            </ul>

            <a
              href={waLink("Bonjour LM2G, je souhaite demander un devis pour mon projet.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-lift hover:-translate-y-0.5 hover:border-whatsapp hover:shadow-md"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-whatsapp text-white">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Réponse la plus rapide</p>
                <p className="text-sm text-muted-foreground">Écrivez-nous directement sur WhatsApp</p>
              </div>
            </a>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-navy">
                    <CheckCircle2 className="size-7" aria-hidden />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
                    Votre demande est prête
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    WhatsApp s'est ouvert avec votre demande préremplie : vérifiez le message et
                    envoyez-le, nous vous répondons rapidement. Si rien ne s'est ouvert, appelez-nous
                    au{" "}
                    <a
                      href={`tel:${site.phoneIntl}`}
                      className="font-semibold text-navy hover:text-ochre"
                    >
                      {site.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialForm);
                      setSent(false);
                    }}
                    className="mt-6 text-sm font-semibold text-navy underline-offset-4 hover:text-ochre hover:underline"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Demander un devis
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Votre demande s'ouvre dans WhatsApp, préremplie avec vos informations. Aucune
                    donnée n'est stockée sur ce site.
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="nom">Nom complet *</Label>
                      <Input
                        id="nom"
                        name="nom"
                        autoComplete="name"
                        maxLength={MAX_NOM}
                        value={form.nom}
                        onChange={(e) => update("nom", e.target.value)}
                        aria-invalid={!!errors.nom}
                      />
                      {errors.nom && (
                        <p role="alert" className="text-xs text-destructive">
                          {errors.nom}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={MAX_TEL}
                        value={form.telephone}
                        onChange={(e) => update("telephone", e.target.value)}
                        aria-invalid={!!errors.telephone}
                      />
                      {errors.telephone && (
                        <p role="alert" className="text-xs text-destructive">
                          {errors.telephone}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail (facultatif)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={MAX_EMAIL}
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p role="alert" className="text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type-projet">Type de prestation *</Label>
                      <Select
                        value={form.typeProjet}
                        onValueChange={(v) => update("typeProjet", v)}
                      >
                        <SelectTrigger id="type-projet" aria-invalid={!!errors.typeProjet}>
                          <SelectValue placeholder="Sélectionnez…" />
                        </SelectTrigger>
                        <SelectContent>
                          {typesProjet.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.typeProjet && (
                        <p role="alert" className="text-xs text-destructive">
                          {errors.typeProjet}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                      <Label htmlFor="message">Votre projet *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={MAX_MESSAGE}
                        placeholder="Nature de l'ouvrage, localisation, stade d'avancement, prestation envisagée…"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        aria-invalid={!!errors.message}
                      />
                      <div className="flex items-center justify-between gap-3">
                        {errors.message ? (
                          <p role="alert" className="text-xs text-destructive">
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {form.message.length}/{MAX_MESSAGE}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mt-6 w-full bg-ochre text-white hover:bg-navy sm:w-auto"
                  >
                    <Send className="size-4" aria-hidden />
                    Envoyer ma demande
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
