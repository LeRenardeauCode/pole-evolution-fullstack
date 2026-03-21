import bcrypt from 'bcryptjs';

// Mots de passe de test — JAMAIS utilisés en production
const devPassword = process.env.SEED_ADMIN_PASSWORD || 'DevTest123!';
const userPassword = 'UserTest123!';

const users = [
  {
    prenom: 'Admin',
    nom: 'Test',
    pseudo: 'admin_test',
    email: 'admin@test.local',
    motDePasse: bcrypt.hashSync(devPassword, 10),
    telephone: '0600000001',
    role: 'admin',
    statutValidationAdmin: 'approved',
    estActif: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateInscription: new Date(),
    inscriptionComplete: true,
    adresse: {
      rue: '1 Rue de Test',
      ville: 'Testville',
      codePostal: '00000',
      pays: 'France'
    }
  },
  {
    prenom: 'Marie',
    nom: 'Dupont',
    pseudo: 'marie.dupont',
    email: 'marie.dupont@example.com',
    motDePasse: bcrypt.hashSync(userPassword, 10),
    telephone: '0600000002',
    role: 'client',
    statutValidationAdmin: 'approved',
    estActif: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateInscription: new Date(),
    inscriptionComplete: true,
    niveauPole: 'debutant',
    dateNaissance: new Date('1995-06-15'),
    adresse: {
      rue: '10 Rue Exemple',
      ville: 'Lille',
      codePostal: '59000',
      pays: 'France'
    }
  },
  {
    prenom: 'Sophie',
    nom: 'Martin',
    pseudo: 'sophie.martin',
    email: 'sophie.martin@example.com',
    motDePasse: bcrypt.hashSync(userPassword, 10),
    telephone: '0600000003',
    role: 'client',
    statutValidationAdmin: 'approved',
    estActif: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateInscription: new Date(),
    inscriptionComplete: true,
    niveauPole: 'intermediaire',
    dateNaissance: new Date('1992-03-22'),
    adresse: {
      rue: '20 Rue Exemple',
      ville: 'Béthune',
      codePostal: '62400',
      pays: 'France'
    }
  },
  {
    prenom: 'Julie',
    nom: 'Leroy',
    pseudo: 'julie.leroy',
    email: 'julie.leroy@example.com',
    motDePasse: bcrypt.hashSync(userPassword, 10),
    telephone: '0600000004',
    role: 'client',
    statutValidationAdmin: 'approved',
    estActif: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateInscription: new Date(),
    inscriptionComplete: true,
    niveauPole: 'avance',
    dateNaissance: new Date('1998-11-08')
  }
];

export default users;
