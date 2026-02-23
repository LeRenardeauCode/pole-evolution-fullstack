import mongoose from 'mongoose';
import validator from 'validator';

const messageContactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },

  prenom: {
    type: String,
    required: false,
    trim: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le prénom ne peut pas dépasser 100 caractères']
  },

  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: 'Email invalide'
    }
  },

  telephone: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(v);
      },
      message: 'Numéro de téléphone invalide (format français attendu)'
    }
  },

  sujet: {
    type: String,
    required: [true, 'Le sujet est obligatoire'],
    trim: true,
    maxlength: [200, 'Le sujet ne peut pas dépasser 200 caractères'],
    enum: {
      values: [
        'Informations cours',
        'Tarifs et abonnements',
        'Réservation',
        'EVJF',
        'Cours privés',
        'Partenariat',
        'Autre'
      ],
      message: 'Sujet invalide'
    }
  },

  message: {
    type: String,
    required: [true, 'Le message est obligatoire'],
    trim: true,
    minlength: [10, 'Le message doit contenir au moins 10 caractères'],
    maxlength: [2000, 'Le message ne peut pas dépasser 2000 caractères']
  },

  dateEnvoi: {
    type: Date,
    default: Date.now,
    required: true
  },

  estTraitee: {
    type: Boolean,
    default: false
  },

  dateTraitement: {
    type: Date,
    required: false
  },

  reponseAdmin: {
    type: String,
    required: false,
    maxlength: [2000, 'La réponse ne peut pas dépasser 2000 caractères']
  },

  ipAddress: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return validator.isIP(v);
      },
      message: 'Adresse IP invalide'
    }
  },

  userAgent: {
    type: String,
    required: false,
    maxlength: [500, 'User agent trop long']
  },

  estSpam: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true,
  collection: 'messagescontacts'
});

messageContactSchema.index({ estTraitee: 1 });
messageContactSchema.index({ dateEnvoi: -1 });
messageContactSchema.index({ sujet: 1 });
messageContactSchema.index({ ipAddress: 1, dateEnvoi: -1 });

messageContactSchema.virtual('nomComplet').get(function() {
  if (this.prenom) {
    return `${this.prenom} ${this.nom}`;
  }
  return this.nom;
});

messageContactSchema.virtual('delaiTraitement').get(function() {
  if (!this.estTraitee || !this.dateTraitement) {
    return null;
  }
  const diff = this.dateTraitement - this.dateEnvoi;
  return Math.round(diff / (1000 * 60 * 60));
});

messageContactSchema.set('toJSON', { virtuals: true });
messageContactSchema.set('toObject', { virtuals: true });

messageContactSchema.pre('save', function(next) {
  if (this.isModified('estTraitee') && this.estTraitee && !this.dateTraitement) {
    this.dateTraitement = new Date();
  }
  next();
});

messageContactSchema.methods.marquerCommeTraite = function(reponse) {
  this.estTraitee = true;
  this.dateTraitement = new Date();
  if (reponse) {
    this.reponseAdmin = reponse;
  }
  return this.save();
};

messageContactSchema.methods.marquerCommeSpam = function() {
  this.estSpam = true;
  this.estTraitee = true;
  this.dateTraitement = new Date();
  return this.save();
};

messageContactSchema.statics.getMessagesNonTraites = function() {
  return this.find({ 
    estTraitee: false, 
    estSpam: false 
  })
  .sort({ dateEnvoi: -1 })
  .limit(50);
};

messageContactSchema.statics.verifierLimiteIP = async function(ipAddress) {
  const debutJour = new Date();
  debutJour.setHours(0, 0, 0, 0);

  const count = await this.countDocuments({
    ipAddress: ipAddress,
    dateEnvoi: { $gte: debutJour }
  });

  return count < 3;
};

messageContactSchema.statics.getStatistiques = async function() {
  const total = await this.countDocuments();
  const traites = await this.countDocuments({ estTraitee: true });
  const spam = await this.countDocuments({ estSpam: true });
  const enAttente = await this.countDocuments({ estTraitee: false, estSpam: false });

  const messagesTraites = await this.find({ 
    estTraitee: true, 
    dateTraitement: { $exists: true } 
  });

  let delaiMoyen = 0;
  if (messagesTraites.length > 0) {
    const sommeDelais = messagesTraites.reduce((acc, msg) => {
      const delai = (msg.dateTraitement - msg.dateEnvoi) / (1000 * 60 * 60);
      return acc + delai;
    }, 0);
    delaiMoyen = Math.round(sommeDelais / messagesTraites.length);
  }

  return {
    total,
    traites,
    spam,
    enAttente,
    delaiMoyenHeures: delaiMoyen
  };
};

export default mongoose.model('MessageContact', messageContactSchema);
