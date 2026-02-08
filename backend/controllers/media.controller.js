import Media from "../models/Media.js";
import asyncHandler from "express-async-handler";
import { deleteFile } from "../utils/file.utils.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

const uploadToCloudinary = (buffer, folder = "pole-evolution/galerie") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        transformation: [
          { width: 1920, height: 1080, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    const readableStream = Readable.from(buffer);
    readableStream.pipe(uploadStream);
  });
};

export const getGaleriePublique = asyncHandler(async (req, res) => {
  const { categorie, limit = 50 } = req.query;

  const medias = await Media.getGaleriePublique(categorie, Number(limit));

  res.status(200).json({
    success: true,
    count: medias.length,
    data: medias,
  });
});

export const getMediasALaUne = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const medias = await Media.getMediasALaUne(Number(limit));

  res.status(200).json({
    success: true,
    count: medias.length,
    data: medias,
  });
});

export const getMediasByCours = asyncHandler(async (req, res) => {
  const medias = await Media.getMediasCours(req.params.coursId);

  res.status(200).json({
    success: true,
    count: medias.length,
    data: medias,
  });
});

export const getMedias = asyncHandler(async (req, res) => {
  const {
    categorie,
    type,
    estPublic,
    estModere,
    page = 1,
    limit = 20,
  } = req.query;

  const query = {};
  if (categorie) query.categorie = categorie;
  if (type) query.type = type;
  if (estPublic !== undefined) query.estPublic = estPublic === "true";
  if (estModere !== undefined) query.estModere = estModere === "true";

  const medias = await Media.find(query)
    .sort({ ordreAffichage: 1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("uploadePar", "prenom nom email")
    .populate("cours", "nom dateDebut")
    .populate("avis", "note titre");

  const count = await Media.countDocuments(query);

  res.status(200).json({
    success: true,
    count,
    page: Number(page),
    pages: Math.ceil(count / limit),
    data: medias,
  });
});

export const getMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)
    .populate("uploadePar", "prenom nom email")
    .populate("cours", "nom dateDebut")
    .populate("avis", "note titre");

  if (!media) {
    res.status(404);
    throw new Error("Média introuvable");
  }

  media.nombreVues += 1;
  await media.save();

  res.status(200).json({
    success: true,
    data: media,
  });
});

export const createMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Aucun fichier fourni");
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const {
    titre,
    description,
    type,
    categorie,
    tags,
    estPublic,
    estALaUne,
    altText,
    creditPhoto,
    cours,
    avis,
  } = req.body;

  const mediaData = {
    titre: titre || "Sans titre",
    description: description || "",
    type: result.resource_type === "video" ? "video" : "image",
    url: result.secure_url,
    cloudinaryId: result.public_id,
    nomFichier: req.file.originalname,
    tailleFichier: result.bytes,
    formatFichier: result.format.toUpperCase(),
    categorie: categorie || "galerie",
    tags: tags
      ? Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim())
      : [],
    estPublic: estPublic === "true" || estPublic === true,
    estALaUne: estALaUne === "true" || estALaUne === true,
    altText,
    creditPhoto,
    uploadePar: req.user._id,
    cours: cours || null,
    avis: avis || null,
  };

  if (result.resource_type === "image") {
    mediaData.largeur = result.width;
    mediaData.hauteur = result.height;
  }

  if (result.resource_type === "video" && result.duration) {
    mediaData.duree = Math.round(result.duration);
  }

  const media = await Media.create(mediaData);

  res.status(201).json({
    success: true,
    message: "Média créé avec succès",
    data: media,
  });
});

export const updateMedia = asyncHandler(async (req, res) => {
  let media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error("Média introuvable");
  }

  if (req.file) {
    if (media.cloudinaryId) {
      await cloudinary.uploader.destroy(media.cloudinaryId, {
        resource_type: media.type === "video" ? "video" : "image",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    req.body.url = result.secure_url;
    req.body.cloudinaryId = result.public_id;
    req.body.nomFichier = req.file.originalname;
    req.body.tailleFichier = result.bytes;
    req.body.formatFichier = result.format.toUpperCase();

    if (result.resource_type === "image") {
      req.body.largeur = result.width;
      req.body.hauteur = result.height;
    }
    if (result.resource_type === "video" && result.duration) {
      req.body.duree = Math.round(result.duration);
    }
  }

  if (req.body.tags) {
    if (typeof req.body.tags === "string") {
      req.body.tags = req.body.tags.split(",").map((t) => t.trim());
    }
  }

  if (req.body.estPublic !== undefined) {
    req.body.estPublic =
      req.body.estPublic === "true" || req.body.estPublic === true;
  }
  if (req.body.estALaUne !== undefined) {
    req.body.estALaUne =
      req.body.estALaUne === "true" || req.body.estALaUne === true;
  }

  media = await Media.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("uploadePar", "prenom nom email");

  res.status(200).json({
    success: true,
    message: "Média modifié avec succès",
    data: media,
  });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error("Média introuvable");
  }

  if (media.cloudinaryId) {
    await cloudinary.uploader.destroy(media.cloudinaryId, {
      resource_type: media.type === "video" ? "video" : "image",
    });
  }

  await media.deleteOne();

  res.status(200).json({
    success: true,
    message: "Média supprimé avec succès",
  });
});

export const mettreALaUne = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error("Média introuvable");
  }

  await media.mettreALaUne();

  res.status(200).json({
    success: true,
    message: "Média mis à la une",
    data: media,
  });
});

export const retirerDeLaUne = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error("Média introuvable");
  }

  await media.retirerDeLaUne();

  res.status(200).json({
    success: true,
    message: "Média retiré de la une",
    data: media,
  });
});

export const validerMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error("Média introuvable");
  }

  await media.valider();

  res.status(200).json({
    success: true,
    message: "Média validé",
    data: media,
  });
});

export const reordonnerMedias = asyncHandler(async (req, res) => {
  const { listeIds } = req.body;

  if (!Array.isArray(listeIds) || listeIds.length === 0) {
    res.status(400);
    throw new Error("Liste d'IDs invalide");
  }

  await Media.reordonner(listeIds);

  res.status(200).json({
    success: true,
    message: "Médias réordonnés avec succès",
  });
});

export const getStatsMedias = asyncHandler(async (req, res) => {
  const stats = await Media.getStatistiques();

  res.status(200).json({
    success: true,
    data: stats,
  });
});
