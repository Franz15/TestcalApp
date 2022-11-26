const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    email: String,
    password: String,
  })
);

module.exports = User; 