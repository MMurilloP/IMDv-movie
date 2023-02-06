const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db');
require('dotenv').config();

//Establecemos la estrategia de Google con los credenciales de nuestro proyecto
module.exports = function (passport){
    passport.use(new GoogleStrategy({
        clientID: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
        callbackURL: `http://localhost:3000/index`,
        proxy: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
        //return done(null, profile);
        try {
            const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [profile.email]);
            if (user) {
                done(null,user)
            } else {
                user = pool.query(`INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3)`, [profile.displayName, profile.email],'google')
                done(null, user)
            }

        } catch (error) {
            console.log(error)
        }
        
    }
    ));

    //Esta función determina los datos que se van a guardar en la sesión de google: user
    passport.serializeUser(function (user, done) {
        done(null,user)
    });
    //Determina que objeto borrar de la sesión: user
    passport.deserializeUser( async function (user, done) {
        
        done(null,user)
    });
}