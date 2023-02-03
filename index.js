const express = require('express');
const morgan = require('morgan');
const pool = require('./utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const passport = require('passport');


const isAuthenticated = require('./utils/auth')

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
    return res.status(400).send('Por favor, ingrese un correo electrónico válido.');
  }

  // Verificar si la contraseña cumple con los requisitos
  if (!validator.isLength(password, { min: 8 })) {
    return res.render("register" , {msj: "Los credenciales introducidos no son validos"})   }

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    return res.status(400).send('Ese correo electrónico ya esta registrado.');
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
    return res.render("login" , {msj: "Los credenciales introducidos no son validos"})
  }
  // Verificar la contraseña
  const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordCorrect) {
    return res.render("login" , {msj: "Los credenciales introducidos no son validos"}) 
  }

  // Iniciar sesión (por ejemplo, guardar en una cookie el ID del usuario)
  res.cookie("userId", user.rows[0].id);
  res.redirect('index');
});


app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
