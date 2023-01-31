const getAllMovies = require('./data');
const { paintCard , clearCards} = require('./paintData');

// Con init invocamos la función que borra las tarjetas y la que pide los productos a la API 
// luego iteramos el array recibido y pintamos cada elemento con la función paintCard()
const init = async () =>{
    //...
    await clearCards()
    const allMovies = await getAllMovies()
    allMovies.forEach((product) => paintCard(product, false))
}

// Inicializar script invocando init
init()