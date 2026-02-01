import fs from 'fs/promises';
import path from 'path';

export const deleteFile = async (filePath) => {
  try {
    if (filePath.includes('cloudinary.com')) {
      console.log('Fichier Cloudinary - suppression via SDK à implémenter');
      return;
    }

    const fullPath = path.join(process.cwd(), filePath);
    await fs.unlink(fullPath);
    console.log(`Fichier supprimé: ${fullPath}`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`❌ Erreur suppression fichier: ${error.message}`);
    }
  }
};
