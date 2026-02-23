import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import users from './data/users.js';
import cours from './data/cours.js';
import forfaits from './data/forfaits.js';
import parametres from './data/parametres.js';
import Utilisateur from '../models/Utilisateur.js';
import Cours from '../models/Cours.js';
import Forfait from '../models/Forfait.js';
import Parametre from '../models/Parametre.js';
import Avis from '../models/Avis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CHARGER .env UNIQUEMENT (pas .env.local) pour forcer Atlas
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedAtlas = async () => {
  try {
    // Connexion à MongoDB Atlas
    console.log('🔄 Connexion à MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB Atlas');

    // Suppression des données existantes
    console.log('\n🗑️  Suppression des données existantes...');
    await Utilisateur.deleteMany({});
    await Cours.deleteMany({});
    await Forfait.deleteMany({});
    await Parametre.deleteMany({});
    await Avis.deleteMany({});
    console.log('✅ Données supprimées');

    // Import des nouvelles données
    console.log('\n📥 Import des nouvelles données...');
    
    // Utilisateurs
    const createdUsers = await Utilisateur.insertMany(users);
    console.log(`   ✅ ${createdUsers.length} utilisateurs créés`);

    // Forfaits
    const createdForfaits = await Forfait.insertMany(forfaits);
    console.log(`   ✅ ${createdForfaits.length} forfaits créés`);

    // Cours
    const createdCours = await Cours.insertMany(cours);
    console.log(`   ✅ ${createdCours.length} cours créés`);

    // Paramètres
    const createdParams = await Parametre.insertMany(parametres);
    console.log(`   ✅ ${createdParams.length} paramètres créés`);

    // Avis
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
      },
      {
        utilisateur: createdUsers[1]._id,
        cours: createdCours[1]._id,
        note: 5,
        titre: 'Ambiance géniale',
        commentaire: 'On se sent tout de suite à l\'aise. Le studio est propre, bien équipé et Coraline met vraiment en confiance dès le premier cours.',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      },
      {
        utilisateur: createdUsers[2]._id,
        cours: createdCours[1]._id,
        note: 4,
        titre: 'Idéal pour se dépasser',
        commentaire: 'Je n\'aurais jamais pensé tenir sur une barre et pourtant ! Les exercices sont progressifs et on voit vite les résultats.',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      },
      {
        utilisateur: createdUsers[3]._id,
        cours: createdCours[0]._id,
        note: 5,
        titre: 'Un vrai moment pour soi',
        commentaire: 'Chaque séance est un moment de lâcher-prise total. On travaille le corps et l\'esprit dans une atmosphère bienveillante.',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      },
      {
        utilisateur: createdUsers[1]._id,
        cours: createdCours[0]._id,
        note: 4,
        titre: 'Accessible à toutes',
        commentaire: 'Peu importe votre âge ou votre condition physique, Coraline adapte les exercices. J\'y vais chaque semaine avec plaisir !',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      },
      {
        utilisateur: createdUsers[3]._id,
        cours: createdCours[1]._id,
        note: 5,
        titre: 'Cours intermédiaire au top',
        commentaire: 'Après 6 mois de pratique, le niveau intermédiaire m\'a permis de débloquer des figures que je pensais impossibles. Merci Coraline !',
        statut: 'approuve',
        estVerifie: true,
        estPublic: true,
        datePublication: new Date()
      }
    ];
    const createdAvis = await Avis.insertMany(avis);
    console.log(`   ✅ ${createdAvis.length} avis créés`);

    console.log('\n✨ SEED ATLAS TERMINÉ AVEC SUCCÈS !');
    console.log(`\n📊 Résumé:`);
    console.log(`Utilisateurs: ${createdUsers.length}`);
    console.log(`Cours: ${createdCours.length}`);
    console.log(`Forfaits: ${createdForfaits.length}`);
    console.log(`Paramètres: ${createdParams.length}`);
    console.log(`Avis: ${createdAvis.length}`);

    console.log(`\n📝 Comptes de test créés:`);
    console.log(`Admin:  admin@poleevolution.com / AdminPole123!`);
    console.log(`User 1: marie.dupont@example.com / UserPole1234!`);
    console.log(`User 2: sophie.martin@example.com / UserPole1234!`);
    console.log(`User 3: julie.leroy@example.com / UserPole1234!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedAtlas();
