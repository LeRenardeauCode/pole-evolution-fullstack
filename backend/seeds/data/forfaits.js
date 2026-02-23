const forfaits = [
  // ==================== SANS ENGAGEMENT ====================

  // Cours découverte
  {
    nom: "Cours Découverte",
    description:
      "Cours découverte pour essayer la pole dance. Idéal pour débuter !",
    categorie: "decouverte",
    typeEngagement: "sansengagement",
    nombreSeances: 1,
    prix: 15,
    estActif: true,
    estVisible: true,
  },

  // Cours collectifs sans engagement
  {
    nom: "Cours à l'Unité",
    description: "Payez uniquement le cours que vous prenez. Sans engagement.",
    categorie: "collectif",
    typeEngagement: "sansengagement",
    nombreSeances: 1,
    prix: 25,
    estActif: true,
    estVisible: true,
  },
  {
    nom: "Forfait 5 Cours",
    description: "Forfait de 5 cours valable 2 mois. Soit 23€ par cours.",
    categorie: "collectif",
    typeEngagement: "sansengagement",
    nombreSeances: 5,
    prix: 115,
    validiteMois: 2,
    estActif: true,
    estVisible: true,
  },
  {
    nom: "Forfait 10 Cours",
    description: "Forfait de 10 cours valable 4 mois. Soit 22€ par cours.",
    categorie: "collectif",
    typeEngagement: "sansengagement",
    nombreSeances: 10,
    prix: 220,
    validiteMois: 4,
    estActif: true,
    estVisible: true,
    estPopulaire: true,
  },
  {
    nom: "Forfait 20 Cours",
    description: "Forfait de 20 cours valable 6 mois. Soit 20,50€ par cours.",
    categorie: "collectif",
    typeEngagement: "sansengagement",
    nombreSeances: 20,
    prix: 410,
    validiteMois: 6,
    estActif: true,
    estVisible: true,
  },

  // Cours privé
  {
    nom: "Cours Privé - 1h",
    description:
      "Cours particulier personnalisé d'une heure avec instructeur dédié.",
    categorie: "prive",
    typeEngagement: "sansengagement",
    nombreSeances: 1,
    prix: 80,
    estActif: true,
    estVisible: true,
  },

  // EVJF
  {
    nom: "EVJF avec buffet sucré",
    description:
      "Échauffement + Jeu/Défi + 30min initiation pole + 30min liberté/dégustation. Buffet sucré inclus !",
    type: "prestation",
    categorie: "evjf",
    nombreSeances: 1,
    prix: 25, // Prix PAR PERSONNE
    prixUnitaire: 25,
    dureeCours: 90, // 1h30 en minutes
    dureeValiditeMois: null,
    nombreParticipantsMin: 6,
    nombreParticipantsMax: 12,
    inclusions:
      "Échauffement, Jeu Défi, 30min initiation pole, 30min liberté/dégustation, Buffet sucré et boissons",
    exclusions: "",
    avantages:
      "Séance privée groupe (6-12 personnes), Ambiance festive garantie, Buffet sucré offert, Photos souvenirs",
    estActif: true,
    estVisible: true,
    estPopulaire: true,
    typeEngagement: "sansengagement",
    frequenceSeances: "ponctuel",
  },
  {
    nom: "EVJF sans buffet",
    description:
      "Échauffement + Jeu/Défi + 30min initiation pole. Formule sans buffet pour un budget réduit.",
    type: "prestation",
    categorie: "evjf",
    nombreSeances: 1,
    prix: 20, // Prix PAR PERSONNE
    prixUnitaire: 20,
    dureeCours: 60, // 1h en minutes
    dureeValiditeMois: null,
    nombreParticipantsMin: 6,
    nombreParticipantsMax: 12,
    inclusions: "Échauffement, Jeu Défi, 30min initiation pole",
    exclusions: "Buffet et boissons non inclus",
    avantages:
      "Séance privée groupe (6-12 personnes), Ambiance festive garantie, Tarif réduit",
    estActif: true,
    estVisible: true,
    estPopulaire: false,
    typeEngagement: "sansengagement",
    frequenceSeances: "ponctuel",
  },

  // Prestation
  {
    nom: "Prestation Événementielle",
    description:
      "Animation pole dance pour vos événements privés ou professionnels.",
    categorie: "prestation",
    typeEngagement: "sansengagement",
    nombreSeances: 1,
    prix: 500,
    inclusions:
      "Animation professionnelle, Démonstration spectaculaire, Initiation possible, Déplacement inclus (50km)",
    estActif: true,
    estVisible: true,
  },

  // ==================== AVEC ENGAGEMENT 12 MOIS ====================

  {
    nom: "Abonnement 1 Cours/Semaine",
    description: "Abonnement 1 cours par semaine avec engagement 12 mois.",
    categorie: "abonnement",
    typeEngagement: "engagement12mois",
    nombreSeancesParSemaine: 1,
    prix: 80,
    dureeEngagementMois: 12,
    estActif: true,
    estVisible: true,
  },
  {
    nom: "Abonnement 2 Cours/Semaine",
    description:
      "Abonnement 2 cours par semaine avec engagement 12 mois. Le meilleur rapport qualité-prix !",
    categorie: "abonnement",
    typeEngagement: "engagement12mois",
    nombreSeancesParSemaine: 2,
    prix: 120,
    dureeEngagementMois: 12,
    estActif: true,
    estVisible: true,
    estPopulaire: true,
  },
];

export default forfaits;
