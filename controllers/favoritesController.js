const models = require('../models/favoriteModels');
const fetch = require('node-fetch')

const getFavorites = async (req, res) => {
    const id_usuario = req.decoded.userLog.rows[0].id_usuario
    const apiKey = "k_sjtp9i78";
    let favoritos;
    if (id_usuario) {
        favoritos = await models.getAllFavorites(id_usuario);
        if (favoritos.length <= 0) {
            res.status(400).json({ msj: `No existen peliculas asociadas a este email` });
        } else {
            const ids = favoritos.map(favorito => favorito.nombre);
            const urls = [];
            for (let i = 0; i < ids.length; i++) {
                const apiKey = "k_sjtp9i78";
                const url = `https://imdb-api.com/en/API/Title/${apiKey}/${ids[i]}`
                urls.push(url)
            }
                const detallePeliculasFavoritos = await Promise.all(urls.map(async url => {
                    const resp = await fetch(url);
                    return resp.json();
                }));
                res.status(400).render("favorite", { detallePeliculasFavoritos });

            }
        }
    }



const createFavorite = async (req, res) => {
    const id_usuario = req.decoded.userLog.rows[0].id_usuario
    const { id } = req.body; // {title,content,email,category}
    try {
        const response = await models.addFavorite(id, id_usuario);
        res.status(201).json({
            "items_created": response,
            // data: id
        });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    }
}

//DELETE
const deleteFavorites = async (req, res) => {
    let entries;
    const id  = req.body.id_movie.data
    entries = await models.deleteFavorite(id);
    /* res.send('Pelicula borrada'); */
}

module.exports = {
    getFavorites,
    createFavorite,
    deleteFavorites
}