const validator = require("validator");

const validate = (params) => {
  let nombre =
    validator.isLength(params.nombre, { min: 3, max: 30 }) &&
    validator.isAlpha(params.nombre, "es-ES");
  let apellido =
    validator.isLength(params.apellido, { min: 3, max: 30 }) &&
    validator.isAlpha(params.apellido, "es-ES");
  let email = validator.isEmail(params.email);

  if (!nombre) {
    throw new Error("Validacion nombre no superada");
  }
  if (!apellido) {
    throw new Error("Validacion apellido no superada");
  }
  if (!email) {
    throw new Error("Error formato email");
  } else {
  }
};

module.exports = validate;
