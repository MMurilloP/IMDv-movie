const pool = require('../utils/db');
const bcrypt = require('bcrypt');

const getLogin = (req,res)=> {
    res.render("login")
  }

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
    // Iniciar sesión (por ejemplo, guardar en una cookie el ID del usuario)
    res.cookie("userId", user.rows[0].id);
    res.redirect('index',);
  }


module.exports = {
    getLogin,
    postLogin
}