
//Importar modelos
const Result = require ("../models/result");
const user = require("../models/user");


//Acciones de prueba
const pruebaResults =(req,res)=>{
    return res.status(200).send({
        message: "Mensaje test results.js"

    });
}



const listResults = (req,res)=>{
    //Control de página actual
    let page = 1;
    if(req.params.page){
        page=req.params.page;
    }
    page = parseInt(page);

    //Consulta de Mongoose paginate
    let itemsPerPage = 5;

    Result.find({/*AQUI VA EL USER ID*/}).sort({'_id': 'descending'}).paginate(page, itemsPerPage, (error, results, total)=>{

        if(error){
            return res.status(404).send({
                status:"error",
                message: "Error",
                error
            })
            
        }
        //Devuelve el resultado ()
        return res.status(200).send({
            status:"success",
            //COSAS COSAS
            
        });
    
    })


    






}



//Exportar acciones
module.exports = {
    pruebaResults,
    listResults
}