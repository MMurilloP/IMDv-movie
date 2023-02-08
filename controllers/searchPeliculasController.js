const fetch = require('node-fetch')


const getSearch = (req,res)=>{
    res.render('search')  
  }
 
const getPelicula = async (req, res)=> {
    // console.log(req.body);
    const inputBuscar = req.body.inputBuscar;
    // console.log(inputBuscar);
    const apiKey = "k_sjtp9i78";
    const url = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${inputBuscar}`;
    // console.log(url) 
  
    const request = await fetch(url);
    const peliculas = await request.json();
    // console.log(peliculas)
    const ids = peliculas.results.map(pelicula => pelicula.id);
    // console.log(ids);

    const urls = [];
    for(let i= 0; i < ids.length ; i++){
      // console.log(ids[i])
      const url = `https://imdb-api.com/en/API/Title/${apiKey}/${ids[i]}`
      // console.log(url)
      urls.push(url)
    }
    // console.log("*************")
    // console.log(urls)
    // console.log("*************")

    const detallePeliculas = await Promise.all(urls.map(async url => {
      const resp = await fetch(url);
      return resp.json();
    }));

    // console.log(detallePeliculas);


    res.status(400).render("peliculas", { detallePeliculas });
  }
  
module.exports = {
    getPelicula,
    getSearch,
}