const favorites_queries = {
    getFavorites: `
    SELECT title, img, director, year, genre, runtime
    FROM favorites
    WHERE id = $1;`,

    addFavorites:`
    INSERT INTO favorites
    (id, title, year, director, genre, runtime, img)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `
}

module.exports = favorites_queries;