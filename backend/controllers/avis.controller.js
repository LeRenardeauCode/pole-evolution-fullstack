import { Avis, Cours, Utilisateur, Notification } from '../models/index.js';

export const getAvisPublics = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;

    const query = { 
      estValide: true,
      estVisible: true 
    };

    const skip = (page - 1) * limit;

    const avis = await Avis.find(query)
      .populate('utilisateur', 'prenom nom')
      .populate('cours', 'nom type niveau dateDebut')
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
      data: avis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAvisCours = async (req, res) => {
  try {
    const avis = await Avis.find({
      cours: req.params.coursId,
      estValide: true,
      estVisible: true
    })
      .populate('utilisateur', 'prenom nom')
      .sort({ datePublication: -1 });

    const noteMoyenne = avis.length > 0
      ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      count: avis.length,
      noteMoyenne: parseFloat(noteMoyenne),
      data: avis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMesAvis = async (req, res) => {
  try {
    const avis = await Avis.find({ utilisateur: req.user._id })
      .populate('cours', 'nom type niveau dateDebut')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: avis.length,
      data: avis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createAvis = async (req, res) => {
  try {
    const { coursId, note, commentaire } = req.body;

    if (!coursId || !note) {
      return res.status(400).json({
        success: false,
        message: 'Cours ID et note sont requis'
      });
    }

    if (note < 1 || note > 5) {
      return res.status(400).json({
        success: false,
        message: 'La note doit être entre 1 et 5'
      });
    }

    const cours = await Cours.findById(coursId);
    if (!cours) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }

    const avisExistant = await Avis.findOne({
      utilisateur: req.user._id,
      cours: coursId
    });

    if (avisExistant) {
      return res.status(400).json({
        success: false,
        message: 'Vous avez déjà laissé un avis pour ce cours'
      });
    }

    const { Reservation } = await import('../models/index.js');
    const reservation = await Reservation.findOne({
      utilisateur: req.user._id,
      cours: coursId,
      statut: 'present'
    });

    if (!reservation) {
      return res.status(403).json({
        success: false,
        message: 'Vous devez avoir assisté au cours pour laisser un avis'
      });
    }

    const avis = await Avis.create({
      utilisateur: req.user._id,
      cours: coursId,
      note,
      commentaire,
      estValide: false, 
      estVisible: false
    });

    await Notification.creer({
      type: 'nouvel_avis',
      titre: 'Nouvel avis à valider',
      message: `${req.user.prenom} ${req.user.nom} a laissé un avis (${note}/5) pour "${cours.nom}"`,
      priorite: 'basse',
      estGlobal: true
    });

    const avisComplet = await Avis.findById(avis._id)
      .populate('utilisateur', 'prenom nom')
      .populate('cours', 'nom type');

    res.status(201).json({
      success: true,
      message: 'Avis créé avec succès. Il sera visible après validation par un administrateur.',
      data: avisComplet
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateAvis = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    if (avis.utilisateur.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Vous ne pouvez modifier que vos propres avis'
      });
    }

    if (req.body.note && (req.body.note < 1 || req.body.note > 5)) {
      return res.status(400).json({
        success: false,
        message: 'La note doit être entre 1 et 5'
      });
    }

    if (avis.estValide && (req.body.note || req.body.commentaire)) {
      req.body.estValide = false;
      req.body.estVisible = false;
    }

    const avisUpdated = await Avis.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('utilisateur', 'prenom nom')
      .populate('cours', 'nom type');

    res.status(200).json({
      success: true,
      message: 'Avis modifié avec succès. Il sera revalidé par un administrateur.',
      data: avisUpdated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteAvis = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    if (avis.utilisateur.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé'
      });
    }

    await avis.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Avis supprimé avec succès'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const validerAvis = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    if (avis.estValide) {
      return res.status(400).json({
        success: false,
        message: 'Cet avis est déjà validé'
      });
    }

    avis.estValide = true;
    avis.estVisible = true;
    avis.dateValidation = new Date();
    avis.datePublication = new Date();
    await avis.save();

    await Notification.creer({
      type: 'avis_valide',
      titre: 'Avis validé',
      message: 'Votre avis a été validé et est maintenant visible publiquement',
      priorite: 'normale',
      utilisateurId: avis.utilisateur
    });

    const avisComplet = await Avis.findById(avis._id)
      .populate('utilisateur', 'prenom nom')
      .populate('cours', 'nom type');

    res.status(200).json({
      success: true,
      message: 'Avis validé avec succès',
      data: avisComplet
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const rejeterAvis = async (req, res) => {
  try {
    const { raison } = req.body;

    if (!raison) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir une raison de rejet'
      });
    }

    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    avis.estValide = false;
    avis.estVisible = false;
    avis.raisonRejet = raison;
    await avis.save();

    await Notification.creer({
      type: 'avis_rejete',
      titre: 'Avis rejeté',
      message: `Votre avis a été rejeté. Raison : ${raison}`,
      priorite: 'normale',
      utilisateurId: avis.utilisateur
    });

    res.status(200).json({
      success: true,
      message: 'Avis rejeté avec succès',
      data: avis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllAvis = async (req, res) => {
  try {
    const { estValide, estVisible, page = 1, limit = 50 } = req.query;

    const query = {};
    if (estValide !== undefined) query.estValide = estValide === 'true';
    if (estVisible !== undefined) query.estVisible = estVisible === 'true';

    const skip = (page - 1) * limit;

    const avis = await Avis.find(query)
      .populate('utilisateur', 'prenom nom email')
      .populate('cours', 'nom type niveau dateDebut')
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
      data: avis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getStatsAvis = async (req, res) => {
  try {
    const total = await Avis.countDocuments();
    const valides = await Avis.countDocuments({ estValide: true });
    const enAttente = await Avis.countDocuments({ estValide: false });
    const visibles = await Avis.countDocuments({ estVisible: true });

    const avisValides = await Avis.find({ estValide: true });
    const noteMoyenneGlobale = avisValides.length > 0
      ? (avisValides.reduce((sum, a) => sum + a.note, 0) / avisValides.length).toFixed(1)
      : 0;

    const distributionNotes = await Avis.aggregate([
      { $match: { estValide: true } },
      { $group: { _id: '$note', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const coursMieuxNotes = await Avis.aggregate([
      { $match: { estValide: true } },
      {
        $group: {
          _id: '$cours',
          noteMoyenne: { $avg: '$note' },
          nombreAvis: { $sum: 1 }
        }
      },
      { $match: { nombreAvis: { $gte: 3 } } }, 
      { $sort: { noteMoyenne: -1 } },
      { $limit: 5 }
    ]);

    const coursMieuxNotesDetails = await Promise.all(
      coursMieuxNotes.map(async (item) => {
        const cours = await Cours.findById(item._id).select('nom type niveau');
        return {
          cours,
          noteMoyenne: parseFloat(item.noteMoyenne.toFixed(1)),
          nombreAvis: item.nombreAvis
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        total,
        valides,
        enAttente,
        visibles,
        noteMoyenneGlobale: parseFloat(noteMoyenneGlobale),
        distributionNotes,
        coursMieuxNotes: coursMieuxNotesDetails
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
