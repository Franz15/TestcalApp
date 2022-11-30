//Acciones de prueba
const pruebaMeasures =(req,res)=>{
    return res.status(200).send({
        message: "Mensaje test measures.js"

    });
}




//Exportar acciones
module.exports = {
    pruebaMeasures
}