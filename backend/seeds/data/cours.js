const cours = [
  {
    nom: 'Pole Dance - Débutant',
    description: 'Cours idéal pour découvrir la pole dance. Pas de prérequis, accessible à toutes les femmes. Apprentissage des bases techniques et des figures simples.',
    niveau: 'debutant',
    duree: 60,
    capaciteMax: 12,
    prix: 25,
    horaires: [
      { jour: 'Lundi', heures: ['19:00', '20:00'] },
      { jour: 'Mercredi', heures: ['18:00', '19:00'] },
      { jour: 'Samedi', heures: ['10:00', '11:00'] }
    ],
    categories: ['fitness', 'danse'],
    salle: 'Studio Principal',
    estActif: true,
    dateCreation: new Date()
  },
  {
    nom: 'Pole Dance - Intermédiaire',
    description: 'Pour les pratiquantes ayant suivi au moins 6 mois de cours débutant. Apprentissage de figures plus complexes et travail sur la fluidité.',
    niveau: 'intermediaire',
    duree: 60,
    capaciteMax: 10,
    prix: 30,
    horaires: [
      { jour: 'Mardi', heures: ['19:00', '20:00'] },
      { jour: 'Jeudi', heures: ['19:00', '20:00'] },
      { jour: 'Samedi', heures: ['14:00', '15:00'] }
    ],
    categories: ['fitness', 'danse'],
    salle: 'Studio Principal',
    estActif: true,
    dateCreation: new Date()
  },
  {
    nom: 'Pole Dance - Avancé',
    description: 'Pour les pratiquantes confirmées. Travail sur les enchaînements, la chorégraphie et les figures avancées.',
    niveau: 'avance',
    duree: 75,
    capaciteMax: 8,
    prix: 35,
    horaires: [
      { jour: 'Lundi', heures: ['20:15', '21:30'] },
      { jour: 'Jeudi', heures: ['20:15', '21:30'] }
    ],
    categories: ['fitness', 'danse'],
    salle: 'Studio Principal',
    estActif: true,
    dateCreation: new Date()
  },
  {
    nom: 'Stretching & Mobilité',
    description: 'Amélioration de la flexibilité et de la mobilité articulaire. Complément parfait pour les pratiquantes de pole dance.',
    niveau: 'debutant',
    duree: 45,
    capaciteMax: 15,
    prix: 15,
    horaires: [
      { jour: 'Mercredi', heures: ['19:15', '20:00'] },
      { jour: 'Samedi', heures: ['11:15', '12:00'] }
    ],
    categories: ['bien-être', 'fitness'],
    salle: 'Salle Zen',
    estActif: true,
    dateCreation: new Date()
  },
  {
    nom: 'Exotic Dance',
    description: 'Danse sensuelle et ludique. Aucune prérequis, juste de la bonne humeur et du rythme !',
    niveau: 'debutant',
    duree: 60,
    capaciteMax: 12,
    prix: 20,
    horaires: [
      { jour: 'Vendredi', heures: ['19:00', '20:00'] }
    ],
    categories: ['danse'],
    salle: 'Studio Principal',
    estActif: true,
    dateCreation: new Date()
  }
];

export default cours;
