const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const getLogin = (req,res)=> {
    res.status(400).render("login")
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
      return res.status(400).render("login" , {msj: "La contraseña es incorrecta"}) 
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