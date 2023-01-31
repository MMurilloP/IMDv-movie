const pool = require('../utils/sqlDb')
const usuarios = require('../queries/usersQueries');

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


const createUsuario = async (usuario) => {
    const { nombre, email, rol, pass } = usuario;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usuarios.createUsuario, [ nombre, email, rol, pass ]);
        result = data.rowCount;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
    return result;
}


module.exports = {
    getUsuarios,
    createUsuario
}