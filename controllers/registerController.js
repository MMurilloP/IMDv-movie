const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const { emailRegex, passwordRegex } = require('../utils/regex')


const getRegister = (req,res)=> {
    res.status(400).render("register")
  };

const postRegister = async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log(req.body);
    const nombreUsuarioLogeado = req.body.username

    // Verificar si el email es válido
    if (!emailRegex.test(email)) {
      return res.render("register" , {msj: "El email introducido no es valida."});
    }
    // Verificar si la contraseña cumple con los requisitos
    if (!passwordRegex.test(password)) {
      return res.render("register" , {msj: "La constraseña introducida no es valida."})   }
  
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.render("register" , {msj: "El correo electrónico ya esta registrado."})
    }
    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Insertar el nuevo usuario en la base de datos
    pool.query('INSERT INTO usuarios (username, email, password, role) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, role], (err, result) => {
      if (err) {
        res.status(500).send(err.stack);
      } else {
        res.status(400).render('login', {userLogged: nombreUsuarioLogeado})
      }
    });
  };


  //VALIDACION ECHA CON VALIDATOR

// const validator = require('validator')

// const postRegister = async (req, res) => {
//     const { username, email, password, role } = req.body;
//     console.log(req.body);
//     const nombreUsuarioLogeado = req.body.username
  
//     // Verificar si el email es válido
//     if (!validator.isEmail(email)) {
//       return res.render("register" , {msj: "El email introducido no es valida."});
//     }
//     // Verificar si la contraseña cumple con los requisitos
//     if (!validator.isLength(password, { min: 8 })) {
//       return res.render("register" , {msj: "La constraseña introducida no es valida. Minimo 8 caracteres"})   }
  
//     // Verificar si el usuario ya existe en la base de datos
//     const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
//     if (existingUser.rows.length > 0) {
//       return res.render("register" , {msj: "El correo electrónico ya esta registrado."})
//     }
//     // Hashear la contraseña
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
  
//     // Insertar el nuevo usuario en la base de datos
//     pool.query('INSERT INTO usuarios (username, email, password, role) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, role], (err, result) => {
//       if (err) {
//         res.status(500).send(err.stack);
//       } else {
//         res.render('login', {userLogged: nombreUsuarioLogeado})
//       }
//     });
//   };

module.exports = {
    getRegister,
    postRegister
    
}