const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");

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

//IMPORTO RUTAS 

const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const opinonesroutes = require('./routes/opinionesRoutes');
const searchPeliculasRoutes = require('./routes/searchPeliculasRoutes');

app.use ('/register', registerRoutes);
app.use ('/login', loginRoutes);
app.use('/opiniones',  opinonesroutes);
app.get("/", (req,res)=> {
  res.render("inicio")
})
app.get("/index", authorization.authorization_user, (req,res)=> {
  res.render("index" )
})
app.get("/logout", (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .redirect('login');
});
app.use('/admin',authorization.authorization_admin, movieAdminRoutes);
app.get("/admin/createMovie",authorization.authorization_admin, (req,res)=> {
    res.render("createMovie")
})  
app.get("/admin/editMovie/:id",authorization.authorization_admin, (req,res)=> {
    res.render("editMovie")
}) 
app.use('/search', searchPeliculasRoutes)


//listener
app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));

