const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.cxax6la.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    if (!client.topology?.isConnected()) {
      await client.connect();
      console.log('✅ Connected to MongoDB');

      // 🟢 Optional: startup ping
      await client.db('admin').command({ ping: 1 });
      console.log(
        '✅ Pinged your deployment. You successfully connected to MongoDB!',
      );

      console.log(client.topology?.isConnected());
    }

    return client; // 🔑 reuse everywhere
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectDB };
