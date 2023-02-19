const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");

const cookieParser = require('cookie-parser')
var cors = require('cors')
require('dotenv').config()

require('./utils/db_mongo');
const movieAdminRoutes = require('./routes/moviesAdminRoutes');
const authorization = require('./middlewares/auth')
const authGoogleRoutes = require('./routes/google_authRoutes')
const {ensureAuth, ensureGuest} = require('./middlewares/googleAuth')

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    },
    crossOriginEmbedderPolicy: false,
  })
)

app.use('*', cors());
app.use(cookieParser());
app.use(morgan('tiny'));

// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");

//app.use('auth', require('./routes/google_authRoutes'))

//IMPORTO RUTAS 

const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const opinonesroutes = require('./routes/opinionesRoutes');
const searchPeliculasRoutes = require('./routes/searchPeliculasRoutes');
const favoritesRoutes = require('./routes/favoritesMoviesRoutes');

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/opiniones', opinonesroutes);
app.get("/", (req, res) => {
    res.render("inicio")
})

app.get("/index", authorization.authorization_user, (req, res) => {
    res.render("index")
})
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
app.use('/favoritesmovies', authorization.authorization_user, favoritesRoutes);


//fetch
//http://localhost:3000/search
app.use('/search',authorization.authorization_user, searchPeliculasRoutes)


app.get('/peliculaDetalladas', (req, res) => {
    res.render('peliculasDetalladas', { pelicula: pelicula })
})

app.post('/peliculaDetalladas', (req, res) => {
    res.render('peliculasDetalladas', { pelicula: pelicula })
})


//listener
app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
