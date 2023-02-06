//REGEX:
//PARA EL EMAIL: Que tenga un @ y un .
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// PARA EL PASS: que tenga minimo 8 caracteres, minusculas, mayusculas, un caracter especial y  un numero ejm: Manolit@8
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


module.exports = {
    emailRegex,
    passwordRegex
  };
  