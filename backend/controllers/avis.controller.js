import { Avis, Cours, Utilisateur, Notification } from "../models/index.js";

export const getAvisPublics = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;

    const query = {
      statut: "approuve",
      estPublic: true,
    };

    const skip = (page - 1) * limit;

    const avis = await Avis.find(query)
      .populate("utilisateur", "prenom nom")
      .populate("cours", "nom type niveau dateDebut")
      .sort({ datePublication: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Avis.countDocuments(query);

    res.status(200).json({
      success: true,
      count: avis.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: avis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAvisCours = async (req, res) => {
  try {
    const avis = await Avis.find({
      cours: req.params.coursId,
      statut: "approuve",
      estPublic: true,
    })
      .populate("utilisateur", "prenom nom")
      .sort({ datePublication: -1 });

    const noteMoyenne =
      avis.length > 0
        ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      count: avis.length,
      noteMoyenne: parseFloat(noteMoyenne),
      data: avis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMesAvis = async (req, res) => {
  try {
    const avis = await Avis.find({ utilisateur: req.user._id })
      .populate("cours", "nom type niveau dateDebut")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: avis.length,
      data: avis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createAvis = async (req, res) => {
  try {
    const { coursId, note, commentaire } = req.body;

    if (!coursId || !note) {
      return res.status(400).json({
        success: false,
        message: "Cours ID et note sont requis",
      });
    }

    if (note < 1 || note > 5) {
      return res.status(400).json({
        success: false,
        message: "La note doit être entre 1 et 5",
      });
    }

    const cours = await Cours.findById(coursId);
    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    const avisExistant = await Avis.findOne({
      utilisateur: req.user._id,
      cours: coursId,
    });

    if (avisExistant) {
      return res.status(400).json({
        success: false,
        message: "Vous avez déjà laissé un avis pour ce cours",
      });
    }

    const { Reservation } = await import("../models/index.js");
    const reservation = await Reservation.findOne({
      utilisateur: req.user._id,
      cours: coursId,
      statut: "present",
    });

    if (!reservation) {
      return res.status(403).json({
        success: false,
        message: "Vous devez avoir assisté au cours pour laisser un avis",
      });
    }

    const avis = await Avis.create({
      utilisateur: req.user._id,
      cours: coursId,
      note,
      commentaire,
      statut: "en_attente",
      estPublic: false,
    });

    await Notification.creer({
      type: "nouvel_avis",
      titre: "Nouvel avis à valider",
      message: `${req.user.prenom} ${req.user.nom} a laissé un avis (${note}/5) pour "${cours.nom}"`,
      priorite: "basse",
      estGlobal: true,
    });

    const avisComplet = await Avis.findById(avis._id)
      .populate("utilisateur", "prenom nom")
      .populate("cours", "nom type");

    res.status(201).json({
      success: true,
      message:
        "Avis créé avec succès. Il sera visible après validation par un administrateur.",
      data: avisComplet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAvis = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: "Avis non trouvé",
      });
    }

    if (avis.utilisateur.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez modifier que vos propres avis",
      });
    }

    if (req.body.note && (req.body.note < 1 || req.body.note > 5)) {
      return res.status(400).json({
        success: false,
        message: "La note doit être entre 1 et 5",
      });
    }

    if (avis.statut === "approuve" && (req.body.note || req.body.commentaire)) {
      req.body.statut = "en_attente";
      req.body.estPublic = false;
    }

    const avisUpdated = await Avis.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("utilisateur", "prenom nom")
      .populate("cours", "nom type");

    res.status(200).json({
      success: true,
      message:
        "Avis modifié avec succès. Il sera revalidé par un administrateur.",
      data: avisUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAvis = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: "Avis non trouvé",
      });
    }

    if (
      avis.utilisateur.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    await avis.deleteOne();

    res.status(200).json({
      success: true,
      message: "Avis supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const validerAvis = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: "Avis non trouvé",
      });
    }

    if (avis.statut === "approuve") {
      return res.status(400).json({
        success: false,
        message: "Cet avis est déjà validé",
      });
    }

    avis.statut = "approuve";
    avis.estPublic = true;
    avis.datePublication = new Date();
    avis.moderePar = req.user._id;
    avis.dateModeration = new Date();
    await avis.save();

    if (avis.utilisateur) {
      await Notification.creer({
        type: "avis_client",
        titre: "Votre avis a été publié",
        message:
          "Merci pour votre témoignage ! Il est maintenant visible sur notre site.",
        priorite: "normale",
        utilisateurId: avis.utilisateur,
      });
    }

    const avisComplet = await Avis.findById(avis._id)
      .populate("utilisateur", "prenom nom")
      .populate("cours", "nom type");

    res.status(200).json({
      success: true,
      message: "Avis validé avec succès",
      data: avisComplet,
    });
  } catch (error) {
    console.error("Erreur validerAvis:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejeterAvis = async (req, res) => {
  try {
    const { raison } = req.body;

    if (!raison) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir une raison de rejet",
      });
    }

    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: "Avis non trouvé",
      });
    }

    await avis.rejeter(req.user._id, raison);

    if (avis.utilisateur) {
      await Notification.creer({
        type: "avis_client",
        titre: "Avis rejeté",
        message: `Votre avis a été rejeté. Raison : ${raison}`,
        priorite: "normale",
        utilisateurId: avis.utilisateur,
      });
    }

    res.status(200).json({
      success: true,
      message: "Avis rejeté avec succès",
      data: avis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAvis = async (req, res) => {
  try {
    const { estValide, estVisible, page = 1, limit = 50 } = req.query;

    const query = {};
    if (req.query.statut) query.statut = req.query.statut;
    if (req.query.estPublic !== undefined)
      query.estPublic = req.query.estPublic === "true";

    const skip = (page - 1) * limit;

    const avis = await Avis.find(query)
      .populate("utilisateur", "prenom nom email")
      .populate("cours", "nom type niveau dateDebut")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Avis.countDocuments(query);

    res.status(200).json({
      success: true,
      count: avis.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: avis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStatsAvis = async (req, res) => {
  try {
    const total = await Avis.countDocuments();
    const approuves = await Avis.countDocuments({ statut: "approuve" });
    const enAttente = await Avis.countDocuments({ statut: "en_attente" });
    const rejetes = await Avis.countDocuments({ statut: "rejete" });
    const publics = await Avis.countDocuments({ estPublic: true });

    const noteMoyenne = await Avis.getNoteMoyenne();

    const distributionNotes = await Avis.aggregate([
      { $match: { statut: "approuve" } },
      { $group: { _id: "$note", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);

    const coursMieuxNotes = await Avis.aggregate([
      { $match: { statut: "approuve" } },
      {
        $group: {
          _id: "$cours",
          noteMoyenne: { $avg: "$note" },
          nombreAvis: { $sum: 1 },
        },
      },
      { $match: { nombreAvis: { $gte: 3 } } },
      { $sort: { noteMoyenne: -1 } },
      { $limit: 5 },
    ]);

    const coursMieuxNotesDetails = await Promise.all(
      coursMieuxNotes.map(async (item) => {
        const cours = await Cours.findById(item._id).select("nom type niveau");
        return {
          cours,
          noteMoyenne: parseFloat(item.noteMoyenne.toFixed(1)),
          nombreAvis: item.nombreAvis,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: {
        total,
        approuves,
        enAttente,
        rejetes,
        publics,
        noteMoyenne,
        distributionNotes,
        coursMieuxNotes: coursMieuxNotesDetails,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
