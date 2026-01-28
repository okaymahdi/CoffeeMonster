const express = require('express');
const {
  addCoffeeController,
  getAllCoffeesController,
  deleteCoffeeController,
  getSingleCoffeeByIdController,
  updateCoffeeController,
} = require('../controller/coffees.controller');

const coffeesRouter = express.Router();

coffeesRouter.post('/add-coffee', addCoffeeController);

coffeesRouter.get('/coffees', getAllCoffeesController);

coffeesRouter.get('/coffee/:id', getSingleCoffeeByIdController);

coffeesRouter.put('/coffee/:id', updateCoffeeController);

coffeesRouter.delete('/coffee/:id', deleteCoffeeController);

module.exports = { coffeesRouter };
