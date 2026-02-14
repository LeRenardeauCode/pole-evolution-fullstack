import {
  Reservation,
  Cours,
  Utilisateur,
  Forfait,
  Notification,
} from "../models/index.js";
import {
  sendReservationNotificationToAdmin,
  sendReservationConfirmationToUser,
} from "../utils/emailService.js";

export const getMesReservations = async (req, res) => {
  try {
    const { statut, limit = 50 } = req.query;

    const query = { utilisateur: req.user._id };
    if (statut) query.statut = statut;

    const reservations = await Reservation.find(query)
      .populate(
        "cours",
        "nom type niveau dateDebut dateFin capaciteMax placesReservees statut",
      )
      .populate("forfait", "nom prix categorie")
      .sort({ dateReservation: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("utilisateur", "prenom nom email telephone")
      .populate(
        "cours",
        "nom type niveau dateDebut dateFin professeur capaciteMax",
      )
      .populate("forfait", "nom prix categorie");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée",
      });
    }

    if (
      req.user.role !== "admin" &&
      reservation.utilisateur &&
      reservation.utilisateur._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { coursId, forfaitId, typePaiement = "forfait" } = req.body;

    const cours = await Cours.findById(coursId);
    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    if (cours.dateDebut < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Impossible de réserver un cours passé",
      });
    }

    if (!cours.reservationOuverte) {
      return res.status(400).json({
        success: false,
        message: "Les réservations sont fermées pour ce cours",
      });
    }

    if (cours.placesReservees >= cours.capaciteMax) {
      return res.status(400).json({
        success: false,
        message: "Ce cours est complet",
      });
    }

    const reservationExistante = await Reservation.findOne({
      utilisateur: req.user.id,
      cours: coursId,
      statut: { $in: ["confirmee", "en_attente"] },
    });

    if (reservationExistante) {
      return res.status(400).json({
        success: false,
        message: "Vous avez déjà réservé ce cours",
      });
    }

    const utilisateur = await Utilisateur.findById(req.user.id);

    if (utilisateur.statutValidationAdmin !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte est en attente de validation par un administrateur. Vous pourrez réserver une fois votre compte validé.",
      });
    }

    const prixCours = cours.type === "decouverte" ? 15 : 25;

    const reservationData = {
      typeReservation: "membre",
      utilisateur: req.user.id,
      cours: coursId,
      statut: "en_attente",
      nombrePlaces: 1,
      dateReservation: new Date(),
    };

    if (typePaiement === "forfait") {
      if (!forfaitId) {
        return res.status(400).json({
          success: false,
          message: "Forfait ID requis pour paiement par forfait",
        });
      }

      const forfaitActif = utilisateur.forfaitsActifs.find(
        (f) =>
          f.forfaitId.toString() === forfaitId &&
          f.estActif &&
          f.seancesRestantes > 0,
      );

      if (!forfaitActif) {
        return res.status(400).json({
          success: false,
          message: "Forfait invalide ou plus de séances disponibles",
        });
      }

      reservationData.forfait = forfaitId;
      reservationData.paiement = {
        type: "forfait",
        montant: 0,
        estPaye: true,
      };
    } else if (typePaiement === "abonnement") {
      if (
        !utilisateur.abonnementActif ||
        !utilisateur.abonnementActif.forfaitId
      ) {
        return res.status(400).json({
          success: false,
          message: "Aucun abonnement actif trouvé",
        });
      }

      if (utilisateur.abonnementActif.statutPaiement !== "actif") {
        return res.status(400).json({
          success: false,
          message: "Votre abonnement n'est pas à jour",
        });
      }

      if (utilisateur.abonnementActif.seancesRestantesMois <= 0) {
        return res.status(400).json({
          success: false,
          message: `Vous avez utilisé vos ${utilisateur.abonnementActif.seancesParMois} séances ce mois. Revenez le mois prochain !`,
        });
      }

      reservationData.forfait = utilisateur.abonnementActif.forfaitId;
      reservationData.paiement = {
        type: "abonnement",
        montant: 0,
        estPaye: true,
      };
    } else {
      reservationData.paiement = {
        type: "surplace",
        montant: prixCours,
        estPaye: false,
        moyenPaiement: null,
      };
    }

    const reservation = await Reservation.create(reservationData);

    cours.placesReservees += 1;
    if (cours.placesReservees >= cours.capaciteMax) {
      cours.statut = "complet";
    }
    await cours.save();

    utilisateur.nombreCoursReserves += 1;
    await utilisateur.save();

    await Notification.creer({
      type: "nouvelle_reservation",
      titre: "Réservation en attente",
      message: `Votre réservation pour "${cours.nom}" le ${cours.dateDebut.toLocaleDateString()} est en attente de validation.`,
      priorite: "normale",
      utilisateurId: req.user.id,
      coursId: cours._id,
      reservationId: reservation._id,
    });

    // Envoyer emails (non bloquants)
    try {
      // Email notification admin
      await sendReservationNotificationToAdmin({
        nomEleve: utilisateur.nom,
        prenomEleve: utilisateur.prenom,
        emailEleve: utilisateur.email,
        telephoneEleve: utilisateur.telephone,
        niveauPole: utilisateur.niveauPole,
        nomCours: cours.nom,
        typeCours: cours.type,
        dateDebut: cours.dateDebut,
        montant: reservationData.paiement.montant,
        reservationId: reservation._id,
      });
    } catch (emailError) {
      console.error("Erreur notification admin réservation membre:", emailError.message);
    }

    try {
      // Email confirmation membre
      await sendReservationConfirmationToUser({
        nomEleve: utilisateur.nom,
        prenomEleve: utilisateur.prenom,
        emailEleve: utilisateur.email,
        nomCours: cours.nom,
        dateDebut: cours.dateDebut,
        lienValidation: null, // Les membres n'ont pas besoin de valider
      });
    } catch (emailError) {
      console.error("Erreur confirmation réservation membre:", emailError.message);
    }

    const reservationComplete = await Reservation.findById(reservation._id)
      .populate("cours", "nom type niveau dateDebut dateFin")
      .populate("forfait", "nom prix");

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: reservationComplete,
    });
  } catch (error) {
    console.error("Erreur createReservation:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createReservationInvite = async (req, res) => {
  try {
    const {
      coursId,
      nomEleve,
      emailInvite,
      telephoneInvite,
      niveauPoleInvite,
    } = req.body;

    if (!coursId || !nomEleve || !emailInvite) {
      return res.status(400).json({
        success: false,
        message:
          "Cours ID, nom et email sont requis pour une réservation invité",
      });
    }

    const cours = await Cours.findById(coursId);
    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    if (!["collectif", "decouverte"].includes(cours.type)) {
      return res.status(400).json({
        success: false,
        message:
          "Les réservations invités sont uniquement autorisées pour les cours collectifs et découverte",
      });
    }

    if (cours.placesReservees >= cours.capaciteMax) {
      return res.status(400).json({
        success: false,
        message: "Ce cours est complet",
      });
    }

    const reservationExistante = await Reservation.findOne({
      emailInvite: emailInvite.toLowerCase(),
      cours: coursId,
      statut: { $in: ["confirmee", "en_attente"] },
    });

    if (reservationExistante) {
      return res.status(400).json({
        success: false,
        message: "Cet email a déjà réservé ce cours",
      });
    }

    const crypto = await import("crypto");
    const tokenValidation = crypto.randomBytes(32).toString("hex");

    const reservation = await Reservation.create({
      typeReservation: "invite",
      nomEleve,
      emailInvite: emailInvite.toLowerCase(),
      telephoneInvite,
      niveauPoleInvite: niveauPoleInvite || "jamais",
      tokenValidation,
      estValideEmail: false,
      cours: coursId,
      statut: "en_attente",
      nombrePlaces: 1,
      dateReservation: new Date(),
      paiement: {
        type: "surplace",
        montant: cours.type === "decouverte" ? 15 : 25,
        estPaye: false,
        moyenPaiement: null,
      },
      ipAddress: req.ip,
    });

    cours.placesReservees += 1;
    if (cours.placesReservees >= cours.capaciteMax) {
      cours.statut = "complet";
    }
    await cours.save();

    // Lien de validation pour invités
    const lienValidation = `${process.env.FRONTEND_URL}/validation-reservation?token=${tokenValidation}&email=${encodeURIComponent(emailInvite)}`;

    // Envoyer emails (non bloquants)
    try {
      // Email notification admin
      await sendReservationNotificationToAdmin({
        nomEleve: nomEleve,
        prenomEleve: "",
        emailEleve: emailInvite,
        telephoneEleve: telephoneInvite,
        niveauPole: niveauPoleInvite || "jamais",
        nomCours: cours.nom,
        typeCours: cours.type,
        dateDebut: cours.dateDebut,
        montant: cours.type === "decouverte" ? 15 : 25,
        reservationId: reservation._id,
      });
    } catch (emailError) {
      console.error("Erreur notification admin réservation:", emailError.message);
    }

    try {
      // Email confirmation invité
      await sendReservationConfirmationToUser({
        nomEleve: nomEleve,
        prenomEleve: "",
        emailEleve: emailInvite,
        nomCours: cours.nom,
        dateDebut: cours.dateDebut,
        lienValidation,
      });
    } catch (emailError) {
      console.error("Erreur confirmation réservation invité:", emailError.message);
    }

    const reservationComplete = await Reservation.findById(
      reservation._id,
    ).populate("cours", "nom type niveau dateDebut dateFin");

    res.status(201).json({
      success: true,
      message: "Réservation créée. Un email de validation a été envoyé.",
      data: reservationComplete,
      note: "Veuillez valider votre email pour confirmer la réservation",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const annulerReservation = async (req, res) => {
  try {
    const { raison } = req.body;
    const reservation = await Reservation.findById(req.params.id).populate(
      "cours",
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée",
      });
    }

    if (
      req.user.role !== "admin" &&
      reservation.utilisateur.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    if (reservation.statut === "annulee") {
      return res.status(400).json({
        success: false,
        message: "Cette réservation est déjà annulée",
      });
    }

    if (reservation.statut === "present") {
      return res.status(400).json({
        success: false,
        message: "Impossible d'annuler : présence déjà validée",
      });
    }

    const delaiAnnulation = 24;
    const heuresRestantes =
      (reservation.cours.dateDebut - new Date()) / (1000 * 60 * 60);

    if (heuresRestantes >= delaiAnnulation || req.user.role === "admin") {
      if (
        reservation.statut === "confirmee" &&
        reservation.typeReservation === "membre" &&
        reservation.forfait
      ) {
        const utilisateur = await Utilisateur.findById(reservation.utilisateur);

        if (reservation.paiement.type === "forfait") {
          const forfaitIndex = utilisateur.forfaitsActifs.findIndex(
            (f) => f.forfaitId.toString() === reservation.forfait.toString(),
          );

          if (forfaitIndex !== -1) {
            utilisateur.forfaitsActifs[forfaitIndex].seancesRestantes += 1;

            if (utilisateur.forfaitsActifs[forfaitIndex].seancesRestantes > 0) {
              utilisateur.forfaitsActifs[forfaitIndex].estActif = true;
            }

            await utilisateur.save();
          }
        }

        if (reservation.paiement.type === "abonnement") {
          utilisateur.abonnementActif.seancesRestantesMois += 1;
          await utilisateur.save();
        }
      }
    }

    reservation.statut = "annulee";
    reservation.dateAnnulation = new Date();
    reservation.raisonAnnulation = raison || "Annulation par l'utilisateur";
    reservation.annulePar = req.user.role === "admin" ? "admin" : "client";
    await reservation.save();

    const cours = await Cours.findById(reservation.cours._id);
    if (cours.placesReservees > 0) {
      cours.placesReservees -= 1;
    }
    if (cours.statut === "complet") {
      cours.statut = "confirme";
    }
    await cours.save();

    if (reservation.utilisateur) {
      await Notification.creer({
        type: "annulation",
        titre: "Réservation annulée",
        message: `Votre réservation pour ${cours.nom} a été annulée. ${heuresRestantes >= delaiAnnulation ? "Séance recréditée ✅" : "Séance non recréditée (annulation < 24h) ❌"}`,
        priorite: "normale",
        utilisateurId: reservation.utilisateur,
        coursId: cours._id,
        reservationId: reservation._id,
      });
    }

    res.status(200).json({
      success: true,
      message: "Réservation annulée avec succès",
      seanceRecreditee: heuresRestantes >= delaiAnnulation,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const validerPresence = async (req, res) => {
  try {
    const { present } = req.body;
    const reservation = await Reservation.findById(req.params.id).populate(
      "utilisateur",
    );

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Réservation non trouvée" });
    }

    if (present && reservation.typeReservation === "membre") {
      const utilisateur = await Utilisateur.findById(reservation.utilisateur);

      if (!reservation.forfait && utilisateur.aForfaitActif()) {
        const forfaitActif = utilisateur.forfaitsActifs.find(
          (f) => f.estActif && f.seancesRestantes > 0,
        );

        return res.status(400).json({
          success: false,
          warning: true,
          message: `Attention ! ${utilisateur.nomComplet} a un forfait actif (${forfaitActif.seancesRestantes} séances) mais aucune séance n'a été décomptée !`,
          data: {
            utilisateurId: utilisateur._id,
            forfaitId: forfaitActif.forfaitId,
            seancesRestantes: forfaitActif.seancesRestantes,
          },
          action: "DEMANDER_CONFIRMATION_DECOMPTE",
        });
      }
    }

    reservation.statut = present ? "present" : "absent";
    reservation.presenceValidee = true;
    reservation.dateValidationPresence = new Date();
    await reservation.save();

    if (present && reservation.utilisateur) {
      const utilisateur = await Utilisateur.findById(reservation.utilisateur);
      if (utilisateur) {
        utilisateur.nombreCoursAssistes += 1;
        await utilisateur.save();
      }
    }

    res.status(200).json({
      success: true,
      message: present ? "Présence validée" : "Marqué comme absent",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const marquerPaye = async (req, res) => {
  try {
    const { moyenPaiement } = req.body;

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée",
      });
    }

    if (reservation.paiement.estPaye) {
      return res.status(400).json({
        success: false,
        message: "Ce paiement est déjà marqué comme payé",
      });
    }

    reservation.paiement.estPaye = true;
    reservation.paiement.datePaiement = new Date();
    reservation.paiement.moyenPaiement = moyenPaiement || "especes";
    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Paiement marqué comme payé",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReservationsCours = async (req, res) => {
  try {
    const reservations = await Reservation.find({ cours: req.params.coursId })
      .populate("utilisateur", "prenom nom email telephone")
      .populate("forfait", "nom prix")
      .sort({ dateReservation: 1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const { statut, typeReservation, page = 1, limit = 50 } = req.query;

    const query = {};
    if (statut) query.statut = statut;
    if (typeReservation) query.typeReservation = typeReservation;

    const skip = (page - 1) * limit;

    const reservations = await Reservation.find(query)
      .populate("utilisateur", "prenom nom email")
      .populate("cours", "nom type dateDebut")
      .populate("forfait", "nom")
      .sort({ dateReservation: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Reservation.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reservations.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStatsReservations = async (req, res) => {
  try {
    const total = await Reservation.countDocuments();

    const parStatut = await Reservation.aggregate([
      { $group: { _id: "$statut", count: { $sum: 1 } } },
    ]);

    const parType = await Reservation.aggregate([
      { $group: { _id: "$typeReservation", count: { $sum: 1 } } },
    ]);

    const parTypePaiement = await Reservation.aggregate([
      { $group: { _id: "$paiement.type", count: { $sum: 1 } } },
    ]);

    const paiementsEnAttente = await Reservation.countDocuments({
      "paiement.estPaye": false,
      statut: { $in: ["confirmee", "en_attente"] },
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        parStatut,
        parType,
        parTypePaiement,
        paiementsEnAttente,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const validerReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("cours")
      .populate("utilisateur");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée",
      });
    }

    if (reservation.statut !== "enattente") {
      return res.status(400).json({
        success: false,
        message: "Seules les réservations en attente peuvent être validées",
      });
    }

    const cours = await Cours.findById(reservation.cours._id);

    if (cours.placesReservees >= cours.capaciteMax) {
      return res.status(400).json({
        success: false,
        message: "Ce cours est maintenant complet, impossible de valider",
      });
    }

    if (reservation.typeReservation === "membre" && reservation.forfait) {
      const utilisateur = await Utilisateur.findById(
        reservation.utilisateur._id,
      );

      if (reservation.paiement.type === "forfait") {
        try {
          await utilisateur.deduireSeance(reservation.forfait);
          console.log(`✅ Forfait décompté : ${utilisateur.nomComplet}`);
        } catch (error) {
          console.error("❌ Erreur décompte forfait:", error);
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      }

      if (reservation.paiement.type === "abonnement") {
        if (utilisateur.abonnementActif.seancesRestantesMois > 0) {
          utilisateur.abonnementActif.seancesRestantesMois -= 1;
          await utilisateur.save();
          console.log(`✅ Abonnement décompté : ${utilisateur.nomComplet}`);
        } else {
          return res.status(400).json({
            success: false,
            message: "Plus de séances disponibles ce mois",
          });
        }
      }
    }

    reservation.statut = "confirmee";
    await reservation.save();

    if (reservation.utilisateur) {
      await Notification.creer({
        type: "systeme",
        titre: "Réservation confirmée",
        message: `Votre réservation pour ${cours.nom} a été validée par l'admin !`,
        priorite: "haute",
        utilisateurId: reservation.utilisateur._id,
        coursId: cours._id,
        reservationId: reservation._id,
      });
    }

    res.status(200).json({
      success: true,
      message: "Réservation validée avec succès",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refuserReservation = async (req, res) => {
  try {
    const { raison } = req.body;

    const reservation = await Reservation.findById(req.params.id)
      .populate("cours")
      .populate("utilisateur");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée",
      });
    }

    if (reservation.statut !== "en_attente") {
      return res.status(400).json({
        success: false,
        message: "Seules les réservations en attente peuvent être refusées",
      });
    }

    reservation.statut = "annulee";
    reservation.dateAnnulation = new Date();
    reservation.raisonAnnulation = raison || "Refusée par l'admin";
    reservation.annulePar = "admin";
    await reservation.save();

    const cours = await Cours.findById(reservation.cours._id);
    if (cours.placesReservees > 0) {
      cours.placesReservees -= 1;
      if (cours.statut === "complet") {
        cours.statut = "confirme";
      }
      await cours.save();
    }

    if (reservation.utilisateur) {
      await Notification.creer({
        type: "systeme",
        titre: "Réservation refusée",
        message: `Votre réservation pour "${cours.nom}" a été refusée. Raison : ${raison || "Non spécifiée"}`,
        priorite: "haute",
        utilisateurId: reservation.utilisateur._id,
        coursId: cours._id,
        reservationId: reservation._id,
      });
    }

    res.status(200).json({
      success: true,
      message: "Réservation refusée avec succès",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const validerEmailInvite = async (req, res) => {
  try {
    const { token } = req.params;

    const reservation = await Reservation.findOne({
      tokenValidation: token,
      estValideEmail: false,
    }).populate("cours");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Token invalide ou déjà utilisé",
      });
    }

    reservation.estValideEmail = true;
    reservation.dateValidationEmail = new Date();
    await reservation.save();

    await Notification.creer({
      type: "nouvelle_reservation",
      titre: "Réservation invité validée",
      message: `${reservation.nomEleve} a validé son email pour ${reservation.cours.nom} le ${reservation.cours.dateDebut.toLocaleDateString()}`,
      priorite: "haute",
      reservationId: reservation._id,
      coursId: reservation.cours._id,
    });

    res.status(200).json({
      success: true,
      message:
        "Email validé avec succès. Votre réservation est en attente de validation par l'administrateur.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
