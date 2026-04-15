import rateLimit from 'express-rate-limit';

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.connection?.remoteAddress || 'unknown';
};

export const contactRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3, 
  keyGenerator: (req) => {
    const ip = getClientIp(req);
    const email = String(req.body?.email || '').trim().toLowerCase();

    if (email) {
      return `${ip}:${email}`;
    }

    return ip;
  },
  message: {
    success: false,
    message: 'Trop de messages envoyés depuis cette IP. Réessayez dans 24h.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false
});
