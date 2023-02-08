const express = require('express');
const morgan = require('morgan');

const helmet = require("helmet");
// const pool = require('./utils/db');
// const bcrypt = require('bcrypt');

// const passport = require('passport');
const cookieParser = require('cookie-parser')
var cors = require('cors')
require('dotenv').config()


require('./utils/db_mongo');
const movieAdminRoutes = require('./routes/moviesAdminRoutes');
const authorization = require('./middlewares/auth')

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"]
//     },
//     crossOriginEmbedderPolicy: false,
//   })
// )
app.use('*', cors());

app.use(cookieParser());
app.use(morgan('tiny'));


// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");

//IMPORTO RUTAS 
const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require('./routes/peliculasRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const opinonesroutes = require('./routes/opinionesRoutes');
const searchPeliculasRoutes = require('./routes/searchPeliculasRoutes');
const favoritesRoutes = require('./routes/favoritesMoviesRoutes');


//RUTAS

// vistas de rol ADMIN: 
//VER JSON DE USUARIOS Y DE PELICULAS EN LA BBDD ELEPHANT:
//http://localhost:3000/admin/usuarios
app.use('/admin/usuarios', usuariosRoutes);
//http://localhost:3000/admin/peliculas
app.use('/admin/peliculas', peliculasRoutes);

//vistas de rol USER:
//http://localhost:3000/register
app.use('/register', registerRoutes);

//http://localhost:3000/login

app.use('/login', loginRoutes);

// vista de opiniones de peliculas de sensacine
app.use('/opiniones', opinonesroutes);
//vista bienvenida: /
app.get("/", (req, res) => {
    res.render("inicio")
})

//vista dashboard:
app.get("/index", authorization.authorization_user, (req, res) => {
    res.render("index")
})

// vista de logout
app.get("/logout", (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect('login');
});

app.use('/admin', authorization.authorization_admin, movieAdminRoutes);


app.get("/admin/createMovie", authorization.authorization_admin, (req, res) => {
    res.render("createMovie")
})

app.get("/admin/editMovie/:id", authorization.authorization_admin, (req, res) => {
    res.render("editMovie")
})



//?Favoritos
app.use('/favoritesmovies', favoritesRoutes);


//fetch
//http://localhost:3000/search
app.use('/search', searchPeliculasRoutes)


app.get('/peliculaDetalladas', (req, res) => {
    res.render('peliculasDetalladas', { pelicula: pelicula })
})

app.post('/peliculaDetalladas', (req, res) => {
    res.render('peliculasDetalladas', { pelicula: pelicula })
})




//listener
app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));

