const models = require('../models/favoriteModels');


// const getFavorites = async (req, res) => {
//     let favoritos;
//     if (req.query.email) {
//         favoritos = await models.getAllFavorites(req.query.email);
//         if (favoritos.length <= 0) {
//             res.status(400).json({msj: `No existen peliculas asociadas a este email`});
//         }else{
//             res.status(200).json(favoritos); // [] con las favoritos encontradas
//         }
//     }
// }

const createFavorite = async (req, res) => {
    const {id} = req.body; // {title,content,email,category}
    console.log(id);
        try {
            const response = await models.addFavorite(id);
            console.log(response,id);
            res.status(201).json({
            "items_created": response,
            // data: id
        });
        }   catch(err){
                res.status(400).json({msj: err.message});
            }
        }

//DELETE
// const deleteFavorites = async (req,res)=> {
// let entries;
// entries = await models.deleteFavorite(req.query.nombre);
// res.send('Pelicula borrada');
// }

module.exports = {
    // getFavorites,
    createFavorite
    // deleteFavorites
}