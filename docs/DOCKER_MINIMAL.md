# Docker minimal (Pole Evolution)

Objectif: lancer frontend + backend + MongoDB avec Docker Compose, sans complexite.

## Prerequis
- Docker Desktop installe et actif

## Demarrage
A la racine du projet:

```bash
docker compose up --build
```

## Acces
- Backend: http://localhost:5000
- Frontend (Vite preview): http://localhost:4173
- MongoDB: mongodb://localhost:27017/poleevolution

## Compass
Utilise la meme URL que ci-dessus pour te connecter.

## Notes
- Le backend lit ses variables via backend/.env
- En Docker, MONGO_URI est force vers mongodb://mongo:27017/poleevolution
- Le frontend utilise VITE_API_URL au build (par defaut http://localhost:5000/api)
- Pour arreter: Ctrl+C puis `docker compose down`
- Les donnees MongoDB sont persistees dans le volume `mongo-data`
