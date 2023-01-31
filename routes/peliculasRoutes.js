const express = require('express');
const peliculasControllers = require('../controllers/peliculasControllers');
const peliculasRoutes = express.Router();

peliculasRoutes.get('/', peliculasControllers.getPeliculas);


module.exports = peliculasRoutes;