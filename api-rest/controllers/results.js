//Importar modelos

const {
  Result,
  MaxReachDer,
  Dobles,
  UnoCincoNueve,
  Max20mm,
  MinEdge,
  BloqueoDer,
  BloqueoIzq,
  MaxPesoDom,
  MaxReachIzq,
  MaxNumDom,
} = require("../models/result");
const user = require("../models/user");
const paginate = require("mongoose-pagination");

//Acciones de prueba
const pruebaResults = (req, res) => {
  return res.status(200).send({
    message: "Mensaje test results.js",
  });
};

//Listar resultados de un usuario
const listResults = (req, res) => {
  const userId = req.user.id;
  const params = req.body._type;

  if (params) {
    Result.find({ userId: userId, _type: params }).exec(
      (error, results, total) => {
        if (error) {
          return res.status(404).send({
            status: "error",
            message: "Error",
            error,
          });
        }

        //Devuelve el resultado ()
        return res.status(200).send({
          status: "success",
          total,
          results,
        });
      }
    );
  } else {
    Result.find({ userId: userId }).exec((error, results, total) => {
      if (error) {
        return res.status(404).send({
          status: "error",
          message: "Error",
          error,
        });
      }

      //Devuelve el resultado ()
      return res.status(200).send({
        status: "success",
        total,
        results,
      });
    });
  }
};

const lastResult = (req, res) => {
  const userId = req.user.id;
  
  /*Result.findOne({ userId: userId })
    .sort({ fecha: -1 })
    .exec((error, result) => {
      if (error) {
        return res.status(404).send({
          status: "error",
          message: "Error",
          error,
        });
      }
      //Devuelve el resultado ()
      return res.status(200).send({
        status: "success",
        result,
      });
    });*/

    Result.aggregate(
      [
        {
          $match: { userId: userId },
        },
        {
          $group: {
            _id: "$gradoDeclarado",
            maxReachDerValues: { $push: "$maxReachDer" },
            maxReachIzqValues: { $push: "$maxReachIzq" },
            max20mmValues: { $push: "$max20mmPorcent" },
            doblesValues: { $push: "$dobles" },
            minEdgeValues: { $push: "$minEdge" },
            bloqueoDerValues: { $push: "$bloqueoDer" },
            bloqueoIzqValues: { $push: "$bloqueoIzq" },
          },
        },

        {
          $project: {
            _id: 1,
            maxReachDerLast: { $last: "$maxReachDerValues" },
            maxReachIzqLast: { $last: "$maxReachIzqValues" },
            max20mmLast: { $last: "$max20mmValues" },
            doblesLast: { $last: "$doblesValues" },
            minEdgeLast: { $last: "$minEdgeValues" },
            bloqueoDerLast: { $last: "$bloqueoDerValues" },
            bloqueoIzqLast: { $last: "$bloqueoIzqValues" },
          },
        },
      ],
      function (err, result) {
        if (err) {
          return res.status(404).send({
            status: "error",
            message: "Error",
            err,
          });
        }
        return res.status(200).send({
          status: "success",
          result,
        });
      }
    );
};

//Guardar resultados test
const saveResults = (req, res) => {
  let newResult;
  //Recoger datos del body
  const params = req.body;

  //Crear y rellenar el objeto del modelo
  //Test 9C
  if (params._type == "test9c") {
    newResult = new Result(params);
  }
  //Dedos
  else if (params._type == "max20mm") {
    newResult = new Max20mm(params);
  } else if (params._type == "minEdge") {
    newResult = new MinEdge(params);
  } else if (params._type == "repeaters") {
  }
  //Campus
  else if (params._type == "maxReachDer") {
    newResult = new MaxReachDer(params);
  } else if (params._type == "maxReachIzq") {
    newResult = new MaxReachIzq(params);
  } else if (params._type == "dobles") {
    newResult = new Dobles(params);
  } else if (params._type == "159") {
    newResult = new UnoCincoNueve(params);
  }
  //PullUps
  else if (params._type == "bloqueoDer") {
    newResult = new BloqueoDer(params);
  } else if (params._type == "bloqueoIzq") {
    newResult = new BloqueoIzq(params);
  } else if (params._type == "maxPesoDom") {
    newResult = new MaxPesoDom(params);
  } else if (params._type == "maxNumDom") {
    newResult = new MaxNumDom(params);
  }

  //Guardar objeto en BBDD
  newResult.save((error, resultStored) => {
    resultStored = newResult;
    if (error || !resultStored)
      return res
        .status(500)
        .send({ status: "error", message: "Resultado no guardado" });

    if (resultStored) {
      return res.status(200).send({
        status: "success",
        result: resultStored,
      });
    }
  });
};

