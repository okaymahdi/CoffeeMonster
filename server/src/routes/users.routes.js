const express = require('express');
const {
  createUserController,
  getAllUsersController,
} = require('../controller/users.controller.js');

const usersRouter = express.Router();

/** Create New User */
usersRouter.post('/users', createUserController);

/** Get All Users */
usersRouter.get('/users', getAllUsersController);

exports.usersRouter = usersRouter;
