import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

const run = async () => {
  try {
    console.log('\n🔐 Insertion d\'un compte admin sur Atlas\n');

    // Récupérer les infos
    const mongoUri = await question('MongoDB Connection String (Enter pour utiliser .env): ');
    const email = await question('Email admin (défaut: admin@poleevolution.com): ') || 'admin@poleevolution.com';
    const password = await question('Mot de passe admin: ');
    const password2 = await question('Confirmer le mot de passe: ');

    if (password !== password2) {
      console.error('❌ Les mots de passe ne correspondent pas !');
      process.exit(1);
    }

    const uri = mongoUri || process.env.MONGO_URI;
    if (!uri) {
      console.error('❌ Erreur: MONGO_URI non trouvé et pas fourni !');
      process.exit(1);
    }

    console.log('\n⏳ Connexion à MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connecté à Atlas\n');

    const db = mongoose.connection.db;
    const collection = db.collection('utilisateurs');

    // Vérifier si le compte existe déjà
    const existing = await collection.findOne({ email });
    if (existing) {
      console.log(`⚠️  Un compte avec l'email ${email} existe déjà !`);
      const replace = await question('Voulez-vous le remplacer ? (oui/non): ');
      if (replace.toLowerCase() !== 'oui') {
        console.log('❌ Annulé');
        process.exit(0);
      }
      await collection.deleteOne({ email });
      console.log('✅ Ancien compte supprimé\n');
    }

    // Créer le nouvel admin
    const hashedPassword = bcrypt.hashSync(password, 10);
    const adminUser = {
      prenom: 'Admin',
      nom: 'Pôle Evolution',
      pseudo: 'admin',
      email,
      motDePasse: hashedPassword,
      telephone: '',
      role: 'admin',
      statutValidationAdmin: 'approved',
      estActif: true,
      emailVerifie: true,
      accepteCGU: true,
      accepteReglement: true,
      dateInscription: new Date(),
      inscriptionComplete: true,
      adresse: {
        rue: '',
        ville: '',
        codePostal: '',
        pays: 'France'
      }
    };

    const result = await collection.insertOne(adminUser);
    console.log('✅ Compte admin créé avec succès !\n');
    console.log('📋 Détails:');
    console.log(`   Email: ${email}`);
    console.log(`   ID MongoDB: ${result.insertedId}`);
    console.log(`   Rôle: admin`);
    console.log(`\n✨ Vous pouvez maintenant vous connecter sur https://poleevolution.com\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

run();
