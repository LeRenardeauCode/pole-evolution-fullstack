import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    typeReservation: {
      type: String,
      enum: {
        values: ["membre", "invite"],
        message: "Type invalide",
      },
      required: true,
      default: "membre",
      index: true,
    },

    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: false, // Conditionnel selon typeReservation
      index: true,
    },

    nomEleve: {
      type: String,
      required: false,
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
      maxlength: [100, "Le nom ne peut pas dépasser 100 caractères"],
    },

    emailInvite: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },

    telephoneInvite: {
      type: String,
      required: false,
      trim: true,
    },

    niveauPoleInvite: {
      type: String,
      enum: ["debutant", "intermediaire", "avance", "jamais"],
      required: false,
    },

    tokenValidation: {
      type: String,
      required: false,
      select: false,
    },

    estValideEmail: {
      type: Boolean,
      default: false,
      index: true,
    },

    dateValidationEmail: {
      type: Date,
      required: false,
    },

    ipAddress: {
      type: String,
      required: false,
      select: false,
    },

    cours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cours",
      required: [true, "Le cours est obligatoire"],
      index: true,
    },

    forfait: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forfait",
      required: false,
    },

    statut: {
      type: String,
      enum: {
        values: ["en_attente", "confirmee", "annulee", "present", "absent"],
        message: "Statut invalide",
      },
      default: "en_attente",
      index: true,
    },

    nombrePlaces: {
      type: Number,
      required: true,
      min: [1, "Minimum 1 place"],
      max: [12, "Maximum 12 places"],
      default: 1,
    },

    dateReservation: {
      type: Date,
      default: Date.now,
      required: true,
      index: true,
    },

    dateAnnulation: {
      type: Date,
      required: false,
    },

    raisonAnnulation: {
      type: String,
      required: false,
      maxlength: [500, "La raison ne peut pas dépasser 500 caractères"],
    },

    annulePar: {
      type: String,
      enum: {
        values: ["client", "admin", "systeme"],
        message: "Annulateur invalide",
      },
      required: false,
    },

    remboursement: {
      statut: {
        type: String,
        enum: {
          values: ["aucun", "en_attente", "effectue", "refuse"],
          message: "Statut remboursement invalide",
        },
        default: "aucun",
      },
      montant: {
        type: Number,
        required: false,
        min: [0, "Le montant ne peut pas être négatif"],
      },
      dateRemboursement: {
        type: Date,
        required: false,
      },
    },

    paiement: {
      type: {
        type: String,
        enum: {
          values: ["forfait", "surplace", "abonnement"],
          message: "Type de paiement invalide",
        },
        default: "forfait",
      },
      montant: {
        type: Number,
        required: false,
        min: 0,
      },
      estPaye: {
        type: Boolean,
        default: false,
      },
      datePaiement: {
        type: Date,
        required: false,
      },
      moyenPaiement: {
        type: String,
        enum: {
          values: ["cb", "especes", "cheque", "virement"],
          message: "Moyen de paiement invalide",
        },
        required: false,
      },
    },

    presenceValidee: {
      type: Boolean,
      default: false,
    },

    dateValidationPresence: {
      type: Date,
      required: false,
    },

    notes: {
      type: String,
      required: false,
      maxlength: [1000, "Les notes ne peuvent pas dépasser 1000 caractères"],
    },

    notesClient: {
      type: String,
      required: false,
      maxlength: [
        500,
        "Les notes client ne peuvent pas dépasser 500 caractères",
      ],
    },

    rappelEnvoye: {
      type: Boolean,
      default: false,
    },

    dateRappel: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "reservations",
  },
);

reservationSchema.index({ utilisateur: 1, dateReservation: -1 });
reservationSchema.index({ cours: 1, statut: 1 });
reservationSchema.index({ statut: 1, dateReservation: 1 });
reservationSchema.index({ typeReservation: 1, statut: 1 });
reservationSchema.index({ emailInvite: 1, statut: 1 });
reservationSchema.index({ ipAddress: 1 });

