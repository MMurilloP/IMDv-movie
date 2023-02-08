export const addFavorite = async (product) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }
        console.log(options)
        const BASE_URL = 'http://localhost:3000/favoritesmovies'
        console.log(BASE_URL)
        const response = await fetch(BASE_URL, options)
        console.log(response)

    } catch (error) {
        alert(error)
    }
}


export const deleteFavorite = async (product) => {
    try {
        const method = {
            method: 'DELETE'
        }
        console.log("Este es el parametro product:", product)
        const BASE_URL = 'http://localhost:3000/movies/deleteFavoritesMovie?title=' + product
        const response = await fetch(BASE_URL, method)

    } catch (error) {
        alert(error)
        console.log(error)
    }

}