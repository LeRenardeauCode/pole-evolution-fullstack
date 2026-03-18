// Données de cours de test pour le seed dev
// Les dates sont générées dynamiquement pour être toujours dans le futur
const now = new Date();
const nextMonday = new Date(now);
nextMonday.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7 || 7));

const makeDate = (dayOffset, hours, minutes) => {
  const d = new Date(nextMonday);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

const cours = [
  {
    nom: 'Pole Dance Débutant - Lundi 18h',
    description: 'Cours d\'initiation au pole dance pour découvrir les bases en toute sécurité. Apprentissage des spins, grips et premières figures au sol.',
    type: 'collectif',
    niveau: 'debutant',
    dateDebut: makeDate(0, 18, 0),
    dateFin: makeDate(0, 19, 30),
    duree: 90,
    capaciteMax: 12,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Aucun prérequis. Matériel fourni : Tapis, Serviettes, Magnésie'
  },
  {
    nom: 'Pole Dance Débutant - Mercredi 19h',
    description: 'Cours d\'initiation au pole dance pour découvrir les bases en toute sécurité. Session du mercredi soir.',
    type: 'collectif',
    niveau: 'debutant',
    dateDebut: makeDate(2, 19, 0),
    dateFin: makeDate(2, 20, 30),
    duree: 90,
    capaciteMax: 12,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Aucun prérequis. Matériel fourni : Tapis, Serviettes, Magnésie'
  },
  {
    nom: 'Pole Dance Intermédiaire - Mardi 19h',
    description: 'Perfectionnez vos figures et gagnez en fluidité. Travail des inversions, combos et chorégraphies.',
    type: 'collectif',
    niveau: 'intermediaire',
    dateDebut: makeDate(1, 19, 0),
    dateFin: makeDate(1, 20, 30),
    duree: 90,
    capaciteMax: 10,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Prérequis : 6 mois de pratique minimum. Matériel fourni : Tapis, Serviettes, Magnésie'
  },
  {
    nom: 'Pole Dance Intermédiaire - Jeudi 20h',
    description: 'Niveau intermédiaire avec focus sur les transitions et le flow.',
    type: 'collectif',
    niveau: 'intermediaire',
    dateDebut: makeDate(3, 20, 0),
    dateFin: makeDate(3, 21, 30),
    duree: 90,
    capaciteMax: 10,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Prérequis : 6 mois de pratique minimum. Matériel fourni : Tapis, Serviettes, Magnésie'
  },
  {
    nom: 'Exotic Pole Dance - Vendredi 19h',
    description: 'Travail de la sensualité et de la féminité avec talons. Chorégraphies sexy et fluides.',
    type: 'collectif',
    niveau: 'intermediaire',
    dateDebut: makeDate(4, 19, 0),
    dateFin: makeDate(4, 20, 30),
    duree: 90,
    capaciteMax: 10,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Prérequis : Bases pole dance. Apporter ses talons. Matériel fourni : Tapis, Serviettes'
  },
  {
    nom: 'Exotic Pole Dance - Samedi 16h',
    description: 'Session exotic du samedi après-midi. Ambiance chill et sensuelle.',
    type: 'collectif',
    niveau: 'intermediaire',
    dateDebut: makeDate(5, 16, 0),
    dateFin: makeDate(5, 17, 30),
    duree: 90,
    capaciteMax: 10,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Prérequis : Bases pole dance. Apporter ses talons. Matériel fourni : Tapis, Serviettes'
  },
  {
    nom: 'Pole Dance Initiation - Cours Découverte',
    description: 'Cours découverte d\'1h30 pour essayer le pole dance sans engagement.',
    type: 'collectif',
    niveau: 'initiation',
    dateDebut: makeDate(5, 14, 0),
    dateFin: makeDate(5, 15, 30),
    duree: 90,
    capaciteMax: 8,
    placesReservees: 0,
    statut: 'planifie',
    estVisible: true,
    reservationOuverte: true,
    notes: 'Parfait pour découvrir ! Aucun prérequis. Tout le matériel fourni.'
  }
];

export default cours;
