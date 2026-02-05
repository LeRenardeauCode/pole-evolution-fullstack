import express from 'express';
import {
  getCoursFuturs,
  getAllCours,
  getCours,
  getPlanningSemaine,
  getCoursJour,
  createCours,
  updateCours,
  deleteCours,
  annulerCours,
  genererCoursRecurrents,
  getStatsCours,
} from '../controllers/cours.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getCoursFuturs);
router.get('/semaine/:date?', getPlanningSemaine);
router.get('/jour/:date', getCoursJour);
router.get('/:id', getCours);

router.get('/admin/all', protect, admin, getAllCours);
router.get('/admin/stats', protect, admin, getStatsCours);
router.post('/', protect, admin, createCours);
router.put('/:id', protect, admin, updateCours);
router.delete('/:id', protect, admin, deleteCours);
router.put('/:id/annuler', protect, admin, annulerCours);
router.post('/generer-recurrents', protect, admin, genererCoursRecurrents);

export default router;
