const pool = require('../utils/sqlDb')
const peliculas = require('../queries/peliculasQueries');


const getPeliculas = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(peliculas.getPeliculas);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

module.exports = {
    getPeliculas,
}