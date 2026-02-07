const forfaits = [
  // ==================== SANS ENGAGEMENT ====================
  
  // Cours découverte
  {
    nom: 'Cours Découverte',
    description: 'Cours découverte pour essayer la pole dance. Idéal pour débuter !',
    categorie: 'decouverte',
    typeEngagement: 'sansengagement',
    nombreSeances: 1,
    prix: 15,
    validiteMois: 1,
    estActif: true,
    estVisible: true
  },
  
  // Cours collectifs sans engagement
  {
    nom: 'Cours à l\'Unité',
    description: 'Payez uniquement le cours que vous prenez. Sans engagement.',
    categorie: 'collectif',
    typeEngagement: 'sansengagement',
    nombreSeances: 1,
    prix: 25,
    estActif: true,
    estVisible: true
  },
  {
    nom: 'Carte 5 Cours',
    description: 'Forfait de 5 cours valable 2 mois. Soit 23€ par cours.',
    categorie: 'collectif',
    typeEngagement: 'sansengagement',
    nombreSeances: 5,
    prix: 115,
    validiteMois: 2,
    estActif: true,
    estVisible: true
  },
  {
    nom: 'Carte 10 Cours',
    description: 'Forfait de 10 cours valable 4 mois. Soit 22€ par cours.',
    categorie: 'collectif',
    typeEngagement: 'sansengagement',
    nombreSeances: 10,
    prix: 220,
    validiteMois: 4,
    estActif: true,
    estVisible: true,
    estPopulaire: true
  },
  {
    nom: 'Carte 20 Cours',
    description: 'Forfait de 20 cours valable 6 mois. Soit 20,50€ par cours.',
    categorie: 'collectif',
    typeEngagement: 'sansengagement',
    nombreSeances: 20,
    prix: 410,
    validiteMois: 6,
    estActif: true,
    estVisible: true
  },
  
  // Cours privé
  {
    nom: 'Cours Privé - 1h',
    description: 'Cours particulier personnalisé d\'une heure avec instructeur dédié.',
    categorie: 'prive',
    typeEngagement: 'sansengagement',
    nombreSeances: 1,
    prix: 80,
    estActif: true,
    estVisible: true
  },
  
  // EVJF
  {
    nom: 'EVJF - Enterrement de Vie de Jeune Fille',
    description: 'Séance pole dance spéciale EVJF pour un moment inoubliable entre amies ! (6 à 12 personnes)',
    categorie: 'evjf',
    typeEngagement: 'sansengagement',
    nombreSeances: 1,
    prix: 350,
    nombreParticipantsMin: 6,
    nombreParticipantsMax: 12,
    inclusions: 'Séance privée groupe, Champagne offert, Photos souvenirs, Playlist personnalisée',
    estActif: true,
    estVisible: true,
    estPopulaire: true
  },
  
  // Prestation
  {
    nom: 'Prestation Événementielle',
    description: 'Animation pole dance pour vos événements privés ou professionnels.',
    categorie: 'prestation',
    typeEngagement: 'sansengagement',
    nombreSeances: 1,
    prix: 500,
    inclusions: 'Animation professionnelle, Démonstration spectaculaire, Initiation possible, Déplacement inclus (50km)',
    estActif: true,
    estVisible: true
  },
  
  // ==================== AVEC ENGAGEMENT 12 MOIS ====================
  
  {
    nom: 'Abonnement 1 Cours/Semaine',
    description: 'Abonnement 1 cours par semaine avec engagement 12 mois.',
    categorie: 'abonnement',
    typeEngagement: 'engagement12mois',
    nombreSeancesParSemaine: 1,
    prix: 80,
    dureeEngagementMois: 12,
    estActif: true,
    estVisible: true
  },
  {
    nom: 'Abonnement 2 Cours/Semaine',
    description: 'Abonnement 2 cours par semaine avec engagement 12 mois. Le meilleur rapport qualité-prix !',
    categorie: 'abonnement',
    typeEngagement: 'engagement12mois',
    nombreSeancesParSemaine: 2,
    prix: 120,
    dureeEngagementMois: 12,
    estActif: true,
    estVisible: true,
    estPopulaire: true
  }
];

export default forfaits;
