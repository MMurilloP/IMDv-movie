const editMovie = require('./data')

const paintData = (id, img, title, year, director, genre, runtime)=> {

    const cardsContainer = document.querySelector('.movies_container')
    // Creo dinámicamente todos los nodos necesarios para pintar mis tarjetas de productos
    const card = document.createElement('div')
    card.setAttribute('class', 'movie_detail') 
    const movieTitle = document.createElement('h2')
    movieTitle.innerText = title
    const movieYear = document.createElement('p')
    movieYear.innerText = `${year}`
    const movieDirector = document.createElement('p')
    movieDirector.innerText = `${director}`
    const movieGenre = document.createElement('p')
    movieGenre.innerText = genre
    const movieRuntime = document.createElement('p')
    movieRuntime.innerText = runtime
    const movieImage = document.createElement('img')
    movieImage.setAttribute('src', img)
    movieImage.setAttribute('class', 'movie_img') 

    // añado al div contenedor de cada tarjeta todos los nodos correspondientes a la información y la imagen
    card.appendChild(movieTitle)
    card.appendChild(movieGenre)
    card.appendChild(movieImage)
    card.appendChild(movieYear)
    card.appendChild(movieDirector)
    card.appendChild(movieRuntime)

    // añado un EventListener a la tarjeta para que me redirija a la vista detalle
    card.addEventListener('click', async () => {
        // Borrar todos los nodos dentro de cards-container
        clearCards()
        // Hacer una petición al servidor para obtener el detalle de un producto determinado
        //...
        const detail = await editMovie(id)
        // Pintar el detalle del producto clickeado
        detail.forEach((movie)=> paintData(movie, true))
    })
    
    // añado la tarjeta completa al contenedor de mi DOM
    cardsContainer.appendChild(card)
}

const clearCards = () =>{
    const cardsContainer = document.querySelector('.movies_container')
    cardsContainer.innerHTML = ''
}

module.exports = {
    paintData,
    clearCards
    
}