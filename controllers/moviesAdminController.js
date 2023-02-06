const Movie = require('../models/movies')
const uuid = require('uuid');
const uuid4 = uuid.v4();

/* 
const getAllMovies = async (req,res) => {
    let products = await Movie.find({}, "-_id -__v")
    res.status(200).json(products);
} */

const createMovie = async (req, res) => {
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
            msj: error.messagtypescript.selectTypeScriptVersione,
        });
    }
}

const editMovie = async (req, res) => {

    if (req.params.id) {
        // con _id --> title no funciona
        console.log(req.params.id);
        const newData = req.body;
        try {
            const filter = { id: req.params.id }
            console.log(filter);
            const update = {

                fullTitle: newData.fullTitle,
                year: newData.year,
                image: newData.image,
                runtimeStr: newData.runtimeStr,
                plot: newData.plot,
                directors: newData.directors,
                actorList: newData.actorList,
                genres: newData.genres,
                imDbRating: newData.imDbRating,
                opinions: newData.opinions,

            }
            console.log(update);
            const doc = await Movie.findOneAndUpdate(filter, update);
            let response = await doc.save();

            res.status(200).json({
                msj: "Película actualizada " + response.fullTitle,
            });
        } catch (err) {
            res.status(400).json({
                msj: err.message,
            });
        }
    } else {
        res.status(400).json({
            msj: "Es necesario introducir el ID de la película para actualizarla",
        });
    }
};


const deleteMovie = async (req, res) => {
    Movie.findOneAndDelete({ id: req.body.id }, function (err, docs) {
        if (err) {
            res.status(400).json({
                msj: err.message,
            });
        }
        else {
            res.status(200).json({
                msj: "Película borrada : " + docs,
            });

        }
    });
}


module.exports = {
    createMovie,
    editMovie,
    deleteMovie
    //getAllMovies
}