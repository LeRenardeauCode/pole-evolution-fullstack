import jwt from "jsonwebtoken";
import { Utilisateur } from "../models/index.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/emailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      accepteContact,
    } = req.body;

    if (!prenom || !nom || !email || !motDePasse) {
      return res.status(400).json({
        success: false,
        message:
          "Veuillez fournir tous les champs obligatoires (prénom, nom, email, mot de passe).",
      });
    }

    const existingUser = await Utilisateur.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Cet email est déjà utilisé.",
      });
    }

    const user = await Utilisateur.create({
      prenom,
      nom,
      email: email.toLowerCase(),
      motDePasse,
      telephone,
      dateNaissance,
      niveauPole: niveauPole || "jamais",
      accepteContact: accepteContact || false,
      accepteCGU: true,
      accepteReglement: true,
      statutValidationAdmin: "pending",
      role: "client",
      estActif: true,
      emailVerifie: false,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.status(201).json({
      success: true,
      message:
        "Inscription réussie. Votre compte est en attente de validation par un administrateur.",
      token,
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        statutValidationAdmin: user.statutValidationAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir un email et un mot de passe.",
      });
    }

    const user = await Utilisateur.findOne({
      email: email.toLowerCase(),
    }).select("+motDePasse");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect.",
      });
    }

    const isMatch = await user.comparerMotDePasse(motDePasse);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect.",
      });
    }

    if (!user.estActif) {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte a été désactivé. Veuillez contacter un administrateur.",
      });
    }

    user.derniereConnexion = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      token,
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        statutValidationAdmin: user.statutValidationAdmin,
        niveauPole: user.niveauPole,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.user.id)
      .select('-motDePasse')
      .populate('forfaitsActifs.forfaitId', 'nom prix categorie')
      .populate('abonnementActif.forfaitId', 'nom prix categorie'); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        dateNaissance: user.dateNaissance,
        niveauPole: user.niveauPole,
        accepteContact: user.accepteContact,
        role: user.role,
        statutValidationAdmin: user.statutValidationAdmin,
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        
        forfaitsActifs: user.forfaitsActifs || [],
        abonnementActif: user.abonnementActif || null,
        nombreCoursReserves: user.nombreCoursReserves || 0,
        nombreCoursAssistes: user.nombreCoursAssistes || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
      adresse: req.body.adresse,
    };

    Object.keys(fieldsToUpdate).forEach((key) => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const user = await Utilisateur.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Aucun fichier fourni",
      });
    }

    const user = await Utilisateur.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    const photoUrl = `${req.protocol}://${req.get('host')}/uploads/profiles/${req.file.filename}`;

    if (user.photoUrl) {
      const oldPhotoPath = path.join(
        __dirname,
        "..",
        "uploads",
        "profiles",
        path.basename(user.photoUrl),
      );

      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    user.photoUrl = photoUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Photo de profil mise à jour avec succès",
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl,
        niveauPole: user.niveauPole,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;

    if (!ancienMotDePasse || !nouveauMotDePasse) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir l'ancien et le nouveau mot de passe.",
      });
    }

    const user = await Utilisateur.findById(req.user._id).select("+motDePasse");

    const isMatch = await user.comparerMotDePasse(ancienMotDePasse);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Ancien mot de passe incorrect.",
      });
    }

    user.motDePasse = nouveauMotDePasse;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.status(200).json({
      success: true,
      message: "Mot de passe modifié avec succès.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Déconnexion réussie. Veuillez supprimer le token côté client.",
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir une adresse email.",
      });
    }

    const user = await Utilisateur.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Aucun utilisateur trouvé avec cet email. Veuillez vérifier votre adresse.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.tokenResetPassword = hashedToken;
    user.tokenResetPasswordExpire = new Date(Date.now() + 30 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

    try {
      await sendResetPasswordEmail({
        email: user.email,
        prenom: user.prenom,
        resetUrl,
      });

      res.status(200).json({
        success: true,
        message:
          "Un email de réinitialisation a été envoyé à votre adresse. Veuillez vérifier votre boîte mail.",
      });
    } catch (emailError) {
      user.tokenResetPassword = undefined;
      user.tokenResetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message:
          "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, email, newPassword, confirmPassword } = req.body;

    if (!token || !email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir tous les champs requis.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Les mots de passe ne correspondent pas.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Le mot de passe doit contenir au moins 8 caractères.",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await Utilisateur.findOne({
      email: email.toLowerCase(),
      tokenResetPassword: hashedToken,
      tokenResetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Le lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien.",
      });
    }

    user.motDePasse = newPassword;
    user.tokenResetPassword = undefined;
    user.tokenResetPasswordExpire = undefined;
    await user.save();

    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.status(200).json({
      success: true,
      message: "Mot de passe réinitialisé avec succès.",
      token: newToken,
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
