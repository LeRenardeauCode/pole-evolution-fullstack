pole-evolution/                          
│
├── .gitignore                           
│
├── README.md                            
│
├── docs/                                
│   ├── DICTIONNAIRE DE DONNEES.xlsx     
│   ├── TARIFS_REFERENCE.md              
│   ├── API_DOCUMENTATION.md             
│   └──WORKFLOW_UTILISATEUR.md          
│                         
│
│
│
│
├── backend/                             
│   │
│   ├── config/                          
│   │   ├── database.js                  
│   │   ├── cloudinary.js                
│   │   └── email.js                     
│   │
│   ├── models/                          
│   │   ├── Utilisateur.js               
│   │   ├── Cours.js                     
│   │   ├── Reservation.js               
│   │   ├── Forfait.js                   
│   │   ├── Media.js                     
│   │   ├── Avis.js                      
│   │   ├── MessageContact.js            
│   │   ├── Notification.js              
│   │   └── Parametre.js                 
│   │                     
│   │
│   ├── controllers/                     
│   │   ├── auth.controller.js           
│   │   ├── utilisateur.controller.js    
│   │   ├── cours.controller.js          
│   │   ├── reservation.controller.js    
│   │   ├── forfait.controller.js        
│   │   ├── avis.controller.js           
│   │   ├── media.controller.js          
│   │   ├── messageContact.controller.js 
│   │   ├── notification.controller.js   
│   │   ├── parametre.controller.js      
│   │   └── stats.controller.js          
│   │
│   ├── routes/                          
│   │   ├── auth.routes.js               
│   │   ├── utilisateur.routes.js        
│   │   ├── cours.routes.js              
│   │   ├── reservation.routes.js        
│   │   ├── forfait.routes.js            
│   │   ├── avis.routes.js               
│   │   ├── media.routes.js              
│   │   ├── messageContact.routes.js     
│   │   ├── notification.routes.js       
│   │   ├── parametre.routes.js          
│   │   ├── stats.routes.js              
│   │   └── index.js                     
│   │
│   ├── middleware/                      
│   │   ├── auth.middleware.js           
│   │   ├── admin.middleware.js          
│   │   ├── validation.middleware.js     
│   │   ├── errorHandler.middleware.js   
│   │   ├── upload.middleware.js         
│   │   └── rateLimit.middleware.js      
│   │
│   ├── utils/                           
│   │   ├── sendEmail.js                 
│   │   ├── generateToken.js             
│   │   ├── cloudinaryUpload.js          
│   │   └── helpers.js                   
│   ├── seeds/                           
│   │   ├── index.js                     
│   │   ├── utilisateurs.seed.js         
│   │   ├── cours.seed.js               
│   │   ├── forfaits.seed.js             
│   │   ├── reservations.seed.js         
│   │   ├── avis.seed.js                 
│   │   └── parametres.seed.js           
│   │
│   ├── node_modules/                    
│   │
│   ├── .env                             
│   │   # MONGODB_URI=mongodb+srv://...
│   │   # JWT_SECRET=...
│   │   # CLOUDINARY_API_KEY=...
│   │   # EMAIL_USER=...
│   │
│   ├── .gitignore                       
│   │   # node_modules
│   │   # .env
│   │   # *.log
│   │
│   ├── package.json                     
│   ├── package-lock.json                
│   └── server.js                        
│
│
├── frontend/                            
│   │
│   ├── public/                          
│   │   ├── index.html                   
│   │   ├── favicon.ico                  
│   │   └── logo-pole-evolution.png      
│   │
│   ├── src/                             
│   │   │
│   │   ├── assets/                      
│   │   │   ├── images/
│   │   │   └── fonts/
│   │   │
│   │   ├── components/                  
│   │   │   ├── common/                  
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loader.jsx
│   │   │   │
│   │   │   ├── cours/                   
│   │   │   │   ├── CoursCard.jsx
│   │   │   │   ├── Planning.jsx
│   │   │   │   └── DetailsCours.jsx
│   │   │   │
│   │   │   ├── reservation/             
│   │   │   │   ├── FormReservation.jsx
│   │   │   │   └── MesReservations.jsx
│   │   │   │
│   │   │   ├── avis/                    
│   │   │   │   ├── AvisCard.jsx
│   │   │   │   └── FormAvis.jsx
│   │   │   │
│   │   │   └── admin/                   
│   │   │       ├── Sidebar.jsx
│   │   │       ├── TableauBord.jsx
│   │   │       └── StatsCard.jsx
│   │   │
│   │   ├── pages/                       
│   │   │   ├── public/                  
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── APropos.jsx
│   │   │   │   ├── LesCours.jsx
│   │   │   │   ├── Tarifs.jsx
│   │   │   │   ├── EVJF.jsx
│   │   │   │   ├── Galerie.jsx
│   │   │   │   ├── Avis.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   └── MentionsLegales.jsx
│   │   │   │
│   │   │   ├── auth/                    
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   │
│   │   │   ├── client/                 
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Profil.jsx
│   │   │   │   ├── MesReservations.jsx
│   │   │   │   └── MesForfaits.jsx
│   │   │   │
│   │   │   └── admin/                   
│   │   │       ├── Dashboard.jsx
│   │   │       ├── GestionUtilisateurs.jsx
│   │   │       ├── GestionCours.jsx
│   │   │       ├── GestionReservations.jsx
│   │   │       ├── GestionForfaits.jsx
│   │   │       ├── GestionAvis.jsx
│   │   │       ├── GestionGalerie.jsx
│   │   │       ├── MessagesContact.jsx
│   │   │       ├── Notifications.jsx
│   │   │       ├── Parametres.jsx
│   │   │       └── Statistiques.jsx
│   │   │
│   │   ├── context/                     
│   │   │   ├── AuthContext.jsx          
│   │   │   ├── CoursContext.jsx        
│   │   │   └── NotificationContext.jsx  
│   │   │
│   │   ├── hooks/                       
│   │   │   ├── useAuth.js
│   │   │   ├── useCours.js
│   │   │   └── useNotifications.js
│   │   │
│   │   ├── services/                    
│   │   │   ├── api.js                  
│   │   │   ├── authService.js           
│   │   │   ├── coursService.js          
│   │   │   ├── reservationService.js    
│   │   │   └── ...
│   │   │
│   │   ├── utils/                       
│   │   │   ├── formatDate.js
│   │   │   ├── validation.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx                      
│   │   ├── index.jsx                    
│   │   └── App.css                      
│   │
│   ├── node_modules/                    
│   ├── .env                             
│   │   # REACT_APP_API_URL=http://localhost:5000/api
│   │
│   ├── package.json                     
│   ├── package-lock.json
│   └── .gitignore
│
│
└── .git/                                
