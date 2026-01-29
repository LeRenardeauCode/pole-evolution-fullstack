import { Forfait, Utilisateur, Reservation } from '../models/index.js';

export const getForfaits = async (req, res) => {
  try {
    const { categorie, estActif, estVisible } = req.query;

    const query = {};

    if (!req.user || req.user.role !== 'admin') {
      query.estActif = true;
      query.estVisible = true;
    } else {
      if (estActif !== undefined) query.estActif = estActif === 'true';
      if (estVisible !== undefined) query.estVisible = estVisible === 'true';
    }

    if (categorie) query.categorie = categorie;

    const forfaits = await Forfait.find(query).sort({ categorie: 1, prix: 1 });

    res.status(200).json({
      success: true,
      count: forfaits.length,
      data: forfaits
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getForfait = async (req, res) => {
  try {
    const forfait = await Forfait.findById(req.params.id);

    if (!forfait) {
      return res.status(404).json({
        success: false,
        message: 'Forfait non trouvé'
      });
    }

    if (!req.user || req.user.role !== 'admin') {
      if (!forfait.estActif || !forfait.estVisible) {
        return res.status(404).json({
          success: false,
          message: 'Forfait non disponible'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: forfait
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getForfaitsByCategorie = async (req, res) => {
  try {
    const { categorie } = req.params;

    const categoriesValides = ['decouverte', 'collectif', 'prive', 'abonnement', 'evjf', 'prestation'];
    
    if (!categoriesValides.includes(categorie)) {
      return res.status(400).json({
        success: false,
        message: `Catégorie invalide. Catégories valides : ${categoriesValides.join(', ')}`
      });
    }

    const query = { 
      categorie,
      estActif: true,
      estVisible: true
    };

    const forfaits = await Forfait.find(query).sort({ prix: 1 });

    res.status(200).json({
      success: true,
      count: forfaits.length,
      data: forfaits
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createForfait = async (req, res) => {
  try {
    const forfaitData = req.body;

    if (forfaitData.nombreSeances && forfaitData.prix) {
      forfaitData.prixUnitaire = (forfaitData.prix / forfaitData.nombreSeances).toFixed(2);
    }

    if (forfaitData.prixUnitaire && forfaitData.categorie === 'collectif') {
      const prixReference = 25; 
      const reduction = ((prixReference - forfaitData.prixUnitaire) / prixReference * 100).toFixed(0);
      forfaitData.reductionPourcentage = Math.max(0, parseFloat(reduction));
    }

    const forfait = await Forfait.create(forfaitData);

    res.status(201).json({
      success: true,
      message: 'Forfait créé avec succès',
      data: forfait
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateForfait = async (req, res) => {
  try {
    const forfait = await Forfait.findById(req.params.id);

    if (!forfait) {
      return res.status(404).json({
        success: false,
        message: 'Forfait non trouvé'
      });
    }

    const updateData = { ...req.body };
    
    if (updateData.prix || updateData.nombreSeances) {
      const prix = updateData.prix || forfait.prix;
      const nombreSeances = updateData.nombreSeances || forfait.nombreSeances;
      
      if (nombreSeances) {
        updateData.prixUnitaire = (prix / nombreSeances).toFixed(2);
      }
    }

    if (updateData.prixUnitaire) {
      const prixReference = 25;
      const reduction = ((prixReference - updateData.prixUnitaire) / prixReference * 100).toFixed(0);
      updateData.reductionPourcentage = Math.max(0, parseFloat(reduction));
    }

    const forfaitUpdated = await Forfait.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Forfait mis à jour avec succès',
      data: forfaitUpdated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteForfait = async (req, res) => {
  try {
    const forfait = await Forfait.findById(req.params.id);

    if (!forfait) {
      return res.status(404).json({
        success: false,
        message: 'Forfait non trouvé'
      });
    }

    const utilisateursAvecForfait = await Utilisateur.countDocuments({
      'forfaitsActifs.forfaitId': forfait._id,
      'forfaitsActifs.estActif': true
    });

    const utilisateursAvecAbonnement = await Utilisateur.countDocuments({
      'abonnementActif.forfaitId': forfait._id
    });

    const reservationsActives = await Reservation.countDocuments({
      forfait: forfait._id,
      statut: { $in: ['confirmee', 'en_attente'] }
    });

    if (utilisateursAvecForfait > 0 || utilisateursAvecAbonnement > 0 || reservationsActives > 0) {
      return res.status(400).json({
        success: false,
        message: `Impossible de supprimer ce forfait : ${utilisateursAvecForfait} forfait(s) actif(s), ${utilisateursAvecAbonnement} abonnement(s), ${reservationsActives} réservation(s). Désactivez-le plutôt.`
      });
    }

    await forfait.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Forfait supprimé avec succès'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const desactiverForfait = async (req, res) => {
  try {
    const forfait = await Forfait.findById(req.params.id);

    if (!forfait) {
      return res.status(404).json({
        success: false,
        message: 'Forfait non trouvé'
      });
    }

    forfait.estActif = false;
    forfait.estVisible = false;
    await forfait.save();

    res.status(200).json({
      success: true,
      message: 'Forfait désactivé avec succès',
      data: forfait
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getStatsForfaits = async (req, res) => {
  try {
    const total = await Forfait.countDocuments();
    const actifs = await Forfait.countDocuments({ estActif: true });
    const visibles = await Forfait.countDocuments({ estVisible: true });

    const parCategorie = await Forfait.aggregate([
      { $group: { _id: '$categorie', count: { $sum: 1 } } }
    ]);

    const utilisateurs = await Utilisateur.find({
      'forfaitsActifs.estActif': true
    }).select('forfaitsActifs');

    const forfaitsUtilises = {};
    utilisateurs.forEach(user => {
      user.forfaitsActifs.forEach(fa => {
        if (fa.estActif) {
          const id = fa.forfaitId.toString();
          forfaitsUtilises[id] = (forfaitsUtilises[id] || 0) + 1;
        }
      });
    });

    const topForfaits = Object.entries(forfaitsUtilises)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const topForfaitsDetails = await Promise.all(
      topForfaits.map(async ([id, count]) => {
        const forfait = await Forfait.findById(id).select('nom prix categorie');
        return {
          forfait,
          utilisateurs: count
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        total,
        actifs,
        visibles,
        parCategorie,
        topForfaits: topForfaitsDetails
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
