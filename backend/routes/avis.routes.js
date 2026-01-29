// Backend/routes/avis.routes.js
import express from 'express';
import {
  getAvisPublics,
  getAvisCours,
  getMesAvis,
  createAvis,
  updateAvis,
  deleteAvis,
  validerAvis,
  rejeterAvis,
  getAllAvis,
  getStatsAvis
} from '../controllers/avis.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAvisPublics);
router.get('/cours/:coursId', getAvisCours);

router.get('/mes-avis', protect, getMesAvis);
router.post('/', protect, createAvis);
router.put('/:id', protect, updateAvis);
router.delete('/:id', protect, deleteAvis);

router.get('/admin/all', protect, admin, getAllAvis);
router.get('/admin/stats', protect, admin, getStatsAvis);
router.put('/:id/valider', protect, admin, validerAvis);
router.put('/:id/rejeter', protect, admin, rejeterAvis);

export default router;
