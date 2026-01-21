import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const utilisateurSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
    trim: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },

  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },

  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: 'Email invalide'
    }
  },

  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
    select: false // Ne jamais renvoyer le mot de passe dans les requêtes par défaut
  },

  role: {
    type: String,
    enum: {
      values: ['client', 'admin'],
      message: 'Rôle doit être client ou admin'
    },
    default: 'client'
  },

  telephone: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        // Format français : 06 12 34 56 78 ou +33612345678
        return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(v);
      },
      message: 'Numéro de téléphone invalide (format français attendu)'
    }
  },

  adresse: {
    rue: {
      type: String,
      required: false,
      trim: true,
      maxlength: [200, 'La rue ne peut pas dépasser 200 caractères']
    },
    codePostal: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^[0-9]{5}$/.test(v); // Code postal français 5 chiffres
        },
        message: 'Code postal invalide (5 chiffres attendus)'
      }
    },
    ville: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, 'La ville ne peut pas dépasser 100 caractères']
    },
    pays: {
      type: String,
      required: false,
      trim: true,
      default: 'France',
      maxlength: [50, 'Le pays ne peut pas dépasser 50 caractères']
    }
  },

  dateNaissance: {
    type: Date,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true;
        // Date doit être dans le passé
        return v < new Date();
      },
      message: 'La date de naissance doit être dans le passé'
    }
  },

  certificatMedical: {
    estValide: {
      type: Boolean,
      default: false
    },
    dateValidite: {
      type: Date,
      required: false
    },
    fichierUrl: {
      type: String,
      required: false
    }
  },

  forfaitsActifs: [{
    forfaitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Forfait',
      required: true
    },
    dateAchat: {
      type: Date,
      default: Date.now,
      required: true
    },
    dateExpiration: {
      type: Date,
      required: false
    },
    seancesRestantes: {
      type: Number,
      required: false,
      min: [0, 'Le nombre de séances restantes ne peut pas être négatif']
    },
    estActif: {
      type: Boolean,
      default: true
    }
  }],

  abonnementActif: {
    forfaitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Forfait',
      required: false
    },
    dateDebut: {
      type: Date,
      required: false
    },
    dateFinEngagement: {
      type: Date,
      required: false
    },
    statutPaiement: {
      type: String,
      enum: ['actif', 'impaye', 'resilie'],
      default: 'actif'
    },
    dateProchaineEcheance: {
      type: Date,
      required: false
    }
  },

  estActif: {
    type: Boolean,
    default: true
  },

  emailVerifie: {
    type: Boolean,
    default: false
  },

  tokenVerificationEmail: {
    type: String,
    required: false,
    select: false
  },

  tokenResetPassword: {
    type: String,
    required: false,
    select: false
  },

  tokenResetPasswordExpire: {
    type: Date,
    required: false,
    select: false
  },

  dateInscription: {
    type: Date,
    default: Date.now
  },

  derniereConnexion: {
    type: Date,
    required: false
  },

  nombreCoursReserves: {
    type: Number,
    default: 0,
    min: [0, 'Ne peut pas être négatif']
  },

  nombreCoursAssistes: {
    type: Number,
    default: 0,
    min: [0, 'Ne peut pas être négatif']
  },

  nombreAnnulations: {
    type: Number,
    default: 0,
    min: [0, 'Ne peut pas être négatif']
  }

}, {
  timestamps: true,
  collection: 'utilisateurs'
});


utilisateurSchema.index({ email: 1 }, { unique: true });

utilisateurSchema.index({ nom: 1, prenom: 1 });

utilisateurSchema.index({ estActif: 1, role: 1 });


utilisateurSchema.virtual('nomComplet').get(function() {
  return `${this.prenom} ${this.nom}`;
});

utilisateurSchema.virtual('age').get(function() {
  if (!this.dateNaissance) return null;
  const today = new Date();
  const birthDate = new Date(this.dateNaissance);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

utilisateurSchema.virtual('estMineur').get(function() {
  if (!this.age) return false;
  return this.age < 18;
});


utilisateurSchema.virtual('adresseComplete').get(function() {
  if (!this.adresse.rue) return null;
  return `${this.adresse.rue}, ${this.adresse.codePostal} ${this.adresse.ville}, ${this.adresse.pays}`;
});

utilisateurSchema.set('toJSON', { virtuals: true });
utilisateurSchema.set('toObject', { virtuals: true });


utilisateurSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    next();
  } catch (error) {
    next(error);
  }
});


utilisateurSchema.methods.comparerMotDePasse = async function(motDePasseFourni) {
  return await bcrypt.compare(motDePasseFourni, this.motDePasse);
};


utilisateurSchema.methods.genererToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};


utilisateurSchema.methods.genererTokenResetPassword = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');

  this.tokenResetPassword = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.tokenResetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

utilisateurSchema.methods.certificatEstValide = function() {
  if (!this.certificatMedical.estValide) return false;
  if (!this.certificatMedical.dateValidite) return false;
  return this.certificatMedical.dateValidite > new Date();
};


utilisateurSchema.methods.deduireSeance = async function(forfaitId) {
  const forfait = this.forfaitsActifs.find(
    f => f.forfaitId.toString() === forfaitId.toString() && f.estActif
  );

  if (!forfait) {
    throw new Error('Forfait non trouvé ou inactif');
  }

  if (forfait.seancesRestantes <= 0) {
    throw new Error('Plus de séances disponibles sur ce forfait');
  }

  forfait.seancesRestantes -= 1;

  if (forfait.seancesRestantes === 0) {
    forfait.estActif = false;
  }

  return await this.save();
};


utilisateurSchema.methods.aForfaitActif = function() {
  const forfaitValide = this.forfaitsActifs.some(f => 
    f.estActif && 
    f.seancesRestantes > 0 &&
    (!f.dateExpiration || f.dateExpiration > new Date())
  );

  if (forfaitValide) return true;

  return this.abonnementActif.forfaitId && 
         this.abonnementActif.statutPaiement === 'actif';
};

utilisateurSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() }).select('+motDePasse');
};

utilisateurSchema.statics.getClients = function() {
  return this.find({ 
    role: 'client', 
    estActif: true 
  })
  .sort({ dateInscription: -1 })
  .select('-motDePasse -tokenResetPassword');
};

utilisateurSchema.statics.getStatistiques = async function() {
  const total = await this.countDocuments({ role: 'client' });
  const actifs = await this.countDocuments({ role: 'client', estActif: true });
  const avecAbonnement = await this.countDocuments({ 
    'abonnementActif.statutPaiement': 'actif' 
  });
  const emailsVerifies = await this.countDocuments({ 
    emailVerifie: true,
    role: 'client' 
  });

  return {
    total,
    actifs,
    avecAbonnement,
    emailsVerifies,
    tauxVerification: total > 0 ? Math.round((emailsVerifies / total) * 100) : 0
  };
};

export default mongoose.model('Utilisateur', utilisateurSchema);
