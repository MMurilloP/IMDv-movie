const express = require('express');
const usuariosControllers = require('../controllers/usuariosControllers');
const usuarioRoutes = express.Router();

usuarioRoutes.post('/', usuariosControllers.createUsuario);
usuarioRoutes.get('/', usuariosControllers.geUsuarios);


module.exports = usuarioRoutes;