const express = require('express');
const {
  createUserController,
  getAllUsersController,
  deleteUserController,
} = require('../controller/users.controller.js');

const usersRouter = express.Router();

/** Create New User */
usersRouter.post('/users', createUserController);

/** Get All Users */
usersRouter.get('/users', getAllUsersController);

/** Delete a User */
usersRouter.delete('/users/:id', deleteUserController);

exports.usersRouter = usersRouter;
