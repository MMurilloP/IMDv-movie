const express = require('express');
const opinionesController = require('../controllers/opinionesController');
const opinionesRoutes = express.Router();


opinionesRoutes.get('/:title', opinionesController.sensacineOpiniones);
// opinionesRoutes.post('/:title', opinionesController.postOpiniones);



module.exports = opinionesRoutes