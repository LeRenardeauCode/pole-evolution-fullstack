import mongoose from 'mongoose';

const coursSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du cours est obligatoire'],
    trim: true,
    minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },

  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },

  type: {
    type: String,
    enum: {
      values: ['collectif', 'prive', 'evjf', 'prestation', "decouverte"],
      message: 'Type doit être: collectif, prive, evjf ou prestation'
    },
    required: [true, 'Le type de cours est obligatoire'],
    default: 'collectif'
  },

  niveau: {
    type: String,
    enum: {
      values: ['debutant', 'intermediaire', 'tous_niveaux', 'initiation'],
      message: 'Niveau invalide'
    },
    default: 'tous_niveaux'
  },

  dateDebut: {
    type: Date,
    required: [true, 'La date de début est obligatoire'],
    index: true
  },

  dateFin: {
    type: Date,
    required: [true, 'La date de fin est obligatoire'],
    validate: {
      validator: function(v) {
        return v > this.dateDebut;
      },
      message: 'La date de fin doit être postérieure à la date de début'
    }
  },

  duree: {
    type: Number,
    required: [true, 'La durée est obligatoire'],
    min: [30, 'Durée minimum 30 minutes'],
    max: [180, 'Durée maximum 3 heures']
  },

  estRecurrent: {
    type: Boolean,
    default: false
  },

  jourSemaine: {
    type: Number,
    required: false,
    min: [0, 'Jour doit être entre 0 (dimanche) et 6 (samedi)'],
    max: [6, 'Jour doit être entre 0 (dimanche) et 6 (samedi)']
  },

  heureDebut: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: 'Format heure invalide (attendu HH:MM)'
    }
  },

  capaciteMax: {
    type: Number,
    required: [true, 'La capacité maximale est obligatoire'],
    min: [1, 'Capacité minimum 1 personne'],
    max: [12, 'Capacité maximum 12 personnes'],
    default: 10
  },

  capaciteMin: {
    type: Number,
    required: false,
    min: [1, 'Capacité minimum 1 personne'],
    default: 1
  },

  placesReservees: {
    type: Number,
    default: 0,
    min: [0, 'Ne peut pas être négatif']
  },

  statut: {
    type: String,
    enum: {
      values: ['planifie', 'confirme', 'complet', 'annule', 'termine'],
      message: 'Statut invalide'
    },
    default: 'planifie',
    index: true
  },

  raisonAnnulation: {
    type: String,
    required: false,
    maxlength: [500, 'La raison ne peut pas dépasser 500 caractères']
  },

  professeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: false
  },

  tarifsSpecifiques: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Forfait',
    default: []
  },

  estVisible: {
    type: Boolean,
    default: true
  },

  reservationOuverte: {
    type: Boolean,
    default: true
  },

  dateOuvertureReservation: {
    type: Date,
    required: false
  },

  dateFermetureReservation: {
    type: Date,
    required: false
  },

  notes: {
    type: String,
    required: false,
    maxlength: [2000, 'Les notes ne peuvent pas dépasser 2000 caractères']
  },

  listeAttente: [{
    utilisateurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur',
      required: true
    },
    dateInscription: {
      type: Date,
      default: Date.now
    }
  }]

}, {
  timestamps: true,
  collection: 'cours'
});

coursSchema.index({ dateDebut: 1, statut: 1 });
coursSchema.index({ dateDebut: 1, statut: 1, estVisible: 1, reservationOuverte: 1 });
coursSchema.index({ type: 1, niveau: 1 });
coursSchema.index({ estRecurrent: 1, jourSemaine: 1 });

coursSchema.virtual('placesDisponibles').get(function() {
  return this.capaciteMax - this.placesReservees;
});

coursSchema.virtual('tauxRemplissage').get(function() {
  if (this.capaciteMax === 0) return 0;
  return Math.round((this.placesReservees / this.capaciteMax) * 100);
});

coursSchema.virtual('estPasse').get(function() {
  if (!this.dateFin) return null;
  return this.dateFin < new Date();
});

