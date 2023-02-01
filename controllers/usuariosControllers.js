const usuariosModel = require('../models/usuariosModels')


const geUsuarios = async (req, res) => {
  let usuario;
  if (req.query) {
    usuario = await usuariosModel.getUsuarios(req.query);
  }
  else {
    usuario = await usuariosModel.getUsuarios();
  }
  res.status(200).json(usuario); // [] con las entries encontradas
}

  const createUsuario = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await usuariosModel.createUsuario(newEntry);
    res.status(201).json({
        "Usuario_creado": response,
        data: newEntry
    });
}

module.exports = {
    geUsuarios,
    createUsuario, 
}