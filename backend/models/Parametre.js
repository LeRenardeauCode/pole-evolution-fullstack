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
      values: ['cours', 'tarifs', 'contact', 'securite', 'reservations', 'interface', 'emails'],
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

export default mongoose.model('Parametre', parametreSchema);
