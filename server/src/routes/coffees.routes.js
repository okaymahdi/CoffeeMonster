const express = require('express');
const { addCoffeeController } = require('../controller/coffees.controller');

const coffeesRouter = express.Router();

coffeesRouter.post('/add-coffee', addCoffeeController);

exports.coffeesRouter = coffeesRouter;
