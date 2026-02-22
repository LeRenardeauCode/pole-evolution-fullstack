const parametres = [
  {
    cle: "emailcontact",
    valeur: "jelvibm@gmail.com",
    type: "texte",
    categorie: "contact",
    description: "Email de contact principal",
    estModifiable: true,
  },
  {
    cle: "telephonecontact",
    valeur: "07 67 26 94 71",
    type: "texte",
    categorie: "contact",
    description: "Numéro de téléphone principal",
    estModifiable: true,
  },
  {
    cle: "adresseetablissement",
    valeur: "1412 Rue Joffre, 62860 Rumaucourt",
    type: "texte",
    categorie: "contact",
    description: "Adresse complète de l'établissement",
    estModifiable: true,
  },

  {
    cle: "footerfacebookurl",
    valeur: "#",
    type: "texte",
    categorie: "reseaux_sociaux",
    description: "Lien Facebook",
    estModifiable: true,
  },
  {
    cle: "footerinstagramurl",
    valeur: "#",
    type: "texte",
    categorie: "reseaux_sociaux", 
    description: "Lien Instagram",
    estModifiable: true,
  },
  {
    cle: "footertiktokurl",
    valeur: "#",
    type: "texte",
    categorie: "reseaux_sociaux",
    description: "Lien TikTok",
    estModifiable: true,
  },

  {
    cle: "messageinscriptioncours",
    valeur: "Merci pour votre réservation ! Consultez le règlement intérieur.",
    type: "texte",
    categorie: "cours",
    description: "Message affiché après inscription à un cours",
    estModifiable: true,
  },
  {
    cle: "placesmaxparcours",
    valeur: "10",
    type: "nombre",
    categorie: "cours",
    description: "Nombre maximum de places par cours collectif (12 pour EVJF)",
    estModifiable: true,
  },

  {
    cle: "delaiannulationcours",
    valeur: "24",
    type: "nombre",
    categorie: "reservations",
    description: "Délai minimum en heures pour annuler sans pénalité",
    estModifiable: true,
  },
  {
    cle: "delaireservationminimum",
    valeur: "2",
    type: "nombre",
    categorie: "reservations",
    description: "Délai minimum en heures avant un cours pour réserver",
    estModifiable: true,
  },

  {
    cle: "nometablissement",
    valeur: "Pole Evolution",
    type: "texte",
    categorie: "interface",
    description: "Nom de l'établissement affiché sur le site",
    estModifiable: true,
  },
  {
    cle: "texteapropos",
    valeur: `Je m'appelle Coraline, j'ai 32 ans, je suis la directrice d'un petit local très conviviale d'environ 50 M2 à Rumaucourt où j'enseigne la Pole Dance de l'initiation au niveau intermédiaire.

J'ai commencé la Pole Dance en 2019 chez Coralie Père, une grande fierté pour moi d'apprendre à ses côtés et un grand merci à elle pour tout ce qu'elle m'a et continue de m'apporter aujourd'hui, elle a su me transmettre sa passion et à présent, je suis fière de la transmettre à mon tour.

Depuis toute petite, j'ai toujours rêvé d'être sur scène, grâce à la Pole-Dance, j'ai pu créer, imaginer des chorégraphies plus ou moins sexy avec ou sans paillettes, j'ai pu performer sur des scènes divers, transmettre des émotions et également impressionné des foules avec des figures plus ou moins techniques.

Je n'ai jamais pratiqué de danse classique, gymnastique ou autre. Je me suis donné les moyens d'y arriver aujourd'hui grâce à ma détermination et grâce à une personne incroyable que j'ai déjà cité qui m'a transmis énormément.

Alors si toi aussi, tu souhaites repousser tes limites, sortir de ta zone de confort, FONCE et comme je dis souvent "laisse tes rêves prendre de la hauteur".`,
    type: "texte",
    categorie: "interface",
    description: "Texte de présentation sur la page À Propos",
    estModifiable: true,
  },
  {
    cle: "mentionslegales",
    valeur: "Pole Evolution - SIRET 123 456 789 00012 - TVA FR12345678901",
    type: "texte",
    categorie: "interface",
    description: "Mentions légales affichées en footer",
    estModifiable: true,
  },
  {
    cle: "horairesouverture",
    valeur: "Lun-Ven: 9h-21h, Sam: 10h-18h, Dim: Fermé",
    type: "texte",
    categorie: "interface",
    description: "Horaires d'ouverture affichés sur le site",
    estModifiable: true,
  },

  {
    cle: "notificationsactives",
    valeur: true,  
    type: "booleen",
    categorie: "emails",
    description: "Activer/désactiver les notifications emails automatiques",
    estModifiable: true,
  },
  {
    cle: "emailexpediteur",
    valeur: "jelvibm@gmail.com",
    type: "texte",
    categorie: "emails",
    description: "Adresse email d'expédition pour les emails automatiques",
    estModifiable: true,
  },

  {
    cle: "modemaintenance",
    valeur: false, 
    type: "booleen",
    categorie: "securite",
    description: "Activer le mode maintenance (désactive les réservations)",
    estModifiable: true,
  },


  {
    cle: "prixcoursunitaire",
    valeur: 25,  
    type: "nombre",
    categorie: "tarifs",
    description: "Prix d'un cours à l'unité en euros",
    estModifiable: true,
  },
  {
    cle: "tauxtva",
    valeur: 20,
    type: "nombre",
    categorie: "tarifs",
    description: "Taux de TVA appliqué aux forfaits",
    estModifiable: false,
  },

  {
    cle: "footeradresseligne1",
    valeur: "1412 Rue Joffre",
    type: "texte",
    categorie: "footer",
    description: "Adresse ligne 1",
    estModifiable: true,
  },
  {
    cle: "footeradresseligne2",
    valeur: "62860 RUMAUCOURT",
    type: "texte",
    categorie: "footer",
    description: "Code postal et ville",
    estModifiable: true,
  },
  {
    cle: "footerdescription",
    valeur: "Rumaucourt est un petit village à 3 minutes de Baralle/Marquion.",
    type: "texte",
    categorie: "footer",
    description: "Description de l'emplacement",
    estModifiable: true,
  },
  {
    cle: "footerdistancecambrai",
    valeur: "25 minutes de Cambrai",
    type: "texte",
    categorie: "footer",
    description: "Distance depuis Cambrai",
    estModifiable: true,
  },
  {
    cle: "footerdistancedouai",
    valeur: "25 minutes de Douai",
    type: "texte",
    categorie: "footer",
    description: "Distance depuis Douai",
    estModifiable: true,
  },
  {
    cle: "footerdistancearras",
    valeur: "Environ 30 minutes d'Arras",
    type: "texte",
    categorie: "footer",
    description: "Distance depuis Arras",
    estModifiable: true,
  },
  {
    cle: "footermapimage",
    valeur: "",
    type: "texte",
    categorie: "footer",
    description: "Image de la carte Google Maps (optionnel)",
    estModifiable: true,
  },
];

export default parametres;
