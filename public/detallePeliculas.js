const butonPelicula = document.getElementById("butonPelicula");
console.log(butonPelicula)

// const divInfo = document.querySelectorAll(".divDetalles")

const buttons = document.querySelectorAll("button#butonPelicula");

const divInfos = document.querySelectorAll(".divDetalles");

buttons.forEach(button => {
  button.addEventListener("click", event => {
    const clickedButtonId = event.target.value;
    const divs = document.querySelectorAll("div.divpeliculas");
    divs.forEach(div => {
      if (div.id !== clickedButtonId) {
        div.style.display = "none";
      } else {
        div.style.display = "block";
      }
    });
    divInfos.forEach(divInfo => {
      divInfo.style.display = "flex";
    });
  });
});



