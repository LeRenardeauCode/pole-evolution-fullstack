const forfaits = [
  {
    nom: 'Carte 10 Cours',
    description: 'Forfait de 10 cours valable 3 mois. Idéal pour pratiquer régulièrement à votre rythme.',
    type: 'carte',
    categorie: 'collectif',
    nombreSeances: 10,
    prix: 220,
    dureeValiditeMois: 3,
    avantages: [
      'Valable sur tous les cours collectifs',
      'Transférable à un proche',
      '3 mois de validité',
      'Possibilité de reporter un cours (48h avant)'
    ],
    estActif: true,
    estPopulaire: true,
    categoriesIncluses: ['pole_dance', 'stretching', 'fitness', 'exotic']
  },
  {
    nom: 'Abonnement Mensuel Illimité',
    description: 'Accès illimité à tous les cours pendant 1 mois. Le meilleur rapport qualité-prix pour progresser rapidement !',
    type: 'abonnement',
    categorie: 'abonnement',
    nombreSeances: 200,
    prix: 150,
    dureeValiditeMois: 1,
    avantages: [
      'Cours illimités tous niveaux',
      'Priorité sur les réservations',
      'Accès events privés et soirées pole',
      '1 cours particulier offert',
      'Remise 10% sur le merchandising'
    ],
    estActif: true,
    estPopulaire: true,
    categoriesIncluses: ['pole_dance', 'stretching', 'fitness', 'exotic']
  },
  {
    nom: 'Cours à l\'Unité',
    description: 'Payez uniquement le cours que vous prenez. Sans engagement.',
    type: 'unitaire',
    categorie: 'collectif',
    nombreSeances: 1,
    prix: 25,
    dureeValiditeMois: null,
    avantages: [
      'Aucun engagement',
      'Idéal pour découvrir',
      'Valable 1 mois après achat'
    ],
    estActif: true,
    estPopulaire: false,
    categoriesIncluses: ['pole_dance', 'stretching', 'fitness', 'exotic']
  },
  {
    nom: 'Forfait Découverte',
    description: 'Forfait découverte de 3 cours valable 1 mois. Parfait pour essayer !',
    type: 'carte',
    categorie: 'decouverte',
    nombreSeances: 3,
    prix: 65,
    dureeValiditeMois: 1,
    avantages: [
      'Idéal pour débuter',
      '1 mois de validité',
      'Cours d\'essai offert'
    ],
    estActif: true,
    estPopulaire: true,
    categoriesIncluses: ['pole_dance', 'stretching', 'fitness']
  },
  {
    nom: 'Cours Privé - 1h',
    description: 'Cours particulier personnalisé d\'une heure avec instructeur dédié.',
    type: 'unitaire',
    categorie: 'prive',
    nombreSeances: 1,
    prix: 80,
    dureeValiditeMois: 2,
    avantages: [
      'Cours 100% personnalisé',
      'Instructeur dédié',
      'Horaires flexibles',
      'Progression rapide'
    ],
    estActif: true,
    estPopulaire: false,
    categoriesIncluses: ['pole_dance', 'stretching', 'exotic']
  },
  {
    nom: 'EVJF - Enterrement de Vie de Jeune Fille',
    description: 'Séance pole dance spéciale EVJF pour un moment inoubliable entre amies !',
    type: 'prestation',
    categorie: 'evjf',
    nombreSeances: 1,
    prix: 350,
    dureeValiditeMois: null,
    avantages: [
      'Séance privée groupe (max 12 personnes)',
      'Ambiance festive garantie',
      'Champagne offert',
      'Photos souvenirs',
      'Playlist personnalisée'
    ],
    estActif: true,
    estPopulaire: true,
    categoriesIncluses: ['exotic', 'pole_dance']
  },
  {
    nom: 'Prestation Événementielle',
    description: 'Animation pole dance pour vos événements privés ou professionnels.',
    type: 'prestation',
    categorie: 'prestation',
    nombreSeances: 1,
    prix: 500,
    dureeValiditeMois: null,
    avantages: [
      'Animation professionnelle',
      'Démonstration spectaculaire',
      'Initiation possible',
      'Déplacement inclus (50km)'
    ],
    estActif: true,
    estPopulaire: false,
    categoriesIncluses: ['pole_dance', 'exotic']
  }
];

export default forfaits;
