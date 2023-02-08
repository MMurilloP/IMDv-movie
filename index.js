const express = require('express');
const morgan = require('morgan');

const helmet = require("helmet");
// const pool = require('./utils/db');
// const bcrypt = require('bcrypt');
const passport = require("passport");
const session = require("express-session");

//require("./utils/auth_google");

var cors = require('cors')
require('dotenv').config()
// Passport config
require('./utils/auth_google')(passport)

require('./utils/db_mongo');
const movieAdminRoutes = require('./routes/moviesAdminRoutes');
const authorization = require('./middlewares/auth')
const authGoogleRoutes = require('./routes/google_authRoutes')
const {ensureAuth, ensureGuest} = require('./middlewares/googleAuth')

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//session
app.use(session({ secret: 'SECRET'}));



app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"

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


app.use(morgan('tiny'));


// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");

//app.use('auth', require('./routes/google_authRoutes'))

//IMPORTO RUTAS 
const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require ('./routes/peliculasRoutes');
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const opinonesroutes = require('./routes/opinionesRoutes')


app.use('/auth', authGoogleRoutes);

//RUTAS

// vistas de rol ADMIN: 
//VER JSON DE USUARIOS Y DE PELICULAS EN LA BBDD ELEPHANT:
//http://localhost:3000/admin/usuarios
app.use('/admin/usuarios', usuariosRoutes);
//http://localhost:3000/admin/peliculas
app.use('/admin/peliculas', peliculasRoutes);



//vistas de rol USER:
//http://localhost:3000/register
app.use ('/register', registerRoutes);

//http://localhost:3000/login

app.use ('/login', loginRoutes);

// vista de opiniones de peliculas de sensacine
app.use('/opiniones',  opinonesroutes);
//vista bienvenida: /
app.get("/", (req,res)=> {
  res.render("inicio")
})

//vista dashboard:


app.get("/index",  authorization.authorization_user, (req,res)=> {
  res.render("index" )
})

app.get("/index", ensureAuth , (req,res)=> {
  res.render("index" )
})


app.use('/admin',authorization.authorization_admin, movieAdminRoutes);


app.get("/admin/createMovie",authorization.authorization_admin, (req,res)=> {
    res.render("createMovie")
})  

app.get("/admin/editMovie/:id",authorization.authorization_admin, (req,res)=> {
    res.render("editMovie")
}) 


//listener
app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
