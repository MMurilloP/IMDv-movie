const express = require('express');

const favoritesController = require("../controllers/favoritesController");
const favoritesRouter = express.Router();

favoritesRouter.post('/addfavorite', favoritesController.createFavorite)
favoritesRouter.get('/', favoritesController.getFavorites)
favoritesRouter.delete('/', favoritesController.deleteFavorites)

module.exports = favoritesRouter