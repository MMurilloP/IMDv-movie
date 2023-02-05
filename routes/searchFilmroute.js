const express = require('express');
const searchController = require('../controllers/searchFilmController');
const searchRouter = express.Router();

searchRouter.get("/search",searchController);

module.exports = searchRouter