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

    console.log('\n✨ SEED ATLAS TERMINÉ AVEC SUCCÈS !');
    console.log(`\n📊 Résumé:`);
    console.log(`Utilisateurs: ${createdUsers.length}`);
    console.log(`Cours: ${createdCours.length}`);
    console.log(`Forfaits: ${createdForfaits.length}`);
    console.log(`Paramètres: ${createdParams.length}`);

    console.log(`\n📝 Comptes de test créés:`);
    console.log(`Admin:  admin@poleevolution.com / Admin123!`);
    console.log(`User 1: marie.dupont@example.com / User123!`);
    console.log(`User 2: sophie.martin@example.com / User123!`);
    console.log(`User 3: julie.leroy@example.com / User123!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedAtlas();
