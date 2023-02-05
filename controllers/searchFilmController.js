const fetch = require("node-fetch")

// async function searchTitle(title) {
//     const result = await fetch(`https://imdb-api.com/en/API/SearchAll/k_b5wbsgtg/${button}`);
//     const database = await result.json();
//     const title = database.title;

//     for (let i = 0; i < title.length; i++) { containers(title[i]) }

// } searchTitle()
const searchTitle = async (req, res) => {
    const button = req.body.searching
    let data = await fetch (`https://imdb-api.com/en/API/SearchAll/k_b5wbsgtg/${button}`)
    console.log(button);
    // const results = await response.json()
    // if (!data) {
    //     res.status(400).json({
    //         msj: "Es necesario introducir una pelicula",
    //     });
    // }
    res.render('searchFilm',{movies:movies})
    // return results
}

module.exports = searchTitle