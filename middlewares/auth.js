const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const authorization_user = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.CLAVE);
      const user = data.userLog
      console.log(user.rows[0].role);
      if(user.rows[0].role !== 'user'){
        res.status(401).send({ mensaje: "ruta no autorizada" })
      }
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };


  const authorization_admin = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.CLAVE);
      const user = data.userLog
      console.log(user.rows[0].role);
      if(user.rows[0].role !== 'admin'){
        res.status(401).send({ mensaje: "ruta no autorizada" })
      }
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };


  module.exports = {
    authorization_user,
    authorization_admin
  }