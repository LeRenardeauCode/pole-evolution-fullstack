import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
    },

    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
    },

    type: {
      type: String,
      enum: {
        values: ["image", "video"],
        message: "Type doit être image ou video",
      },
      required: [true, "Le type est obligatoire"],
      index: true,
    },

    url: {
      type: String,
      required: [true, "L'URL du fichier est obligatoire"],
      trim: true,
      maxlength: [1000, "L'URL ne peut pas dépasser 1000 caractères"],
    },

    urlMiniature: {
      type: String,
      required: false,
      trim: true,
      maxlength: [1000, "L'URL ne peut pas dépasser 1000 caractères"],
    },

    nomFichier: {
      type: String,
      required: false,
      trim: true,
      maxlength: [200, "Le nom de fichier ne peut pas dépasser 200 caractères"],
    },

    tailleFichier: {
      type: Number,
      required: false,
      min: [0, "La taille ne peut pas être négative"],
    },

    formatFichier: {
      type: String,
      required: false,
      trim: true,
      uppercase: true,
      maxlength: [10, "Le format ne peut pas dépasser 10 caractères"],
    },

    largeur: {
      type: Number,
      required: false,
      min: [0, "La largeur ne peut pas être négative"],
    },

    hauteur: {
      type: Number,
      required: false,
      min: [0, "La hauteur ne peut pas être négative"],
    },

    duree: {
      type: Number,
      required: false,
      min: [0, "La durée ne peut pas être négative"],
    },

    categorie: {
      type: String,
      enum: {
        values: [
          "galerie",
          "cours",
          "studio",
          "evenement",
          "temoignage",
          "promotion",
          "autre",
        ],
        message: "Catégorie invalide",
      },
      required: [true, "La catégorie est obligatoire"],
      index: true,
      default: "galerie",
    },

    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags) {
          return tags.every((tag) => tag.length <= 30);
        },
        message: "Chaque tag ne peut pas dépasser 30 caractères",
      },
    },

    cours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cours",
      required: false,
    },

    avis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avis",
      required: false,
    },

    uploadePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },

    estPublic: {
      type: Boolean,
      default: false,
    },

    estALaUne: {
      type: Boolean,
      default: false,
      index: true,
    },

    ordreAffichage: {
      type: Number,
      default: 0,
      min: [0, "L'ordre ne peut pas être négatif"],
    },

    nombreVues: {
      type: Number,
      default: 0,
      min: [0, "Ne peut pas être négatif"],
    },

    nombreTelechargements: {
      type: Number,
      default: 0,
      min: [0, "Ne peut pas être négatif"],
    },

    altText: {
      type: String,
      required: false,
      trim: true,
      maxlength: [200, "Le texte alt ne peut pas dépasser 200 caractères"],
    },

    creditPhoto: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, "Le crédit ne peut pas dépasser 100 caractères"],
    },

    dateCreation: {
      type: Date,
      required: false,
    },

    estModere: {
      type: Boolean,
      default: true,
    },

    dateValidation: {
      type: Date,
      required: false,
    },

    cloudinaryId: {
      type: String,
      required: false,
      select: false,
    },

    cloudinaryPublicId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "medias",
  },
);

mediaSchema.index({ estPublic: 1, ordreAffichage: 1 });
mediaSchema.index({ estALaUne: 1, createdAt: -1 });
mediaSchema.index({ categorie: 1, tags: 1 });
mediaSchema.index({ cours: 1 });

mediaSchema.virtual("tailleFormatee").get(function () {
  if (!this.tailleFichier) return null;

  const ko = this.tailleFichier / 1024;
  if (ko < 1024) return `${Math.round(ko)} Ko`;

  const mo = ko / 1024;
  return `${Math.round(mo * 10) / 10} Mo`;
});

mediaSchema.virtual("dureeFormatee").get(function () {
  if (!this.duree) return null;

  const minutes = Math.floor(this.duree / 60);
  const secondes = Math.floor(this.duree % 60);
  return `${minutes}:${secondes.toString().padStart(2, "0")}`;
});

mediaSchema.virtual("dimensionsFormatees").get(function () {
  if (!this.largeur || !this.hauteur) return null;
  return `${this.largeur}x${this.hauteur}`;
});

mediaSchema.set("toJSON", { virtuals: true });
mediaSchema.set("toObject", { virtuals: true });

mediaSchema.pre("save", async function (next) {
  if (this.isNew) {
    const utilisateur = await mongoose
      .model("Utilisateur")
      .findById(this.uploadePar);
    if (!utilisateur || utilisateur.role !== "admin") {
      throw new Error("Seuls les administrateurs peuvent ajouter des médias");
    }
  }
  next();
});

mediaSchema.methods.mettreALaUne = async function () {
  this.estALaUne = true;
  return await this.save();
};

mediaSchema.methods.retirerDeLaUne = async function () {
  this.estALaUne = false;
  return await this.save();
};

mediaSchema.methods.valider = async function () {
  this.estModere = true;
  this.dateValidation = new Date();
  return await this.save();
};

mediaSchema.statics.getGaleriePublique = function (
  categorie = null,
  limite = 50,
) {
  const query = {
    estPublic: true,
    estModere: true,
  };

  if (categorie) {
    query.categorie = categorie;
  }

  return this.find(query)
    .sort({ ordreAffichage: 1, createdAt: -1 })
    .limit(limite)
    .select("-uploadePar");
};

mediaSchema.statics.getMediasALaUne = function (limite = 5) {
  return this.find({
    estALaUne: true,
    estPublic: true,
    estModere: true,
  })
    .sort({ ordreAffichage: 1, createdAt: -1 })
    .limit(limite);
};

mediaSchema.statics.getMediasCours = function (coursId) {
  return this.find({
    cours: coursId,
    estPublic: true,
    estModere: true,
  }).sort({ ordreAffichage: 1 });
};

mediaSchema.statics.rechercherParTags = function (tags, limite = 20) {
  return this.find({
    tags: { $in: tags },
    estPublic: true,
    estModere: true,
  })
    .sort({ createdAt: -1 })
    .limit(limite);
};

mediaSchema.statics.getStatistiques = async function () {
  const total = await this.countDocuments();
  const images = await this.countDocuments({ type: "image" });
  const videos = await this.countDocuments({ type: "video" });
  const publics = await this.countDocuments({ estPublic: true });
  const aLaUne = await this.countDocuments({ estALaUne: true });
  const enAttente = await this.countDocuments({ estModere: false });

  const tailleTotale = await this.aggregate([
    { $group: { _id: null, total: { $sum: "$tailleFichier" } } },
  ]);

  const plusVus = await this.find({ estPublic: true })
    .sort({ nombreVues: -1 })
    .limit(5)
    .select("titre nombreVues url");

  return {
    total,
    images,
    videos,
    publics,
    aLaUne,
    enAttente,
    tailleTotaleMo:
      tailleTotale.length > 0
        ? Math.round(tailleTotale[0].total / (1024 * 1024))
        : 0,
    plusVus,
  };
};

mediaSchema.statics.getEnAttenteModeration = function () {
  return this.find({ estModere: false })
    .sort({ createdAt: 1 })
    .populate("uploadePar", "prenom nom email");
};

mediaSchema.statics.reordonner = async function (listeIds) {
  const operations = listeIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { ordreAffichage: index },
    },
  }));

  return await this.bulkWrite(operations);
};

export default mongoose.model("Media", mediaSchema);
