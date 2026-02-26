# 🆓 DÉPLOIEMENT GRATUIT AVEC RENDER + MONGODB ATLAS

**Alternative 100% gratuite à Railway**  
**Temps estimé:** 40 minutes  
**Coût:** 0€/mois (vraiment gratuit!)

---

## 🎯 POURQUOI RENDER ?

| Critère | Render.com | Railway |
|---------|------------|---------|
| **Prix** | **GRATUIT** (750h/mois) | 5$/mois après crédit |
| **Carte bancaire** | Optionnelle | Obligatoire |
| **Limite gratuite** | Illimité | 1 mois |
| **Cold start** | Oui (15min inactivité) | Non |
| **Bande passante** | 100GB/mois | Illimitée |

**Pour Pole Evolution début:** Render gratuit suffit largement ✅

---

# ÉTAPE 1️⃣ : MONGODB ATLAS (Cloud Database)

## 1.1 Créer un compte

1. Va sur https://www.mongodb.com/cloud/atlas/register
2. Remplis formulaire (email + password)
3. Vérifie ton email
4. Choisis **"Shared"** (gratuit)

## 1.2 Créer un Cluster M0

1. Dashboard → **"Create a Deployment"**
2. Choisis **"M0 (Shared)"** - gratuit
3. **Provider:** AWS
4. **Region:** Frankfurt (eu-central-1) - le plus proche de Paris
5. Clique **"Create Deployment"**
6. ⏳ Attends 5-10 minutes (création cluster)

## 1.3 Créer un utilisateur Database

1. Une fois cluster créé, va dans **"Security"** → **"Database Access"**
2. Clique **"Add New Database User"**
   - **Username:** `poleevolution-app`
   - **Password:** Généré automatique (copie-le !)
   - **Built-in Role:** Read and write to any database
3. Clique **"Add User"**

## 1.4 Configurer Network Access

1. **Security** → **"Network Access"**
2. Clique **"Add IP Address"**
3. Choisis **"Allow access from anywhere"** (0.0.0.0/0)
   - ⚠️ Pour production, tu mettras seulement l'IP de Render
4. Clique **"Confirm"**

## 1.5 Récupérer la Connection String

1. Dashboard → Ton cluster → **"Connect"**
2. Choisis **"Connect your application"**
3. Copie l'URL :
   ```
   mongodb+srv://poleevolution-app:PASSWORD@cluster0.zrbmu0x.mongodb.net/poleevolution?retryWrites=true&w=majority
   ```
4. **Remplace `PASSWORD` par le mot de passe généré plus tôt**

✅ **MongoDB prêt !**

---

# ÉTAPE 2️⃣ : RENDER - BACKEND DEPLOYMENT

## 2.1 Créer un compte Render

1. Va sur https://render.com
2. Clique **"Get Started"** ou **"Sign Up"**
3. Choisis **"Sign up with GitHub"**
4. Autorise Render à accéder à tes repos GitHub
5. ✅ Tu arrives sur le dashboard Render

## 2.2 Créer un Web Service

1. Dashboard → **"New +"** (en haut à droite)
2. Choisis **"Web Service"**
3. Clique **"Connect a repository"**
4. Si ton repo n'apparaît pas :
   - Clique **"Configure account"**
   - Sélectionne **"Only select repositories"**
   - Choisis `LeRenardeauCode/pole-evolution-fullstack`
   - Clique **"Install"**
5. Clique **"Connect"** sur `pole-evolution-fullstack`

## 2.3 Configurer le Service

### Paramètres de base

| Champ | Valeur |
|-------|--------|
| **Name** | `pole-evolution-backend` |
| **Region** | **Frankfurt (EU)** |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | Node (auto-détecté) |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Plan

- Sélectionne **"Free"** (0$/mois)
- Note : Service s'endort après 15min sans activité (première requête = 30-60s)

## 2.4 Variables d'Environnement

Scroll jusqu'à **"Environment"** et ajoute les variables :

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://poleevolution-app:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/poleevolution?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here-min-32-chars
JWT_EXPIRE=7d
FRONTEND_URL=https://pole-evolution-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
EMAIL_SERVICE=gmail
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=app-password-from-gmail
EMAIL_FROM=Pole Evolution <votre.email@gmail.com>
ADRESSE_STUDIO=123 Rue du Studio, Rumaucourt
TELEPHONE_CONTACT=07 67 26 94 71
```

⚠️ **IMPORTANT:**
- **PORT = 10000** (Render standard, ne change pas)
- **MONGO_URI** = copié de l'étape 1.5 avec password
- **JWT_SECRET** = une clé longue et aléatoire
- On mettra à jour **FRONTEND_URL** après Vercel

### Où trouver les clés ?

**Cloudinary:**
- Va sur https://cloudinary.com
- Dashboard → Settings → copie Cloud Name, API Key, API Secret

**Gmail (Email):**
1. Active 2FA sur compte Google
2. Va dans Account → Security → App passwords
3. Génère password pour "Mail" + "Windows"
4. Copie-le (pas ton vrai password!)

## 2.5 Déployer

1. Scroll en bas
2. Clique **"Create Web Service"**
3. ⏳ Render build ton backend (2-3 minutes)
4. Vois les logs en temps réel

## 2.6 Récupérer l'URL Backend

1. Une fois statut = **"Live"** (vert)
2. Copie l'URL en haut de page (ex: `https://pole-evolution-backend.onrender.com`)
3. **TESTE:** Ouvre `https://TON-URL.onrender.com/health`
   - ⏳ Attends 30-60s (cold start)
   - ✅ Tu devrais voir: `{"status":"OK","uptime":123.45}`

