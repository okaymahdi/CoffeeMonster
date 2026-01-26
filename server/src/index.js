const express = require('express');
const cors = require('cors');
const { connectDB } = require('../Config/ConnectDB.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Coffee Shop API is running!');
});

const startServer = async () => {
  try {
    const client = await connectDB();
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
