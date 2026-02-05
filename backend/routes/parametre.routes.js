import express from 'express';
import { 
  getParametres,
  getParametre,
  getParametresByCategorie,
  createParametre,
  updateParametre,
  deleteParametre
} from '../controllers/parametre.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getParametres);
router.get('/categorie/:categorie', getParametresByCategorie);
router.get('/cle/:cle', protect, admin, getParametre);

router.post('/', protect, admin, createParametre);
router.put('/:cle', protect, admin, updateParametre);
router.delete('/:cle', protect, admin, deleteParametre);

export default router;