coursSchema.virtual('estProchainement').get(function() {
  if (!this.dateDebut) return null;
  const maintenant = new Date();
  const dans24h = new Date(maintenant.getTime() + 24 * 60 * 60 * 1000);
  return this.dateDebut > maintenant && this.dateDebut <= dans24h;
});

coursSchema.virtual('peutEtreAnnule').get(function() {
  if (!this.dateDebut) return null;
  const maintenant = new Date();
  const delaiAnnulation = 24;
  const dateLimit = new Date(this.dateDebut.getTime() - delaiAnnulation * 60 * 60 * 1000);
  return maintenant < dateLimit && this.statut !== 'annule' && this.statut !== 'termine';
});

coursSchema.virtual('dureeFormatee').get(function() {
  const heures = Math.floor(this.duree / 60);
  const minutes = this.duree % 60;
  if (minutes === 0) return `${heures}h`;
  return `${heures}h${minutes.toString().padStart(2, '0')}`;
});

coursSchema.set('toJSON', { virtuals: true });
coursSchema.set('toObject', { virtuals: true });

coursSchema.pre('save', function(next) {
  // Calculer dateFin si manquante
  if (!this.dateFin && this.dateDebut && this.duree) {
    this.dateFin = new Date(this.dateDebut.getTime() + this.duree * 60 * 1000);
  }

  if (this.type === 'evjf') {
    if (this.capaciteMax > 12) {
      return next(new Error('EVJF : capacité maximale 12 personnes'));
    }
    if (this.capaciteMin && this.capaciteMin < 6) {
      return next(new Error('EVJF : capacité minimale 6 personnes'));
    }
  }

  if (this.placesReservees >= this.capaciteMax && this.statut === 'confirme') {
    this.statut = 'complet';
  }

  if (this.capaciteMin && this.capaciteMin > this.capaciteMax) {
    return next(new Error('La capacité minimale ne peut pas dépasser la capacité maximale'));
  }

  next();
});

coursSchema.methods.aPlacesDisponibles = function() {
  return this.placesReservees < this.capaciteMax && 
         this.statut !== 'complet' && 
         this.statut !== 'annule' &&
         this.statut !== 'termine';
};

coursSchema.methods.reserverPlace = async function(nombrePlaces = 1) {
  if (this.placesReservees + nombrePlaces > this.capaciteMax) {
    throw new Error('Pas assez de places disponibles');
  }

  this.placesReservees += nombrePlaces;

  if (this.placesReservees >= this.capaciteMax) {
    this.statut = 'complet';
  }

  return await this.save();
};

coursSchema.methods.libererPlace = async function(nombrePlaces = 1) {
  this.placesReservees = Math.max(0, this.placesReservees - nombrePlaces);

  if (this.statut === 'complet' && this.placesReservees < this.capaciteMax) {
    this.statut = 'confirme';
  }

  return await this.save();
};

coursSchema.methods.annuler = async function(raison) {
  this.statut = 'annule';
  this.raisonAnnulation = raison;
  return await this.save();
};

coursSchema.methods.ajouterListeAttente = async function(utilisateurId) {
  const dejaPresent = this.listeAttente.some(
    item => item.utilisateurId.toString() === utilisateurId.toString()
  );

  if (dejaPresent) {
    throw new Error('Utilisateur déjà dans la liste d\'attente');
  }

  this.listeAttente.push({ utilisateurId });
  return await this.save();
};

coursSchema.methods.retirerListeAttente = async function(utilisateurId) {
  this.listeAttente = this.listeAttente.filter(
    item => item.utilisateurId.toString() !== utilisateurId.toString()
  );
  return await this.save();
};

coursSchema.statics.getCoursFuturs = function(jourDebut, jourFin) {
  const query = {
    dateDebut: { $gte: jourDebut || new Date() },
    statut: { $in: ['planifie', 'confirme', 'complet'] },
    estVisible: true
  };

  if (jourFin) {
    query.dateDebut.$lte = jourFin;
  }

  return this.find(query)
    .sort({ dateDebut: 1 })
    .populate('professeur', 'prenom nom');
};

