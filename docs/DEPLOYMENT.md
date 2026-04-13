# Déploiement

## Objectif

Documenter un déploiement propre sans dépendre d'hypothèses liées à une offre gratuite spécifique.

## Pré-requis

- dépôt Git à jour
- variables d'environnement renseignées
- MongoDB Atlas opérationnel
- service backend disponible
- frontend buildable sans erreur

## Variables minimales

### Backend
- NODE_ENV=production
- PORT
- MONGO_URI
- JWT_SECRET
- FRONTEND_URL

### Frontend
- VITE_API_URL

## Variables optionnelles mais recommandées

- SENTRY_DSN
- VITE_SENTRY_DSN
- RECAPTCHA_SECRET_KEY
- VITE_RECAPTCHA_SITE_KEY
- configuration Cloudinary
- configuration email

## Vérifications avant mise en ligne

### Frontend
- `npm run lint`
- `npm test`
- `npm run build`

### Backend
- `npm test`
- vérification du endpoint `/health`
- vérification d'une connexion MongoDB réelle

## Déploiement type

### Backend
1. Déployer depuis `main`
2. Injecter les variables backend
3. Vérifier `/health`
4. Vérifier logs de démarrage

### Frontend
1. Déployer depuis `main`
2. Injecter `VITE_API_URL`
3. Vérifier navigation, login, contact et planning

## Docker local pour reprise développeur

Le `docker-compose.yml` sert de socle de développement local partagé :

- `mongo`
- `backend`
- `frontend`

Commande :

```bash
docker compose up --build
```

## Ce qui reste volontairement hors périmètre

- paiement Stripe non activé
- domaine non branché
- monitoring distant non activé tant que les DSN ne sont pas fournis
