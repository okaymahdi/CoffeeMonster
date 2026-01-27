const express = require('express');
const {
  addCoffeeController,
  getAllCoffeesController,
} = require('../controller/coffees.controller');

const coffeesRouter = express.Router();

coffeesRouter.post('/add-coffee', addCoffeeController);

coffeesRouter.get('/coffees', getAllCoffeesController);

exports.coffeesRouter = coffeesRouter;
