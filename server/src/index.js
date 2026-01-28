require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/connectDB.js');
const { setCollections } = require('./collections/collections.js');
const { coffeesRouter } = require('./routes/coffees.routes.js');

const { usersRouter } = require('./routes/users.routes.js');

const app = express();

/** Environment Variables */
const PORT = process.env.PORT || 3000;

/** Middleware */
app.use(cors());

/** Parse JSON */
app.use(express.json());

/** Test Route */
app.get('/', (req, res) => {
  res.send('Coffee Shop API is running!');
});

/** Start Server after DB Connection */
const startServer = async () => {
  try {
    const client = await connectDB();

    /** Create a Reference to the Database */
    const myDB = client.db(process.env.MONGO_DATABASE_NAME);
    console.log('🗄 Database:', myDB.databaseName);

    /** Set Collections Globally */
    setCollections({
      coffees: myDB.collection('coffees'),
      users: myDB.collection('users'),
      orders: myDB.collection('orders'),
    });

    /** List Collections */
    const collections = await myDB.listCollections().toArray();
    console.log('📂 Collections in DB:');
    collections.forEach((c) => console.log(' -', c.name));

    /** Coffees Router */
    app.use('/', coffeesRouter);

    /** Users Router */
    app.use('/', usersRouter);

    /** Start the Server */
    app.listen(PORT, () => {
      console.log(
        `🚀 Coffee Monster Server is running at http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
