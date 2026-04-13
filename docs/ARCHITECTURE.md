# Architecture

## Vue d'ensemble

Pole Evolution est organisé en trois couches principales :

- Frontend SPA React
- API Express
- Base MongoDB

## Frontend

Le frontend regroupe :

- les pages publiques : accueil, cours, planning, tarifs, galerie, contact
- l'espace membre
- le back-office administrateur
- les services d'appel API centralisés dans `src/services`
- l'authentification côté interface via contexte React et routes protégées

Points structurants :

- routage avec React Router
- chargement paresseux des pages lourdes
- thème Material UI partagé
- gestion d'erreurs et déconnexion via intercepteurs Axios

## Backend

Le backend suit une structure en couches claire :

- `routes/` : points d'entrée HTTP
- `controllers/` : logique métier
- `models/` : schémas Mongoose et méthodes métier
- `middleware/` : authentification, rate limiting, erreurs, uploads
- `utils/` : emails, fichiers, helpers transverses

## Données

Les modèles principaux couvrent :

- utilisateurs
- cours
- forfaits
- réservations
- avis
- médias
- notifications
- messages de contact
- paramètres

MongoDB est utilisé pour sa souplesse de modélisation et Mongoose pour :

- la validation de schémas
- les hooks métier
- les méthodes d'instance et statiques
- les relations via `populate`

## Sécurité actuelle

- mots de passe hashés avec bcryptjs
- authentification JWT
- protection des routes sensibles via middleware
- contrôle de rôle pour l'administration
- rate limiting sur points d'entrée exposés
- CAPTCHA conditionnel sur le formulaire de contact

## Observabilité légère

Le projet supporte une activation optionnelle de Sentry :

- backend : capture des erreurs serveur via `errorHandler`
- frontend : remontée des erreurs d'exécution via `ErrorBoundary`

Tant que les DSN ne sont pas fournis, le monitoring reste désactivé sans casser l'application.
