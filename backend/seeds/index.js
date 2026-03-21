import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import User from '../models/Utilisateur.js';
import Cours from '../models/Cours.js';
import Forfait from '../models/Forfait.js';
import Reservation from '../models/Reservation.js';
import Avis from '../models/Avis.js';
import Media from '../models/Media.js';
import Parametre from '../models/Parametre.js';
import MessageContact from '../models/MessageContact.js';
import Notification from '../models/Notification.js';

import users from './data/users.js';
import cours from './data/cours.js';
import forfaits from './data/forfaits.js';
import parametres from './data/parametres.js';
import avis from './data/avis.js';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const mongoUri = process.env.MONGO_URI || '';
const isAtlas = mongoUri.includes('mongodb+srv') || mongoUri.includes('mongodb.net');

const connectDB = async () => {
  // Sécurité : bloquer le seed complet sur une BDD Atlas (prod)
  if (isAtlas && !isProduction) {
    console.error('\n⛔ SÉCURITÉ : Vous êtes connecté à MongoDB Atlas !'.red.bold);
    console.error('Le seed dev ne peut pas tourner sur la BDD de production.'.red);
    console.error('Utilisez une BDD locale : MONGO_URI=mongodb://localhost:27017/poleevolution'.yellow);
    console.error('Ou lancez avec NODE_ENV=production pour ne seeder que forfaits + paramètres.\n'.yellow);
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connecté (${isAtlas ? 'Atlas' : 'local'})`.green);
  } catch (error) {
    console.error(`Erreur connexion: ${error.message}`.red);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log('\nSuppression des données existantes...'.yellow.bold);
    
    // Supprimer les collections essentielles en prod
    await Forfait.deleteMany();
    await Parametre.deleteMany();

    // Supprimer les données de test uniquement en dev
    if (!isProduction) {
      await User.deleteMany();
      await Cours.deleteMany();
      await Reservation.deleteMany();
      await Avis.deleteMany();
      await Media.deleteMany();
      await MessageContact.deleteMany();
      await Notification.deleteMany();
    }

    console.log('Données supprimées\n'.green);

    console.log('Import des nouvelles données...'.cyan.bold);

    // Importer les données essentielles (prod + dev)
    const createdForfaits = await Forfait.insertMany(forfaits);
    console.log(`   ✅ ${createdForfaits.length} forfaits créés`.green);

    const createdParametres = await Parametre.insertMany(parametres);
    console.log(`   ✅ ${createdParametres.length} paramètres créés`.green);

    // Importer les données de test uniquement en dev
    if (!isProduction) {
      const createdUsers = await User.insertMany(users);
      console.log(`   ✅ ${createdUsers.length} utilisateurs créés`.green);

      const coursWithInstructor = cours.map(c => ({
        ...c,
        professeur: createdUsers[0]._id
      }));
      const createdCours = await Cours.insertMany(coursWithInstructor);
      console.log(`   ✅ ${createdCours.length} cours créés`.green);

      const reservations = [
        {
          utilisateur: createdUsers[1]._id,
          cours: createdCours[0]._id,
          forfait: createdForfaits[0]._id,
          statut: 'confirmee',
          dateReservation: new Date()
        },
        {
          utilisateur: createdUsers[1]._id,
          cours: createdCours[1]._id,
          forfait: createdForfaits[0]._id,
          statut: 'confirmee',
          dateReservation: new Date()
        },
        {
          utilisateur: createdUsers[2]._id,
          cours: createdCours[0]._id,
          forfait: createdForfaits[1]._id,
          statut: 'en_attente',
          dateReservation: new Date()
        }
      ];
      const createdReservations = await Reservation.insertMany(reservations);
      console.log(`   ✅ ${createdReservations.length} réservations créées`.green);

      const avisData = avis.map(a => {
        const user = createdUsers.find(u => u.email === a.userEmail);
        const userCours = createdCours[a.coursIndex];
        const { userEmail, coursIndex, ...rest } = a;
        return {
          ...rest,
          utilisateur: user._id,
          cours: userCours._id
        };
      });

      const createdAvis = await Avis.insertMany(avisData);
      console.log(`   ✅ ${createdAvis.length} avis créés`.green);

      console.log('\n✅ SEED DEV TERMINÉ AVEC SUCCÈS !\n'.green.bold);
      console.log('Résumé:'.cyan.bold);
      console.log(`Utilisateurs: ${createdUsers.length}`.white);
      console.log(`Cours: ${createdCours.length}`.white);
      console.log(`Forfaits: ${createdForfaits.length}`.white);
      console.log(`Réservations: ${createdReservations.length}`.white);
      console.log(`Avis: ${createdAvis.length}`.white);
      console.log(`Paramètres: ${createdParametres.length}`.white);
      
      console.log('\n📝 Comptes de test créés:'.cyan.bold);
      const adminPwd = process.env.SEED_ADMIN_PASSWORD || 'DevTest123!';
      console.log(`Admin:  admin@test.local / ${adminPwd}`.yellow);
      console.log('User 1: marie.dupont@example.com / UserTest123!'.yellow);
      console.log('User 2: sophie.martin@example.com / UserTest123!'.yellow);
      console.log('User 3: julie.leroy@example.com / UserTest123!'.yellow);
    } else {
      console.log('\n✅ SEED PRODUCTION TERMINÉ AVEC SUCCÈS !\n'.green.bold);
      console.log('Résumé:'.cyan.bold);
      console.log(`Forfaits: ${createdForfaits.length}`.white);
      console.log(`Paramètres: ${createdParametres.length}`.white);
      console.log('(Données métier essentielles seulement)'.yellow);
    }
    
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ ERREUR: ${error.message}`.red.bold);
    console.error(error.stack);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    console.log('Suppression de toutes les données...'.yellow.bold);
    
    await Forfait.deleteMany();
    await Parametre.deleteMany();

    if (!isProduction) {
      await User.deleteMany();
      await Cours.deleteMany();
      await Reservation.deleteMany();
      await Avis.deleteMany();
      await Media.deleteMany();
      await MessageContact.deleteMany();
      await Notification.deleteMany();
    }

    console.log('Toutes les données ont été supprimées'.green.bold);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// CLI
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
