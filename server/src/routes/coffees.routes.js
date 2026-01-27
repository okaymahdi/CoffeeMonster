const express = require('express');
const {
  addCoffeeController,
  getAllCoffeesController,
  deleteCoffeeController,
  getSingleCoffeeByIdController,
} = require('../controller/coffees.controller');

const coffeesRouter = express.Router();

coffeesRouter.post('/add-coffee', addCoffeeController);

coffeesRouter.get('/coffees', getAllCoffeesController);

coffeesRouter.get('/coffee/:id', getSingleCoffeeByIdController);

coffeesRouter.delete('/coffee/:id', deleteCoffeeController);

exports.coffeesRouter = coffeesRouter;
