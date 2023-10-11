const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "default.png",
    },
    //-------------Datos Físicos----------------//
    fechaNac: {
      type: Date,
    },
    /* sexo:{
        type: String
    },*/
    grado: {
      type: String,
      required: true,
    },
    altura: {
      type: Number,
    },
    peso: {
      type: Number,
    },
    envergadura: {
      type: Number,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = model("User", UserSchema, "DatosUsuario");
