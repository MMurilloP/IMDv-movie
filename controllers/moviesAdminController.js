const Movie = require('../models/movies')
const uuid = require('uuid');
const uuid4 = uuid.v4();

const createMovie = async (req,res) => {
    const newMovie = req.body;
    const id = uuid4

    try {
        let response = await new Movie({
            id: id,
            fullTitle: newMovie.fullTitle,
            year: newMovie.year,
            image: newMovie.image,
            runtimeStr: newMovie.runtimeStr,
            plot: newMovie.plot,
            directors: newMovie.directors,
            actorList: newMovie.actorList,
            genres: newMovie.genres,
            imDbRating: newMovie.imDbRating,
            opinions: newMovie.opinions,
            
        });
        let answer = await response.save();
        console.log("Respuesta de la API", answer);
        res.status(201).json({
            msj: `Película ${answer.fullTitle} guardada en el sistema con ID: ${answer.id}`,
            product: answer,
        });
    } catch (error) {
        console.log("Este es el error que devuelve la api", error.message);
        res.status(400).json({
        msj: error.message,
    });
    }
}

module.exports = {
    createMovie
}