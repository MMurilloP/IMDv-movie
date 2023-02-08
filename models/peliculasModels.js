/**
 * @author AnaIranzo <aeiranzom@gmail.com>
 * @author ManuelMurillo <mmpeira@gmail.com>
 * @author JorgeMartin <jorge.martin.carrion@gmail.com>
 * @exports  movies
 * @namespace SQLSchema
 */

const pool = require('../utils/db')
const peliculas = require('../queries/peliculasQueries');

    /**
  * Descripción de la función: Devuelve las peliculas que el usuario pide.
  * @memberof SQLSchema
  * @method getPeliculas
  * @async
  * @throws {error} Error en la obtencion de la pelicula
  */

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