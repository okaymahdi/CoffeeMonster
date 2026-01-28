const express = require('express');
const { createUserController } = require('../controller/users.controller.js');

const usersRouter = express.Router();

usersRouter.post('/users', createUserController);

exports.usersRouter = usersRouter;
