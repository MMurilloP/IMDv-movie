const peliculasModel = require('../models/peliculasModels')
const { get } = require('../routes/usuariosRoutes')
const pool = require('../utils/sqlDb')


const getPeliculas = (request, response) => {
    pool.query('SELECT * FROM peliculas' , (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports ={
    getPeliculas,
  }