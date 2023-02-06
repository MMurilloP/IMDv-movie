const express = require('express');
const loginController = require('../controllers/loginController');
const loginRoutes = express.Router();


loginRoutes.get('/', loginController.getLogin);
loginRoutes.post('/', loginController.postLogin);

module.exports = loginRoutes