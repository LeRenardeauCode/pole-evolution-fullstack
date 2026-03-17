import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
  logout,
  uploadPhoto,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadProfile } from '../middleware/upload.middleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

// Routes protégées
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/update-password', protect, updatePassword);
router.post('/logout', protect, logout);

router.post('/upload-photo', protect, uploadProfile.single('photo'), uploadPhoto);

export default router;
