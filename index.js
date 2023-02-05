const express = require('express');
const morgan = require('morgan');
const pool = require('./utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const passport = require('passport');
const puppeteer = require('puppeteer')



const port = 3000;
const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));


// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");

const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require ('./routes/peliculasRoutes');


app.use('/usuarios', usuariosRoutes);
app.use('/peliculas', peliculasRoutes);


//SSR --> pug
app.get("/", (req,res)=> {
  res.render("inicio")
})
app.get("/login", (req,res)=> {
    res.render("login")
})
app.get("/register", (req,res)=> {
    res.render("register")
})

app.get("/index", (req,res)=> {
  res.render("index" , {nameUser: ""})
})

app.get("/logout", (req,res)=> {
  res.render("logout")
})

app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);
  const nombreUsuarioLogeado = req.body.username

  // Verificar si el email es válido
  if (!validator.isEmail(email)) {
    return res.render("register" , {msj: "El email introducido no es valida."});
  }

  // Verificar si la contraseña cumple con los requisitos
  if (!validator.isLength(password, { min: 8 })) {
    return res.render("register" , {msj: "La constraseña introducida no es valida. Minimo 8 caracteres"})   }

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    return res.render("register" , {msj: "El correo electrónico ya esta registrado."})
  }

  // Hashear la contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insertar el nuevo usuario en la base de datos
  pool.query('INSERT INTO usuarios (username, email, password, role) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, role], (err, result) => {
    if (err) {
      res.status(500).send(err.stack);
    } else {
      res.render('login',{nameUser: `${nombreUsuarioLogeado}`})
    }
  });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Buscar al usuario en la base de datos
  const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (user.rows.length === 0) {
    return res.render("login" , {msj: "El email introducido no es correcto"})
  }
  // Verificar la contraseña
  const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordCorrect) {
    return res.render("login" , {msj: "La contraseña es incorrecta"}) 
  }
  // Iniciar sesión (por ejemplo, guardar en una cookie el ID del usuario)
  res.cookie("userId", user.rows[0].id);
  res.redirect('index');
});


app.get('/opiniones', async (req, res) => {
  const pelicula = "avatar 2"
  async function waitFor3Seconds() {
    await new Promise(resolve => setTimeout(resolve, 3000));
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

    for (let i = 0; i < userNames.length; i++) {
      tmp.push({
        userName: userNames[i].innerText,
        userOpinion: userOpinions[i].innerText
      })
    }

    return tmp
  })

  //cierro el navegador
  await browser.close()

//   res.send(user)

res.render('opiniones', { user: user, pelicula: pelicula.toUpperCase() })

})



app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
