import express from 'express';
import { 
  envoyerMessage, 
  getMessages, 
  getMessage,
  marquerTraite,
  marquerSpam,
  getStatsMessages
} from '../controllers/contact.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimit.middleware.js';

const router = express.Router();

router.post('/', contactRateLimiter, envoyerMessage);

router.get('/', protect, admin, getMessages);
router.get('/admin/stats', protect, admin, getStatsMessages);
router.get('/:id', protect, admin, getMessage);
router.put('/:id/traiter', protect, admin, marquerTraite);
router.put('/:id/spam', protect, admin, marquerSpam);

export default router;
