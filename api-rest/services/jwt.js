//Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta
const secret = "CLAVE_SECRETA-TestcalApp-TFG_JavierV-ITEP-22";

//Crear función para generar tokens
const createToken = (user) => {
  let payload;
  console.log("User ", user);

  if (!user._id) {
    payload = {
      id: user.userStored._id,
      nombre: user.userStored.nombre,
      apellido: user.userStored.apellido,
      email: user.userStored.email,
      user: user.userStored.user,
      imagen: user.userStored.image,
      fechaNac: user.userStored.fechaNac,
      grado: user.userStored.grado,
      altura: user.userStored.altura,
      peso: user.userStored.peso,
      envergadura: user.userStored.envergadura,
      code: user.userStored.code,

      iat: moment().unix(),
      exp: moment().add(2, "hours").unix(),
    };
  } else {
    payload = {
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      user: user.user,
      imagen: user.image,
      fechaNac: user.fechaNac,
      grado: user.grado,
      altura: user.altura,
      peso: user.peso,
      envergadura: user.envergadura,
      code: user.code,

      iat: moment().unix(),
      exp: moment().add(2, "hours").unix(),
    };
  }
  console.log("Payload ", payload);

  //Devolver JWT token codificado
  return jwt.encode(payload, secret);
};

const getTokenData = (token) => {
  return jwt.decode(token, secret, { complete: true });
};

module.exports = {
  secret,
  createToken,
  getTokenData,
};
