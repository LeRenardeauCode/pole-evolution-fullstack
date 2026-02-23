import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageMemory = multer.memoryStorage();

const fileFilterMedia = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté. Formats acceptés: JPEG, PNG, GIF, WEBP, MP4, MOV, AVI, MKV'));
  }
};

export const uploadMedia = multer({
  storage: storageMemory,
  fileFilter: fileFilterMedia,
  limits: {
    fileSize: 50 * 1024 * 1024,
  }
});

const profileUploadDir = path.join(__dirname, '..', 'uploads', 'profiles');
if (!fs.existsSync(profileUploadDir)) {
  fs.mkdirSync(profileUploadDir, { recursive: true });
}

const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profileUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`;

    console.log('📁 Nom fichier généré:', uniqueName);
    
    cb(null, uniqueName);
  },
});

const fileFilterProfile = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées pour la photo de profil (JPG, PNG, GIF, WEBP)'));
  }
};

export const uploadProfile = multer({
  storage: storageDisk,
  fileFilter: fileFilterProfile,
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

export default uploadMedia;
