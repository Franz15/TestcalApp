//Importar dependencias
const jwt = require("jwt-simple");
const moment = require ("moment");

//Clave secreta
const secret = "CLAVE_SECRETA-TestcalApp-TFG_JavierV-ITEP-22";

//Crear funcion para generar tokens
const createToken =(user)=>{
    const payload ={
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

        iat: moment().unix(),
        exp: moment().add(2,"hours").unix()
    };

    //Devolver JWT token codificado
    return jwt.encode(payload, secret);

}

module.exports ={
    secret,
    createToken
}
