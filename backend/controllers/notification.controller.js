import { Notification } from "../models/index.js";
import asyncHandler from "express-async-handler";
import {
  sendForfaitRequestDecisionToUser,
  sendForfaitRequestNotificationToAdmin,
  sendForfaitRequestReceivedToUser,
  sendSafeModeDiagnosticEmail,
} from "../utils/emailService.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { estLue, priorite, type, limite = 20 } = req.query;

  const query = { estArchivee: false };
  if (estLue !== undefined) query.estLue = estLue === "true";
  if (priorite) query.priorite = priorite;
  if (type) query.type = type;

  const notifications = await Notification.find(query)
    .sort({ priorite: -1, dateCreation: -1 })
    .limit(Number(limite))
    .populate("utilisateurId", "prenom nom email")
    .populate("coursId", "nom dateDebut")
    .populate("reservationId", "statut");

  return res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications,
  });
});

export const creerDemandeForfait = async (req, res) => {
  try {
    const { forfaitId, forfaitNom, forfaitPrix, forfaitCategorie } = req.body; // ✅ RÉCUPÉRER

    if (!forfaitId || !forfaitNom || !forfaitPrix) {
      return res.status(400).json({
        success: false,
        message: "Données manquantes",
      });
    }

    const utilisateur = req.user;

    const notification = await Notification.creer({
      type: "demande_forfait",
      titre: `Demande de forfait : ${forfaitNom}`,
      message: `${utilisateur.prenom} ${utilisateur.nom} souhaite acheter "${forfaitNom}" (${forfaitPrix}€).`,
      priorite: "haute",
      metadata: {
        utilisateurId: utilisateur._id,
        utilisateurNom: `${utilisateur.prenom} ${utilisateur.nom}`,
        utilisateurEmail: utilisateur.email,
        utilisateurTelephone: utilisateur.telephone || null,
        forfaitId,
        forfaitNom,
        forfaitPrix,
        forfaitCategorie,
      },
    });

    sendForfaitRequestNotificationToAdmin({
      utilisateurNom: `${utilisateur.prenom} ${utilisateur.nom}`,
      utilisateurEmail: utilisateur.email,
      utilisateurTelephone: utilisateur.telephone || null,
      forfaitNom,
      forfaitPrix,
      forfaitCategorie,
    }).catch((e) => console.error("Erreur email demande forfait admin:", e.message));

    sendForfaitRequestReceivedToUser({
      utilisateurPrenom: utilisateur.prenom,
      utilisateurNom: utilisateur.nom,
      utilisateurEmail: utilisateur.email,
      forfaitNom,
      forfaitCategorie,
    }).catch((e) => console.error("Erreur email demande forfait client:", e.message));

    return res.status(201).json({
      success: true,
      message: "Demande envoyée",
      data: notification,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refuserDemandeForfait = asyncHandler(async (req, res) => {
  const { raison } = req.body;
  const notification = await Notification.findById(req.params.id);

  if (!notification || notification.type !== "demande_forfait") {
    return res.status(404).json({
      success: false,
      message: "Demande de forfait introuvable",
    });
  }

  const metadata = notification.metadata || {};
  const utilisateurNom = metadata.utilisateurNom || "Client";
  const [utilisateurPrenom = "", ...restNom] = utilisateurNom.split(" ");
  const utilisateurNomSansPrenom = restNom.join(" ");

  if (metadata.utilisateurEmail) {
    sendForfaitRequestDecisionToUser({
      utilisateurPrenom,
      utilisateurNom: utilisateurNomSansPrenom || utilisateurNom,
      utilisateurEmail: metadata.utilisateurEmail,
      forfaitNom: metadata.forfaitNom,
      forfaitCategorie: metadata.forfaitCategorie,
      statut: "refusee",
      raison: raison || "Demande refusée par l'administrateur",
    }).catch((e) => console.error("Erreur email refus demande forfait:", e.message));
  }

  await notification.marquerCommeLue();

  return res.status(200).json({
    success: true,
    message: "Demande refusée",
    data: notification,
  });
});

export const countNonLues = asyncHandler(async (req, res) => {
  const compteurs = await Notification.compterNonLues();

  return res.status(200).json({
    success: true,
    data: compteurs,
  });
});

export const marquerCommeLue = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404);
    throw new Error("Notification introuvable");
  }

  await notification.marquerCommeLue();

  return res.status(200).json({
    success: true,
    message: "Notification marquée comme lue",
    data: notification,
  });
});

export const marquerToutesLues = asyncHandler(async (req, res) => {
  const result = await Notification.marquerToutesCommeLues();

  return res.status(200).json({
    success: true,
    message: `${result.modifiedCount} notification(s) marquée(s) comme lue(s)`,
  });
});

export const archiverNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404);
    throw new Error("Notification introuvable");
  }

  await notification.archiver();

  return res.status(200).json({
    success: true,
    message: "Notification archivée",
    data: notification,
  });
});

export const supprimerArchivees = asyncHandler(async (req, res) => {
  const { joursAvant = 90 } = req.query;

  const result = await Notification.supprimerArchivees(Number(joursAvant));

  return res.status(200).json({
    success: true,
    message: `${result.deletedCount} notification(s) supprimée(s)`,
  });
});

export const testerEmailSafeMode = asyncHandler(async (req, res) => {
  const requestedByEmail = req.user?.email || "";
  const requestedByName = req.user?.prenom || req.user?.nom || "Admin";

  const result = await sendSafeModeDiagnosticEmail({
    requestedByEmail,
    requestedByName,
  });

  return res.status(200).json({
    success: true,
    message: "Email de test envoyé",
    data: result,
  });
});
