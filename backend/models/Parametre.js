import mongoose from 'mongoose';

const parametreSchema = new mongoose.Schema({
  cle: {
    type: String,
    required: [true, 'La clé du paramètre est obligatoire'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [100, 'La clé ne peut pas dépasser 100 caractères'],
  },

  valeur: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'La valeur est obligatoire'],
  },

  type: {
    type: String,
    enum: {
      values: ['texte', 'nombre', 'booleen', 'json'],
      message: 'Type doit être: texte, nombre, booleen ou json'
    },
    required: [true, 'Le type est obligatoire'],
    default: 'texte'
  },

  categorie: {
    type: String,
    enum: {
      values: ['cours', 'tarifs', 'contact', 'reseaux_sociaux', 'securite', 'reservations', 'interface', 'emails'],
      message: 'Catégorie invalide'
    },
    required: [true, 'La catégorie est obligatoire'],
    default: 'interface'
  },

  description: {
    type: String,
    required: false,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères'],
  },

  estModifiable: {
    type: Boolean,
    default: true,
  },

  unite: {
    type: String,
    required: false,
    maxlength: [20, 'L\'unité ne peut pas dépasser 20 caractères'],
  },

  valeurMin: {
    type: Number,
    required: false,
  },

  valeurMax: {
    type: Number,
    required: false,
  }

}, {
  timestamps: true, 
  collection: 'parametres' 
});


parametreSchema.index({ cle: 1 }, { unique: true });
parametreSchema.index({ categorie: 1 });


parametreSchema.methods.validerContraintes = function() {

  if (this.type === 'nombre' && typeof this.valeur === 'number') {
    if (this.valeurMin !== undefined && this.valeur < this.valeurMin) {
      throw new Error(`Valeur ${this.valeur} inférieure au minimum ${this.valeurMin}`);
    }
    if (this.valeurMax !== undefined && this.valeur > this.valeurMax) {
      throw new Error(`Valeur ${this.valeur} supérieure au maximum ${this.valeurMax}`);
    }
  }
  

  if (this.type === 'booleen' && typeof this.valeur !== 'boolean') {
    throw new Error('Valeur doit être true ou false pour type booleen');
  }
  

  if (this.type === 'json' && typeof this.valeur !== 'object') {
    throw new Error('Valeur doit être un objet JSON pour type json');
  }
  
  return true;
};


parametreSchema.pre('save', function(next) {
  try {
    this.validerContraintes();
    next();
  } catch (error) {
    next(error);
  }
});


parametreSchema.statics.getParCle = function(cle) {
  return this.findOne({ cle: cle.toLowerCase() });
};

parametreSchema.statics.getParCategorie = function(categorie) {
  return this.find({ categorie }).sort({ cle: 1 });
};

parametreSchema.statics.updateValeur = async function(cle, nouvelleValeur) {
  const param = await this.findOne({ cle: cle.toLowerCase() });
  
  if (!param) {
    throw new Error(`Paramètre ${cle} introuvable`);
  }
  
  if (!param.estModifiable) {
    throw new Error(`Le paramètre ${cle} n'est pas modifiable`);
  }
  
  param.valeur = nouvelleValeur;
  return await param.save();
};

export default mongoose.model('Parametre', parametreSchema);
