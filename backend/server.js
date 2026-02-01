import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';


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

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Pole Evolution - Serveur actif',
    version: '1.0.0'
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
  console.log(`Serveur démarré sur le port ${PORT}`);
});
