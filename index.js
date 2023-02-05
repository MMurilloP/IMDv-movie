const express = require('express');
const morgan = require('morgan');


const port = 3000;
const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");

//IMPORTO RUTAS 
const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require ('./routes/peliculasRoutes');
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const opinonesroutes = require('./routes/opinionesRoutes')

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
app.use('/opiniones', opinonesroutes);
//vista bienvenida: /
app.get("/", (req,res)=> {
  res.render("inicio")
})
//vista dashboard:
app.get("/index", (req,res)=> {
  res.render("index" )
})
// vista de logout
app.get("/logout", (req,res)=> {
  res.render("logout")
})


//listener
app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
