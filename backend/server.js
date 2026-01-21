import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';


const app = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Serveur Pole Evolution actif',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes futures (Phase 4)
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/cours', require('./routes/cours.routes'));
// app.use('/api/reservations', require('./routes/reservations.routes'));

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('================================================================');
  console.log(`Serveur Express démarré sur le port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log('================================================================');
  console.log('');
});
