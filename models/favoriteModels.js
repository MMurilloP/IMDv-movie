const queries = require('../queries/favoritesQueries');
const pool = require('../utils/db');

const addFavorite = async (id) => {
    console.log("*******222********");
    console.log(id);
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.addFavorites,[id])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}
// console.log(addFavorite("tt0096895"))

const getAllFavorites = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getFavorites)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// const deleteFavorite = async (nombre) => {
//     let client,result;
//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(queries.deleteFavorites,[nombre])
//         result = data.rowCount
//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();
//     }
//     return result
// }

module.exports = {
    // deleteFavorite,
    getAllFavorites,
    addFavorite
}