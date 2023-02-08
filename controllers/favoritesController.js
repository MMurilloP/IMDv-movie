const models = require('../models/favoriteModels');


const getFavorites = async (req, res) => {
    const id_usuario = req.decoded.userLog.rows[0].id_usuario
    const apiKey = "k_sjtp9i78";
    let favoritos;
    if (id_usuario) {
        favoritos = await models.getAllFavorites(id_usuario);
        if (favoritos.length <= 0) {
            res.status(400).json({ msj: `No existen peliculas asociadas a este email` });
        } else {
            // res.status(200).json(favoritos); // [] con las favoritos encontradas
            const ids = favoritos.map(favorito => favorito.nombre);
            console.log(ids);
            const urls = [];
            for (let i = 0; i < ids.length; i++) {
                // console.log(ids[i])
                const apiKey = "k_sjtp9i78";
                const url = `https://imdb-api.com/en/API/Title/${apiKey}/${ids[i]}`
            
                console.log("**1**");
                console.log(url)
                urls.push(url)
            }
                const detallePeliculasFavoritos = await Promise.all(urls.map(async url => {
                    const resp = await fetch(url);
                    return resp.json();
                }));

                // console.log(detallePeliculas);

                res.status(400).render("favorite", { detallePeliculasFavoritos });

            }
        }
    }



const createFavorite = async (req, res) => {
    const id_usuario = req.decoded.userLog.rows[0].id_usuario
    console.log(id_usuario);
    const { id } = req.body; // {title,content,email,category}
    console.log(id);
    try {
        const response = await models.addFavorite(id, id_usuario);
        console.log(response, id);
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
    entries = await models.deleteFavorite(req.query.nombre);
    res.send('Pelicula borrada');
}

module.exports = {
    getFavorites,
    createFavorite,
    deleteFavorites
}