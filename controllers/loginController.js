/**
 * @author AnaIranzo <aeiranzom@gmail.com>
 * @author ManuelMurillo <mmpeira@gmail.com>
 * @author JorgeMartin <jorge.martin.carrion@gmail.com>
 * @exports  movies
 * @namespace LoginControllers
 */

const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const getLogin = (req,res)=> {
    res.render("login")
  }

    /**
  * Descripción de la función: Checkea si el usuario,email y contraseña,  coinciden con la BBDD.
  * @memberof LoginControllers
  * @method postLogin
  * @async
  * @param {User} Usuario - Nombre del usuario en la BBDD.
  * @param {Email} Email - Email de usuario.
  * @param {password} Contraseña - Contraseña del usuario.
  * @throws {error} Usuario incorrecto.
  * @throws {error} El email introducido no es correcto.
  * @throws {error} La contraseña es incorrecta.
  */

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    // Buscar al usuario en la base de datos
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.render("login" , {msj: "El email introducido no es correcto"})
    }
    // Verificar la contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordCorrect) {
      return res.render("login" , {msj: "La contraseña es incorrecta"}) 
    }
  
    const userForToken = {
      userLog : user,
    
  }

  const token = jwt.sign(userForToken, process.env.CLAVE);

  if (userForToken.userLog.rows[0].role === 'user') {
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: "production",
    })
    .status(200)
    .redirect('index');
  }else if (userForToken.userLog.rows[0].role === 'admin') {
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: "production",
    })
    .status(200)
    .redirect('admin');
  }
};



module.exports = {
    getLogin,
    postLogin
}