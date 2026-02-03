import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// Models
import User from '../models/Utilisateur.js';
import Cours from '../models/Cours.js';
import Forfait from '../models/Forfait.js';
import Reservation from '../models/Reservation.js';
import Avis from '../models/Avis.js';
import Media from '../models/Media.js';
import Parametre from '../models/Parametre.js';
import MessageContact from '../models/MessageContact.js';
import Notification from '../models/Notification.js';

// Data
import users from './data/users.js';
import cours from './data/cours.js';
import forfaits from './data/forfaits.js';
import parametres from './data/parametres.js';

dotenv.config();

// Connexion DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté'.green);
  } catch (error) {
    console.error(`❌ Erreur connexion: ${error.message}`.red);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log('\n🗑️  Suppression des données existantes...'.yellow.bold);
    
    // Supprimer toutes les collections
    await User.deleteMany();
    await Cours.deleteMany();
    await Forfait.deleteMany();
    await Reservation.deleteMany();
    await Avis.deleteMany();
    await Media.deleteMany();
    await Parametre.deleteMany();
    await MessageContact.deleteMany();
    await Notification.deleteMany();

    console.log('✅ Données supprimées\n'.green);

    console.log('📦 Import des nouvelles données...'.cyan.bold);

    // 1. Utilisateurs
    const createdUsers = await User.insertMany(users);
    console.log(`   ✅ ${createdUsers.length} utilisateurs créés`.green);

    // 2. Forfaits
    const createdForfaits = await Forfait.insertMany(forfaits);
    console.log(`   ✅ ${createdForfaits.length} forfaits créés`.green);

    // 3. Cours (avec professeur = admin)
    const coursWithInstructor = cours.map(c => ({
      ...c,
      professeur: createdUsers[0]._id
    }));
    const createdCours = await Cours.insertMany(coursWithInstructor);
    console.log(`   ✅ ${createdCours.length} cours créés`.green);

    // 4. Réservations (exemples)
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

    // 5. Avis
    const avis = [
      {
        utilisateur: createdUsers[1]._id,
        cours: createdCours[0]._id,
        note: 5,
        titre: 'Cours exceptionnel !',
        commentaire: 'Instructrice très pédagogue, ambiance au top ! Je recommande à 100%.',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      },
      {
        utilisateur: createdUsers[2]._id,
        cours: createdCours[0]._id,
        note: 4,
        titre: 'Très bon cours',
        commentaire: 'Parfait pour les débutants, j\'ai adoré découvrir cette discipline.',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      },
      {
        utilisateur: createdUsers[3]._id,
        cours: createdCours[1]._id,
        note: 5,
        titre: 'Super progression',
        commentaire: 'Le niveau intermédiaire permet vraiment de progresser rapidement.',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      }
    ];
    const createdAvis = await Avis.insertMany(avis);
    console.log(`   ✅ ${createdAvis.length} avis créés`.green);

    // 6. Paramètres
    const createdParametres = await Parametre.insertMany(parametres);
    console.log(`   ✅ ${createdParametres.length} paramètres créés`.green);

    console.log('\n🎉 SEED TERMINÉ AVEC SUCCÈS ! 🎉\n'.green.bold);
    console.log('📊 Résumé:'.cyan.bold);
    console.log(`   👥 Utilisateurs: ${createdUsers.length}`.white);
    console.log(`   🎓 Cours: ${createdCours.length}`.white);
    console.log(`   🎟️  Forfaits: ${createdForfaits.length}`.white);
    console.log(`   📅 Réservations: ${createdReservations.length}`.white);
    console.log(`   ⭐ Avis: ${createdAvis.length}`.white);
    console.log(`   ⚙️  Paramètres: ${createdParametres.length}`.white);
    
    console.log('\n📝 Comptes de test créés:'.cyan.bold);
    console.log('   🔑 Admin:  admin@poleevolution.com / Admin123!'.yellow);
    console.log('   👤 User 1: marie.dupont@example.com / User123!'.yellow);
    console.log('   👤 User 2: sophie.martin@example.com / User123!'.yellow);
    console.log('   👤 User 3: julie.leroy@example.com / User123!'.yellow);
    
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

    console.log('🗑️  Suppression de toutes les données...'.yellow.bold);
    
    await User.deleteMany();
    await Cours.deleteMany();
    await Forfait.deleteMany();
    await Reservation.deleteMany();
    await Avis.deleteMany();
    await Media.deleteMany();
    await Parametre.deleteMany();
    await MessageContact.deleteMany();
    await Notification.deleteMany();

    console.log('✅ Toutes les données ont été supprimées'.green.bold);
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
