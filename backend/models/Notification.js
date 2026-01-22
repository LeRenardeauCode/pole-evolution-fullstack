import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: [
        'nouveau_message',     
        'nouvelle_reservation', 
        'annulation',          
        'cours_complet',       
        'paiement_recu',      
        'rappel_cours',        
        'avis_client',        
        'systeme',            
        'autre'
      ],
      message: 'Type de notification invalide'
    },
    required: [true, 'Le type est obligatoire'],
    index: true
  },

  titre: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
  },

  message: {
    type: String,
    required: [true, 'Le message est obligatoire'],
    trim: true,
    maxlength: [1000, 'Le message ne peut pas dépasser 1000 caractères'],
  },

  utilisateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: false,
  },

  coursId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours',
    required: false,
  },

  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: false,
  },

  messageContactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessageContact',
    required: false,
  },

  dateCreation: {
    type: Date,
    default: Date.now,
    required: true,
    index: true
  },

  estLue: {
    type: Boolean,
    default: false,
    index: true
  },

  dateLecture: {
    type: Date,
    required: false
  },

  priorite: {
    type: String,
    enum: {
      values: ['basse', 'normale', 'haute', 'urgente'],
      message: 'Priorité invalide'
    },
    default: 'normale',
    index: true
  },

  lienAction: {
    type: String,
    required: false,
    maxlength: [500, 'Le lien ne peut pas dépasser 500 caractères'],
  },

  texteBouton: {
    type: String,
    required: false,
    maxlength: [50, 'Le texte du bouton ne peut pas dépasser 50 caractères'],
    default: 'Voir détails'
  },

  dateExpiration: {
    type: Date,
    required: false,
  },

  estArchivee: {
    type: Boolean,
    default: false,
    index: true
  }

}, {
  timestamps: true,
  collection: 'notifications'
});


notificationSchema.index({ estLue: 1, priorite: -1, dateCreation: -1 });
notificationSchema.index({ type: 1, dateCreation: -1 });
notificationSchema.index({ estArchivee: 1, dateCreation: -1 });
notificationSchema.index({ dateExpiration: 1 }, { 
  expireAfterSeconds: 0
});


notificationSchema.virtual('tempsEcoule').get(function() {
  const maintenant = new Date();
  const diff = maintenant - this.dateCreation;
  return Math.floor(diff / (1000 * 60));
});

notificationSchema.virtual('statut').get(function() {
  if (this.estArchivee) return 'Archivée';
  if (this.estLue) return 'Lue';
  return 'Nouvelle';
});

notificationSchema.set('toJSON', { virtuals: true });
notificationSchema.set('toObject', { virtuals: true });


notificationSchema.pre('save', function(next) {
  if (this.isModified('estLue') && this.estLue && !this.dateLecture) {
    this.dateLecture = new Date();
  }
  next();
});


notificationSchema.methods.marquerCommeLue = function() {
  this.estLue = true;
  this.dateLecture = new Date();
  return this.save();
};

notificationSchema.methods.archiver = function() {
  this.estArchivee = true;
  return this.save();
};


notificationSchema.statics.getNonLues = function(limite = 20) {
  return this.find({ 
    estLue: false, 
    estArchivee: false 
  })
  .sort({ priorite: -1, dateCreation: -1 })
  .limit(limite)
  .populate('utilisateurId', 'prenom nom email')
  .populate('coursId', 'nom dateDebut')
  .populate('reservationId', 'statut');
};

notificationSchema.statics.compterNonLues = async function() {
  const total = await this.countDocuments({ 
    estLue: false, 
    estArchivee: false 
  });

  const urgentes = await this.countDocuments({ 
    estLue: false, 
    estArchivee: false,
    priorite: 'urgente'
  });

  const hautes = await this.countDocuments({ 
    estLue: false, 
    estArchivee: false,
    priorite: 'haute'
  });

  return { total, urgentes, hautes };
};

notificationSchema.statics.creer = async function(data) {
  const notification = new this({
    type: data.type,
    titre: data.titre,
    message: data.message,
    priorite: data.priorite || 'normale',
    lienAction: data.lienAction,
    texteBouton: data.texteBouton,
    utilisateurId: data.utilisateurId,
    coursId: data.coursId,
    reservationId: data.reservationId,
    messageContactId: data.messageContactId,
    dateExpiration: data.dateExpiration
  });

  return await notification.save();
};

notificationSchema.statics.marquerToutesCommeLues = function() {
  return this.updateMany(
    { estLue: false, estArchivee: false },
    { 
      estLue: true, 
      dateLecture: new Date() 
    }
  );
};

notificationSchema.statics.archiverAnciennes = function(joursAvant = 30) {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - joursAvant);

  return this.updateMany(
    { 
      estLue: true,
      dateCreation: { $lt: dateLimit },
      estArchivee: false
    },
    { estArchivee: true }
  );
};

notificationSchema.statics.supprimerArchivees = function(joursAvant = 90) {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - joursAvant);

  return this.deleteMany({
    estArchivee: true,
    dateCreation: { $lt: dateLimit }
  });
};

export default mongoose.model('Notification', notificationSchema);
