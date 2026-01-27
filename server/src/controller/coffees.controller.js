import { getCoffeesCollection } from '../collections/collections.js';

const addCoffeeController = async (req, res) => {
  try {
    const coffeeData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const coffeesCollection = getCoffeesCollection();

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
      category: coffeeData.category,
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

export { addCoffeeController };
