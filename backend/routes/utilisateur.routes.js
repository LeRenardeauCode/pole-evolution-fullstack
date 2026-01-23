import express from 'express';
import {
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  approveUtilisateur,
  rejectUtilisateur,
  ajouterForfait,
  modifierAbonnement,
  getStatsMensuelles,
  getStats
} from '../controllers/utilisateur.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect, admin);

router.get('/stats/monthly', getStatsMensuelles);
router.get('/stats', getStats);

router.get('/', getUtilisateurs);
router.get('/:id', getUtilisateur);
router.put('/:id', updateUtilisateur);
router.delete('/:id', deleteUtilisateur);

router.put('/:id/approve', approveUtilisateur);
router.put('/:id/reject', rejectUtilisateur);
router.post('/:id/forfaits', ajouterForfait);
router.put('/:id/abonnement', modifierAbonnement);

export default router;
