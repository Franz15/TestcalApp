//Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const libjwt = require("../services/jwt");
const secret = libjwt.secret;

//Middleware de autenticación
exports.auth = (req, res, next) => {
  //Comprobar llegada de cabecera de auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La petición no tiene cabecera de autenticación",
    });
  }

  //Limpiar token
  let token = req.headers.authorization.replace(/['"]+/g, "");

  //Decodificar token
  try {
    let payload = jwt.decode(token, secret);

    //Comprobar expiración del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "Token expirado",
        error,
      });
    }

    //Agregar datos de usuario a request
    req.user = payload;
  } catch (error) {
    return res.status(401).send({
      status: "error",
      message: "Token inválido",
      error,
    });
  }

  //Pasar a ejecución
  next();
};
