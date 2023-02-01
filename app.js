const express = require('express');
const morgan = require('morgan');

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



app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
