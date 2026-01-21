backend/
├── config/
│   └── database.js           # ← Connexion MongoDB
├── models/
│   ├── Utilisateur.js        # ← Schéma Mongoose
│   ├── Cours.js
│   ├── Reservation.js
│   └── ... (7 autres)
├── controllers/
│   ├── authController.js     # ← Logique métier
│   ├── coursController.js
│   └── reservationController.js
├── routes/
│   ├── auth.routes.js        # ← Endpoints API
│   ├── cours.routes.js
│   └── reservations.routes.js
├── middleware/
│   ├── auth.js               # ← Vérif JWT
│   └── errorHandler.js
├── seeds/
│   └── parametres.seed.js    # ← Données initiales
├── server.js                 # ← Point d'entrée
└── package.json

