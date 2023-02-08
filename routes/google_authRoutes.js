
const express = require('express');
const passport = require("passport");
const router = express.Router();



//Ruta que renderiza el prompt de Google con las cuentas
router.get("/google", passport.authenticate("google", { scope: [ 'profile'] }));

//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
router.get("/google/callback", 
    //Función de fallo
    passport.authenticate('google', { failureRedirect: '/' }), 
    //Función exitosa
    (req,res)=>{
        
    //En el cuerpo de esta función podemos almacenar usuarios en nuestra bbdd con el objeto que nos proporciona req.user (Para ello es necesario hacer la función asíncrona)
 
    //Estos son los pasos para crear un token si la autenticación es exitosa
    const userForToken = {
      userLog : user,
    }

  const token = jwt.sign(userForToken, process.env.CLAVE);

    //Almacenamos el token en las cookies
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
    }).redirect('/index')

    
}); 

//Definimos una ruta en caso de que la autenticación falle.
/* router.get('/failure', (req, res) => {
    res.send('Something went wrong..')  
}); */

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
});

module.exports = router