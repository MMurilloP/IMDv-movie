const butonPelicula = document.getElementById("butonPelicula");
console.log(butonPelicula)

butonPelicula.addEventListener("click", async (e)=> {
    e.preventDefault();
    console.log(e)
    const apiKey = 'k_g4t828hf'
    const url = `https://imdb-api.com/en/API/Title/${apiKey}/${e.target.value}`
    const response = await fetch(url)
    const results = await response.json()
    console.log(results)
    window.open({})
})

const detailPeliculas = async (movie)=> {
    const options = {
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
        }
        //console.log(movie);
    const response = await fetch(`http://localhost:3000/peliculaDetalladas`,options);
    const results = await response.json();
        // return results
}

//https://imdb-api.com/en/API/Title/${apiKey}/${valor.id}