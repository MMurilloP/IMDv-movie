const peliculasModel = require('../models/peliculasModels')


  const getPeliculas = async (req, res) => {
    let peliculas;
    if (req.query) {
        peliculas = await peliculasModel.getPeliculas(req.query);
    }
    else {
        // peliculas = await peliculasModel.getAllEntries();
    }
    res.status(200).json(peliculas); // [] con las entries encontradas
}

  module.exports ={
    getPeliculas,
  }