//Mostrar resultados de una prueba
const detail = (req, res) => {
  //Sacar ID de la prueba de la url
  const resultId = req.params.id;

  //Encontrar la prueba
  Result.findById(resultId, (error, resultStored) => {
    if (error || !resultStored) {
      return res.status(404).send({
        status: "error",
        message: "No existe la prueba",
      });
    }
    if (req.user.id != resultStored.userId) {
      return res.status(404).send({
        status: "error",
        message: "No estás autorizado para ver la prueba",
      });
    }

    //Devolver respuesta
    return res.status(200).send({
      status: "success",
      message: " ",
      result: resultStored,
    });
  });
};

//Eliminar resultados de una prueba
const remove = (req, res) => {
  //Recuperar ID de la prueba a borrar
  const resultId = req.params.id;

  //Find y remove de la prueba a borrar
  Result.find({ user: req.user.id, _id: resultId }).remove((error) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        message: "no se ha podido eliminar la prueba",
      });
    }
  });

  return res.status(200).send({
    status: "success",
    message: " ",
    prueba: resultId,
  });
};

//Recuperar todos los resultados de otros usuarios del mismo grado
const sameGrade = async (req, res) => {
  
  //Sacar el id de usuario
  const userGrade = req.user.grado;
  const opt = req.body.opt;
if (opt === "push"){
  Result.aggregate(
    [
      {
        $match: { gradoDeclarado: userGrade },
      },
      {
        $group: {
          _id: "$gradoDeclarado",
          maxReachDer: { $push: "$maxReachDer" },
          maxReachIzq: { $push: "$maxReachIzq" },
          max20mm: { $push: "$max20mmPorcent" },
          dobles: { $push: "$dobles" },
          cinco:{ $push :"$cinco" },
          nueve: {$push:"$nueve"},
          minEdge: { $push: "$minEdge" },
          bloqueoDer: { $push: "$bloqueoDer" },
          bloqueoIzq: { $push: "$bloqueoIzq" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: "Error",
          err,
        });
      }
      return res.status(200).send({
        status: "success",
        result,
      });
    }
  );
}else {
  Result.aggregate(
    [
      {
        $match: { gradoDeclarado: userGrade },
      },
      {
        $group: {
          _id: "$gradoDeclarado",
          test1avg: { $avg: "$test1Punt" },
          test2avg: { $avg: "$test2Punt" },
          test3avg: { $avg: "$test3Punt" },
          test4avg: { $avg: "$test4Punt" },
          maxReachDer: { $avg: "$maxReachDer" },
          maxReachIzq: { $avg: "$maxReachIzq" },
          max20mm: { $avg: "$max20mmPorcent" },
          dobles: { $avg: "$dobles" },
          unoCincoNueve: {
            $avg: { $avg: ["$cinco", "$nueve"] },
          },
          minEdge: { $avg: "$minEdge" },
          bloqueoDer: { $avg: "$bloqueoDer" },
          bloqueoIzq: { $avg: "$bloqueoIzq" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: "Error",
          err,
        });
      }
      return res.status(200).send({
        status: "success",
        result,
      });
    }
  );
}
  
};

//});

//Exportar acciones
module.exports = {
  pruebaResults,
  listResults,
  saveResults,
  detail,
  remove,
  sameGrade,
  lastResult,
};
