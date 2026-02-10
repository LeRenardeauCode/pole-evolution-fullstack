Pole-Evolution/
│
├── INSTALLATION.md
├── Pole-Evolution.postman_collection.json
├── README.md
│
├── docs/
│   ├── ARBORESCENCE PROJET.md
│   ├── CHECKLIST JURY.md
│   ├── CONTEXTE PROJET/
│   ├── PROMPTS CODING.md
│   ├── SECURITY.md
│   └── TARIFS_REFERENCE.md
│
├── backend/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── database.js
│   │
│   ├── models/
│   │   ├── Avis.js
│   │   ├── Cours.js
│   │   ├── Forfait.js
│   │   ├── Media.js
│   │   ├── MessageContact.js
│   │   ├── Notification.js
│   │   ├── Parametre.js
│   │   ├── Reservation.js
│   │   ├── Utilisateur.js
│   │   └── index.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── avis.controller.js
│   │   ├── contact.controller.js
│   │   ├── cours.controller.js
│   │   ├── forfait.controller.js
│   │   ├── media.controller.js
│   │   ├── notification.controller.js
│   │   ├── parametre.controller.js
│   │   ├── reservation.controller.js
│   │   └── utilisateur.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── avis.routes.js
│   │   ├── contact.routes.js
│   │   ├── cours.routes.js
│   │   ├── forfait.routes.js
│   │   ├── media.routes.js
│   │   ├── notification.routes.js
│   │   ├── parametre.routes.js
│   │   ├── reservations.routes.js
│   │   └── utilisateur.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── utils/
│   │   └── file.utils.js
│   │
│   ├── seeds/
│   │   ├── index.js
│   │   └── data/
│   │       ├── cours.js
│   │       ├── forfaits.js
│   │       ├── parametres.js
│   │       └── users.js
│   │
│   ├── uploads/
│   │   ├── media/
│   │   └── profiles/
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │
│   │   ├── components/
│   │   │   ├── coursData.js
│   │   │   ├── admin/
│   │   │   ├── animations/
│   │   │   │   └── FadeIn.jsx
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── UI/
│   │   │
│   │   ├── context/
│   │   │   ├── authContext.jsx
│   │   │   └── authProvider.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAbout.js
│   │   │   ├── useAuth.js
│   │   │   ├── useContact.js
│   │   │   ├── useCours.js
│   │   │   ├── useEVJFForfaits.js
│   │   │   ├── useForfaits.js
│   │   │   └── useGallery.js
│   │   │
│   │   ├── pages/
│   │   │   ├── APropos.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Cours.jsx
│   │   │   ├── Galerie.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MonCompte.jsx
│   │   │   ├── Planning.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ShowAnimations.jsx
│   │   │   ├── Tarifs.jsx
│   │   │   ├── Accueil/
│   │   │   └── admin/
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── avisService.js
│   │   │   ├── contactService.js
│   │   │   ├── coursService.js
│   │   │   ├── forfaitService.js
│   │   │   ├── mediaService.js
│   │   │   ├── parametreService.js
│   │   │   └── reservationService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── dateHelpers.js
│   │   │   └── theme.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
└── .git/                                
