export type Realisation = {
  id: string;
  titre: string;
  domaine: string;
  lieu: string;
  resume: string;
  prestations: string[];
  details: string[];
  image: string;
  imageAlt: string;
  /** true tant que le projet est illustratif (à remplacer par une référence réelle). */
  exemple?: boolean;
};

// CONTENU EXEMPLE À REMPLACER — projets génériques illustratifs (exemple: true).
// Remplacer par les références réelles de LM2G (sans nom de client sans accord écrit).
export const realisationsDomaines = [
  "Bâtiment",
  "Routes",
  "Ouvrages d'art",
  "Barrages & hydraulique",
  "VRD",
  "Industriel",
] as const;

export const realisations: Realisation[] = [
  {
    id: "autoroute",
    titre: "Projet routier — autoroute",
    domaine: "Routes",
    lieu: "Axe Casablanca – Berrechid",
    resume:
      "Études géotechniques et contrôle de compactage pour une section d'autoroute, avec suivi des plateformes et des couches de chaussée.",
    prestations: [
      "Sondages carottés et pénétromètre dynamique",
      "Essais Proctor et CBR sur matériaux d'apport",
      "Contrôle de densité in situ couche par couche",
    ],
    details: [
      "Campagne de reconnaissance le long de l'axe avec logs de sondage et modèles de terrains.",
      "Validation des matériaux d'emprunt et des couches de fondation par essais de laboratoire.",
      "Suivi de compactage régulier sur plateforme avec procès-verbaux de conformité.",
    ],
    image: "road-works",
    exemple: true,
    imageAlt: "Travaux de pose d'enrobés sur une section routière",
  },
  {
    id: "residentiel",
    titre: "Complexe résidentiel",
    domaine: "Bâtiment",
    lieu: "Casablanca",
    resume:
      "Étude géotechnique de conception et suivi des fonds de fouilles pour un complexe résidentiel multi-bâtiments.",
    prestations: [
      "Étude géotechnique G2 avant-projet",
      "Expertise des fonds de fouilles",
      "Suivi et réception du béton",
    ],
    details: [
      "Sondages, essais d'identification et essais œdométriques sur les terrains d'assise.",
      "Recommandations de fondations superficielles et semi-profondes selon les bâtiments.",
      "Interventions régulières au stade de l'exécution avec PV d'expertise des fouilles.",
    ],
    image: "building-works",
    exemple: true,
    imageAlt: "Chantier de fondations d'un complexe résidentiel",
  },
  {
    id: "barrage",
    titre: "Barrage hydraulique",
    domaine: "Barrages & hydraulique",
    lieu: "Région de l'intérieur",
    resume:
      "Reconnaissance géotechnique de site, essais sur matériaux d'étanchéité et contrôle de compactage des remblais.",
    prestations: [
      "Sondages géotechniques de reconnaissance",
      "Essais de laboratoire sur matériaux",
      "Contrôle de compactage des remblais",
    ],
    details: [
      "Identification des matériaux de couverture et des fondations par sondages et essais in situ.",
      "Caractérisation des matériaux de barrage : granulométrie, Proctor, perméabilité.",
      "Assistance technique lors des phases de mise en place et de compactage.",
    ],
    image: "dam-site",
    exemple: true,
    imageAlt: "Remblai compacté d'un barrage en terre en construction",
  },
  {
    id: "plateforme-industrielle",
    titre: "Plateforme industrielle",
    domaine: "Industriel",
    lieu: "Zone industrielle — Casablanca",
    resume:
      "Étude géotechnique et contrôle qualité pour la construction d'une plateforme logistique et de ses dessertes.",
    prestations: [
      "Étude géotechnique G2",
      "Contrôle de compactage des plateformes",
      "Essais sur bétons de dallage",
    ],
    details: [
      "Reconnaissance des terrains et dimensionnement des dallages et des zones de stockage.",
      "Contrôle du compactage des zones de circulation lourde.",
      "Suivi des résistances du béton de dallage par écrasement d'éprouvettes.",
    ],
    image: "industrial-platform",
    exemple: true,
    imageAlt: "Chantier de plateforme industrielle avec excavation",
  },
  {
    id: "immeuble-r6",
    titre: "Immeuble R+6",
    domaine: "Bâtiment",
    lieu: "Casablanca",
    resume:
      "Étude géotechnique, contrôle des fondations et suivi du béton pour un immeuble d'habitation de R+6.",
    prestations: [
      "Étude géotechnique G2 avant-projet",
      "Expertise des fonds de fouilles",
      "Prélèvements et essais béton",
    ],
    details: [
      "Sondages carottés et essais de mécanique des sols sur l'assise des fondations.",
      "Recommandation de semelles filantes et radier partiel selon les zones.",
      "Contrôle du béton livré : slump à la réception, compression à 7 et 28 jours.",
    ],
    image: "concrete-cubes",
    exemple: true,
    imageAlt: "Cubes de béton en presse d'essai",
  },
  {
    id: "vrd-lotissement",
    titre: "VRD — lotissement",
    domaine: "VRD",
    lieu: "Région de Casablanca",
    resume:
      "Contrôle qualité complet des voiries et réseaux d'un lotissement : compactage, matériaux et enrobés.",
    prestations: [
      "Contrôle de compactage des remblais",
      "Essais sur granulats et enrobés",
      "Procès-verbaux de réception des couches",
    ],
    details: [
      "Densités in situ sur chaque couche de l'assainissement et des voiries.",
      "Contrôle des matériaux de couche de fondation et de roulement au laboratoire.",
      "Dossier de synthèse transmis au maître d'ouvrage avant réception.",
    ],
    image: "site-aerial",
    exemple: true,
    imageAlt: "Vue d'ensemble d'un lotissement en cours de viabilisation",
  },
  {
    id: "pont-oued",
    titre: "Pont sur oued",
    domaine: "Ouvrages d'art",
    lieu: "Province de Settat",
    resume:
      "Reconnaissance des appuis, recommandations de fondations profondes et contrôle des bétons d'un pont en béton armé.",
    prestations: [
      "Sondages carottés au droit des appuis",
      "Essais pressiométriques et de laboratoire",
      "Contrôle des bétons de piles et de tablier",
    ],
    details: [
      "Sondages au droit de chaque appui pour identifier l'horizon porteur sous les alluvions de l'oued.",
      "Essais pressiométriques et essais de laboratoire pour dimensionner les fondations profondes.",
      "Prélèvements et écrasements d'éprouvettes sur les bétons de piles et de tablier jusqu'à la réception.",
    ],
    image: "bridge-works",
    exemple: true,
    imageAlt: "Pont en béton armé en construction au-dessus d'un oued",
  },
];