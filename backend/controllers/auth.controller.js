// Backend/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { Utilisateur } from '../models/index.js';

export const register = async (req, res) => {
  try {
    const { 
      prenom, 
      nom, 
      email, 
      motDePasse, 
      telephone, 
      dateNaissance,
      niveauPole,
      accepteContact 
    } = req.body;


    if (!prenom || !nom || !email || !motDePasse) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir tous les champs obligatoires (prénom, nom, email, mot de passe).'
      });
    }

    const existingUser = await Utilisateur.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé.'
      });
    }

    const user = await Utilisateur.create({
      prenom,
      nom,
      email: email.toLowerCase(),
      motDePasse,
      telephone,
      dateNaissance,
      niveauPole: niveauPole || 'jamais',
      accepteContact: accepteContact || false,
      accepteCGU: true,
      accepteReglement: true,
      statutValidationAdmin: 'pending',
      role: 'client',
      estActif: true,
      emailVerifie: false
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Inscription réussie. Votre compte est en attente de validation par un administrateur.',
      token,
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        statutValidationAdmin: user.statutValidationAdmin
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir un email et un mot de passe.'
      });
    }

    const user = await Utilisateur.findOne({ email: email.toLowerCase() }).select('+motDePasse');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.'
      });
    }

    const isMatch = await user.comparerMotDePasse(motDePasse);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.'
      });
    }

    if (!user.estActif) {
      return res.status(403).json({
        success: false,
        message: 'Votre compte a été désactivé. Veuillez contacter un administrateur.'
      });
    }

    user.derniereConnexion = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Connexion réussie.',
      token,
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        statutValidationAdmin: user.statutValidationAdmin,
        niveauPole: user.niveauPole
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.user._id);

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      prenom: req.body.prenom,
      nom: req.body.nom,
      telephone: req.body.telephone,
      dateNaissance: req.body.dateNaissance,
      niveauPole: req.body.niveauPole,
      accepteContact: req.body.accepteContact,
      adresse: req.body.adresse
    };

    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const user = await Utilisateur.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès.',
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;

    if (!ancienMotDePasse || !nouveauMotDePasse) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir l\'ancien et le nouveau mot de passe.'
      });
    }


    const user = await Utilisateur.findById(req.user._id).select('+motDePasse');


    const isMatch = await user.comparerMotDePasse(ancienMotDePasse);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Ancien mot de passe incorrect.'
      });
    }

    user.motDePasse = nouveauMotDePasse;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Mot de passe modifié avec succès.',
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Déconnexion réussie. Veuillez supprimer le token côté client.'
  });
};
