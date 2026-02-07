import express from 'express';
import {
  getForfaits,
  getForfait,
  getForfaitsByCategorie,
  createForfait,
  updateForfait,
  deleteForfait,
  desactiverForfait,
  getStatsForfaits,
  getAbonnements
} from '../controllers/forfait.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/abonnements', getAbonnements);
router.get('/categorie/:categorie', getForfaitsByCategorie);

router.get('/admin/stats', protect, admin, getStatsForfaits);
router.post('/', protect, admin, createForfait);
router.put('/:id/desactiver', protect, admin, desactiverForfait);
router.put('/:id', protect, admin, updateForfait);
router.delete('/:id', protect, admin, deleteForfait);

router.get('/', getForfaits);
router.get('/:id', getForfait);

export default router;
