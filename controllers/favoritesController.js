const users = require('../models/users_sql')

const addFavorites = async (req, res) => {
    let fav = req.body;
    const response = await users.addFavorite(fav);
    res.status(201).json({
        msg: response
    });
};

const getFavorites = async (req, res) => {
    let userData = req.oidc.user
    let userId = userData.sub
    const padding = "        "
    const padding2 ="    "
    // console.log("Este es el console.log de userData:"+userData)
    console.log("Este es el console.log de userId:"+userId)
    const userMoviesApi = await users.getFavorites(userId+padding);
    const userMoviesMongo = await users.getFavorites(userId+padding2);
    res.status(200).render("moviesUser", { favMoviesApi: userMoviesApi, favMongoMovies: userMoviesMongo });
};


module.exports = {
    addFavorites,
    getFavorites
}