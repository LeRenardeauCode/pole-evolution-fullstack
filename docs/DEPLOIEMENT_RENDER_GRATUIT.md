# 🆓 DEPLOIEMENT GRATUIT AVEC RENDER.COM

SECURITY NOTE: This guide uses placeholders only. Never store real secrets in docs.

**Alternative 100% gratuite à Railway**  
**Temps estimé** : 40 minutes  
**Coût** : 0€/mois (vraiment gratuit, pas d'essai)

---

## 🎯 POURQUOI RENDER AU LIEU DE RAILWAY ?

| Critère | Railway | Render.com |
|---------|---------|------------|
| **Prix** | 5$/mois après crédit $5 | **GRATUIT** (750h/mois) |
| **Carte bancaire** | Obligatoire | **Optionnelle** |
| **Limite gratuite** | 1 mois | **Illimité** |
| **Cold start** | Non | Oui (service s'endort après 15 min inactivité) |
| **Bande passante** | Illimitée | 100GB/mois (largement suffisant) |
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Verdict** : Pour un projet comme Pole Evolution (petit trafic début), **Render gratuit suffit largement** ! 🎉

---

# ÉTAPE 1️⃣ : MONGODB ATLAS (identique au guide principal)

📖 **Suis les étapes 1.1 à 1.5 du DEPLOIEMENT_GUIDE_PRATIQUE.md**

Résumé rapide :
1. Compte sur https://www.mongodb.com/cloud/atlas/register
2. Cluster M0 gratuit (Paris)
3. Network Access : 0.0.0.0/0
4. User : `poleevolution-app`
5. Récupère URL : `mongodb+srv://poleevolution-app:PASSWORD@pole-evolution-prod.xxxxx.mongodb.net/poleevolution`

✅ **MongoDB prêt !**

---

# ÉTAPE 2️⃣ : RENDER - BACKEND GRATUIT (20 min)

## 2.1 Créer un compte

1. Va sur https://render.com
2. Clique **"Get Started"** ou **"Sign Up"**
3. Choisis **"Sign up with GitHub"**
4. Autorise Render à accéder à ton compte GitHub
5. ✅ Tu arrives sur le dashboard Render

## 2.2 Créer un Web Service

1. Dashboard → Clique **"New +"** (en haut à droite)
2. Choisis **"Web Service"**
3. Clique **"Connect a repository"**
4. Si ton repo n'apparaît pas :
   - Clique **"Configure account"**
   - Sélectionne **"Only select repositories"**
   - Choisis `LeRenardeauCode/pole-evolution-fullstack`
   - Clique **"Install"**
5. Dans la liste, clique **"Connect"** sur ton repo

## 2.3 Configurer le service

### **Paramètres de base**

| Champ | Valeur |
|-------|--------|
| **Name** | `pole-evolution-backend` |
| **Region** | **Frankfurt (EU Central)** ← le plus proche de Paris |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | **Node** (détecté auto) |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### **Plan**

- Sélectionne **"Free"** (0$/mois)
- ⚠️ Note : "Instance will spin down after 15 minutes of inactivity"
  - Signifie : Le backend s'endort si personne visite le site
  - Première requête = 30-60 secondes de réveil ("cold start")
  - Pas grave pour un site vitrine/petit trafic

## 2.4 Variables d'environnement

Scroll jusqu'à **"Environment Variables"**

Clique **"Add Environment Variable"** et ajoute **UNE PAR UNE** :

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://poleevolution-app:YOUR_PASSWORD@your-cluster.mongodb.net/poleevolution?retryWrites=true&w=majority
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRE=7d
FRONTEND_URL=https://your-vercel-domain
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=YOUR_APP_PASSWORD
EMAIL_FROM=Pole Evolution <your-email@example.com>
ADRESSE_STUDIO=Your Studio Address
TELEPHONE_CONTACT=Your Contact Phone
```

⚠️ **ATTENTION** :
- **PORT** = `10000` (obligatoire sur Render, pas 5000)
- **MONGO_URI** = URL complète de l'étape 1
- On mettra à jour `FRONTEND_URL` après Vercel

## 2.5 Déployer

1. Scroll en bas
2. Clique **"Create Web Service"**
3. ⏳ Render build ton backend (2-3 minutes)
4. Tu vois les logs en temps réel

## 2.6 Récupérer l'URL

1. Une fois déployé (status **"Live"** en vert)
2. En haut de la page, copie l'URL :
   - Format : `https://pole-evolution-backend.onrender.com`
3. **TESTE** : Ouvre `https://TON-URL.onrender.com/api/health`
   - ⏳ Attends 30-60s (cold start si endormi)
   - ✅ Tu devrais voir : `{"status":"OK"}`

## 2.7 Éviter le cold start (optionnel mais recommandé)

Le problème du plan gratuit : backend s'endort après 15 min.

**Solution gratuite** : Ping automatique toutes les 10 minutes

### Option A : Service externe (UptimeRobot)

1. Va sur https://uptimerobot.com (gratuit)
2. Crée un compte
3. **"Add New Monitor"**
   - Monitor Type : **HTTP(s)**
   - Friendly Name : `Pole Evolution Backend`
   - URL : `https://TON-URL.onrender.com/api/health`
   - Monitoring Interval : **5 minutes**
4. Sauvegarde
5. ✅ Ton backend restera toujours réveillé ! (ping automatique)

### Option B : Cron job Render (si tu upgrades plus tard)

Si tu passes au plan payant Render (7$/mois), tu peux créer un Cron Job Render qui ping ton backend.

✅ **Backend déployé GRATUITEMENT sur Render !**

---

# ÉTAPE 3️⃣ : VERCEL - FRONTEND (identique au guide principal)

📖 **Suis les étapes 3.1 à 3.5 du DEPLOIEMENT_GUIDE_PRATIQUE.md**

**MAIS** change la variable d'environnement :

```
VITE_API_URL=https://pole-evolution-backend.onrender.com
```

⚠️ Remplace par ton URL Render (pas Railway)

✅ **Frontend déployé sur Vercel !**

---

# ÉTAPE 4️⃣ : METTRE À JOUR LE CORS BACKEND

1. **RETOURNE SUR RENDER**
2. Dashboard → Ton service `pole-evolution-backend`
3. Menu gauche → **"Environment"**
4. Trouve `FRONTEND_URL`
5. Clique **"Edit"**
6. Change en : `https://pole-evolution-frontend.vercel.app`
   - ⚠️ Remplace par ton URL Vercel exacte
7. Clique **"Save Changes"**
8. ⏳ Render redémarre automatiquement (1 min)

---

# ÉTAPE 5️⃣ : TESTS (identique au guide principal)

1. **Backend santé** : `https://TON-RENDER.onrender.com/api/health`
2. **Frontend** : Ouvre site Vercel
3. **Se connecter** : utilisez un compte admin cree dans votre base
4. **Créer un cours** depuis /admin
5. **Vérifier emails**

---

# 📊 COMPARAISON FINALE

## Déploiement Railway (payant)
```
MongoDB Atlas (gratuit)       : 0€/mois
Railway Backend              : 5€/mois
Vercel Frontend (gratuit)    : 0€/mois
───────────────────────────────
TOTAL                        : 5€/mois
```

## Déploiement Render (gratuit)
```
MongoDB Atlas (gratuit)       : 0€/mois
Render Backend (gratuit)     : 0€/mois
Vercel Frontend (gratuit)    : 0€/mois
UptimeRobot (gratuit)        : 0€/mois
───────────────────────────────
TOTAL                        : 0€/mois 🎉
```

---

# ⚠️ LIMITATIONS DU PLAN GRATUIT RENDER

| Limite | Impact | Workaround |
|--------|--------|------------|
| **Cold start 30-60s** | Première visite après 15min = lent | UptimeRobot ping (résout 95%) |
| **750h/mois** | = 31 jours complets | Largement suffisant |
| **512MB RAM** | Backend Node.js = 100-200MB | Parfait pour ton projet |
| **100GB bande passante/mois** | ~3000 visites/mois | Largement suffisant début |

**Verdict** : Pour un début, c'est **PARFAIT** ! Si le site explose (>1000 visites/jour), upgrade à 7$/mois.

---

# 🚀 MIGRATION RENDER → RAILWAY (si besoin futur)

Si un jour tu veux passer à Railway payant (meilleur perfs, pas de cold start) :

1. Railway → New Project → Deploy from GitHub
2. Copie/colle les variables d'environnement de Render
3. Change `PORT=5000`
4. Récupère nouvelle URL Railway
5. Update `VITE_API_URL` sur Vercel
6. Update `FRONTEND_URL` sur Railway
7. ✅ Done en 5 minutes

---

# 🎯 RÉCAPITULATIF

**Choisis cette solution si :**
- ✅ Tu veux déployer MAINTENANT sans carte bancaire
- ✅ Le site aura peu de trafic au début (<500 visites/jour)
- ✅ Cold start de 30s ne te dérange pas
- ✅ Tu veux économiser 5€/mois

**Choisis Railway (5€/mois) si :**
- ✅ Tu as une carte bancaire
- ✅ Tu veux performances max (pas de cold start)
- ✅ 5€/mois n'est pas un problème
- ✅ Trafic important attendu dès le début

---

**🎉 AVEC RENDER, TON SITE EST 100% GRATUIT ! 🎉**
