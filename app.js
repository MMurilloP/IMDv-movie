const express = require('express');
const port = 3000;

const app= express();
const movieAdminRoutes = require('./routes/moviesAdminRoutes')


app.use(express.json()); 

// Template engine
app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");


app.get("/login", (req,res)=> {
    res.render("singIn")
})

app.get("/logup", (req,res)=> {
    res.render("singUp")
})

app.use('/admin',movieAdminRoutes);


app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));


