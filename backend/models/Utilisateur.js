import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const utilisateurSchema = new mongoose.Schema(
  {
    prenom: {
      type: String,
      required: [true, "Le prénom est obligatoire"],
      trim: true,
      minlength: [2, "Le prénom doit contenir au moins 2 caractères"],
      maxlength: [50, "Le prénom ne peut pas dépasser 50 caractères"],
    },

    nom: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
      maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"],
    },

    pseudo: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      trim: true,
      minlength: [3, "Le pseudo doit contenir au moins 3 caractères"],
      maxlength: [20, "Le pseudo ne peut pas dépasser 20 caractères"],
    },

    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Email invalide",
      },
      index: true,
    },

    motDePasse: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
      select: false,
    },

    telephone: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(v);
        },
        message: "Numéro de téléphone invalide (format français attendu)",
      },
    },

    dateNaissance: {
      type: Date,
      required: false,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return v < new Date();
        },
        message: "La date de naissance doit être dans le passé",
      },
    },

    niveauPole: {
      type: String,
      enum: {
        values: ["debutant", "intermediaire", "avance", "jamais"],
        message: "Niveau invalide",
      },
      default: "jamais",
    },

    accepteContact: {
      type: Boolean,
      required: [true, "Vous devez indiquer votre préférence de contact"],
      default: false,
    },

    accepteCGU: {
      type: Boolean,
      required: [true, "Vous devez accepter les CGU"],
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: "Vous devez accepter les conditions générales d'utilisation",
      },
    },

    accepteReglement: {
      type: Boolean,
      required: [true, "Vous devez accepter le règlement intérieur"],
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: "Vous devez accepter le règlement intérieur",
      },
    },

    statutValidationAdmin: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Statut invalide",
      },
      default: "pending",
      index: true,
    },

    raisonsRejet: {
      type: String,
      required: false,
      maxlength: [500, "La raison ne peut pas dépasser 500 caractères"],
    },

    estVisible: {
      type: Boolean,
      default: false,
    },

    datePremiereInscription: {
      type: Date,
      required: false,
    },

    role: {
      type: String,
      enum: {
        values: ["client", "admin"],
        message: "Rôle doit être client ou admin",
      },
      default: "client",
    },

    adresse: {
      rue: {
        type: String,
        required: false,
        trim: true,
        maxlength: [200, "La rue ne peut pas dépasser 200 caractères"],
      },
      codePostal: {
        type: String,
        required: false,
        trim: true,
        validate: {
          validator: function (v) {
            if (!v) return true;
            return /^[0-9]{5}$/.test(v);
          },
          message: "Code postal invalide (5 chiffres attendus)",
        },
      },
      ville: {
        type: String,
        required: false,
        trim: true,
        maxlength: [100, "La ville ne peut pas dépasser 100 caractères"],
      },
      pays: {
        type: String,
        required: false,
        trim: true,
        default: "France",
        maxlength: [50, "Le pays ne peut pas dépasser 50 caractères"],
      },
    },

    certificatMedical: {
      estValide: {
        type: Boolean,
        default: false,
      },
      dateValidite: {
        type: Date,
        required: false,
      },
      fichierUrl: {
        type: String,
        required: false,
      },
    },

    forfaitsActifs: [
      {
        forfaitId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Forfait",
          required: true,
        },
        dateAchat: {
          type: Date,
          default: Date.now,
          required: true,
        },
        seancesAchetees: {
          type: Number,
          required: true,
          min: 0,
        },
        seancesRestantes: {
          type: Number,
          required: true,
          min: 0,
          validate: {
            validator: function () {
              return this.seancesRestantes <= this.seancesAchetees;
            },
            message:
              "Les séances restantes ne peuvent pas dépasser les séances achetées",
          },
        },
        dateExpiration: {
          type: Date,
          required: false,
        },
        estActif: {
          type: Boolean,
          default: true,
        },
      },
    ],

    abonnementActif: {
      forfaitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forfait",
        required: false,
      },
      dateDebut: {
        type: Date,
        required: false,
      },
      dateFin: {
        type: Date,
        required: false,
      },
      dateFinEngagement: {
        type: Date,
        required: false,
      },
      montantMensuel: {
        type: Number,
        required: false,
        min: 0,
      },
      frequenceSeances: {
        type: Number,
        enum: [1, 2],
        required: false,
      },
      statutPaiement: {
        type: String,
        enum: ["actif", "impaye", "resilie"],
        default: "actif",
      },
      dateProchaineEcheance: {
        type: Date,
        required: false,
      },
      dateResiliation: {
        type: Date,
        required: false,
      },
    },

    estActif: {
      type: Boolean,
      default: true,
    },

    emailVerifie: {
      type: Boolean,
      default: false,
    },

    tokenVerificationEmail: {
      type: String,
      required: false,
      select: false,
    },

    tokenResetPassword: {
      type: String,
      required: false,
      select: false,
    },

    tokenResetPasswordExpire: {
      type: Date,
      required: false,
      select: false,
    },

    dateInscription: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    inscriptionComplete: {
      type: Boolean,
      default: false,
    },

    etapeInscription: {
      type: Number,
      default: 1,
      min: 1,
      max: 4,
    },

    derniereConnexion: {
      type: Date,
      required: false,
    },

    nombreCoursReserves: {
      type: Number,
      default: 0,
      min: 0,
    },

    nombreCoursAssistes: {
      type: Number,
      default: 0,
      min: 0,
    },

    nombreAnnulations: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: "utilisateurs",
  },
);

