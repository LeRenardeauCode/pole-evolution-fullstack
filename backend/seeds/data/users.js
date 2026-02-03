import bcrypt from 'bcryptjs';

const users = [
  {
    prenom: 'Admin',
    nom: 'Pole Evolution',
    email: 'admin@poleevolution.com',
    motDePasse: bcrypt.hashSync('Admin123!', 10),
    telephone: '0612345678',
    role: 'admin',             
    isActive: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateAcceptationCGU: new Date(),
    dateAcceptationReglement: new Date(),
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
    email: 'marie.dupont@example.com',
    motDePasse: bcrypt.hashSync('User123!', 10),
    telephone: '0623456789',
    role: 'client',            
    isActive: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateAcceptationCGU: new Date(),
    dateAcceptationReglement: new Date(),
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
    email: 'sophie.martin@example.com',
    motDePasse: bcrypt.hashSync('User123!', 10),
    telephone: '0634567890',
    role: 'client',             
    isActive: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateAcceptationCGU: new Date(),
    dateAcceptationReglement: new Date(),
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
    email: 'julie.leroy@example.com',
    motDePasse: bcrypt.hashSync('User123!', 10),
    telephone: '0645678901',
    role: 'client',            
    isActive: true,
    emailVerifie: true,
    accepteCGU: true,
    accepteReglement: true,
    dateAcceptationCGU: new Date(),
    dateAcceptationReglement: new Date(),
    dateNaissance: new Date('1998-11-08')
  }
];

export default users;
