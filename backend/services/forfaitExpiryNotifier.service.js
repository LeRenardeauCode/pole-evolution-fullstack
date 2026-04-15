import { Utilisateur } from "../models/index.js";
import { sendForfaitEndingToUser } from "../utils/emailService.js";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const notifyAndDeactivateExpiredForfaits = async (now) => {
  const users = await Utilisateur.find({
    "forfaitsActifs.estActif": true,
    "forfaitsActifs.dateExpiration": { $lte: now },
  }).populate("forfaitsActifs.forfaitId", "nom categorie");

  for (const user of users) {
    let hasUpdates = false;

    for (const forfaitActif of user.forfaitsActifs) {
      if (
        forfaitActif.estActif &&
        forfaitActif.dateExpiration &&
        forfaitActif.dateExpiration <= now
      ) {
        forfaitActif.estActif = false;

        if (!forfaitActif.emailFinEnvoye && user.email) {
          sendForfaitEndingToUser({
            utilisateurPrenom: user.prenom,
            utilisateurNom: user.nom,
            utilisateurEmail: user.email,
            forfaitNom: forfaitActif.forfaitId?.nom || "Forfait",
            forfaitCategorie: forfaitActif.forfaitId?.categorie || "forfait",
            dateFin: forfaitActif.dateExpiration,
          }).catch((e) =>
            console.error("Erreur email fin forfait:", e.message),
          );
          forfaitActif.emailFinEnvoye = true;
        }

        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      await user.save();
    }
  }
};

const notifyAndDeactivateExpiredAbonnements = async (now) => {
  const users = await Utilisateur.find({
    "abonnementActif.forfaitId": { $exists: true },
    "abonnementActif.dateFin": { $lte: now },
    "abonnementActif.statutPaiement": { $ne: "resilie" },
  }).populate("abonnementActif.forfaitId", "nom categorie");

  for (const user of users) {
    if (!user.abonnementActif?.forfaitId || !user.abonnementActif?.dateFin) {
      continue;
    }

    if (!user.abonnementActif.emailFinEnvoye && user.email) {
      sendForfaitEndingToUser({
        utilisateurPrenom: user.prenom,
        utilisateurNom: user.nom,
        utilisateurEmail: user.email,
        forfaitNom: user.abonnementActif.forfaitId?.nom || "Abonnement",
        forfaitCategorie: "abonnement",
        dateFin: user.abonnementActif.dateFin,
      }).catch((e) =>
        console.error("Erreur email fin abonnement:", e.message),
      );
    }

    user.abonnementActif.statutPaiement = "resilie";
    user.abonnementActif.emailFinEnvoye = true;
    await user.save();
  }
};

export const runForfaitExpiryNotifier = async () => {
  const now = new Date();

  await notifyAndDeactivateExpiredForfaits(now);
  await notifyAndDeactivateExpiredAbonnements(now);
};

export const startForfaitExpiryNotifier = () => {
  runForfaitExpiryNotifier().catch((error) => {
    console.error("Erreur initiale notifier forfait expiration:", error.message);
  });

  setInterval(() => {
    runForfaitExpiryNotifier().catch((error) => {
      console.error("Erreur notifier forfait expiration:", error.message);
    });
  }, SIX_HOURS_MS);
};
