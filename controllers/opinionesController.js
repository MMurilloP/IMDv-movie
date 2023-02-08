const puppeteer = require('puppeteer')

// const postOpiniones = async (req,res) => {
//   res.render('/opiniones');
// };

const sensacineOpiniones = async (req, res) => {
    const pelicula = req.params.title;
    async function waitFor3Seconds() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    //abro la pagina
    await page.goto('https://www.sensacine.com/peliculas/')
    //cambio el tamaño de la pagina
    await page.setViewport({width: 1040, height: 760})
    //selecciono el imput y escribo el nombre de la pelicula
    await page.type('.container-input-autocomplete input', `${pelicula}`)
    // le doy click al boton de la lupa
    await page.click('.header-search-form-container button')
    // espero que aparezca la primera pelicula
    await page.waitForSelector("#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.meta > h2 > a")
    //click en la primera pelicula
    await page.click('#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.meta > h2 > a')
    // seleccion critica de usuarios
    async function waitFor3Seconds() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    await waitFor3Seconds()
    let selector = "#content-layout > nav > a:nth-child(5)"
    if (pelicula == "Avatar 2" || "avatar 2" || "Avatar: el sentido del agua" || "Babylon" || "babylon" || "El Gato con Botas: El último deseo"  || "el gato con botas: el último deseo" ) {
      selector = "#content-layout > nav > a:nth-child(6)"
    }
    await page.waitForSelector(selector)
    await page.click(selector)
    await waitFor3Seconds();
    //dentro de critica de usuarios cojo todos los nombre de usuarios y sus opiniones e itero.
    const user = await page.evaluate(() => {
      const tmp = []
      const userNames = document.querySelectorAll(' div.review-card-aside > div > div > div > a')
      const userOpinions = document.querySelectorAll(' div.review-card-review-holder > div.content-txt.review-card-content')
  
      for (let i = 0; i < 3; i++) {
        tmp.push({
          userName: userNames[i].innerText,
          userOpinion: userOpinions[i].innerText
        })
      }
      return tmp
    })
  
    //cierro el navegador
    await browser.close()
  
  res.status(400).render('opiniones', { user: user, pelicula: pelicula.toUpperCase() })
  
  }


  module.exports = {
    sensacineOpiniones,
    // postOpiniones
  };