import { Cours } from "../models/index.js";

export const getCoursFuturs = async (req, res) => {
  try {
    const { type, niveau, statut } = req.query;

    const query = {
      dateDebut: { $gte: new Date() },
      estVisible: true,
    };

    if (type) query.type = type;
    if (niveau) query.niveau = niveau;
    if (statut) query.statut = statut;

    const cours = await Cours.find(query)
      .populate("professeur", "prenom nom")
      .sort({ dateDebut: 1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: cours.length,
      data: cours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCours = async (req, res) => {
  try {
    const { type, niveau, statut, page = 1, limit = 50 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (niveau) query.niveau = niveau;
    if (statut) query.statut = statut;

    const skip = (page - 1) * limit;

    const cours = await Cours.find(query)
      .populate("professeur", "prenom nom")
      .sort({ dateDebut: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Cours.countDocuments(query);

    res.status(200).json({
      success: true,
      count: cours.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: cours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCours = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id).populate(
      "professeur",
      "prenom nom telephone email",
    );

    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    const placesDisponibles = cours.capaciteMax - cours.placesReservees;

    res.status(200).json({
      success: true,
      data: {
        ...cours.toObject(),
        placesDisponibles,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPlanningSemaine = async (req, res) => {
  try {
    const dateParam = req.query.date;
    const { type, niveau, placesDisponibles } = req.query;
    const dateRef = dateParam ? new Date(dateParam) : new Date();

    const debutSemaine = new Date(dateRef);
    debutSemaine.setDate(
      dateRef.getDate() - (dateRef.getDay() === 0 ? 6 : dateRef.getDay() - 1),
    );
    debutSemaine.setHours(0, 0, 0, 0);

    const finSemaine = new Date(debutSemaine);
    finSemaine.setDate(debutSemaine.getDate() + 6);
    finSemaine.setHours(23, 59, 59, 999);

    const query = {
      dateDebut: { $gte: debutSemaine, $lte: finSemaine },
      statut: { $nin: ["annule"] },
      estVisible: true,
      type: { $in: ["collectif", "decouverte"] }, 
    };

    if (type && type !== "tous") {
      query.type = type;
    }

    if (niveau && niveau !== "tous") {
      query.niveau = niveau;
    }

    if (placesDisponibles === "true") {
      query.$expr = { $lt: ["$placesReservees", "$capaciteMax"] };
    }

    const cours = await Cours.find(query)
      .populate("professeur", "prenom nom")
      .sort({ dateDebut: 1 });

    const planning = {};
    cours.forEach((c) => {
      const jour = c.dateDebut.toISOString().split("T")[0];
      if (!planning[jour]) {
        planning[jour] = [];
      }
      planning[jour].push(c);
    });

    res.status(200).json({
      success: true,
      dateReference: dateRef,
      count: cours.length,
      planning,
      data: cours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCoursJour = async (req, res) => {
  try {
    const date = new Date(req.params.date);

    // Début du jour (00:00:00)
    const debutJour = new Date(date);
    debutJour.setHours(0, 0, 0, 0);

    // Fin du jour (23:59:59)
    const finJour = new Date(date);
    finJour.setHours(23, 59, 59, 999);

    const cours = await Cours.find({
      dateDebut: { $gte: debutJour, $lte: finJour },
      estVisible: true,
    })
      .populate("professeur", "prenom nom")
      .sort({ dateDebut: 1 });

    res.status(200).json({
      success: true,
      date: date.toISOString().split("T")[0],
      count: cours.length,
      data: cours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCours = async (req, res) => {
  try {
    const coursData = {
      ...req.body,
      professeur: req.user._id,
    };

    if (coursData.type === "evjf") {
      if (coursData.capaciteMax > 12) {
        return res.status(400).json({
          success: false,
          message: "EVJF : capacité maximale de 12 personnes",
        });
      }
      if (coursData.capaciteMin && coursData.capaciteMin < 6) {
        return res.status(400).json({
          success: false,
          message: "EVJF : minimum 6 personnes",
        });
      }
    }

    const cours = await Cours.create(coursData);

    const coursComplet = await Cours.findById(cours._id).populate(
      "professeur",
      "prenom nom",
    );

    res.status(201).json({
      success: true,
      message: "Cours créé avec succès",
      data: coursComplet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCours = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id);

    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    if (req.body.capaciteMax && req.body.capaciteMax < cours.placesReservees) {
      return res.status(400).json({
        success: false,
        message: `Impossible de réduire la capacité à ${req.body.capaciteMax}. Il y a déjà ${cours.placesReservees} réservations.`,
      });
    }

    if (req.body.type === "evjf" || cours.type === "evjf") {
      if (req.body.capaciteMax && req.body.capaciteMax > 12) {
        return res.status(400).json({
          success: false,
          message: "EVJF : capacité maximale de 12 personnes",
        });
      }
    }

    const coursUpdated = await Cours.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("professeur", "prenom nom");

    res.status(200).json({
      success: true,
      message: "Cours mis à jour avec succès",
      data: coursUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCours = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id);

    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    const { Reservation } = await import("../models/index.js");
    const reservationsActives = await Reservation.countDocuments({
      cours: cours._id,
      statut: { $in: ["confirmee", "en_attente"] },
    });

    if (reservationsActives > 0) {
      return res.status(400).json({
        success: false,
        message: `Impossible de supprimer ce cours : ${reservationsActives} réservation(s) active(s). Veuillez d'abord annuler le cours.`,
      });
    }

    await cours.deleteOne();

    res.status(200).json({
      success: true,
      message: "Cours supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const annulerCours = async (req, res) => {
  try {
    const { raison } = req.body;

    if (!raison) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir une raison d'annulation",
      });
    }

    const cours = await Cours.findById(req.params.id);

    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    if (cours.statut === "annule") {
      return res.status(400).json({
        success: false,
        message: "Ce cours est déjà annulé",
      });
    }

    cours.statut = "annule";
    cours.raisonAnnulation = raison;
    await cours.save();

    const { Reservation, Notification } = await import("../models/index.js");

    const reservations = await Reservation.find({
      cours: cours._id,
      statut: { $in: ["confirmee", "en_attente"] },
    });

    for (const reservation of reservations) {
      reservation.statut = "annulee";
      reservation.dateAnnulation = new Date();
      reservation.raisonAnnulation = `Cours annulé par l'administrateur : ${raison}`;
      reservation.annulePar = "admin";
      await reservation.save();

      if (reservation.utilisateur) {
        await Notification.creer({
          type: "annulation",
          titre: "Cours annulé",
          message: `Le cours "${cours.nom}" du ${cours.dateDebut.toLocaleDateString()} a été annulé. Raison : ${raison}`,
          priorite: "haute",
          utilisateurId: reservation.utilisateur,
          coursId: cours._id,
          reservationId: reservation._id,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Cours annulé avec succès. ${reservations.length} réservation(s) annulée(s) et notifications envoyées.`,
      data: cours,
      reservationsAnnulees: reservations.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const genererCoursRecurrents = async (req, res) => {
  try {
    const { coursModeleId, dateDebut, dateFin, exclureDates = [] } = req.body;

    if (!coursModeleId || !dateDebut || !dateFin) {
      return res.status(400).json({
        success: false,
        message: "coursModeleId, dateDebut et dateFin sont requis",
      });
    }

    const coursModele = await Cours.findById(coursModeleId);

    if (!coursModele) {
      return res.status(404).json({
        success: false,
        message: "Cours modèle non trouvé",
      });
    }

    if (!coursModele.estRecurrent) {
      return res.status(400).json({
        success: false,
        message: "Ce cours n'est pas défini comme récurrent",
      });
    }

    const coursGeneres = [];
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const exclure = exclureDates.map(
      (d) => new Date(d).toISOString().split("T")[0],
    );

    let dateActuelle = new Date(debut);

    while (dateActuelle <= fin) {
      if (dateActuelle.getDay() === coursModele.jourSemaine) {
        const dateStr = dateActuelle.toISOString().split("T")[0];

        if (!exclure.includes(dateStr)) {
          const [heures, minutes] = coursModele.heureDebut.split(":");
          const dateDebutCours = new Date(dateActuelle);
          dateDebutCours.setHours(parseInt(heures), parseInt(minutes), 0, 0);

          const dateFinCours = new Date(dateDebutCours);
          dateFinCours.setMinutes(
            dateFinCours.getMinutes() + coursModele.duree,
          );

          const nouveauCours = await Cours.create({
            nom: coursModele.nom,
            description: coursModele.description,
            type: coursModele.type,
            niveau: coursModele.niveau,
            dateDebut: dateDebutCours,
            dateFin: dateFinCours,
            duree: coursModele.duree,
            estRecurrent: false,
            capaciteMax: coursModele.capaciteMax,
            capaciteMin: coursModele.capaciteMin,
            professeur: coursModele.professeur,
            tarifsSpecifiques: coursModele.tarifsSpecifiques,
            estVisible: coursModele.estVisible,
            reservationOuverte: coursModele.reservationOuverte,
          });

          coursGeneres.push(nouveauCours);
        }
      }

      dateActuelle.setDate(dateActuelle.getDate() + 1);
    }

    res.status(201).json({
      success: true,
      message: `${coursGeneres.length} cours générés avec succès`,
      count: coursGeneres.length,
      data: coursGeneres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStatsCours = async (req, res) => {
  try {
    const total = await Cours.countDocuments();
    const futurs = await Cours.countDocuments({
      dateDebut: { $gte: new Date() },
    });
    const passes = await Cours.countDocuments({
      dateDebut: { $lt: new Date() },
    });

    const parStatut = await Cours.aggregate([
      { $group: { _id: "$statut", count: { $sum: 1 } } },
    ]);

    const parType = await Cours.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    const tauxRemplissage = await Cours.aggregate([
      {
        $match: {
          dateDebut: { $gte: new Date() },
          statut: { $in: ["planifie", "confirme", "complet"] },
        },
      },
      {
        $project: {
          taux: {
            $multiply: [{ $divide: ["$placesReservees", "$capaciteMax"] }, 100],
          },
        },
      },
      {
        $group: {
          _id: null,
          tauxMoyen: { $avg: "$taux" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        futurs,
        passes,
        parStatut,
        parType,
        tauxRemplissageMoyen: tauxRemplissage[0]?.tauxMoyen || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
