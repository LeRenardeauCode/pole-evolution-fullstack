import express from 'express';
import {
  getMesReservations,
  getReservation,
  createReservation,
  createReservationInvite,
  annulerReservation,
  validerPresence,
  marquerPaye,
  getReservationsCours,
  getAllReservations,
  getStatsReservations,
  validerReservation,
  refuserReservation,
} from '../controllers/reservation.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/invite', createReservationInvite);

router.use(protect);

router.get('/', getMesReservations);
router.get('/:id', getReservation);
router.post('/', createReservation);
router.put('/:id/annuler', annulerReservation);

router.get('/admin/all', admin, getAllReservations);
router.get('/admin/stats', admin, getStatsReservations);
router.get('/cours/:coursId', admin, getReservationsCours);
router.put('/:id/presence', admin, validerPresence);
router.put('/:id/paiement', admin, marquerPaye);
router.patch('/:id/valider', admin, validerReservation);
router.patch('/:id/refuser', admin, refuserReservation);

export default router;