reservationSchema.virtual("peutEtreAnnulee").get(function () {
  if (
    this.statut === "annulee" ||
    this.statut === "present" ||
    this.statut === "absent"
  ) {
    return false;
  }

  if (this.cours && this.cours.dateDebut) {
    const maintenant = new Date();
    const delaiAnnulation = 24;
    const dateLimit = new Date(
      this.cours.dateDebut.getTime() - delaiAnnulation * 60 * 60 * 1000,
    );
    return maintenant < dateLimit;
  }

  return false;
});

reservationSchema.virtual("heuresAvantCours").get(function () {
  if (!this.cours || !this.cours.dateDebut) return null;
  const maintenant = new Date();
  const diff = this.cours.dateDebut - maintenant;
  return Math.floor(diff / (1000 * 60 * 60));
});

reservationSchema.set("toJSON", { virtuals: true });
reservationSchema.set("toObject", { virtuals: true });

reservationSchema.pre("save", function (next) {
  // Validation champs selon typeReservation
  if (this.typeReservation === "invite") {
    if (!this.nomEleve || !this.emailInvite) {
      return next(new Error("Nom et email obligatoires pour les invités"));
    }
  } else if (this.typeReservation === "membre") {
    if (!this.utilisateur) {
      return next(new Error("Utilisateur obligatoire pour les membres"));
    }
  }
  next();
});

reservationSchema.post("save", async function (doc) {
  const Cours = mongoose.model("Cours");

  if (doc.statut === "confirmee" && doc.isNew) {
    await Cours.findByIdAndUpdate(doc.cours, {
      $inc: { placesReservees: doc.nombrePlaces },
    });
  }
});

reservationSchema.pre("remove", async function (next) {
  const Cours = mongoose.model("Cours");

  if (this.statut === "confirmee") {
    await Cours.findByIdAndUpdate(this.cours, {
      $inc: { placesReservees: -this.nombrePlaces },
    });
  }

  next();
});

reservationSchema.methods.annuler = async function (
  raison,
  annulePar = "client",
) {
  const Cours = mongoose.model("Cours");

  if (this.statut === "annulee") {
    throw new Error("Cette réservation est déjà annulée");
  }

  if (this.statut === "present" || this.statut === "absent") {
    throw new Error("Impossible d'annuler une réservation passée");
  }

  const cours = await Cours.findById(this.cours);
  if (cours && this.statut === "confirmee") {
    await cours.libererPlace(this.nombrePlaces);
  }

  this.statut = "annulee";
  this.dateAnnulation = new Date();
  this.raisonAnnulation = raison;
  this.annulePar = annulePar;

  // Rembourser la séance au forfait si applicable (MEMBRES uniquement)
  if (
    this.typeReservation === "membre" &&
    this.forfait &&
    annulePar === "client"
  ) {
    const Utilisateur = mongoose.model("Utilisateur");
    const utilisateur = await Utilisateur.findById(this.utilisateur);

    if (utilisateur) {
      const forfaitActif = utilisateur.forfaitsActifs.find(
        (f) => f.forfaitId.toString() === this.forfait.toString(),
      );

      if (forfaitActif) {
        forfaitActif.seancesRestantes += 1;
        await utilisateur.save();
      }
    }
  }

  return await this.save();
};

reservationSchema.methods.confirmerPresence = async function () {
  const Utilisateur = mongoose.model("Utilisateur");

  this.statut = "present";
  this.presenceValidee = true;
  this.dateValidationPresence = new Date();

  if (this.typeReservation === "membre" && this.utilisateur) {
    await Utilisateur.findByIdAndUpdate(this.utilisateur, {
      $inc: { nombreCoursAssistes: 1 },
    });
  }

  return await this.save();
};

reservationSchema.methods.marquerAbsent = async function () {
  this.statut = "absent";
  this.presenceValidee = false;
  return await this.save();
};

reservationSchema.methods.envoyerRappel = async function () {
  this.rappelEnvoye = true;
  this.dateRappel = new Date();
  return await this.save();
};

