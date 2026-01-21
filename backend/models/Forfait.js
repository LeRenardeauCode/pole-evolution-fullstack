import mongoose from "mongoose";

const forfaitSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom du forfait est obligatoire"],
      trim: true,
      minlength: [3, "Le nom doit contenir au moins 3 caractères"],
      maxlength: [100, "Le nom ne peut pas dépasser 100 caractères"],
    },

    prix: {
      type: Number,
      required: [true, "Le prix est obligatoire"],
      min: [0, "Le prix ne peut pas être négatif"],
      max: [10000, "Le prix ne peut pas dépasser 10 000€"],
    },

    devise: {
      type: String,
      default: "EUR",
      enum: {
        values: ["EUR", "USD"],
        message: "Devise doit être EUR ou USD",
      },
    },

    prixUnitaire: {
      type: Number,
      required: false,
      min: [0, "Le prix unitaire ne peut pas être négatif"],
    },

    reductionPourcentage: {
      type: Number,
      required: false,
      min: [0, "La réduction ne peut pas être négative"],
      max: [100, "La réduction ne peut pas dépasser 100%"],
      default: 0,
    },

    categorie: {
      type: String,
      enum: {
        values: ["collectif", "prive", "abonnement", "evenement", "decouverte"],
        message:
          "Catégorie doit être: collectif, prive, abonnement, evenement ou decouverte",
      },
      required: [true, "La catégorie est obligatoire"],
    },

    nombreSeances: {
      type: Number,
      required: false,
      min: [1, "Le nombre de séances doit être au moins 1"],
      max: [200, "Le nombre de séances ne peut pas dépasser 200"],
    },

    dureeValidite: {
      type: Number,
      required: false,
      min: [1, "La durée de validité doit être au moins 1 jour"],
    },

    dureeCours: {
      type: Number,
      required: false,
      min: [30, "Durée minimum 30 minutes"],
      max: [180, "Durée maximum 3 heures"],
    },

    capaciteMin: {
      type: Number,
      required: false,
      min: [1, "Minimum 1 personne"],
    },

    capaciteMax: {
      type: Number,
      required: false,
      min: [1, "Minimum 1 personne"],
      max: [12, "Maximum 12 personnes"],
    },

    typeEngagement: {
      type: String,
      enum: {
        values: ["sans_engagement", "engagement_12_mois"],
        message: "Type d'engagement invalide",
      },
      default: "sans_engagement",
    },

    frequenceSeances: {
      type: String,
      enum: {
        values: ["ponctuel", "hebdomadaire", "bimensuel"],
        message: "Fréquence invalide",
      },
      required: false,
    },

    nombreParticipantsMin: {
      type: Number,
      required: false,
      min: [1, "Minimum 1 participant"],
    },

    nombreParticipantsMax: {
      type: Number,
      required: false,
      min: [1, "Minimum 1 participant"],
      max: [12, "Maximum 12 participants"],
    },

    description: {
      type: String,
      required: false,
      maxlength: [1000, "La description ne peut pas dépasser 1000 caractères"],
    },

    inclusions: {
      type: [String],
      default: [],
    },

    exclusions: {
      type: [String],
      default: [],
    },

    estActif: {
      type: Boolean,
      default: true,
    },

    estVisible: {
      type: Boolean,
      default: true,
    },

    dateDebut: {
      type: Date,
      required: false,
    },

    dateFin: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "forfaits",
  },
);

forfaitSchema.index({ nom: "text" }, { weights: { nom: 10 } });

forfaitSchema.index({ categorie: 1, typeEngagement: 1 });

forfaitSchema.index({ estActif: 1, estVisible: 1 });

forfaitSchema.virtual("economie").get(function () {
  if (
    this.reductionPourcentage > 0 &&
    this.nombreSeances &&
    this.prixUnitaire
  ) {
    const prixSansReduction = this.prixUnitaire * this.nombreSeances;
    return Math.round((prixSansReduction - this.prix) * 100) / 100;
  }
  return 0;
});

forfaitSchema.virtual("labelAffichage").get(function () {
  if (this.nombreSeances) {
    return `${this.prix}€ / ${this.nombreSeances} cours`;
  }
  return `${this.prix}€`;
});

forfaitSchema.pre("save", function (next) {
  if (this.nombreSeances && this.nombreSeances > 0) {
    this.prixUnitaire =
      Math.round((this.prix / this.nombreSeances) * 100) / 100;
  }

  if (this.dateDebut && this.dateFin && this.dateFin <= this.dateDebut) {
    return next(
      new Error("La date de fin doit être postérieure à la date de début"),
    );
  }

  if (
    this.nombreParticipantsMin &&
    this.nombreParticipantsMax &&
    this.nombreParticipantsMax < this.nombreParticipantsMin
  ) {
    return next(
      new Error("Le nombre max de participants doit être >= au minimum"),
    );
  }

  next();
});

forfaitSchema.methods.estDisponible = function () {
  if (!this.estActif || !this.estVisible) {
    return false;
  }

  const maintenant = new Date();

  if (this.dateDebut && maintenant < this.dateDebut) {
    return false;
  }

  if (this.dateFin && maintenant > this.dateFin) {
    return false;
  }

  return true;
};

forfaitSchema.statics.getForfaitsPublics = function () {
  return this.find({
    estActif: true,
    estVisible: true,
    $or: [
      { dateDebut: { $lte: new Date() }, dateFin: { $gte: new Date() } },
      { dateDebut: null, dateFin: null },
    ],
  }).sort({ categorie: 1, prix: 1 });
};

export default mongoose.model("Forfait", forfaitSchema);
