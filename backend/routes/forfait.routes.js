import express from 'express';
import {
  getForfaits,
  getForfait,
  getForfaitsByCategorie,
  createForfait,
  updateForfait,
  deleteForfait,
  desactiverForfait,
  getStatsForfaits
} from '../controllers/forfait.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getForfaits);
router.get('/categorie/:categorie', getForfaitsByCategorie);
router.get('/:id', getForfait);

router.get('/admin/stats', protect, admin, getStatsForfaits);
router.post('/', protect, admin, createForfait);
router.put('/:id', protect, admin, updateForfait);
router.put('/:id/desactiver', protect, admin, desactiverForfait);
router.delete('/:id', protect, admin, deleteForfait);

export default router;
