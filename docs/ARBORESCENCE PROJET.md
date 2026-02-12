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
│   │   │   ├── index.js          # Exports centralisés
│   │   │   │
│   │   │   ├── Accueil/          # Composants page Accueil
│   │   │   │   ├── ActivityCard.jsx
│   │   │   │   ├── LevelCard.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── Courses/          # Composants pages Cours/Planning
│   │   │   │   ├── CourseCard.jsx
│   │   │   │   ├── CourseDetailsModal.jsx
│   │   │   │   ├── CourseInfoBlock.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── Planning/         # Navigation et calendrier
│   │   │   │   ├── CalendarView.jsx
│   │   │   │   ├── WeekNavigator.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── common/           # Composants partagés
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── ReservationModal.jsx
│   │   │   │   ├── FilterBar.jsx
│   │   │   │   ├── CourseTypeCard.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── layout/           # Header, Footer, Navigation
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── admin/            # Composants admin
│   │   │   │   ├── AdminSidebar/
│   │   │   │   ├── CoursPlanning/
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── animations/       # Animations réutilisables
│   │   │   │   ├── FadeIn.jsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── MonCompte/        # Composants utilisateur
│   │   │   │   ├── MonCompteCourses.jsx
│   │   │   │   ├── MonCompteProfile.jsx
│   │   │   │   ├── MonComptePassword.jsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── Tarifs/           # Composants Tarifs
│   │   │       ├── TarifCard.jsx
│   │   │       ├── TarifsList.jsx
│   │   │       ├── TarifsHeader.jsx
│   │   │       └── ...
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
│   │   │   ├── useGallery.js
│   │   │   └── ...
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
│   │   │   │
│   │   │   ├── Accueil/
│   │   │   │   ├── Accueil.jsx
│   │   │   │   └── ActivitiesSection.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── CoursPlanning.jsx
│   │   │       ├── Eleves.jsx
│   │   │       ├── TarifsContenu.jsx
│   │   │       ├── Notifications.jsx
│   │   │       ├── Parametres.jsx
│   │   │       └── ...
│   │   │
│   │   ├── services/
│   │   │   ├── api.js             # Configuration Axios
│   │   │   ├── authService.js
│   │   │   ├── avisService.js
│   │   │   ├── contactService.js
│   │   │   ├── coursService.js
│   │   │   ├── forfaitService.js
│   │   │   ├── mediaService.js
│   │   │   ├── notificationService.js
│   │   │   ├── parametreService.js
│   │   │   ├── reservationService.js
│   │   │   ├── utilisateurService.js
│   │   │   └── ...
│   │   │
│   │   ├── utils/
│   │   │   ├── errorHandler.js    # Gestion erreurs + messages localisés
│   │   │   ├── dateHelpers.js     # Helpers date-fns
│   │   │   ├── theme.js           # Thème MUI
│   │   │   └── ...
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── .env.example           # Template variables d'environnement
│   │
│   ├── public/
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── .git/                                
