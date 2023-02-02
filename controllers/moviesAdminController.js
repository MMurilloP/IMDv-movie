const Movie = require('../models/movies');
const uuid = require('uuid');
const uuid4 = uuid.v4();


const getAllMovies = async (req,res) => {
    let movies = await Movie.find({}, "-_id -__v")
    console.log(movies);
    //res.status(200).json(movies);
    res.render('moviesAdmin',{movies: movies})
    //return movies
    
} 

const createMovie = async (req,res) => {
    const {c_title, c_year, c_img, c_run, c_plot, c_dir, c_act, c_gen, c_rat} = req.body;
    

    try {
        let response = await new Movie({
                id: uuid.v4(),
                fullTitle: c_title,
                year: c_year,
                image: c_img,
                runtimeStr: c_run,
                plot: c_plot,
                directors: c_dir,
                actorList: c_act,
                genres: c_gen,
                imDbRating: c_rat,
                opinions: "",
            
        });
        let answer = await response.save();
        console.log("Respuesta de la API", answer);
        res.status(201).json({
            msj: `Película ${answer.fullTitle} guardada en el sistema con ID: ${answer.id}`,
            movie: answer,
        });
    } catch (error) {
        console.log("Este es el error que devuelve la api", error.message);
        res.status(400).json({
        msj: error.message,
    });
    }
}




const getData = async (req, res) => {
    const movie = await Movie.findOne({id: req.params.id});
    res.render('editMovie',{movie: movie})
    console.log(movie);

}


const editMovie = async (req, res) => {
    
    if (req.params.id) {

        const {e_title, e_year, e_img, e_run, e_plot, e_dir, e_act, e_gen, e_rat} = req.body;
        console.log(req.params.id);
        try {
              const filter = {id: req.params.id}
              console.log(filter);
              const update = {
                
                fullTitle: e_title,
                year: e_year,
                image: e_img,
                runtimeStr: e_run,
                plot: e_plot,
                directors: e_dir,
                actorList: e_act || "",
                genres: e_gen,
                imDbRating: e_rat,
                opinions: "",
                
            }
              //console.log(update);
              const doc = await Movie.findOneAndUpdate(filter,update);
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


  const deleteMovie = async (req,res)=>{
    Movie.findOneAndDelete({id: req.body.id }, function (err, docs) {
      if (err){
        res.status(400).json({
            msj: err.message,
        });
      }
      else{
        res.status(200).json({
            msj: "Película borrada : "+ docs,
        });
          
      }
  });
  } 


module.exports = {
    createMovie,
    editMovie,
    deleteMovie,
    getAllMovies,
    getData
}