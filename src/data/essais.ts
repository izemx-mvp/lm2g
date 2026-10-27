export const essaiCategories = [
  "Sols",
  "Granulats",
  "Bétons & mortiers",
  "Enrobés",
  "In situ",
] as const;

export type EssaiCategorie = (typeof essaiCategories)[number];

export type Essai = {
  id: string;
  nom: string;
  categorie: EssaiCategorie;
  norme: string;
  objet: string;
};

// CONTENU EXEMPLE À REMPLACER — références normatives à valider avec le laboratoire LM2G
// (certaines normes NF P94 ont été reprises par la série NF EN ISO 17892).
export const essais: Essai[] = [
  {
    id: "granulometrie-sols",
    nom: "Analyse granulométrique",
    categorie: "Sols",
    norme: "NF P94-056",
    objet:
      "Détermination de la répartition des tailles de grains d'un sol par tamisage, base de l'identification des matériaux.",
  },
  {
    id: "limites-atterberg",
    nom: "Limites d'Atterberg",
    categorie: "Sols",
    norme: "NF P94-051",
    objet:
      "Mesure des limites de liquidité et de plasticité : indice de plasticité et comportement argileux du sol.",
  },
  {
    id: "teneur-eau",
    nom: "Teneur en eau",
    categorie: "Sols",
    norme: "NF P94-050",
    objet:
      "Détermination de la teneur en eau pondérale, paramètre d'état essentiel du compactage et de la mécanique des sols.",
  },
  {
    id: "proctor",
    nom: "Essai Proctor normal / modifié",
    categorie: "Sols",
    norme: "NF P94-093",
    objet:
      "Détermination de la densité sèche maximale et de la teneur en eau optimale de compactage d'un sol.",
  },
  {
    id: "cbr",
    nom: "Essai CBR immédiat",
    categorie: "Sols",
    norme: "NF P94-078",
    objet:
      "Évaluation de la portance d'un sol ou d'une grave compactée, base du dimensionnement des chaussées.",
  },
  {
    id: "oedometre",
    nom: "Essai œdométrique (compressibilité)",
    categorie: "Sols",
    norme: "NF P94-090",
    objet:
      "Étude de la compressibilité et du tassement d'un sol fin sous chargement vertical, pour les fondations.",
  },
  {
    id: "granulometrie-granulats",
    nom: "Granulométrie des granulats",
    categorie: "Granulats",
    norme: "NF EN 933-1",
    objet:
      "Détermination de la composition granulaire des granulats par tamisage à sec selon la norme européenne.",
  },
  {
    id: "equivalent-sable",
    nom: "Équivalent de sable",
    categorie: "Granulats",
    norme: "NF P18-598",
    objet:
      "Mesure de la propreté d'un sable : quantification des fines argileuses susceptibles de dégrader le béton.",
  },
  {
    id: "los-angeles",
    nom: "Los Angeles (résistance à l'attrition)",
    categorie: "Granulats",
    norme: "NF EN 1097-2",
    objet:
      "Résistance des granulats à l'usure par fragmentation : critère clé pour les couches de chaussée.",
  },
  {
    id: "micro-deval",
    nom: "Micro-Deval",
    categorie: "Granulats",
    norme: "NF EN 1097-1",
    objet:
      "Résistance des granulats à l'abrasion en présence d'eau, complémentaire de l'essai Los Angeles.",
  },
  {
    id: "compression-beton",
    nom: "Résistance à la compression des cubes de béton",
    categorie: "Bétons & mortiers",
    norme: "NF EN 12390-3",
    objet:
      "Détermination de la résistance caractéristique à la compression du béton durci sur cubes 10×10 ou 15×15 cm.",
  },
  {
    id: "slump",
    nom: "Affaissement au cône (slump test)",
    categorie: "Bétons & mortiers",
    norme: "NF EN 12350-2",
    objet:
      "Mesure de la consistance du béton frais à la réception sur chantier, contrôle de l'ouvrabilité.",
  },
  {
    id: "extraction-enrobe",
    nom: "Teneur en bitume d'un enrobé (extraction)",
    categorie: "Enrobés",
    norme: "NF EN 12697-1",
    objet:
      "Extraction du liant d'un enrobé bitumineux pour vérifier la teneur en bitume et la granulométrie du squelette.",
  },
  {
    id: "densite-in-situ",
    nom: "Densité in situ (méthode du sable)",
    categorie: "In situ",
    norme: "NF P94-061",
    objet:
      "Contrôle du compactage des remblais et couches de forme par mesure de la densité sèche sur chantier.",
  },
  {
    id: "penetrometre",
    nom: "Pénétromètre dynamique",
    categorie: "In situ",
    norme: "NF P94-116",
    objet:
      "Reconnaissance rapide de la résistance de pointe des terrains superficiels et contrôle de densification.",
  },
  {
    id: "valeur-bleu",
    nom: "Valeur au bleu de méthylène (VBS)",
    categorie: "Sols",
    norme: "NF P94-068",
    objet:
      "Mesure de l'activité argileuse d'un sol : critère clé de classification et de réutilisation des matériaux.",
  },
  {
    id: "cisaillement",
    nom: "Cisaillement direct à la boîte",
    categorie: "Sols",
    norme: "NF P94-071-1",
    objet:
      "Détermination de la cohésion et de l'angle de frottement interne d'un sol, pour les calculs de stabilité et de portance.",
  },
  {
    id: "flexion-beton",
    nom: "Résistance à la flexion du béton",
    categorie: "Bétons & mortiers",
    norme: "NF EN 12390-5",
    objet:
      "Résistance à la traction par flexion sur éprouvettes prismatiques, notamment pour les dallages et chaussées béton.",
  },
  {
    id: "carottage",
    nom: "Carottage sur ouvrage",
    categorie: "Bétons & mortiers",
    norme: "NF EN 12504-1",
    objet:
      "Prélèvement de carottes dans un ouvrage existant pour évaluer la résistance du béton en place ou l'épaisseur des couches.",
  },
  {
    id: "marshall",
    nom: "Essai Marshall",
    categorie: "Enrobés",
    norme: "NF EN 12697-34",
    objet:
      "Stabilité et fluage d'un enrobé bitumineux, utilisés pour la formulation et le contrôle des mélanges.",
  },
  {
    id: "masse-volumique-enrobe",
    nom: "Masse volumique et compacité des enrobés",
    categorie: "Enrobés",
    norme: "NF EN 12697-6",
    objet:
      "Détermination de la masse volumique apparente sur carottes ou éprouvettes pour vérifier le compactage de la couche.",
  },
  {
    id: "pressiometre",
    nom: "Essai pressiométrique Ménard",
    categorie: "In situ",
    norme: "NF EN ISO 22476-4",
    objet:
      "Mesure en forage du module pressiométrique et de la pression limite, base du dimensionnement des fondations.",
  },
  {
    id: "essai-plaque",
    nom: "Essai de plaque",
    categorie: "In situ",
    norme: "NF P94-117-1",
    objet:
      "Mesure du module de déformation d'une plateforme (EV2) pour vérifier sa portance avant la mise en œuvre des couches.",
  },
  {
    id: "lefranc",
    nom: "Essai de perméabilité Lefranc",
    categorie: "In situ",
    norme: "NF EN ISO 22282-2",
    objet:
      "Mesure de la perméabilité des terrains en forage, utile pour les fouilles, les rabattements de nappe et les ouvrages hydrauliques.",
  },
];

export function getEssai(id: string): Essai | undefined {
  return essais.find((e) => e.id === id);
}