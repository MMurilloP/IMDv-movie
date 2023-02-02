const express = require('express');
const morgan = require('morgan');
const pool = require('./utils/db');
const bcrypt = require('bcrypt');
const session = require('express-session');



const port = 3000;
const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Use express-session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));


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
app.get("/index", (req,res)=> {
  res.render("index")
})

app.get("/logout", (req,res)=> {
  res.render("logout")
})

app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    return res.status(400).send('Ese correo electronico ya esta registrado.');
  }

  // Hashear la contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insertar el nuevo usuario en la base de datos
  pool.query('INSERT INTO usuarios (username, email, password, role) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, role], (err, result) => {
    if (err) {
      res.status(500).send(err.stack);
    } else {
      res.redirect('login')
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Buscar al usuario en la base de datos
  const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (user.rows.length === 0) {
    return res.status(400).send('Ese correo electrónico no está registrado.');
  }

  // Verificar la contraseña
  const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordCorrect) {
    return res.status(400).send('Contraseña incorrecta.');
  }

  // Iniciar sesión (por ejemplo, guardar en una cookie el ID del usuario)
  res.cookie("userId", user.rows[0].id);
  res.redirect('index');
});



app.listen(port, () => console.log(`Serving on ${port} http://localhost:3000`));
