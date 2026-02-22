# 🚀 GUIDE DE DÉPLOIEMENT - POLE EVOLUTION

## 📋 Vue d'ensemble

Ce projet Full-Stack MERN sera déployé sur 3 services différents :

| Service | Rôle | Hébergeur | Coût |
|---------|------|-----------|------|
| **Frontend** (React + Vite) | Interface utilisateur | Vercel | GRATUIT |
| **Backend** (Node.js + Express) | API + Logique métier | Railway | $5/mois ($5 crédit gratuit) |
| **Base de données** (MongoDB) | Stockage données | MongoDB Atlas | GRATUIT (512 MB) |

**Coût total** : **~0-5€/mois** (+ nom de domaine optionnel 10-15€/an)

---

## 1️⃣ PRÉREQUIS

Avant de commencer, créez ces comptes (GRATUITS) :

- ✅ [Vercel](https://vercel.com/signup) - Connexion via GitHub
- ✅ [Railway](https://railway.app/) - Connexion via GitHub
- ✅ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) - Email requis

---

## 2️⃣ DÉPLOIEMENT BASE DE DONNÉES (MongoDB Atlas)

### Étape 1 : Créer un cluster MongoDB

1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com)
2. Cliquez sur **"Create"** → **"Shared"** (gratuit)
3. Sélectionnez :
   - Cloud Provider : **AWS**
   - Region : **eu-west-3 (Paris)** (le plus proche)
   - Cluster Tier : **M0 Sandbox** (GRATUIT)
4. Cluster Name : `pole-evolution-prod`
5. Cliquez sur **"Create Cluster"** (2-3 min de création)

### Étape 2 : Configurer l'accès

**A. Créer un utilisateur BDD :**
1. Security → Database Access → **Add New Database User**
2. Username : `poleevolution-app`
3. Password : Générer un mot de passe fort (NOTEZ-LE !)
4. Database User Privileges : **Read and write to any database**
5. Cliquez sur **"Add User"**

**B. Autoriser les connexions :**
1. Security → Network Access → **Add IP Address**
2. Sélectionnez **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Cliquez sur **"Confirm"**

### Étape 3 : Obtenir l'URL de connexion

1. Cliquez sur **"Connect"** sur votre cluster
2. Choisissez **"Connect your application"**
3. Driver : **Node.js** / Version : **5.5 or later**
4. Copiez l'URL de connexion :
```
mongodb+srv://poleevolution-app:<password>@pole-evolution-prod.xxxxx.mongodb.net/
```

5. Remplacez `<password>` par le vrai mot de passe
6. Ajoutez le nom de la BDD à la fin :
```
mongodb+srv://poleevolution-app:VOTRE_MDP@pole-evolution-prod.xxxxx.mongodb.net/poleevolution?retryWrites=true&w=majority
```

**⚠️ CONSERVEZ cette URL en sécurité pour l'étape suivante !**

---

## 3️⃣ DÉPLOIEMENT BACKEND (Railway) 

### Étape 1 : Connecter le repository GitHub

