import jwt from "jsonwebtoken";
import { Utilisateur } from "../models/index.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Non autorisé. Token manquant.",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Utilisateur.findById(decoded.id).select("-motDePasse");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non trouvé.",
        });
      }

      if (!user.estActif) {
        return res.status(401).json({
          success: false,
          message: "Compte désactivé",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token invalide ou expiré.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la vérification du token.",
    });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Accès refusé. Rôle administrateur requis.",
    });
  }
};

export const approvedOnly = (req, res, next) => {
  if (req.user && req.user.statutValidationAdmin === "approved") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message:
        "Votre compte est en attente de validation par un administrateur.",
    });
  }
};
