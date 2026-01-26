import { getCoffeesCollection } from '../collections/collections.js';

const addCoffeeController = async (req, res) => {
  try {
    const coffeeData = req.body;
    console.log(coffeeData);

    const coffeesCollection = getCoffeesCollection();
    const result = await coffeesCollection.insertOne(coffeeData);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export { addCoffeeController };
