/**
 * @author AnaIranzo <aeiranzom@gmail.com>
 * @author ManuelMurillo <mmpeira@gmail.com>
 * @author JorgeMartin <jorge.martin.carrion@gmail.com>
 * @exports  usuariosModels
 * @namespace SQL
 */

const pool = require('../utils/db')
const usuarios = require('../queries/usersQueries');

const mongoose = require('mongoose');
    /**
  * Descripción de la función: Trae la informacion de los usuarios: username, email, role, password;
  * @memberof SQL
  * @method getUsuarios
  * @async
  * @throws {error} Error en la peticion de busqueda de los usuarios
  */

const getUsuarios = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usuarios.getUsuarios);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

    /**
  * Descripción de la función: Crea la tabla de los usuarios: username, email, role, password;
  * @memberof SQL
  * @method createUsuario
  * @async
  * @throws {error} Error en la creacion del usuario
  */

const createUsuario = async (usuario) => {
    const { username, email, role, password } = usuario;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usuarios.createUsuario, [ username, email, role, password ]);
        result = data.rowCount;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// user:


module.exports = {
    getUsuarios,
    createUsuario
}