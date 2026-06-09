const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Conectado correctamente`);
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la BBDD");
  }
};

module.exports = connection;
