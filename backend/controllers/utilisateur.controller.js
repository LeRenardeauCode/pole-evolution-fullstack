import { Utilisateur } from '../models/index.js';

export const getUtilisateurs = async (req, res) => {
  try {
    const { role, statutValidationAdmin, estActif, search, page = 1, limit = 20 } = req.query;


    const query = {};

    if (role) query.role = role;
    if (statutValidationAdmin) query.statutValidationAdmin = statutValidationAdmin;
    if (estActif !== undefined) query.estActif = estActif === 'true';


    if (search) {
      query.$or = [
        { prenom: { $regex: search, $options: 'i' } },
        { nom: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }


    const skip = (page - 1) * limit;

    const utilisateurs = await Utilisateur.find(query)
      .select('-motDePasse')
      .sort({ dateInscription: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Utilisateur.countDocuments(query);

    res.status(200).json({
      success: true,
      count: utilisateurs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: utilisateurs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id)
      .select('-motDePasse')
      .populate('forfaitsActifs.forfaitId', 'nom prix nombreSeances')
      .populate('abonnementActif.forfaitId', 'nom prix');

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: utilisateur
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateUtilisateur = async (req, res) => {
  try {

    const fieldsToUpdate = {
      prenom: req.body.prenom,
      nom: req.body.nom,
      email: req.body.email,
      telephone: req.body.telephone,
      role: req.body.role,
      estActif: req.body.estActif,
      statutValidationAdmin: req.body.statutValidationAdmin,
      niveauPole: req.body.niveauPole,
      adresse: req.body.adresse,
      certificatMedical: req.body.certificatMedical
    };


    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    ).select('-motDePasse');

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Utilisateur mis à jour avec succès',
      data: utilisateur
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }


    if (utilisateur.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer un administrateur'
      });
    }


    const { Reservation } = await import('../models/index.js');
    const reservationsActives = await Reservation.countDocuments({
      utilisateur: utilisateur._id,
      statut: { $in: ['confirmee', 'en_attente'] }
    });

    if (reservationsActives > 0) {
      return res.status(400).json({
        success: false,
        message: `Impossible de supprimer cet utilisateur : ${reservationsActives} réservation(s) active(s)`
      });
    }

    await utilisateur.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Utilisateur supprimé avec succès'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const approveUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    if (utilisateur.statutValidationAdmin === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Cet utilisateur est déjà approuvé'
      });
    }

    utilisateur.statutValidationAdmin = 'approved';
    utilisateur.estVisible = true;
    utilisateur.datePremiereInscription = utilisateur.datePremiereInscription || new Date();

    await utilisateur.save();

    const { Notification } = await import('../models/index.js');
    await Notification.creer({
      type: 'systeme',
      titre: 'Inscription approuvée',
      message: 'Votre inscription a été approuvée ! Vous pouvez maintenant réserver des cours.',
      priorite: 'haute',
      utilisateurId: utilisateur._id
    });

    res.status(200).json({
      success: true,
      message: 'Utilisateur approuvé avec succès',
      data: utilisateur
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const rejectUtilisateur = async (req, res) => {
  try {
    const { raison } = req.body;

    if (!raison) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir une raison de rejet'
      });
    }

    const utilisateur = await Utilisateur.findById(req.params.id);

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    utilisateur.statutValidationAdmin = 'rejected';
    utilisateur.raisonsRejet = raison;
    utilisateur.estActif = false;

    await utilisateur.save();

    // Envoyer une notification
    const { Notification } = await import('../models/index.js');
    await Notification.creer({
      type: 'systeme',
      titre: 'Inscription rejetée',
      message: `Votre inscription a été rejetée. Raison : ${raison}`,
      priorite: 'haute',
      utilisateurId: utilisateur._id
    });

    res.status(200).json({
      success: true,
      message: 'Utilisateur rejeté avec succès',
      data: utilisateur
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const ajouterForfait = async (req, res) => {
  try {
    const { forfaitId, seancesAchetees, dateExpiration } = req.body;

    if (!forfaitId || !seancesAchetees) {
      return res.status(400).json({
        success: false,
        message: 'Forfait ID et nombre de séances requis'
      });
    }

    const utilisateur = await Utilisateur.findById(req.params.id);

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    utilisateur.forfaitsActifs.push({
      forfaitId,
      dateAchat: new Date(),
      seancesAchetees,
      seancesRestantes: seancesAchetees,
      dateExpiration: dateExpiration || null,
      estActif: true
    });

    await utilisateur.save();

    res.status(200).json({
      success: true,
      message: 'Forfait ajouté avec succès',
      data: utilisateur
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const modifierAbonnement = async (req, res) => {
  try {
    const { 
      forfaitId, 
      dateDebut, 
      dateFin, 
      dateFinEngagement,
      montantMensuel, 
      frequenceSeances,
      statutPaiement 
    } = req.body;

    const utilisateur = await Utilisateur.findById(req.params.id);

    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    utilisateur.abonnementActif = {
      forfaitId,
      dateDebut: dateDebut || new Date(),
      dateFin,
      dateFinEngagement,
      montantMensuel,
      frequenceSeances,
      statutPaiement: statutPaiement || 'actif',
      dateProchaineEcheance: dateDebut ? new Date(new Date(dateDebut).setMonth(new Date(dateDebut).getMonth() + 1)) : null
    };

    await utilisateur.save();

    res.status(200).json({
      success: true,
      message: 'Abonnement mis à jour avec succès',
      data: utilisateur
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getStatsMensuelles = async (req, res) => {
  try {
    const { annee, mois } = req.query;

    if (!annee || !mois) {
      return res.status(400).json({
        success: false,
        message: 'Année et mois requis (ex: ?annee=2026&mois=1)'
      });
    }

    const stats = await Utilisateur.getStatistiquesMois(parseInt(annee), parseInt(mois));

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getStats = async (req, res) => {
  try {
    const total = await Utilisateur.countDocuments();
    const clients = await Utilisateur.countDocuments({ role: 'client' });
    const admins = await Utilisateur.countDocuments({ role: 'admin' });
    const actifs = await Utilisateur.countDocuments({ estActif: true });
    const pending = await Utilisateur.countDocuments({ statutValidationAdmin: 'pending' });
    const approved = await Utilisateur.countDocuments({ statutValidationAdmin: 'approved' });
    const rejected = await Utilisateur.countDocuments({ statutValidationAdmin: 'rejected' });

    const avecAbonnement = await Utilisateur.countDocuments({
      'abonnementActif.forfaitId': { $exists: true },
      'abonnementActif.statutPaiement': 'actif'
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        clients,
        admins,
        actifs,
        pending,
        approved,
        rejected,
        avecAbonnement
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
