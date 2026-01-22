import mongoose from 'mongoose';

const avisSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: [true, 'L\'utilisateur est obligatoire'],
  },

  nomAffiche: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },

  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours',
    required: false
  },

  note: {
    type: Number,
    required: [true, 'La note est obligatoire'],
    min: [1, 'La note minimum est 1 étoile'],
    max: [5, 'La note maximum est 5 étoiles'],
    validate: {
      validator: Number.isInteger,
      message: 'La note doit être un nombre entier'
    }
  },

  titre: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },

  commentaire: {
    type: String,
    required: [true, 'Le commentaire est obligatoire'],
    trim: true,
    minlength: [10, 'Le commentaire doit contenir au moins 10 caractères'],
    maxlength: [2000, 'Le commentaire ne peut pas dépasser 2000 caractères']
  },

  notesDetails: {
    accueil: {
      type: Number,
      required: false,
      min: [1, 'Minimum 1 étoile'],
      max: [5, 'Maximum 5 étoiles']
    },
    qualiteCours: {
      type: Number,
      required: false,
      min: [1, 'Minimum 1 étoile'],
      max: [5, 'Maximum 5 étoiles']
    },
    proprete: {
      type: Number,
      required: false,
      min: [1, 'Minimum 1 étoile'],
      max: [5, 'Maximum 5 étoiles']
    },
    ambiance: {
      type: Number,
      required: false,
      min: [1, 'Minimum 1 étoile'],
      max: [5, 'Maximum 5 étoiles']
    },
    rapportQualitePrix: {
      type: Number,
      required: false,
      min: [1, 'Minimum 1 étoile'],
      max: [5, 'Maximum 5 étoiles']
    }
  },

  statut: {
    type: String,
    enum: {
      values: ['en_attente', 'approuve', 'rejete', 'signale'],
      message: 'Statut invalide'
    },
    default: 'en_attente',
    index: true
  },

  estVerifie: {
    type: Boolean,
    default: false
  },

  estPublic: {
    type: Boolean,
    default: true
  },

  datePublication: {
    type: Date,
    required: false
  },

  moderePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: false
  },

  dateModeration: {
    type: Date,
    required: false
  },

  raisonRejet: {
    type: String,
    required: false,
    maxlength: [500, 'La raison ne peut pas dépasser 500 caractères']
  },

  reponseAdmin: {
    contenu: {
      type: String,
      required: false,
      maxlength: [1000, 'La réponse ne peut pas dépasser 1000 caractères']
    },
    dateReponse: {
      type: Date,
      required: false
    }
  },

  utile: {
    type: Number,
    default: 0,
    min: [0, 'Ne peut pas être négatif']
  },

  signalements: {
    type: Number,
    default: 0,
    min: [0, 'Ne peut pas être négatif']
  },

  photo: {
    type: String,
    required: false,
    maxlength: [500, 'L\'URL ne peut pas dépasser 500 caractères']
  },

  ipAddress: {
    type: String,
    required: false,
    select: false
  },

  source: {
    type: String,
    enum: {
      values: ['site_web', 'email', 'google', 'facebook', 'import'],
      message: 'Source invalide'
    },
    default: 'site_web'
  }

}, {
  timestamps: true, 
  collection: 'avis'
});

avisSchema.index({ statut: 1, estPublic: 1, datePublication: -1 });
avisSchema.index({ utilisateur: 1, createdAt: -1 });
avisSchema.index({ cours: 1, statut: 1 });
avisSchema.index({ note: -1, statut: 1 });

avisSchema.virtual('noteTexte').get(function() {
  return '⭐'.repeat(this.note);
});

avisSchema.virtual('extraitCommentaire').get(function() {
  if (this.commentaire.length <= 100) return this.commentaire;
  return this.commentaire.substring(0, 100) + '...';
});

avisSchema.virtual('noteMoyenneDetails').get(function() {
  const notes = [
    this.notesDetails.accueil,
    this.notesDetails.qualiteCours,
    this.notesDetails.proprete,
    this.notesDetails.ambiance,
    this.notesDetails.rapportQualitePrix
  ].filter(n => n !== undefined && n !== null);

  if (notes.length === 0) return null;

  const somme = notes.reduce((acc, note) => acc + note, 0);
  return Math.round((somme / notes.length) * 10) / 10; 
});

avisSchema.set('toJSON', { virtuals: true });
avisSchema.set('toObject', { virtuals: true });

