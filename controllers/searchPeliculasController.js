const getSearch = (req,res)=>{
    res.render('search')  
  }
  
const getPelicula = async (req, res)=> {
    console.log(req.body);
    const inputBuscar = req.body.inputBuscar;
    console.log(inputBuscar);
    const apiKey = "k_g4t828hf";
    const url = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${inputBuscar}`;
    console.log(url) 
  
    const request = await fetch(url);
    const peliculas = await request.json();
    console.log(peliculas)
    const ids = peliculas.results.map(pelicula => pelicula.id);// guardo los ids en un array, necesito exportarlos a otra ruta para hacer otro fetch a a(href=`https://imdb-api.com/en/API/Title/${apiKey}/${valor.id}`)

    console.log(ids);
    res.status(400).render("peliculas", { peliculas, apiKey });
  }
  
module.exports = {
    getPelicula,
    getSearch,
}