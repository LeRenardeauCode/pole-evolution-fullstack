import express from 'express';
import {
  getMedias,
  getMedia,
  getGaleriePublique,
  getMediasALaUne,
  getMediasByCours,
  createMedia,
  updateMedia,
  deleteMedia,
  mettreALaUne,
  retirerDeLaUne,
  validerMedia,
  getStatsMedias,
  reordonnerMedias
} from '../controllers/media.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/galerie', getGaleriePublique);
router.get('/une', getMediasALaUne);
router.get('/cours/:coursId', getMediasByCours);

router.get('/', protect, admin, getMedias);
router.get('/admin/stats', protect, admin, getStatsMedias);
router.get('/:id', protect, admin, getMedia);

router.post('/', protect, admin, upload.single('fichier'), createMedia);
router.put('/:id', protect, admin, upload.single('fichier'), updateMedia);
router.delete('/:id', protect, admin, deleteMedia);

router.put('/:id/une/ajouter', protect, admin, mettreALaUne);
router.put('/:id/une/retirer', protect, admin, retirerDeLaUne);
router.put('/:id/valider', protect, admin, validerMedia);
router.put('/reordonner', protect, admin, reordonnerMedias);

export default router;
