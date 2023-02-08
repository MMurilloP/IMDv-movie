const queries = require('../queries/favoritesQueries');
const pool = require('../utils/db');

const addFavorite = async (id,id_usuario) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.addFavorites,[id,id_usuario])
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

const getAllFavorites = async (id_usuario) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getFavorites,[id_usuario])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const deleteFavorite = async (nombre) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteFavorites,[nombre])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();
    }
    return result
}

module.exports = {
    deleteFavorite,
    getAllFavorites,
    addFavorite
}