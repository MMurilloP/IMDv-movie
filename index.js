const express = require('express');
require('./utils/db_mongo')
const movieAdminRoutes = require('./routes/moviesAdminRoutes');

const app= express();
const port = 3000;
const path = require("path");
const { title } = require('process');
const searchRoutes = require('./routes/searchFilmroute')

// Template engine
app.set("view engine", "pug");
app.set("views", "./views");
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, "public")));
app.get("/login", (req,res)=> {
    res.render("singIn")
})

app.get("/logup", (req,res)=> {
    res.render("singUp")
})


app.get("/menu", (req,res)=> {
    res.render("firstViewMenu")
})

app.use("/user", searchRoutes)


app.get("/user/search", (req, res) => {
    res.render("searchFilm");
});

app.post("/user/search", (req, res)=> {
    console.log(req.body);
    res.status(200).json({msg:req.body})
})
// app.post("/search", (req,res)=> {
//     const pelicula = req.body.searching;
//     console.log(pelicula)
//     res.render("searchFilm")
// })




app.use('/admin',movieAdminRoutes);

app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));