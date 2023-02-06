const fetch = require("node-fetch")

//https://www.omdbapi.com/?t=Batman&apikey=fae1531d

//http://www.omdbapi.com/?t=${req.params.title}&apikey=${API_KEY}

//https://imdb-api.com/en/API/SearchAll/k_b5wbsgtg/${button}

// const searchTitle = async (req, res) => {
//     const {valorInput} = req.body
//     let movies = await fetch (`https://www.omdbapi.com/?t=${valorInput}&apikey=fae1531d`)
    
//     console.log(movies);
//     // const results = await response.json()
//     // if (!data) {
//     //     res.status(400).json({
//     //         msj: "Es necesario introducir una pelicula",
//     //     });
//     // }
//     res.render('searchFilm',movies)
//     // return results
// }



const getData = async (req, res) => {
    res.render('searchFilm',{movies:null})

}

const searchTitle = async (req, res) => {
    const {valorInput} = req.body
    let movies = await fetch (`https://imdb-api.com/en/API/SearchAll/k_b5wbsgtg/${valorInput}`)
    
    console.log(movies);
    console.log("**********************");
    console.log(req.body);
    // const results = await response.json()
    // if (!data) {
    //     res.status(400).json({
    //         msj: "Es necesario introducir una pelicula",
    //     });
    // }
    res.render('searchFilm', {movies: movies})
    // return results
}

module.exports = {
    searchTitle,
    getData
}