utilisateurSchema.index({ email: 1 }, { unique: true });
utilisateurSchema.index({ nom: 1, prenom: 1 });
utilisateurSchema.index({ pseudo: 1 }, { unique: true, sparse: true });
utilisateurSchema.index({ estActif: 1, role: 1 });
utilisateurSchema.index({ statutValidationAdmin: 1 });
utilisateurSchema.index(
  { derniereConnexion: 1, estActif: 1 },
  { sparse: true },
);

utilisateurSchema.virtual("nomComplet").get(function () {
  return `${this.prenom} ${this.nom}`;
});

utilisateurSchema.virtual("age").get(function () {
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

utilisateurSchema.virtual("estMineur").get(function () {
  if (!this.age) return false;
  return this.age < 18;
});

utilisateurSchema.virtual("adresseComplete").get(function () {
  if (!this.adresse.rue) return null;
  return `${this.adresse.rue}, ${this.adresse.codePostal} ${this.adresse.ville}, ${this.adresse.pays}`;
});

utilisateurSchema.set("toJSON", { virtuals: true });
utilisateurSchema.set("toObject", { virtuals: true });

utilisateurSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    next();
  } catch (error) {
    next(error);
  }
});

utilisateurSchema.methods.comparerMotDePasse = async function (
  motDePasseFourni,
) {
  return await bcrypt.compare(motDePasseFourni, this.motDePasse);
};

utilisateurSchema.methods.genererToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" },
  );
};

utilisateurSchema.methods.genererTokenResetPassword = function () {
  const crypto = require("crypto");
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.tokenResetPassword = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.tokenResetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

utilisateurSchema.methods.certificatEstValide = function () {
  if (!this.certificatMedical.estValide) return false;
  if (!this.certificatMedical.dateValidite) return false;
  return this.certificatMedical.dateValidite > new Date();
};

utilisateurSchema.methods.deduireSeance = async function (forfaitId) {
  const forfait = this.forfaitsActifs.find(
    (f) => f.forfaitId.toString() === forfaitId.toString() && f.estActif,
  );

  if (!forfait) {
    throw new Error("Forfait non trouvé ou inactif");
  }

  if (forfait.seancesRestantes <= 0) {
    throw new Error("Plus de séances disponibles sur ce forfait");
  }

  forfait.seancesRestantes -= 1;

  if (forfait.seancesRestantes === 0) {
    forfait.estActif = false;
  }

  return await this.save();
};

utilisateurSchema.methods.aForfaitActif = function () {
  const forfaitValide = this.forfaitsActifs.some(
    (f) =>
      f.estActif &&
      f.seancesRestantes > 0 &&
      (!f.dateExpiration || f.dateExpiration > new Date()),
  );

  if (forfaitValide) return true;

  return (
    this.abonnementActif?.forfaitId &&
    this.abonnementActif.statutPaiement === "actif"
  );
};

utilisateurSchema.statics.getStatistiquesMois = async function (annee, mois) {
  const debutMois = new Date(annee, mois - 1, 1);
  const finMois = new Date(annee, mois, 0, 23, 59, 59);

  const Reservation = mongoose.model("Reservation");

  const utilisateurs = await this.find({ estActif: true }).select(
    "prenom nom abonnementActif forfaitsActifs",
  );

  const stats = [];

  for (const user of utilisateurs) {
    const reservations = await Reservation.find({
      utilisateur: user._id,
      dateReservation: { $gte: debutMois, $lte: finMois },
    });

    const aAbonnement = user.abonnementActif?.statutPaiement === "actif";
    const montantDu = aAbonnement ? user.abonnementActif.montantMensuel : 0;
    const montantPaye = reservations
      .filter((r) => r.paiement.estPaye)
      .reduce((sum, r) => sum + (r.paiement.montant || 0), 0);

    stats.push({
      nom: `${user.prenom} ${user.nom}`,
      dateDebut: aAbonnement ? user.abonnementActif.dateDebut : null,
      dateFin: aAbonnement ? user.abonnementActif.dateFin : null,
      statutPaiement: user.abonnementActif?.statutPaiement || "aucun",
      montantDu,
      montantPaye,
      seances: reservations.length,
    });
  }

  return stats;
};

utilisateurSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() }).select("+motDePasse");
};

utilisateurSchema.statics.getClients = function () {
  return this.find({ role: "client", estActif: true })
    .sort({ dateInscription: -1 })
    .select("-motDePasse -tokenResetPassword");
};

export default mongoose.model("Utilisateur", utilisateurSchema);
