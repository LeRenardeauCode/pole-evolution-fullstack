import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connecté: ${conn.connection.host}`);
    console.log(`Base de données: ${conn.connection.name}`);
    
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`Collections (${collections.length}) : ${collections.map(c => c.name).join(', ')}`);

  } catch (error) {
    console.error(`Erreur connexion MongoDB: ${error.message}`);
    process.exit(1); // Arrête serveur si échec connexion
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\n Déconnexion MongoDB (SIGINT)');
  process.exit(0);
});

export default connectDB;