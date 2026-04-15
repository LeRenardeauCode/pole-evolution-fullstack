import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// En production (Render), on utilise exclusivement les variables d'environnement de la plateforme.
// En local, on autorise .env.local puis .env pour faciliter le développement.
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });
  dotenv.config({ path: path.join(__dirname, '.env') });
}



import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';
import { initMonitoring, isMonitoringEnabled } from './config/monitoring.js';
import { startForfaitExpiryNotifier } from './services/forfaitExpiryNotifier.service.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import fs from 'fs';


import authRoutes from './routes/auth.routes.js';
import utilisateurRoutes from './routes/utilisateur.routes.js';
import coursRoutes from './routes/cours.routes.js';
import reservationRoutes from './routes/reservations.routes.js';
import forfaitRoutes from './routes/forfait.routes.js';
import avisRoutes from './routes/avis.routes.js';
import mediaRoutes from './routes/media.routes.js';
import contactRoutes from './routes/contact.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import parametreRoutes from './routes/parametre.routes.js';


connectDB();
initMonitoring();

const expiryNotifierEnabled =
  String(process.env.FORFAIT_EXPIRY_NOTIFIER_ENABLED || "false").toLowerCase() === "true";

if (expiryNotifierEnabled) {
  startForfaitExpiryNotifier();
  console.log("⏰ Forfait expiry notifier actif");
} else {
  console.log("⏸️ Forfait expiry notifier inactif (FORFAIT_EXPIRY_NOTIFIER_ENABLED=false)");
}

const app = express();

const normalizeOrigin = (origin) => {
  if (!origin) {
    return origin;
  }

  try {
    const parsed = new URL(origin);
    const protocol = parsed.protocol.toLowerCase();
    const hostname = parsed.hostname.toLowerCase();
    const isDefaultPort =
      (protocol === 'https:' && parsed.port === '443') ||
      (protocol === 'http:' && parsed.port === '80');
    const port = parsed.port && !isDefaultPort ? `:${parsed.port}` : '';

    return `${protocol}//${hostname}${port}`;
  } catch {
    return origin.trim().replace(/\/$/, '').toLowerCase();
  }
};

const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.CORS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]
  .map(normalizeOrigin)
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);
    const isVercelApp = /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(normalizedOrigin);

    if (allowedOrigins.includes(normalizedOrigin) || isVercelApp) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'baggage', 'sentry-trace'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Pole Evolution - Serveur actif',
    version: '1.0.0',
    uploadsPath: path.join(__dirname, 'uploads')
  });
});

// Health check endpoint pour Render monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    monitoring: isMonitoringEnabled() ? 'enabled' : 'disabled'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/forfaits', forfaitRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/parametres', parametreRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});