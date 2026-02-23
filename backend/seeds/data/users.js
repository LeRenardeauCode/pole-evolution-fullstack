import bcrypt from 'bcryptjs';

const users = [
  {
    prenom: 'Admin',
    nom: 'Pole Evolution',
    pseudo: 'admin',
    email: 'admin@poleevolution.com',
    motDePasse: bcrypt.hashSync('AdminPole123!', 10),
    telephone: '0612345678',
    role: 'admin',
    statutValidationAdmin: 'approved',
    estActif: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateInscription: new Date(),
    inscriptionComplete: true,
    adresse: {
      rue: '123 Rue de la Danse',
      ville: 'Lestrem',
      codePostal: '62136',
      pays: 'France'
    }
  },
  {
    prenom: 'Marie',
    nom: 'Dupont',
    pseudo: 'marie.dupont',
    email: 'marie.dupont@example.com',
    motDePasse: bcrypt.hashSync('UserPole1234!', 10),
    telephone: '0623456789',
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
      rue: '45 Avenue des Sports',
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
    motDePasse: bcrypt.hashSync('UserPole1234!', 10),
    telephone: '0634567890',
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
      rue: '78 Rue du Centre',
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
    motDePasse: bcrypt.hashSync('UserPole1234!', 10),
    telephone: '0645678901',
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
