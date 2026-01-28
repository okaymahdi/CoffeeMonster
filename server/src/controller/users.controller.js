import { getUsersCollection } from '../collections/collections.js';

/** Create New User in the Database */
const createUserController = async (req, res) => {
  try {
    const usersCollection = getUsersCollection();
    const userData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await usersCollection.insertOne(userData);
    res.json({
      insertedId: result.insertedId.toString(),
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { createUserController };
