# Pole Evolution - Plateforme de Gestion d'École de Pole Dance

Application web fullstack pour gérer une école de pole dance : cours, réservations, forfaits, paiements, administrateurs.

![React](https://img.shields.io/badge/React-19.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![MUI](https://img.shields.io/badge/MUI-7.3-purple)

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Stack technique](#-stack-technique)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Architecture](#-architecture)
- [Développement](#-développement)
- [Fonctionnalités](#-fonctionnalités)

---

## 🎯 Vue d'ensemble

**Pole Evolution** est une plateforme complète permettant :
- **Utilisateurs** : Consulter cours, faire des reséations, gérer leurs forfaits
- **Administrateurs** : Gérer les cours, validations de réservations, gestion clients
- **Système** : Authentification, paiements, notifications, gestion médias

## 🛠 Stack technique

### Frontend
- **Framework** : React 19.2.0
- **UI Library** : Material-UI (MUI) 7.3.7
- **Routing** : React Router 7.13.0
- **Build** : Vite 7.3.1
- **HTTP Client** : Axios
- **Auth** : JWT (localStorage)
- **State** : React Context + Custom Hooks
- **Styling** : MUI sx + Custom Theme

### Backend
- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Database** : MongoDB 6.0+
- **Auth** : JWT (jsonwebtoken)
- **Validation** : Express-validator
- **Upload** : Multer + Cloudinary
- **Sécurité** : Helmet, CORS, Rate Limiting

---

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- MongoDB 6.0+ (en local ou Atlas)
- Compte Cloudinary (optionnel, pour les uploads)

### Step 1: Cloner le repo
```bash
git clone <repo-url>
cd "Pole-Evolution"
```

### Step 2: Installation Backend
```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec vos credentials
npm run dev
```

### Step 3: Installation Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
# Éditer .env (VITE_API_URL)
npm run dev
```

Frontend accessible sur `http://localhost:5173`
Backend sur `http://localhost:5000`

---

## ⚙️ Configuration

### Backend (.env)
```env
# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/pole-evolution

# Auth
JWT_SECRET=votre_clé_secrète_très_longue_et_complexe
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# Cloudinary (optionnel - uploads médias)
CLOUDINARY_NAME=votre_cloudinary_name
CLOUDINARY_KEY=votre_cloudinary_key
CLOUDINARY_SECRET=votre_cloudinary_secret

# Stripe (optionnel - paiements)
STRIPE_SECRET_KEY=sk_test_...
```

### Frontend (.env)
```env
# API Backend
VITE_API_URL=http://localhost:5000/api
```

---

## 🏗 Architecture

```
Pole-Evolution/
├── backend/
│   ├── config/              # Configuration DB
│   ├── controllers/         # Logique métier
│   ├── models/              # Schémas Mongoose
│   ├── routes/              # Routes API
│   ├── middleware/          # Auth, errors, upload
│   ├── utils/               # Helpers
│   ├── uploads/             # Fichiers uploadés
│   ├── seeds/               # Données de test
│   └── server.js            # Point d'entrée
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Pages (utilisateur + admin)
│   │   ├── components/
│   │   │   ├── Accueil/     # Composants page Accueil
│   │   │   ├── Courses/     # Composants pages Cours/Planning
│   │   │   ├── Planning/    # Composants Planning (Calendar, Navigation)
│   │   │   ├── common/      # Composants réutilisables (ReservationModal, FilterBar, etc.)
│   │   │   ├── layout/      # Header, Footer
│   │   │   ├── admin/       # Composants admin
│   │   │   ├── animations/  # Animations (FadeIn)
│   │   │   ├── MonCompte/   # Composants utilisateur
│   │   │   ├── Tarifs/      # Composants Tarifs
│   │   │   └── coursData.js # Données statiques cours
│   │   ├── hooks/           # Custom hooks (useAuth, useCours, etc.)
│   │   ├── services/        # API calls (authService, coursService, etc.)
│   │   ├── context/         # Auth context
│   │   ├── utils/           # Helpers (theme, errorHandler)
│   │   └── assets/          # Images, fonts
│   │
│   ├── vite.config.js       # Config Vite + alias imports
│   └── package.json
│
└── docs/
    ├── REFACTORING_SESSION.md   # Session log refactoring
    └── SECURITY.md              # Notes sécurité
```

### Composants réutilisables

**Courses** (src/components/Courses/):
- `CourseCard` - Affiche un cours
- `CourseDetailsModal` - Détails complets du cours
- `CourseInfoBlock` - Bloc info alterné image/texte

**Planning** (src/components/Planning/):
- `WeekNavigator` - Navigation semaines
- `CalendarView` - Vue calendrier des cours

**Accueil** (src/components/Accueil/):
- `ActivityCard` - Carte activité
- `LevelCard` - Carte niveau

**Common** (src/components/common/):
- `ReservationModal` - Modale de réservation
- `FilterBar` - Filtres (type, niveau)
- `CourseTypeCard` - Carte type de cours
- `ProtectedRoute` - Route protégée auth

**Pages** (src/pages/):
- Public: Accueil, Cours, Planning, Tarifs, Galerie, Contact, A Propos, Login, Register
- Utilisateur: MonCompte
- Admin: CoursPlanning, Eleves, TarifsContenu, Notifications, Parametres

---

## 👨‍💻 Développement

### Scripts disponibles

**Frontend**:
```bash
npm run dev     # Démarrer serveur dev (Vite)
npm run build   # Build production
npm run preview # Prévisualiser build
```

**Backend**:
```bash
npm run dev     # Démarrer avec nodemon
npm run build   # Build pour production
npm run seed    # Peupler la DB avec données test
```

### Alias d'imports

Imports simplifiés via aliases Vite :
```javascript
import { useAuth } from '@hooks/useAuth';              // src/hooks
import { authService } from '@services/authService';  // src/services
import { CourseCard } from '@components/Courses';     // src/components/Courses
import { CourseDetailsModal } from '@components/Courses';  // src/components/Courses
import { ReservationModal } from '@components/common'; // src/components/common
import { theme } from '@utils/theme';                 // src/utils
import errorHandler from '@utils/errorHandler';       // src/utils
```

### Authentication Flow

1. **Inscription** : `POST /api/auth/register` → JWT stocké en localStorage
2. **Connexion** : `POST /api/auth/login` → JWT + redirect
3. **Requêtes** : Token envoyé en `Authorization: Bearer <token>`
4. **Session expirée** : 401 → Logout et redirect login

**Fichiers clés** :
- Frontend: `src/context/authContext.jsx` , `src/hooks/useAuth.js`
- Backend: `backend/middleware/auth.middleware.js`

### Gestion erreurs

Frontend utilise `utils/errorHandler.js` pour standardiser les messages d'erreur API.

```javascript
import errorHandler from '@utils/errorHandler';

try {
  // API call
} catch (error) {
  const message = errorHandler.getErrorMessage(error);
  toast.error(message);
}
```

### Performance

- **Lazy-loading** : Routes heavies (Cours, Planning, Tarifs, etc.) chargées via `React.lazy()`
- **Memoization** : Composants fréquemment re-rendus wrappés avec `React.memo()`
- **Images** : `loading="lazy"` + Cloudinary optimization
- **Bundle** : ~716KB gzipped (main) + chunks séparés

---

## ✨ Fonctionnalités clés

### Utilisateurs
✅ Inscription / Connexion
✅ Consulter profil
✅ Voir cours disponibles + réserver
✅ Gérer forfaits actifs
✅ Voir réservations passées
✅ Laisser avis

### Administrateurs
✅ Dashboard admin
✅ Gérer cours (CRUD)
✅ Valider réservations
✅ Modérer avis
✅ Gérer tarifs/forfaits
✅ Gestion utilisateurs
✅ Notifications

### Système
✅ JWT authentification
✅ Upload médias (Cloudinary)
✅ Formulaire contact
✅ Notifications
✅ Rate limiting
✅ Accessible (WCAG 2.1 AA)

---

## 📝 Notes d'implémentation

- **Design** : Custom theme MUI avec gradients rose/navy
- **Responsive** : Mobile-first, breakpoints xs/sm/md/lg/xl
- **Accessibility** : WCAG 2.1 AA (aria-labels, keyboard nav, contrast)
- **Dev Mode** : Seed data available via `npm run seed`
- **DB** : MongoDB Atlas ou local

---

## 🔒 Sécurité

- JWT avec secret fort
- CORS configuré
- Helmet.js pour headers sécurité
- Rate limiting sur endpoints sensibles
- Validation/sanitization inputs (express-validator)
- Multer pour uploads sécurisés

---

## 📚 Ressources

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Material-UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Version**: 0.1.0 (MVP)  
**Dernier update**: Février 2026
