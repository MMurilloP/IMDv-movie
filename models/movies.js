const mongoose = require('mongoose');

const objectSchema ={
    id: {
        type: String, 
        required: true,
        unique: true               
    },
    fullTitle: {
        type: String, 
        required: true,
    },
    year: {
        type: String, 
        required: true,
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Sólo imágenes JPG o PNG"
        }
    },
    runtimeStr: {
        type: String, 
        required: true,
    },
    plot: {
        type: String, 
        required: true,
    },
    directors: {
        type: String, 
        required: true,
    },
    actorList: [{name:String}],
    genres: {
        type: String, 
        required: true,
    },
    imDbRating: {
        type: String, 
        required: true,
    },

    opinions: {
        type: String, 
        
    },//"LAS OPINIONES LAS OBTENEMOS CON SCRAPPING"
}


// Crear el esquema
const movieSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

/* 
{
    "id": "tt0110413",
    "fullTitle": "Léon: The Professional (1994)",
    "year": "1994",
    "image": "https://m.media-amazon.com/images/M/MV5BOTgyMWQ0ZWUtN2Q2MS00NmY0LWI3OWMtNjFkMzZlNDZjNTk0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6762_AL_.jpg",
    "runtimeStr": "1h 50min",
    "plot": "12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade.",
    "directors": "Luc Besson",
    "actorList": [],
    "genres": "Action, Crime, Drama",
    "imDbRating": "8.5",
    
    "opinions": "LAS OPINIONES LAS OBTENEMOS CON SCRAPPING"
    
    } */