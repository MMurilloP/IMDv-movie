const pool = require('../utils/sqlDb')
const usuarios = require('../queries/users.queries');

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

const getByEmail = async (usuario) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usuarios.getByEmail, [usuario]);
        result = data.rows;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
    return result;
}

const createUsuario = async (usuario) => {
    const { id_usuario, nombre, email, rol, pass } = usuario;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usuarios.createUsuario, [ id_usuario, nombre, email, rol, pass ]);
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
    getByEmail,
    createUsuario
}