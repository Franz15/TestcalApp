
//Importar modelos
const Result = require ("../models/result");
const user = require("../models/user");
const paginate = require("mongoose-pagination");


//Acciones de prueba
const pruebaResults =(req,res)=>{
    return res.status(200).send({
        message: "Mensaje test results.js"

    });
}


//Listar resultados de un usuario
const listResults = (req,res)=>{
    const userId = req.user.id;

    Result.find({"userId": userId})
    .sort({"fecha": -1})
    .exec((error, results, total)=>{

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
            total,
            results         
        });
    
    })
}


const lastResult = (req,res)=>{
    
    const userId = req.user.id;
    Result.findOne({"userId": userId})
    .exec((error,result) =>{
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
        result             
    });
})
}

//Guardar resultados test
const saveResults = (req, res)=>{
    //Recoger datos del body
    const params = req.body;
    console.log("params", params);
    //Si no llegan datos, dar respuesta negativa

  
    //Crear y rellenar el objeto del modelo
    let newResult = new Result(params);
    console.log ("newResult", newResult);
    //Guardar objeto en BBDD
    newResult.save((error, resultStored)=>{
        resultStored = newResult;
        console.log("resultStored", resultStored )
        if (error || !resultStored) return res.status(500).send ({status: "error", message: "Resultado no guardado"});
        
        if (resultStored){
        return res.status(200).send({
            status:"success",
            result: resultStored
        });
        }
    })

}


//Mostrar resultados de una prueba
const detail = (req,res) =>{
    //Sacar ID de la prueba de la url
    const resultId = req.params.id;

    //Encontrar la prueba
    Result.findById(resultId, (error, resultStored)=>{

        if (error || !resultStored){
            return res.status (404).send({
                status: "error",
                message: "No existe la prueba"
            })
        } if (req.user.id != resultStored.userId){
            return res.status (404).send({
                status: "error",
                message: "No estás autorizado para ver la prueba"
            })
        }

        //Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: " ",
            result: resultStored
        });
    });
}

//Eliminar resultados de una prueba
const remove = (req, res)=>{
    //Recuperar ID de la prueba a borrar
    const resultId = req.params.id;

    //Find y remove de la prueba a borrar
    Result.find({"user": req.user.id, "_id": resultId}).remove(error=>{
        if(error){
            return res.status(500).send({
                status: "error",
                message: "no se ha podido eliminar la prueba"
            })
        }
    })
    
    return res.status(200).send({
        status: "success",
        message: " ",
        prueba: resultId
    });

}

//Recuperar todos los resultados de otros usuarios del mismo grado
const sameGrade = async (req, res)=>{
    //Sacar el id de usuario
    const userGrade = req.user.grado;
    
    let grado = Result.find ({"gradoDeclarado": userGrade});
    
    Result.aggregate([
       {
            $match:({"gradoDeclarado": userGrade})
        },
        {
            $group: {
              _id: "$gradoDeclarado",
              test1avg: {
                $avg: "$test1Porcent"
              },
              test2avg: {
                $avg: "$test2Porcent"
              },
              test4avg: {
                $avg: "$test4Tiempo"
              },
            }
        }
    ],function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result[0].test1avg );
        }
    });
   
}       
        
//});

//Exportar acciones
module.exports = {
    pruebaResults,
    listResults,
    saveResults,
    detail,
    remove,
    sameGrade,
    lastResult
}