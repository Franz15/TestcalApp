const mongoose = require("mongoose");



const connection = async()=>{
    try{
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.cgpucp2.mongodb.net/TestsFisicos?retryWrites=true&w=majority");

        console.log (`Conectado correctamente`);
    }catch(error){
        console.log(error);
        throw new Error ("No se ha podido conectar a la BBDD");

    }
}

module.exports = connection