import fs from 'fs/promises';
import path from 'path';
import cloudinary from '../config/cloudinary.js';

/**
 * Extrait le public_id Cloudinary à partir d'une URL.
 * Ex: https://res.cloudinary.com/xxx/image/upload/v123/pole-evolution/media/abc.jpg
 *     -> pole-evolution/media/abc
 */
const extractPublicId = (url) => {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    // Retire le version prefix (v123456/) et l'extension
    const afterUpload = parts[1].replace(/^v\d+\//, '');
    return afterUpload.replace(/\.[^.]+$/, '');
  } catch {
    return null;
  }
};

export const deleteFile = async (filePath) => {
  try {
    if (filePath.includes('cloudinary.com')) {
      const publicId = extractPublicId(filePath);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
      return;
    }

    const fullPath = path.join(process.cwd(), filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Erreur suppression fichier: ${error.message}`);
    }
  }
};
