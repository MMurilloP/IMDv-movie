const usuarios_queries = {
    getUsuarios: `
    SELECT *
    FROM usuarios;`,
    createUsuario:`
    INSERT INTO usuarios(username,email,role,password) 
    VALUES ($1,$2,$3,$4);`,
}

module.exports = usuarios_queries;