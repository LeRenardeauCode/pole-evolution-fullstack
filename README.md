# Pole Evolution

Application web full stack pour un studio de pole dance : vitrine, planning, réservations, espace membre et back-office d'administration.

## État du projet

- Frontend React + Vite
- Backend Node.js + Express
- Base MongoDB via Mongoose
- Authentification JWT + hash bcrypt
- Uploads Cloudinary
- Emails transactionnels
- Monitoring léger optionnel via Sentry
- CAPTCHA contact optionnel via Google reCAPTCHA
- Ajustements visuels en cours (hover plus sobres, animations d'accueil réduites)
- Paiement en ligne prévu mais non intégré à ce stade

## Stack principale

### Frontend
- React
- Vite
- Material UI
- React Router
- Axios

### Backend
- Express
- Mongoose
- jsonwebtoken
- bcryptjs
- Nodemailer
- Cloudinary

## Démarrage local

### Prérequis
- Node.js 20 recommandé
- npm 9+
- MongoDB local ou Atlas
- Docker optionnel

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Docker

```bash
docker compose up --build
```

Services exposés :
- Frontend : http://localhost:4173
- Backend : http://localhost:5000
- Healthcheck : http://localhost:5000/health

## Variables d’environnement importantes

### Backend
- MONGO_URI
- JWT_SECRET
- FRONTEND_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- EMAIL_USER
- EMAIL_PASSWORD
- SENTRY_DSN
- SENTRY_TRACES_SAMPLE_RATE
- RECAPTCHA_SECRET_KEY

### Frontend
- VITE_API_URL
- VITE_SENTRY_DSN
- VITE_SENTRY_TRACES_SAMPLE_RATE
- VITE_RECAPTCHA_SITE_KEY

## Scripts utiles

### Frontend

```bash
cd frontend
npm run lint
npm test -- --run
npm run build
```

### Backend

```bash
cd backend
npm test -- --run
```

## Documentation projet

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)
- [docs/MAINTENANCE.md](docs/MAINTENANCE.md)
- [docs/DELIVERY_CHECKLIST.md](docs/DELIVERY_CHECKLIST.md)

## Feuille de route proche

- Intégration du paiement en ligne
- Activation monitoring en production
- Finalisation domaine + hébergement payant
- Renforcement des tests et de l'observabilité
