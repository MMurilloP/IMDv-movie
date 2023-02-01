const express = require('express');
const logger = require('morgan');
require('./utils/db_mongo');
const movieAdminRoutes = require('./routes/moviesAdminRoutes');

const app= express();
const port = 3000;


// Template engine
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger('dev'));

app.get("/login", (req,res)=> {
    res.render("singIn")
})

app.get("/logup", (req,res)=> {
    res.render("singUp")
})

app.use('/admin',movieAdminRoutes);


/* app.get("/admin/movies", (req,res)=> {
    res.render("moviesAdmin",{movies: movieAdminRoutes})
    console.log(movieAdminRoutes);

})  */


app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));


