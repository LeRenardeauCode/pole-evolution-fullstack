import express from 'express';
import { 
  getNotifications,
  countNonLues,
  marquerCommeLue,
  marquerToutesLues,
  archiverNotification,
  supprimerArchivees,
  creerDemandeForfait,
} from '../controllers/notification.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/demande-forfait', protect, creerDemandeForfait);

router.get('/', protect, admin, getNotifications);
router.get('/count', protect, admin, countNonLues);

router.put('/lire-tout', protect, admin, marquerToutesLues);
router.put('/:id/lire', protect, admin, marquerCommeLue);
router.put('/:id/archiver', protect, admin, archiverNotification);

router.delete('/archives', protect, admin, supprimerArchivees);

export default router;
