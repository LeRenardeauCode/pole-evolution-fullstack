import Notification from '../models/Notification.js';
import asyncHandler from 'express-async-handler';

export const getNotifications = asyncHandler(async (req, res) => {
  const { estLue, priorite, type, limite = 20 } = req.query;

  const query = { estArchivee: false };
  if (estLue !== undefined) query.estLue = estLue === 'true';
  if (priorite) query.priorite = priorite;
  if (type) query.type = type;

  const notifications = await Notification.find(query)
    .sort({ priorite: -1, dateCreation: -1 })
    .limit(Number(limite))
    .populate('utilisateurId', 'prenom nom email')
    .populate('coursId', 'nom dateDebut')
    .populate('reservationId', 'statut');

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

export const countNonLues = asyncHandler(async (req, res) => {
  const compteurs = await Notification.compterNonLues();

  res.status(200).json({
    success: true,
    data: compteurs
  });
});

export const marquerCommeLue = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification introuvable');
  }

  await notification.marquerCommeLue();

  res.status(200).json({
    success: true,
    message: 'Notification marquée comme lue',
    data: notification
  });
});

export const marquerToutesLues = asyncHandler(async (req, res) => {
  const result = await Notification.marquerToutesCommeLues();

  res.status(200).json({
    success: true,
    message: `${result.modifiedCount} notification(s) marquée(s) comme lue(s)`
  });
});

export const archiverNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification introuvable');
  }

  await notification.archiver();

  res.status(200).json({
    success: true,
    message: 'Notification archivée',
    data: notification
  });
});

export const supprimerArchivees = asyncHandler(async (req, res) => {
  const { joursAvant = 90 } = req.query;

  const result = await Notification.supprimerArchivees(Number(joursAvant));

  res.status(200).json({
    success: true,
    message: `${result.deletedCount} notification(s) supprimée(s)`
  });
});
