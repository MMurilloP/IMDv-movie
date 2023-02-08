const express = require('express');

const userCrontrolers = require("../controllers/favoritesController");
const userRouter = express.Router();

userRouter.post('/', favoritesController.addFavorite)
userRouter.get('/', favoritesController.getFavorites)

module.exports = userRouter