import MessageContact from '../models/MessageContact.js';
import Notification from '../models/Notification.js';
import asyncHandler from 'express-async-handler';
import { sendContactNotificationToAdmin, sendContactConfirmationToUser } from '../utils/emailService.js';

export const envoyerMessage = asyncHandler(async (req, res) => {
  const { nom, prenom, email, telephone, sujet, message } = req.body;

  const ipAddress = req.ip || req.connection.remoteAddress;

  const peutEnvoyer = await MessageContact.verifierLimiteIP(ipAddress);
  
  if (!peutEnvoyer) {
    res.status(429);
    throw new Error('Limite de 3 messages par jour atteinte. Réessayez demain.');
  }

  const messageContact = await MessageContact.create({
    nom,
    prenom,
    email,
    telephone,
    sujet,
    message,
    ipAddress,
    userAgent: req.get('user-agent')
  });

  // Créer notification dans le système
  await Notification.creer({
    type: 'nouveau_message',
    titre: `Nouveau message: ${sujet}`,
    message: `${prenom || ''} ${nom} a envoyé un message`,
    priorite: 'haute',
    messageContactId: messageContact._id,
    lienAction: `/admin/messages/${messageContact._id}`
  });

  // Envoyer emails (non bloquant - fire-and-forget)
  sendContactNotificationToAdmin({
    nom,
    prenom,
    email,
    telephone,
    sujet,
    message
  }).catch(emailError => {
    console.error('Erreur envoi email admin:', emailError.message);
  });

  sendContactConfirmationToUser({
    email,
    prenom,
    nom
  }).catch(emailError => {
    console.error('Erreur envoi email confirmation:', emailError.message);
  });

  res.status(201).json({
    success: true,
    message: 'Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    data: {
      id: messageContact._id,
      dateEnvoi: messageContact.dateEnvoi
    }
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { estTraitee, estSpam, sujet, page = 1, limit = 20 } = req.query;

  const query = {};
  if (estTraitee !== undefined) query.estTraitee = estTraitee === 'true';
  if (estSpam !== undefined) query.estSpam = estSpam === 'true';
  if (sujet) query.sujet = sujet;

  const messages = await MessageContact.find(query)
    .sort({ dateEnvoi: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await MessageContact.countDocuments(query);

  res.status(200).json({
    success: true,
    count,
    page: Number(page),
    pages: Math.ceil(count / limit),
    data: messages
  });
});

export const getMessage = asyncHandler(async (req, res) => {
  const message = await MessageContact.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message introuvable');
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

export const marquerTraite = asyncHandler(async (req, res) => {
  const message = await MessageContact.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message introuvable');
  }

  const { reponse } = req.body;

  await message.marquerCommeTraite(reponse);

  res.status(200).json({
    success: true,
    message: 'Message marqué comme traité',
    data: message
  });
});

export const marquerSpam = asyncHandler(async (req, res) => {
  const message = await MessageContact.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message introuvable');
  }

  await message.marquerCommeSpam();

  res.status(200).json({
    success: true,
    message: 'Message marqué comme spam',
    data: message
  });
});

export const getStatsMessages = asyncHandler(async (req, res) => {
  const stats = await MessageContact.getStatistiques();

  res.status(200).json({
    success: true,
    data: stats
  });
});
