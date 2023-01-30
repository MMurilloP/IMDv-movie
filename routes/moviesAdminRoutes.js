const express = require('express');
const movieAdminController = require('../controllers/moviesAdminController');
const movieAdminRouter = express.Router();


movieAdminRouter.post('/create',movieAdminController.createMovie);

module.exports = movieAdminRouter;