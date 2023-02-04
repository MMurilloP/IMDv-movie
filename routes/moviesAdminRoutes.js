const express = require('express');
const movieAdminController = require('../controllers/moviesAdminController');
const movieAdminRouter = express.Router();


movieAdminRouter.post('/createMovie',movieAdminController.createMovie);

movieAdminRouter.get('/editMovie/:id',movieAdminController.getData);

movieAdminRouter.put('/editMovie/:id',movieAdminController.editMovie);
//http://localhost:3000/admin/editMovie/63e13020-22f0-4c55-b6c2-8a6bc691d0da
movieAdminRouter.delete('/removeMovie',movieAdminController.removeMovie);

movieAdminRouter.get('/',movieAdminController.getAllMovies);

module.exports = movieAdminRouter;