coursSchema.statics.getCoursSemaine = function(dateRef = new Date()) {
  const debutSemaine = new Date(dateRef);
  debutSemaine.setDate(dateRef.getDate() - dateRef.getDay() + 1);
  debutSemaine.setHours(0, 0, 0, 0);

  const finSemaine = new Date(debutSemaine);
  finSemaine.setDate(debutSemaine.getDate() + 6);
  finSemaine.setHours(23, 59, 59, 999);

  return this.getCoursFuturs(debutSemaine, finSemaine);
};

coursSchema.statics.getCoursJour = function(date) {
  const debutJour = new Date(date);
  debutJour.setHours(0, 0, 0, 0);

  const finJour = new Date(date);
  finJour.setHours(23, 59, 59, 999);

  return this.find({
    dateDebut: { $gte: debutJour, $lte: finJour },
    statut: { $nin: ['annule'] },
    estVisible: true
  })
  .sort({ dateDebut: 1 })
  .populate('professeur', 'prenom nom');
};

coursSchema.statics.marquerCoursTermines = function() {
  return this.updateMany(
    {
      dateFin: { $lt: new Date() },
      statut: { $in: ['planifie', 'confirme', 'complet'] }
    },
    { statut: 'termine' }
  );
};

coursSchema.statics.getStatistiques = async function() {
  const total = await this.countDocuments();
  const futurs = await this.countDocuments({ 
    dateDebut: { $gte: new Date() },
    statut: { $nin: ['annule', 'termine'] }
  });
  const complets = await this.countDocuments({ statut: 'complet' });
  const annules = await this.countDocuments({ statut: 'annule' });

  const coursAvecPlaces = await this.find({ 
    statut: { $nin: ['annule', 'termine'] } 
  }).select('capaciteMax placesReservees');

  let tauxMoyen = 0;
  if (coursAvecPlaces.length > 0) {
    const sommeTaux = coursAvecPlaces.reduce((acc, cours) => {
      return acc + (cours.placesReservees / cours.capaciteMax) * 100;
    }, 0);
    tauxMoyen = Math.round(sommeTaux / coursAvecPlaces.length);
  }

  return {
    total,
    futurs,
    complets,
    annules,
    tauxRemplissageMoyen: tauxMoyen
  };
};

coursSchema.statics.genererCoursRecurrents = async function(nombreSemaines = 4) {
  const coursRecurrents = await this.find({ estRecurrent: true });
  const coursGeneres = [];

  for (const coursModele of coursRecurrents) {
    for (let semaine = 1; semaine <= nombreSemaines; semaine++) {
      const dateDebut = new Date();
      const joursJusquaCours = (coursModele.jourSemaine - dateDebut.getDay() + 7) % 7 || 7;
      dateDebut.setDate(dateDebut.getDate() + joursJusquaCours + (semaine - 1) * 7);
      
      if (coursModele.heureDebut) {
        const [heures, minutes] = coursModele.heureDebut.split(':');
        dateDebut.setHours(parseInt(heures), parseInt(minutes), 0, 0);
      }

      const existe = await this.findOne({
        nom: coursModele.nom,
        dateDebut: {
          $gte: new Date(dateDebut.getTime() - 60 * 60 * 1000),
          $lte: new Date(dateDebut.getTime() + 60 * 60 * 1000)
        }
      });

      if (!existe) {
        const nouveauCours = await this.create({
          nom: coursModele.nom,
          description: coursModele.description,
          type: coursModele.type,
          niveau: coursModele.niveau,
          dateDebut,
          duree: coursModele.duree,
          capaciteMax: coursModele.capaciteMax,
          capaciteMin: coursModele.capaciteMin,
          professeur: coursModele.professeur,
          estRecurrent: false,
          statut: 'confirme'
        });
        coursGeneres.push(nouveauCours);
      }
    }
  }

  return coursGeneres;
};

export default mongoose.model('Cours', coursSchema);
