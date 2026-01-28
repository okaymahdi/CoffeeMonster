const { ObjectId } = require('mongodb');
const { getCoffeesCollection } = require('../collections/collections');

/** Add a new coffee */
const addCoffeeController = async (req, res) => {
  try {
    const coffeesCollection = getCoffeesCollection();

    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity)) {
      return res.status(400).json({ message: 'Quantity must be a number' });
    }
    const price = parseFloat(req.body.price);
    if (isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a number' });
    }
    const coffeeData = {
      ...req.body,
      price: price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(coffeeData);

    await coffeesCollection.createIndex(
      { name: 1, supplier: 1, taste: 1, category: 1, details: 1, photo: 1 },
      { unique: true },
    );

    if (coffeeData.photo) {
      coffeeData.photo = coffeeData.photo.trim().replace(/\/+$/, '');
    }
    /** Check if the coffee already exists */
    const isExistingCoffee = await coffeesCollection.findOne({
      name: coffeeData.name,
      quantity: coffeeData.quantity,
      supplier: coffeeData.supplier,
      taste: coffeeData.taste,
      price: coffeeData.price,
      details: coffeeData.details,
      photo: coffeeData.photo,
    });

    if (isExistingCoffee) {
      return res.status(409).json({
        message: 'This coffee already exists!',
      });
    }

    const result = await coffeesCollection.insertOne(coffeeData);

    res.json({
      insertedId: result.insertedId.toString(),
      ...coffeeData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Get All Coffees */
const getAllCoffeesController = async (req, res) => {
  try {
    const coffeesCollection = getCoffeesCollection();
    const cursor = await coffeesCollection.find({});
    const coffees = await cursor.toArray();
    res.json(coffees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Get Single Coffee */
const getSingleCoffeeByIdController = async (req, res) => {
  try {
    const coffeesCollection = getCoffeesCollection();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const coffee = await coffeesCollection.findOne(query);
    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' });
    }
    res.json(coffee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Update a Coffee */
const updateCoffeeController = async (req, res) => {
  try {
    const coffeesCollection = getCoffeesCollection();
    const id = req.params.id;

    // invalid id check
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid coffee id' });
    }

    const query = { _id: new ObjectId(id) };

    // find existing coffee
    const coffee = await coffeesCollection.findOne(query);
    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' });
    }

    // check if any real change happened
    const hasChanges = Object.keys(req.body).some(
      (key) => req.body[key] !== coffee[key],
    );

    if (!hasChanges) {
      return res.status(400).json({ message: 'No changes made' });
    }

    // prepare update data
    const updatedDoc = {
      $set: {
        ...req.body,
        updatedAt: new Date(),
      },
    };

    const result = await coffeesCollection.updateOne(query, updatedDoc);

    res.json({
      message: 'Coffee updated successfully',
      modifiedCount: result.modifiedCount,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/** Delete a coffee */
const deleteCoffeeController = async (req, res) => {
  try {
    const coffeesCollection = getCoffeesCollection();
    const id = req.params.id;

    // MongoDB ObjectId conversion
    const query = { _id: new ObjectId(id) };

    const result = await coffeesCollection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Coffee not found' });
    }

    // Send deletedCount to frontend
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  addCoffeeController,
  deleteCoffeeController,
  getAllCoffeesController,
  getSingleCoffeeByIdController,
  updateCoffeeController,
};
