Pole-Evolution/
│
├── Pole-Evolution.postman_collection.json
├── README.md
├── .gitignore
│
├── docs/
│   ├── ARBORESCENCE PROJET.md
│   ├── CHECKLIST JURY.md
│   ├── CONTEXTE PROJET
│   ├── DEPLOIEMENT_RENDER_GRATUIT.md
│   ├── DICTIONNAIRE DE DONNEES Pole Evolution.xlsx
│   ├── DOCKER_MINIMAL.md
│   └── REFACTORING_SESSION.md
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── database.js
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
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── upload.middleware.js
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
│   ├── seeds/
│   │   ├── index.js
│   │   ├── insert-admin-atlas.js
│   │   └── data/
│   │       ├── avis.js
│   │       ├── forfaits.js
│   │       ├── parametres.js
│   │       ├── courses.js          ⚠️ .gitignore sur main (prod), tracked sur develop
│   │       └── users.js            ⚠️ .gitignore sur main (prod), tracked sur develop
│   ├── uploads/
│   │   ├── media/
│   │   └── profiles/
│   ├── utils/
│   │   ├── emailService.js
│   │   └── file.utils.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── documents/
│   │       └── README.txt
│   ├── README.md
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   ├── images/
│       │   └── styles/
│       ├── components/
│       │   ├── coursData.js
│       │   ├── index.js
│       │   ├── Accueil/
│       │   │   ├── ActivityCard.jsx
│       │   │   ├── LevelCard.jsx
│       │   │   └── index.js
│       │   ├── admin/
│       │   │   ├── AdminSidebar.jsx
│       │   │   ├── CoursPlanning/
│       │   │   ├── Eleves/
│       │   │   ├── NotificationBell.jsx
│       │   │   ├── TarifsContenu/
│       │   │   └── index.js
│       │   ├── animations/
│       │   │   └── FadeIn.jsx
│       │   ├── common/
│       │   │   ├── CourseTypeCard.jsx
│       │   │   ├── FilterBar.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   ├── ReservationModal.jsx
│       │   │   └── index.js
│       │   ├── Courses/
│       │   │   ├── CourseCard.jsx
│       │   │   ├── CourseDetailsModal.jsx
│       │   │   ├── CourseInfoBlock.jsx
│       │   │   └── index.js
│       │   ├── layout/
│       │   │   ├── Footer.jsx
│       │   │   ├── Header.jsx
│       │   │   └── index.js
│       │   ├── MonCompte/
│       │   │   ├── MonCompteCourses.jsx
│       │   │   ├── MonComptePassword.jsx
│       │   │   ├── MonCompteProfile.jsx
│       │   │   ├── MonCompteReglement.jsx
│       │   │   └── index.js
│       │   ├── Planning/
│       │   │   ├── CalendarView.jsx
│       │   │   ├── WeekNavigator.jsx
│       │   │   └── index.js
│       │   └── Tarifs/
│       │       ├── ForfaitRequestDialog.jsx
│       │       ├── TarifCard.jsx
│       │       ├── TarifsEngagementButtons.jsx
│       │       ├── TarifsHeader.jsx
│       │       ├── TarifsInfoAlerts.jsx
│       │       ├── TarifsList.jsx
│       │       └── index.js
│       ├── context/
│       │   ├── authContext.jsx
│       │   └── authProvider.jsx
│       ├── hooks/
│       │   ├── useAbout.js
│       │   ├── useAuth.js
│       │   ├── useContact.js
│       │   ├── useCours.js
│       │   ├── useEVJFForfaits.js
│       │   ├── useForfaits.js
│       │   └── useGallery.js
│       ├── pages/
│       │   ├── Accueil/
│       │   │   ├── Accueil.jsx
│       │   │   ├── ActivitiesSection.jsx
│       │   │   ├── HeroSection.jsx
│       │   │   ├── LevelSection.jsx
│       │   │   └── ReviewsSection.jsx
│       │   ├── admin/
│       │   │   ├── AdminLayout.jsx
│       │   │   ├── CoursPlanning.jsx
│       │   │   ├── Eleves.jsx
│       │   │   ├── Notifications.jsx
│       │   │   ├── Parametres.jsx
│       │   │   └── TarifsContenu.jsx
│       │   ├── APropos.jsx
│       │   ├── Contact.jsx
│       │   ├── Cours.jsx
│       │   ├── Galerie.jsx
│       │   ├── Login.jsx
│       │   ├── MentionsLegales.jsx
│       │   ├── MonCompte.jsx
│       │   ├── Planning.jsx
│       │   ├── PolitiqueConfidentialite.jsx
│       │   ├── PolitiqueCookies.jsx
│       │   ├── Register.jsx
│       │   ├── RéglementIntérieur.jsx
│       │   ├── ResetPassword.jsx
│       │   ├── ShowAnimations.jsx
│       │   └── Tarifs.jsx
│       ├── services/
│       │   ├── adminService.js
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── avisService.js
│       │   ├── contactService.js
│       │   ├── coursService.js
│       │   ├── forfaitService.js
│       │   ├── index.js
│       │   ├── mediaService.js
│       │   ├── notificationService.js
│       │   ├── parametreService.js
│       │   └── reservationService.js
│       ├── styles/
│       │   └── pageStyles.js
│       └── utils/
│           ├── dateHelpers.js
│           ├── errorHandler.js
│           ├── imageOptimization.js
│           └── theme.js
│
└── .git/
