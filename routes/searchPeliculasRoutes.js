const express = require('express');
const searchPeliculasController = require('../controllers/searchPeliculasController');
const searchPeliculasRoutes = express.Router();


searchPeliculasRoutes.get('/', searchPeliculasController.getSearch);
searchPeliculasRoutes.post('/', searchPeliculasController.getPelicula);

module.exports = searchPeliculasRoutes