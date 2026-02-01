import Parametre from '../models/Parametre.js';
import asyncHandler from 'express-async-handler';

export const getParametres = asyncHandler(async (req, res) => {
  const parametres = await Parametre.find().sort({ categorie: 1, cle: 1 });

  res.status(200).json({
    success: true,
    count: parametres.length,
    data: parametres
  });
});

export const getParametresByCategorie = asyncHandler(async (req, res) => {
  const parametres = await Parametre.getParCategorie(req.params.categorie);

  res.status(200).json({
    success: true,
    count: parametres.length,
    data: parametres
  });
});

export const getParametre = asyncHandler(async (req, res) => {
  const parametre = await Parametre.getParCle(req.params.cle);

  if (!parametre) {
    res.status(404);
    throw new Error('Paramètre introuvable');
  }

  res.status(200).json({
    success: true,
    data: parametre
  });
});

export const createParametre = asyncHandler(async (req, res) => {
  const { cle, valeur, type, categorie, description, estModifiable, unite, valeurMin, valeurMax } = req.body;

  const existe = await Parametre.findOne({ cle: cle.toLowerCase() });
  if (existe) {
    res.status(400);
    throw new Error('Un paramètre avec cette clé existe déjà');
  }

  const parametre = await Parametre.create({
    cle,
    valeur,
    type: type || 'texte',
    categorie: categorie || 'interface',
    description,
    estModifiable: estModifiable !== false,
    unite,
    valeurMin,
    valeurMax
  });

  res.status(201).json({
    success: true,
    message: 'Paramètre créé avec succès',
    data: parametre
  });
});

export const updateParametre = asyncHandler(async (req, res) => {
  const { valeur } = req.body;

  if (valeur === undefined) {
    res.status(400);
    throw new Error('La valeur est requise');
  }

  try {
    const parametre = await Parametre.updateValeur(req.params.cle, valeur);

    res.status(200).json({
      success: true,
      message: 'Paramètre modifié avec succès',
      data: parametre
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const deleteParametre = asyncHandler(async (req, res) => {
  const parametre = await Parametre.getParCle(req.params.cle);

  if (!parametre) {
    res.status(404);
    throw new Error('Paramètre introuvable');
  }

  if (!parametre.estModifiable) {
    res.status(403);
    throw new Error('Ce paramètre ne peut pas être supprimé');
  }

  await parametre.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Paramètre supprimé avec succès'
  });
});
