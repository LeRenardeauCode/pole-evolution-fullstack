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
  },

  {
    cle: 'footer_adresse_ligne1',
    valeur: '1412 Rue Joffre',
    type: 'texte',
    categorie: 'footer',
    description: 'Adresse ligne 1',
    estModifiable: true
  },
  {
    cle: 'footer_adresse_ligne2',
    valeur: '62680 RUMAUCOURT',
    type: 'texte',
    categorie: 'footer',
    description: 'Code postal et ville',
    estModifiable: true
  },
  {
    cle: 'footer_description',
    valeur: 'Rumaucourt est un petit village à 3 minutes de Baralle/Marquion.',
    type: 'texte',
    categorie: 'footer',
    description: 'Description de l\'emplacement',
    estModifiable: true
  },
  {
    cle: 'footer_distance_cambrai',
    valeur: '25 minutes de Cambrai',
    type: 'texte',
    categorie: 'footer',
    description: 'Distance depuis Cambrai',
    estModifiable: true
  },
  {
    cle: 'footer_distance_douai',
    valeur: '25 minutes de Douai',
    type: 'texte',
    categorie: 'footer',
    description: 'Distance depuis Douai',
    estModifiable: true
  },
  {
    cle: 'footer_distance_arras',
    valeur: 'Environ 30 minutes d\'Arras',
    type: 'texte',
    categorie: 'footer',
    description: 'Distance depuis Arras',
    estModifiable: true
  },
  {
    cle: 'footer_facebook_url',
    valeur: 'https://facebook.com/poleevolution',
    type: 'texte',
    categorie: 'footer',
    description: 'Lien Facebook',
    estModifiable: true
  },
  {
    cle: 'footer_instagram_url',
    valeur: 'https://instagram.com/poleevolution',
    type: 'texte',
    categorie: 'footer',
    description: 'Lien Instagram',
    estModifiable: true
  },
  {
    cle: 'footer_tiktok_url',
    valeur: 'https://tiktok.com/@poleevolution',
    type: 'texte',
    categorie: 'footer',
    description: 'Lien TikTok',
    estModifiable: true
  },
  {
    cle: 'footer_map_image',
    valeur: '/uploads/google_map.png',
    type: 'texte',
    categorie: 'footer',
    description: 'Image de la carte Google Maps',
    estModifiable: true
  }
];

export default parametres;
