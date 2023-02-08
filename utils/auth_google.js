
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../utils/db');
require('dotenv').config();

//Establecemos la estrategia de Google con los credenciales de nuestro proyecto
module.exports = function (passport){
    passport.use(new GoogleStrategy({
        clientID: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
        callbackURL: `/auth/google/callback`,
        proxy: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
         done(null, profile);
  /*       try {
      const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [profile._json.email]);
        done(null, profile);
        if (!user) {
        user = pool.query(`INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3)`, [profile.displayName, profile[0].emails.value],'google')
        done(null, profile);
      }
      done(null, profile);


  } catch (error) {
      console.log(error)
  }  */
        
        
    }
    ));

    //Esta función determina los datos que se van a guardar en la sesión de google: user
    passport.serializeUser(function (user, done) {
        done(null,user)
    });
    //Determina que objeto borrar de la sesión: user
    passport.deserializeUser( function (user, done) {
        
        done(null,user)
    });
}