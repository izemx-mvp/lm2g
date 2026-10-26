export const site = {
  name: "LM2G",
  fullName: "Laboratoire Marocain de Géotechnique et de Génie Civil",
  legalName: "LM2G — Laboratoire Marocain de Géotechnique et de Génie Civil SARL",
  founded: 2014,
  capital: "50 000 MAD",
  rc: "RC 303603 — Casablanca",
  ice: "ICE 001426509000047",
  identifiantFiscal: "IF 15170081",
  address: "Hay Essafa, Lot N° E42, Appt N° 1, Lissasfa, Casablanca",
  phone: "06 61 89 01 87",
  phoneFixe: "05 22 91 08 64",
  phoneIntl: "+212661890187",
  whatsapp: "212661890187",
  email: "contact@lm2g.com",
  // CONTENU EXEMPLE À REMPLACER — horaires indicatifs
  hours: "Lundi – Vendredi : 08h30 – 18h00 · Samedi : 08h30 – 13h00",
  hoursNote: "CONTENU EXEMPLE À REMPLACER",
} as const;

/** Construit un lien WhatsApp avec message prérempli en français. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const whatsappDefaultMessage =
  "Bonjour LM2G, je souhaite demander un devis pour mon projet.";

export const devisMessage = "Bonjour LM2G, je souhaite demander un devis pour mon projet.";
