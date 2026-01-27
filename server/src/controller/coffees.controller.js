import { getCoffeesCollection } from '../collections/collections.js';
const coffeesCollection = getCoffeesCollection();
/** Add a new coffee */
const addCoffeeController = async (req, res) => {
  try {
    const coffeesCollection = getCoffeesCollection();
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

export { addCoffeeController, getAllCoffeesController };
