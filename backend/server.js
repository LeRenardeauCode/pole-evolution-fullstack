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
startForfaitExpiryNotifier();

const app = express();

const normalizeOrigin = (origin) => origin?.trim().replace(/\/$/, '');

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

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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