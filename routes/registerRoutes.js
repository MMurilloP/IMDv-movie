const express = require('express');
const registerController = require('../controllers/registerController');
const registerRoutes = express.Router();


registerRoutes.get('/', registerController.getRegister);
registerRoutes.post('/', registerController.postRegister);

module.exports = registerRoutes