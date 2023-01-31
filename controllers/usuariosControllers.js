const usuariosModel = require('../models/usuariosModels')
const { get } = require('../routes/usuariosRoutes')
const pool = require('../utils/sqlDb')

const getUsuarios = (request, response) => {
    pool.query('SELECT * FROM usuarios' , (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUsuario = async (req, res) => {
    const email = req.body.email;
    console.log(email)
    const pass = req.body.password;
    console.log(pass)
    get(url,(response)=>{
        re
    })
}

module.exports = {
    getUsuarios,
    createUsuario, 
}