reservationSchema.statics.getHistoriqueUtilisateur = function (
  utilisateurId,
  limite = 20,
) {
  return this.find({ utilisateur: utilisateurId })
    .sort({ dateReservation: -1 })
    .limit(limite)
    .populate("cours", "nom dateDebut dateFin niveau")
    .populate("forfait", "nom");
};

reservationSchema.statics.getReservationsCours = function (coursId) {
  return this.find({
    cours: coursId,
    statut: { $in: ["confirmee", "en_attente"] },
  })
    .populate("utilisateur", "prenom nom email telephone")
    .sort({ dateReservation: 1 });
};

reservationSchema.statics.getReservationsFutures = function (utilisateurId) {
  return this.find({
    utilisateur: utilisateurId,
    statut: { $in: ["confirmee", "en_attente"] },
  })
    .populate({
      path: "cours",
      match: { dateDebut: { $gte: new Date() } },
    })
    .sort({ "cours.dateDebut": 1 });
};

reservationSchema.statics.compterParStatut = async function () {
  const confirmees = await this.countDocuments({ statut: "confirmee" });
  const annulees = await this.countDocuments({ statut: "annulee" });
  const presents = await this.countDocuments({ statut: "present" });
  const absents = await this.countDocuments({ statut: "absent" });

  return {
    confirmees,
    annulees,
    presents,
    absents,
    total: confirmees + annulees + presents + absents,
    tauxPresence:
      presents + absents > 0
        ? Math.round((presents / (presents + absents)) * 100)
        : 0,
  };
};

reservationSchema.statics.getReservationsARappeler = function () {
  const maintenant = new Date();
  const dans24h = new Date(maintenant.getTime() + 24 * 60 * 60 * 1000);
  const dans25h = new Date(maintenant.getTime() + 25 * 60 * 60 * 1000);

  return this.find({
    statut: "confirmee",
    rappelEnvoye: false,
  })
    .populate({
      path: "cours",
      match: {
        dateDebut: {
          $gte: dans24h,
          $lte: dans25h,
        },
      },
    })
    .populate("utilisateur", "prenom nom email telephone");
};

reservationSchema.statics.aDejaReserve = async function (
  utilisateurId,
  coursId,
) {
  const reservation = await this.findOne({
    utilisateur: utilisateurId,
    cours: coursId,
    statut: { $in: ["confirmee", "en_attente"] },
  });

  return !!reservation;
};

reservationSchema.statics.verifierLimiteIP = async function (ipAddress) {
  const debutJour = new Date();
  debutJour.setHours(0, 0, 0, 0);

  const count = await this.countDocuments({
    ipAddress: ipAddress,
    dateReservation: { $gte: debutJour },
  });

  return count < 3;
};

reservationSchema.statics.getStatistiques = async function (
  dateDebut,
  dateFin,
) {
  const query = {};

  if (dateDebut || dateFin) {
    query.dateReservation = {};
    if (dateDebut) query.dateReservation.$gte = dateDebut;
    if (dateFin) query.dateReservation.$lte = dateFin;
  }

  const total = await this.countDocuments(query);
  const confirmees = await this.countDocuments({
    ...query,
    statut: "confirmee",
  });
  const annulees = await this.countDocuments({ ...query, statut: "annulee" });

  const tauxAnnulation = total > 0 ? Math.round((annulees / total) * 100) : 0;

  const revenus = await this.aggregate([
    { $match: { ...query, "paiement.estPaye": true } },
    { $group: { _id: null, total: { $sum: "$paiement.montant" } } },
  ]);

  return {
    total,
    confirmees,
    annulees,
    tauxAnnulation,
    revenus: revenus.length > 0 ? revenus[0].total : 0,
  };
};

reservationSchema.statics.marquerAbsents = async function () {
  const Cours = mongoose.model("Cours");

  const coursPasses = await Cours.find({
    dateFin: { $lt: new Date() },
    statut: "termine",
  }).select("_id");

  const idsCoursPasses = coursPasses.map((c) => c._id);

  return await this.updateMany(
    {
      cours: { $in: idsCoursPasses },
      statut: "confirmee",
      presenceValidee: false,
    },
    { statut: "absent" },
  );
};

export default mongoose.model("Reservation", reservationSchema);
