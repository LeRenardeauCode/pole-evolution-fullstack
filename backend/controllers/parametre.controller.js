import Parametre from '../models/Parametre.js';
import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';

export const getParametres = asyncHandler(async (req, res) => {
  const parametres = await Parametre.find().sort({ categorie: 1, cle: 1 });

  return res.status(200).json({
    success: true,
    count: parametres.length,
    data: parametres
  });
});

export const getParametresByCategorie = asyncHandler(async (req, res) => {
  const parametres = await Parametre.getParCategorie(req.params.categorie);

  return res.status(200).json({
    success: true,
    count: parametres.length,
    data: parametres
  });
});

export const getParametre = asyncHandler(async (req, res) => {
  const parametre = await Parametre.getParCle(req.params.cle);

  if (!parametre) {
    return res.status(404).json({
      success: false,
      message: 'Paramètre introuvable'
    });
  }

  return res.status(200).json({
    success: true,
    data: parametre
  });
});

export const createParametre = asyncHandler(async (req, res) => {
  const { cle, valeur, type, categorie, description, estModifiable, unite, valeurMin, valeurMax } = req.body;

  const existe = await Parametre.findOne({ cle: cle.toLowerCase() });
  if (existe) {
    return res.status(400).json({
      success: false,
      message: 'Un paramètre avec cette clé existe déjà'
    });
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

  return res.status(201).json({
    success: true,
    message: 'Paramètre créé avec succès',
    data: parametre
  });
});

export const updateParametre = asyncHandler(async (req, res) => {
  const { valeur } = req.body;

  if (valeur === undefined) {
    return res.status(400).json({
      success: false,
      message: 'La valeur est requise'
    });
  }

  try {
    const parametre = await Parametre.updateValeur(req.params.cle, valeur);

    return res.status(200).json({
      success: true,
      message: 'Paramètre modifié avec succès',
      data: parametre
    });
  } catch (error) {
    const statusCode = error.message.includes('introuvable') ? 404 : 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
});

export const deleteParametre = asyncHandler(async (req, res) => {
  const parametre = await Parametre.getParCle(req.params.cle);

  if (!parametre) {
    return res.status(404).json({
      success: false,
      message: 'Paramètre introuvable'
    });
  }

  if (!parametre.estModifiable) {
    return res.status(403).json({
      success: false,
      message: 'Ce paramètre ne peut pas être supprimé'
    });
  }

  await parametre.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Paramètre supprimé avec succès'
  });
});

export const uploadDocumentPDF = asyncHandler(async (req, res) => {
  const { cle } = req.params;

  const clesAutorisees = [
    'documentreglementinterieur1',
    'documentreglementinterieur2',
    'documentplaquetteevjf'
  ];

  if (!clesAutorisees.includes(cle)) {
    res.status(400);
    throw new Error('Clé de document non autorisée');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Aucun fichier PDF fourni');
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'pole-evolution/documents',
        public_id: cle,
        overwrite: true,
        format: 'pdf',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(req.file.buffer);
  });

  let parametre = await Parametre.findOne({ cle });
  if (parametre) {
    parametre.valeur = result.secure_url;
    await parametre.save();
  } else {
    parametre = await Parametre.create({
      cle,
      valeur: result.secure_url,
      type: 'texte',
      categorie: 'documents',
      description: `URL du document ${cle}`,
      estModifiable: true,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Document uploadé avec succès',
    data: { url: result.secure_url, cle },
  });
});
