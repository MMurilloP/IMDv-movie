const pool = require('../utils/db')
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


module.exports = {
    getUsuarios,
    createUsuario
}