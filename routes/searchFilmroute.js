const express = require('express');
const searchController = require('../controllers/searchFilmController');
const searchRouter = express.Router();

searchRouter.post("/search",searchController.searchTitle);
searchRouter.get("/search",searchController.getData);

module.exports = searchRouter