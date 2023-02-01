const getAllMovies = async() =>{
    const response = await fetch('http://localhost:3000/admin/movies');
    const results = await response.json();

    return results
}

const editMovie = async ()=> {
    const response = await fetch(`http://localhost:3000/admin/editMovie/:${id}`);
    const results = await response.json();

    return results
}

const createMovie = async(movie) =>{
    try {
        const options = {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }
        const response = await fetch(`http://localhost:3000/admin/createMovie`, options)
        const result = await response.json()
            return result
        
    } catch (error) {
        alert(error)
    }
    console.log(result)
}

module.exports = {
    getAllMovies,
    editMovie,
    createMovie
}