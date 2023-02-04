
const btn_del = document.querySelectorAll(".btn_delete")

btn_del.forEach(btn => btn.addEventListener("click", ()=>{

    const popup = document.querySelectorAll(".popup")
    popup.forEach(pop => pop.style.display = "flex")
    
    
})
)
const btn_pop_del =document.querySelectorAll('.confirm_del')
btn_pop_del.forEach(btn=> btn.addEventListener("click", async (e)=> {
    e.preventDefault();
    console.log(e);
    const data = {data: e.target.name}
    console.log(e.target.name);
    const response = await deleteMovie(data);

    //e.target.submit();
}))

const btn_pop_close = document.querySelectorAll('.close')
btn_pop_close.forEach(btn=> btn.addEventListener("click", async ()=> {
    const popup = document.querySelectorAll(".popup")
    popup.forEach(pop => pop.style.display = "none")
}))


const deleteMovie = async (movie)=> {
    const options = {
        method: 'DELETE',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
        }
        //console.log(movie);
    const response = await fetch(`http://localhost:3000/admin/removeMovie`,options);
    const results = await response.json();
        return results
}