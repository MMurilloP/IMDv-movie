const usuarios_queries = {
    getUsuarios: `
    SELECT *
    FROM usuarios;`,
    getUsuariosByEmail:`
    SELECT * 
    FROM usuarios AS u
    WHERE u.email = $1;`,
    createUsuario:`
    INSERT INTO usuarios(id_usuario,nombre,email,rol,pass) 
    VALUES ($1,$2,$3,$4,$5);`,
}

module.exports = usuarios_queries;