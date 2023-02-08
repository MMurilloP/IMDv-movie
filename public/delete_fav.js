
    const btn_del =document.querySelectorAll('.btn');
    btn_del.forEach(btn=> btn.addEventListener("click", async (e)=> {
        e.preventDefault();
        console.log(e);
        const data = {data: e.target.value}
        console.log(e.target.value);
        const response = await deleteMovie(data);
    
    
    
        //e.target.submit();
    }));
    



    const deleteMovie = async (id_movie)=> {
        const options = {
            method: 'DELETE',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_movie})
            }
            /* console.log('++++++++++++++++++++++++++++++');
            console.log(id_movie); */
        const response = await fetch(`http://localhost:3000/favoritesmovies/removeFavorite`,options);
        const results = await response.json();
            return results
    }