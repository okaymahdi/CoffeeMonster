const { ObjectId } = require('mongodb');
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

/** Update User Last SignIn Time Controller */
const updateLastSignInTimeController = async (req, res) => {
  const { email, lastSignInTime } = req.body;
  const filter = { email: email };
  const updateDoc = {
    $set: {
      lastSignInTime: lastSignInTime,
    },
  };
  try {
    const usersCollection = getUsersCollection();
    const result = await usersCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Get All Users Controller */
const getAllUsersController = async (req, res) => {
  try {
    const usersCollection = getUsersCollection();
    const cursor = await usersCollection.find();
    const users = await cursor.toArray();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Delete a User */
const deleteUserController = async (req, res) => {
  try {
    const usersCollection = getUsersCollection();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  createUserController,
  updateLastSignInTimeController,
  getAllUsersController,
  deleteUserController,
};
