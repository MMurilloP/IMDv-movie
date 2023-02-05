//? Funcion buscar

const input = document.querySelector('.input');
const button = document.querySelector('#buscar');

button.addEventListener('click', async function () {
    const valorInput = input.value;
    console.log(input.value)
    
    // const button = req.body.searching
    let object = await fetch(`/localhost:3000/user/search`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(valorInput) // body data type must match "Content-Type" header
    })
    const results = await object.json();
    console.log(results);
    return results;
}
);