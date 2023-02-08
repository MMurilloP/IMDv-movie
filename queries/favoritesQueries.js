const favorites_queries = {
    getFavorites: `
    SELECT nombre
    FROM peliculas
    INNER JOIN usuarios 
    ON peliculas.id_usuario=usuarios.id_usuario
    WHERE usuarios.email=$1`,

    addFavorites:`
    INSERT INTO peliculas
    (nombre)
    VALUES ($1)
    `,

    deleteFavorites:`
    DELETE FROM peliculas
    WHERE nombre=$1
    `
}

module.exports = favorites_queries;