# Pole Evolution - Backend API

API REST complète pour la gestion d'une école de pole dance (cours, réservations, forfaits, paiements).

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure](#-structure)
- [API Endpoints](#-api-endpoints)
- [Tests](#-tests)

## ✨ Fonctionnalités

- Authentification JWT (access + refresh tokens)
- Gestion des utilisateurs (admin/client)
- CRUD cours collectifs
- Système de réservations
- Forfaits et abonnements
- Avis et notations
- Upload et gestion de médias
- Formulaire de contact avec rate limiting
- Système de notifications
- Paramètres configurables
- Statistiques et analytics

## 🛠 Technologies

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Base de données:** MongoDB + Mongoose
- **Auth:** JWT (jsonwebtoken)
- **Upload:** Multer
- **Validation:** Express-validator
- **Sécurité:** Helmet, CORS, express-rate-limit

## Installation

Voir le guide détaillé : [INSTALLATION.md](./INSTALLATION.md)

**Installation rapide :**

# Cloner
```git clone <repo-url>```
```cd pole-evolution-backend```

# Installer
```npm install```

# Configurer
```cp .env.example .env```
# Éditer .env

# Lancer
```npm run dev```

## Configuration 

# Créer un fichier .env à la racine (voir .env.example)

Variables essentielles : 

- MONGO_URI : URL MongoDB

- JWT_SECRET : Clé secrète JWT

- PORT : Port du serveur (défaut: 5000)

## Structure

backend/
├── config/          # Configuration DB
├── controllers/     # Logique métier
├── models/          # Schémas Mongoose
├── routes/          # Routes Express
├── middleware/      # Middlewares (auth, errors, upload)
├── utils/           # Fonctions utilitaires
├── uploads/         # Fichiers uploadés
└── server.js        # Point d'entrée

## API Endpoints

# Auth

```POST /api/auth/register``` - Inscription

```POST /api/auth/login``` - Connexion

```POST /api/auth/refresh``` - Refresh token

```POST /api/auth/logout``` - Déconnexion

# Cours

```GET /api/cours``` - Liste des cours (public)

```GET /api/cours/:id``` - Détails cours

```POST /api/cours``` - Créer cours (admin)

```PUT /api/cours/:id``` - Modifier cours (admin)

```DELETE /api/cours/:id``` - Supprimer cours (admin)

# Réservations

```GET /api/reservations``` - Mes réservations (user)

```POST /api/reservations``` - Réserver un cours

```PUT /api/reservations/:id/annuler``` - Annuler réservation

# Media

```GET /api/media/galerie``` - Galerie publique

```POST /api/media``` - Upload média (admin)

Voir collection Postman pour la liste complète

## Tests

Collection Postman disponible dans Pole-Evolution.postman_collection.json

- Importer dans Postman :
    1. File > Import
    2. Sélectionner le fichier JSON
    3. Configurer l'environnement (baseUrl, tokens)

## Sécurité

- Authentification JWT

- Rate limiting (3 req/jour sur /contact)

- Validation des ObjectId MongoDB

- Sanitization des inputs

- CORS configuré

- Helmet activé

## Licence

MIT

## Auteur

LeRenardeauCode - GitHub