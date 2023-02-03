
//import editMovie from './data.js'

const editMovies = async (movie)=> {

    const options = {
        method: 'PUT',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
        }
        //console.log(movie);
    const response = await fetch(`http://localhost:3000/admin/editMovie/${movie.e_id}`,options);
    const results = await response.json();
        return results
}

document.getElementById("edit_btn").addEventListener("click", async (e)=>{

    e.preventDefault()

    const form = document.querySelector(".form").elements
    const data = {}
    for(let input of form){
        data[input.name] = input.value
    }
    console.log("data recogida del formulario", data)
    const postResponse = await editMovies(data);
    
})