// ========== MIDDLEWARE ==========
avisSchema.pre('save', async function(next) {
  if (this.isNew && !this.estVerifie) {
    const Reservation = mongoose.model('Reservation');
    
    const aReservation = await Reservation.findOne({
      utilisateur: this.utilisateur,
      statut: 'present'
    });

    this.estVerifie = !!aReservation;
  }

  next();
});

avisSchema.methods.approuver = async function(moderateurId) {
  this.statut = 'approuve';
  this.datePublication = new Date();
  this.moderePar = moderateurId;
  this.dateModeration = new Date();

  const Notification = mongoose.model('Notification');
  await Notification.creer({
    type: 'avis_client',
    titre: 'Votre avis a été publié',
    message: 'Merci pour votre témoignage ! Il est maintenant visible sur notre site.',
    priorite: 'normale',
    utilisateurId: this.utilisateur
  });

  return await this.save();
};

avisSchema.methods.rejeter = async function(moderateurId, raison) {
  this.statut = 'rejete';
  this.raisonRejet = raison;
  this.moderePar = moderateurId;
  this.dateModeration = new Date();
  return await this.save();
};

avisSchema.methods.signaler = async function() {
  this.signalements += 1;

  if (this.signalements >= 3 && this.statut === 'approuve') {
    this.statut = 'signale';
  }

  return await this.save();
};

avisSchema.methods.marquerUtile = async function() {
  this.utile += 1;
  return await this.save();
};

avisSchema.methods.repondre = async function(contenuReponse) {
  this.reponseAdmin.contenu = contenuReponse;
  this.reponseAdmin.dateReponse = new Date();
  return await this.save();
};

avisSchema.statics.getAvisPublics = function(limite = 20) {
  return this.find({
    statut: 'approuve',
    estPublic: true
  })
  .sort({ datePublication: -1 })
  .limit(limite)
  .populate('utilisateur', 'pseudo')
  .select('-ipAddress');
};

avisSchema.statics.getAvisEnAttente = function() {
  return this.find({ statut: 'en_attente' })
    .sort({ createdAt: 1 })
    .populate('utilisateur', 'prenom nom email');
};

avisSchema.statics.getNoteMoyenne = async function() {
  const result = await this.aggregate([
    { $match: { statut: 'approuve' } },
    { $group: { _id: null, moyenne: { $avg: '$note' } } }
  ]);

  return result.length > 0 ? Math.round(result[0].moyenne * 10) / 10 : 0;
};

avisSchema.statics.getStatistiques = async function() {
  const total = await this.countDocuments();
  const approuves = await this.countDocuments({ statut: 'approuve' });
  const enAttente = await this.countDocuments({ statut: 'en_attente' });
  const rejetes = await this.countDocuments({ statut: 'rejete' });
  const signales = await this.countDocuments({ statut: 'signale' });
  const noteMoyenne = await this.getNoteMoyenne();

  const repartitionNotes = await this.aggregate([
    { $match: { statut: 'approuve' } },
    { $group: { _id: '$note', count: { $sum: 1 } } },
    { $sort: { _id: -1 } }
  ]);

  return {
    total,
    approuves,
    enAttente,
    rejetes,
    signales,
    noteMoyenne,
    repartitionNotes: repartitionNotes.reduce((acc, item) => {
      acc[`${item._id}_etoiles`] = item.count;
      return acc;
    }, {})
  };
};

avisSchema.statics.getMeilleursAvis = function(limite = 5) {
  return this.find({
    statut: 'approuve',
    estPublic: true,
    note: 5
  })
  .sort({ utile: -1, datePublication: -1 })
  .limit(limite)
  .populate('utilisateur', 'prenom nom');
};

avisSchema.statics.peutLaisserAvis = async function(utilisateurId) {
  const Reservation = mongoose.model('Reservation');
  
  const aAssiste = await Reservation.findOne({
    utilisateur: utilisateurId,
    statut: 'present'
  });

  if (!aAssiste) {
    return { peut: false, raison: 'Vous devez avoir assisté à au moins un cours' };
  }

  const dernierAvis = await this.findOne({ utilisateur: utilisateurId })
    .sort({ createdAt: -1 });

  if (dernierAvis) {
    const joursDernierAvis = (new Date() - dernierAvis.createdAt) / (1000 * 60 * 60 * 24);
    if (joursDernierAvis < 7) {
      return { 
        peut: false, 
        raison: 'Vous avez déjà laissé un avis il y a moins de 7 jours' 
      };
    }
  }

  return { peut: true };
};

avisSchema.statics.detecterSpam = async function(ipAddress) {
  const count = await this.countDocuments({
    ipAddress: ipAddress,
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
  });

  return count >= 3;
};

export default mongoose.model('Avis', avisSchema);
