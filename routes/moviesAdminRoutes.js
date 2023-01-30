const express = require('express');
const movieAdminController = require('../controllers/moviesAdminController');
const movieAdminRouter = express.Router();


movieAdminRouter.post('/create',movieAdminController.createMovie);
movieAdminRouter.get('/',movieAdminController.getAllMovies);

module.exports = movieAdminRouter;