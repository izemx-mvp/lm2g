import heroRig from "@/assets/hero-rig.jpg";
import labTest from "@/assets/lab-test.jpg";
import concreteCubes from "@/assets/concrete-cubes.jpg";
import soilCores from "@/assets/soil-cores.jpg";

export type Service = {
  slug: string;
  title: string;
  titleShort: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  intro: string[];
  prestations: { title: string; description: string }[];
  relatedTests: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "etudes-geotechniques",
    title: "Études géotechniques",
    titleShort: "Études géotechniques",
    tagline:
      "Des missions G1 à G5 conformes aux normes en vigueur, pour des fondations dimensionnées sur des données fiables.",
    metaTitle: "Études géotechniques G1 à G5 — LM2G Casablanca",
    metaDescription:
      "Études géotechniques G1, G2, G3 et G5 : sondages carottés, pressiomètre, pénétromètre, recommandations de fondations pour le bâtiment et les routes au Maroc.",
    image: heroRig,
    imageAlt: "Foreuse d'études géotechniques sur chantier",
    intro: [
      "L'étude géotechnique est la première garantie de la pérennité d'un ouvrage. Elle identifie la nature des terrains, leurs caractéristiques mécaniques et leurs limites, afin de dimensionner des fondations adaptées au projet et à son environnement.",
      "LM2G réalise l'ensemble de la chaîne : reconnaissance du site, sondages, essais de laboratoire et in situ, interprétation et rédaction du rapport géotechnique avec recommandations techniques argumentées.",
    ],
    prestations: [
      {
        title: "Missions G1 – Reconnaissance préliminaire",
        description:
          "Étude de faisabilité géotechnique : exploitation des données existantes, carte géologique, visite de site et premiers avis d'implantation.",
      },
      {
        title: "Missions G2 – Étude géotechnique de conception",
        description:
          "Sondages carottés, essais d'identification et de mécanique des sols, modèles géotechniques et principes de fondation retenus.",
      },
      {
        title: "Missions G3 – Étude d'exécution et implantation",
        description:
          "Vérification des hypothèses de conception sur les données d'exécution, suivi et adaptation du projet géotechnique au chantier.",
      },
      {
        title: "Missions G5 – Diagnostic géotechnique",
        description:
          "Diagnostic des désordres existants sur ouvrages et structures, analyse des causes et préconisations de remédiation.",
      },
      {
        title: "Sondages et essais in situ",
        description:
          "Sondages carottés et destructifs, essais pressiométriques, pénétromètre dynamique, suivi et interprétation par nos ingénieurs.",
      },
      {
        title: "Recommandations de fondations",
        description:
          "Type de fondations (superficielles, semi-profondes, profondes), capacités portantes, tassements admissibles et prescriptions de mise en œuvre.",
      },
    ],
    relatedTests: [
      "Analyse granulométrique",
      "Limites d'Atterberg",
      "Essai Proctor normal / modifié",
      "Essai œdométrique (compressibilité)",
      "Pénétromètre dynamique",
      "Teneur en eau",
    ],
    deliverables: [
      "Rapport d'étude géotechnique avec modèles de comportement des terrains",
      "Coupes et logs de sondages commentés",
      "Recommandations de fondations et prescriptions techniques",
      "Annexes : résultats d'essais de laboratoire et in situ",
    ],
  },
  {
    slug: "essais-laboratoire",
    title: "Essais de laboratoire",
    titleShort: "Essais de laboratoire",
    tagline:
      "Sols, granulats, bétons et enrobés : des essais normalisés pour caractériser chaque matériau avant et pendant les travaux.",
    metaTitle: "Essais de laboratoire — Sols, granulats, bétons, enrobés | LM2G",
    metaDescription:
      "Laboratoire d'essais à Casablanca : essais sur sols, granulats, bétons et enrobés bitumineux selon les normes NM, NF et EN. Résultats fiables, rapports détaillés.",
    image: labTest,
    imageAlt: "Technicienne réalisant un essai de compactage au laboratoire",
    intro: [
      "Un matériau bien caractérisé est un matériau qui ne réserve pas de mauvaise surprise. Notre laboratoire de Casablanca met à votre disposition un parc d'équipements couvrant l'identification, la mécanique des sols et le contrôle des matériaux de construction.",
      "Chaque essai est réalisé selon les normes en vigueur, tracé de la réception de l'échantillon jusqu'au rapport signé, avec des délais annoncés et tenus.",
    ],
    prestations: [
      {
        title: "Essais sur sols",
        description:
          "Identification (granulométrie, limites d'Atterberg, teneur en eau), compactage (Proctor, CBR) et mécanique des sols (œdomètre, cisaillement).",
      },
      {
        title: "Essais sur granulats",
        description:
          "Propriétés physiques et mécaniques des granulats : équivalent de sable, Los Angeles, Micro-Deval, propreté et granulométrie.",
      },
      {
        title: "Essais sur bétons et mortiers",
        description:
          "Consistance (slump), résistance à la compression sur cubes et cylindres, essais de flexion, suivi de la prise et du durcissement.",
      },
      {
        title: "Essais sur enrobés bitumineux",
        description:
          "Extraction et granulométrie des enrobés, teneur en bitume, caractéristiques des mélanges et contrôle de la formulation.",
      },
      {
        title: "Études de formulation",
        description:
          "Formulation et validation des mélanges : bétons, graves compactées et enrobés, adaptés aux exigences du projet.",
      },
      {
        title: "Échantillonnage et réception",
        description:
          "Prélèvement sur site par nos équipes, conditionnement et enregistrement de chaque échantillon dans notre suivi de laboratoire.",
      },
    ],
    relatedTests: [
      "Analyse granulométrique",
      "Équivalent de sable",
      "Los Angeles (résistance à l'attrition)",
      "Résistance à la compression des cubes de béton",
      "Affaissement au cône (slump test)",
      "Teneur en bitume d'un enrobé (extraction)",
    ],
    deliverables: [
      "Rapport d'essais signé avec références normatives",
      "Fiches d'enregistrement des échantillons",
      "Interprétation des résultats et conformité aux spécifications",
      "Transmission rapide des résultats critiques",
    ],
  },
  {
    slug: "controle-qualite",
    title: "Contrôle qualité sur chantier",
    titleShort: "Contrôle qualité",
    tagline:
      "Compactage, béton, fonds de fouilles : un contrôle indépendant qui sécurise chaque étape de l'exécution.",
    metaTitle: "Contrôle qualité chantier — Compactage, béton, fondations | LM2G",
    metaDescription:
      "Contrôle qualité en chantier : densité in situ, réception du béton, expertise des fonds de fouilles et suivi de compactage pour vos projets au Maroc.",
    image: concreteCubes,
    imageAlt: "Écrasement d'un cube de béton en presse au laboratoire",
    intro: [
      "La qualité d'un ouvrage se joue pendant l'exécution. Nos contrôleurs interviennent directement sur vos chantiers pour vérifier, mesurer et documenter la conformité des travaux aux spécifications techniques du marché.",
      "Chaque intervention donne lieu à un procès-verbal : vous conservez une trace opposable de la qualité de chaque couche, de chaque béton et de chaque fond de fouille.",
    ],
    prestations: [
      {
        title: "Contrôle de compactage",
        description:
          "Densité in situ (méthode du sable, densitomètre), suivi couche par couche des remblais et des couches de forme, courbes de compactage.",
      },
      {
        title: "Réception et suivi du béton",
        description:
          "Prélèvement d'éprouvettes sur chantier, essais d'affaissement, compression à 7 et 28 jours, suivi des bétons livrés.",
      },
      {
        title: "Expertise des fonds de fouilles",
        description:
          "Examen visuel et documentaire des fonds de fouilles, validation du terrain d'assise avant coulage, procès-verbal de dégel des fouilles.",
      },
      {
        title: "Suivi de chantier",
        description:
          "Présence régulière d'un contrôleur sur site, relevés de conformité, alertes immédiates en cas de non-conformité constatée.",
      },
      {
        title: "Contrôle des enrobés",
        description:
          "Températures de mise en œuvre, épaisseurs, carottage et essais de laboratoire sur enrobés routiers.",
      },
      {
        title: "Procès-verbaux et reporting",
        description:
          "PV d'essais, fiches de contrôle et synthèses périodiques transmises au maître d'ouvrage et à la maîtrise d'œuvre.",
      },
    ],
    relatedTests: [
      "Densité in situ (méthode du sable)",
      "Affaissement au cône (slump test)",
      "Résistance à la compression des cubes de béton",
      "Carottage sur ouvrage",
      "Essai Proctor normal / modifié",
    ],
    deliverables: [
      "Procès-verbaux d'essais in situ",
      "Rapports de contrôle de compactage couche par couche",
      "PV d'expertise des fonds de fouilles",
      "Synthèse de fin de chantier et dossier de qualité",
    ],
  },
  {
    slug: "expertise-assistance",
    title: "Expertise & assistance technique",
    titleShort: "Expertise & AMO",
    tagline:
      "Diagnostic des pathologies, avis d'expert et assistance à maîtrise d'ouvrage pour décider en connaissance de cause.",
    metaTitle: "Expertise géotechnique & AMO — LM2G Casablanca",
    metaDescription:
      "Expertise des pathologies de structures, diagnostic géotechnique, assistance à maîtrise d'ouvrage (AMO) et assistance technique pour vos projets de bâtiment et de routes.",
    image: soilCores,
    imageAlt: "Carottes de sondage disposées en caisses d'observation",
    intro: [
      "Fissurations, tassements, désordres routiers : derrière une pathologie visible se cache presque toujours une cause géotechnique. Nos experts identifient cette cause, la documentent et proposent des solutions de remédiation chiffrées en conséquences.",
      "Nous assistons également les maîtres d'ouvrage en qualité d'AMO : analyse des offres, revue des études des entreprises, audits techniques et appui lors des réunions de chantier jusqu'à la réception.",
    ],
    prestations: [
      {
        title: "Diagnostic des pathologies",
        description:
          "Expertise des désordres sur bâtiments et ouvrages : fissures, tassements différentiels, instabilités de talus et désordres de chaussées.",
      },
      {
        title: "Diagnostic géotechnique G5",
        description:
          "Campagne de reconnaissance ciblée, essais complémentaires et analyse des causes des désordres constatés.",
      },
      {
        title: "Préconisations de remédiation",
        description:
          "Solutions techniques de reprise ou de renforcement : injections, micropieux, drainages, substitution de matériaux.",
      },
      {
        title: "Assistance à maîtrise d'ouvrage (AMO)",
        description:
          "Appui technique du maître d'ouvrage : analyse des propositions des entreprises, revue des études géotechniques, assistance aux réceptions.",
      },
      {
        title: "Audit technique",
        description:
          "Revue critique des études et des rapports d'essais, contrôle de cohérence des hypothèses de calcul et des prescriptions.",
      },
      {
        title: "Assistance technique ponctuelle",
        description:
          "Réponses rapides aux questions techniques de vos chantiers : interprétation de résultats, avis sur points d'arrêt.",
      },
    ],
    relatedTests: [
      "Carottage sur ouvrage",
      "Pénétromètre dynamique",
      "Essai œdométrique (compressibilité)",
      "Limites d'Atterberg",
      "Analyse granulométrique",
    ],
    deliverables: [
      "Rapport d'expertise avec analyse des causes",
      "Préconisations de remédiation hiérarchisées",
      "Notes d'analyse technique (AMO)",
      "Comptes rendus de réunions et d'interventions",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
