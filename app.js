const express = require('express');
const morgan = require('morgan');
const pool = require('./utils/db');


const port = 3000;
const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");

const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require ('./routes/peliculasRoutes');

app.use('/usuarios', usuariosRoutes);
app.use('/peliculas', peliculasRoutes);


//SSR --> pug
app.get("/login", (req,res)=> {
    res.render("login")
})

app.get("/register", (req,res)=> {
    res.render("register")
})

app.post('/register', (req, res) => {
  const { nombre, email, password, role } = req.body;

  pool.query('INSERT INTO users (nombre, email, password, role) VALUES ($1, $2, $3, $4)', [nombre, email, password, role], (err, result) => {
    if (err) {
      res.status(500).send(err.stack)
    } else {
      res.send('Datos guardados en la base de datos.')
    }
  })
});

app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
