const parametres = [
  {
    cle: 'delai_annulation_cours',
    valeur: '24',
    type: 'texte',
    categorie: 'reservations',
    description: 'Délai minimum en heures pour annuler un cours sans pénalité',
    estModifiable: true
  },
  {
    cle: 'places_max_par_cours',
    valeur: '12',
    type: 'texte',
    categorie: 'cours',
    description: 'Nombre maximum de places par cours collectif',
    estModifiable: true
  },
  {
    cle: 'nom_etablissement',
    valeur: 'Pole Evolution',
    type: 'texte',
    categorie: 'interface',
    description: 'Nom de l\'établissement affiché sur le site et les emails',
    estModifiable: true
  },
  {
    cle: 'email_contact',
    valeur: 'contact@poleevolution.com',
    type: 'texte',
    categorie: 'contact',
    description: 'Email de contact principal',
    estModifiable: true
  },
  {
    cle: 'telephone_contact',
    valeur: '0612345678',
    type: 'texte',
    categorie: 'contact',
    description: 'Numéro de téléphone principal',
    estModifiable: true
  },
  {
    cle: 'adresse_etablissement',
    valeur: '123 Rue de la Danse, 62136 Lestrem',
    type: 'texte',
    categorie: 'contact',
    description: 'Adresse complète de l\'établissement',
    estModifiable: true
  },
  {
    cle: 'horaires_ouverture',
    valeur: 'Lun-Ven: 9h-21h, Sam: 10h-18h, Dim: Fermé',
    type: 'texte',
    categorie: 'interface',
    description: 'Horaires d\'ouverture affichés sur le site',
    estModifiable: true
  },
  {
    cle: 'delai_reservation_minimum',
    valeur: '2',
    type: 'texte',
    categorie: 'reservations',
    description: 'Délai minimum en heures avant un cours pour pouvoir réserver',
    estModifiable: true
  },
  {
    cle: 'taux_tva',
    valeur: '20',
    type: 'texte',
    categorie: 'tarifs',
    description: 'Taux de TVA appliqué aux forfaits',
    estModifiable: false
  },
  {
    cle: 'mode_maintenance',
    valeur: 'false',
    type: 'booleen',
    categorie: 'securite',
    description: 'Activer le mode maintenance (désactive les réservations)',
    estModifiable: true
  },
  {
    cle: 'mentions_legales',
    valeur: 'Pole Evolution - SIRET 123 456 789 00012 - TVA FR12345678901',
    type: 'texte',
    categorie: 'interface',
    description: 'Mentions légales affichées en footer',
    estModifiable: true
  },
  {
    cle: 'reseaux_sociaux',
    valeur: JSON.stringify({
      facebook: 'https://facebook.com/poleevolution',
      instagram: 'https://instagram.com/poleevolution',
      tiktok: 'https://tiktok.com/@poleevolution'
    }),
    type: 'json',
    categorie: 'reseaux_sociaux',
    description: 'URLs des réseaux sociaux',
    estModifiable: true
  },
  {
    cle: 'email_expediteur',
    valeur: 'noreply@poleevolution.com',
    type: 'texte',
    categorie: 'emails',
    description: 'Adresse email d\'expédition pour les emails automatiques',
    estModifiable: true
  },
  {
    cle: 'prix_cours_unitaire',
    valeur: '25',
    type: 'texte',
    categorie: 'tarifs',
    description: 'Prix d\'un cours à l\'unité en euros',
    estModifiable: true
  }
];

export default parametres;