1. Allez sur [Railway](https://railway.app)
2. Cliquez sur **"New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Autorisez Railway à accéder à votre repo `pole-evolution-fullstack`
5. Sélectionnez le repo dans la liste

### Étape 2 : Configurer le service Backend

1. Cliquez sur **"Add variables"**
2. Ajoutez ces variables d'environnement :

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://poleevolution-app:VOTRE_MDP@pole-evolution-prod.xxxxx.mongodb.net/poleevolution?retryWrites=true&w=majority
JWT_SECRET=VOTRE_SECRET_JWT_ULTRA_SECURISE_64_CARACTERES_MIN
FRONTEND_URL=https://poleevolution.vercel.app
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
EMAIL_USER=contact@poleevolution.fr
EMAIL_PASS=votre_mot_de_passe_app
```

**Générer un JWT_SECRET sécurisé :**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Étape 3 : Configurer le build

1. Settings → **Build Command** :
```bash
cd backend && npm install
```

2. Settings → **Start Command** :
```bash
cd backend && node server.js
```

3. Settings → **Root Directory** : `/`

### Étape 4 : Obtenir l'URL publique

1. Une fois déployé, cliquez sur **"Settings"** → **"Generate Domain"**
2. Vous aurez une URL type : `https://pole-evolution-backend.up.railway.app`
3. **NOTEZ cette URL** pour l'étape suivante !

---

## 4️⃣ DÉPLOIEMENT FRONTEND (Vercel)

### Étape 1 : Importer le projet

1. Allez sur [Vercel](https://vercel.com/new)
2. Cliquez sur **"Import Git Repository"**
3. Sélectionnez `pole-evolution-fullstack`
4. Cliquez sur **"Import"**

### Étape 2 : Configurer le build

**Framework Preset** : Vite  
**Root Directory** : `frontend`  
**Build Command** : `npm run build`  
**Output Directory** : `dist`  

### Étape 3 : Variables d'environnement

Ajoutez cette variable :

```env
VITE_API_URL=https://pole-evolution-backend.up.railway.app/api
```

(Remplacez par l'URL Railway de l'étape 3)

### Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Vous aurez une URL type : `https://pole-evolution.vercel.app`

---

## 5️⃣ FINALISER LA CONFIGURATION

### A. Mettre à jour le CORS Backend

Retournez sur Railway → Variables → Modifiez `FRONTEND_URL` :
```env
FRONTEND_URL=https://pole-evolution.vercel.app
```

Railway redéploiera automatiquement.

### B. Tester la connexion

1. Ouvrez : `https://pole-evolution.vercel.app`
2. Essayez de vous connecter avec un compte existant
3. Vérifiez que les réservations fonctionnent

---

## 6️⃣ DOMAINE PERSONNALISÉ (Optionnel)

### Acheter un nom de domaine

Fournisseurs recommandés :
- **OVH** : 5-10€/an (.fr)
- **Namecheap** : 10-15€/an (.com)
- **Gandi** : 15-20€/an (.fr)

### Configurer DNS

**Pour Vercel (Frontend) :**
1. Vercel Dashboard → Settings → Domains
2. Ajoutez `poleevolution.fr` et `www.poleevolution.fr`
3. Vercel vous donnera des records DNS à ajouter chez votre registrar

**Pour Railway (Backend) :**
1. Railway Settings → Custom Domain
2. Ajoutez `api.poleevolution.fr`
3. Ajoutez un CNAME chez votre registrar pointant vers Railway

**Résultat final :**
- Frontend : `https://poleevolution.fr`
- Backend API : `https://api.poleevolution.fr`

---

## 7️⃣ MONITORING & MAINTENANCE

### Vérifications hebdomadaires

✅ **Vercel Dashboard** : Vérifier les builds  
✅ **Railway Metrics** : Surveiller l'usage CPU/RAM  
✅ **Atlas Monitoring** : Vérifier les connexions BDD  

### Logs en cas d'erreur

**Backend (Railway) :**
```
Railway → Deployment → View Logs
```

**Frontend (Vercel) :**
```
Vercel → Deployment → Runtime Logs
```

---

## 8️⃣ COÛTS RÉCAPITULATIFS

| Service | Plan | Coût mensuel | Limites |
|---------|------|--------------|---------|
| **Vercel** | Hobby | 0€ | 100 GB bandwidth, builds illimités |
| **Railway** | Developer | $5 | $5 de crédit inclus, puis $0.000231/GB-hour |
| **MongoDB Atlas** | M0 Sandbox | 0€ | 512 MB storage, 100 connexions max |
| **Domaine** (.fr) | Annuel | ~10€/an | Renouvellement automatique |

**Total** : **~5€/mois** + **~10€/an** pour le domaine

### Si besoin de scale (50-100 utilisateurs actifs) :

- Railway Hobby : **$10/mois** (8 GB RAM, 8 vCPU)
- Atlas M10 : **$10/mois** (10 GB storage, sharding)
- **Total scale** : **~20€/mois**

---

## 9️⃣ CHECKLIST FINALE

Avant de valider le déploiement :

- [ ] ✅ MongoDB Atlas accessible depuis Railway
- [ ] ✅ Backend Railway répond à `/api/health` (200 OK)
- [ ] ✅ Frontend Vercel charge correctement
- [ ] ✅ Login/Register fonctionnel
- [ ] ✅ Réservation de cours (membre & invité) OK
- [ ] ✅ Admin dashboard accessible
- [ ] ✅ Emails de confirmation reçus
- [ ] ✅ HTTPS activé partout (🔒)
- [ ] ✅ SEO : sitemap.xml & robots.txt présents
- [ ] ✅ Lighthouse score > 80/100

---

## 🆘 SUPPORT & DÉPANNAGE

**Erreurs fréquentes :**

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Cannot connect to MongoDB` | IP non autorisée | Atlas → Network Access → Allow 0.0.0.0/0 |
| `CORS error` | FRONTEND_URL incorrect | Railway → Variables → Vérifier l'URL |
| `502 Bad Gateway` | Backend crash | Railway → Logs → Vérifier les erreurs |
| `Build failed` | Dépendances manquantes | Vérifier package.json & node_modules |

**Contact Développeur :**
[Ton email ou GitHub profil]

---

## 📞 ACCÈS ADMIN

Une fois déployé, connectez-vous avec :

```
Email : admin@poleevolution.com
Mot de passe : Admin123!
```

**⚠️ CHANGEZ ce mot de passe immédiatement après première connexion !**

---

**Dernière mise à jour** : 22 février 2026  
**Version** : 1.0.0 Production Ready
