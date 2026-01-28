const { getUsersCollection } = require('../collections/collections.js');

const bcrypt = require('bcrypt');

/** Create New User in the Database */
const createUserController = async (req, res) => {
  try {
    const usersCollection = getUsersCollection();
    const { password, ...rest } = req.body;

    /** Password Hash */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    rest.password = hashedPassword;

    const userData = {
      ...rest,
    };
    const result = await usersCollection.insertOne(userData);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Get All Users Controller */
const getAllUsersController = async (req, res) => {
  const usersCollection = getUsersCollection();
  const users = await usersCollection.find({}).toArray();
  res.send(users);
};

module.exports = { createUserController, getAllUsersController };
