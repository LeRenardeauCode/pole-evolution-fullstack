import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3, 
  message: {
    success: false,
    message: 'Trop de messages envoyés depuis cette IP. Réessayez dans 24h.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false
});