## 2.7 Éviter le Cold Start (optionnel)

Le backend s'endort après 15 minutes sans requête.

### Solution: UptimeRobot (gratuit)

1. Va sur https://uptimerobot.com
2. Crée un compte gratuit
3. **"Add New Monitor"**
   - Type: **HTTP(s)**
   - Friendly Name: `Pole Evolution Backend`
   - URL: `https://TON-URL.onrender.com/health`
   - Monitoring Interval: **5 minutes**
4. Save
5. ✅ Backend restera actif (ping automatique toutes les 5 min)

---

# ÉTAPE 3️⃣ : FRONTEND DEPLOYMENT (Vercel)

## 3.1 Déployer sur Vercel

1. Va sur https://vercel.com
2. Clique **"Continue with GitHub"**
3. Autorise Vercel
4. Clique **"Import Project"**
5. Cherche `pole-evolution-fullstack`
6. Sélectionne **"Import"**

## 3.2 Configurer le Projet

### Root Directory

1. Clique **"Configure Project"**
2. **Root Directory:** `frontend`
3. **Framework Preset:** Vite
4. Clique **"Continue"**

### Environment Variables

Ajoute une seule variable:

```
VITE_API_URL=https://pole-evolution-backend.onrender.com
```

⚠️ **IMPORTANT:** Remplace par ton URL Render de l'étape 2.6

## 3.3 Déployer

1. Clique **"Deploy"**
2. ⏳ Attends 3-5 minutes
3. ✅ Tu vois une URL Vercel (ex: `https://pole-evolution-frontend.vercel.app`)

---

# ÉTAPE 4️⃣ : METTRE À JOUR LE CORS

Maintenant que tu as l'URL Vercel, update le backend:

1. Render Dashboard → `pole-evolution-backend`
2. Menu gauche → **"Environment"**
3. Trouve `FRONTEND_URL`
4. Clique **"Edit"** (crayon)
5. Remplace par l'URL Vercel (ex: `https://pole-evolution-frontend.vercel.app`)
6. Clique **"Save Changes"**
7. ⏳ Render redémarre (1-2 minutes)

---

# ÉTAPE 5️⃣ : TESTS

1. ✅ Backend santé: `https://TON-RENDER-URL/health`
2. ✅ Ouvre le site Vercel (clique sur l'URL)
3. ✅ Essaie de te connecter (crée un compte d'admin sur Atlas ou utilise le script)
4. ✅ Crée une course depuis /admin
5. ✅ Réserve une course
6. ✅ Vérifie les emails (check inbox + spam)

---

# 🎯 ACCÈS PRODUCTION ADMIN

### Créer le compte admin sur Atlas (une fois)

```bash
cd backend
node seeds/insert-admin-atlas.js
```

Le script demande:
- Connection string (copie depuis MongoDB Atlas)
- Email (ex: admin@poleevolution.com)
- Password (réinitialise si compte existe)

---

# 📊 COÛTS FINAUX

```
MongoDB Atlas M0 (gratuit)     : 0€/mois
Render Backend (gratuit)       : 0€/mois  
Vercel Frontend (gratuit)      : 0€/mois
UptimeRobot (gratuit)          : 0€/mois
────────────────────────────────
TOTAL                          : 0€/mois 🎉
```

---

# ⚠️ LIMITATIONS PLAN GRATUIT

| Limite | Impact | Workaround |
|--------|--------|------------|
| Cold start 30-60s | Première visite = lent | UptimeRobot (résout 95%) |
| 750h/mois | = illimité pratiquement | OK pour début |
| 512MB RAM | Suffisant pour Node | Parfait |
| 100GB bande passante | ~3000 visites/mois | Largement OK |

---

# 🚀 UPGRADE FUTUR (si besoin)

**Quand upgrade?** Si >1000 visites/jour

**Options:**
- Render Pro: 7$/mois (pas de cold start, +RAM)
- Railway: 5$/mois (alternative)
- Heroku: 7$/mois (classique)

Migration = 5 minutes (copier/coller env vars)

---

# ✅ CHECKLIST FINAL

- [ ] MongoDB Atlas cluster créé (M0)
- [ ] Username/password créé (poleevolution-app)
- [ ] Network Access configuré (0.0.0.0/0)
- [ ] Connection string copiée
- [ ] Render backend déployé & URL copiée
- [ ] `/health` endpoint répond
- [ ] Vercel frontend déployé & URL copiée
- [ ] FRONTEND_URL updaté sur Render
- [ ] UptimeRobot configuré (optionnel)
- [ ] Admin account créé
- [ ] Login fonctionne
- [ ] Emails reçus

---

**TON SITE EST EN LIGNE & GRATUIT! 🎉**

Prochaine étape: Configure ton domaine custom (optionnel)
- Render: tu peux ajouter un domaine
- Vercel: même chose

Good luck! 🚀

