const express = require("express");
const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//------------------------------------------------------//

//Aqui se comprueban los datos del login
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/record/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,

    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
};



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);

};









//------------------------------------------------------//


 
// Aqui se crean nuevos registros en la BBDD para las 3 colecciones.
recordRoutes.route("/record/add/user").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    usuario: req.body.usuario,
    mail: req.body.mail,
    password: req.body.password
  };
  db_connect.collection("DatosUsuario").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });
 
 recordRoutes.route("/record/addMeasures").post(function (req, response) {
   let db_connect = dbo.getDb();
   let myobj = {
     edad: req.body.edad,
     grado: req.body.grado,
     altura: req.body.altura,
     peso: req.body.peso,
     envergadura: req.body.envergadura,
     userid: req.body._id 
   };
   db_connect.collection("DatosFisicos").insertOne(myobj, function (err, res) {
     if (err) throw err;
     response.json(res);
   });
  });
recordRoutes.route("/record/add/results").post(function (req, response) {
   let db_connect = dbo.getDb();
   let myobj = {
     fecha: new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-'),
     //grado: req.body.grado, //tanto grado como peso deberían venir dados de la tabla de DatosFisicos
     peso: req.body.pesoCorp,
     test1Peso: req.body.test1Peso,
     test1Punt: req.body.puntos1,
     test1Porcent: req.body.porcent1,
     test2Peso: req.body.test2Peso,
     test2Porcent: req.body.porcent2,
     test2Punt: req.body.puntos2,
     test3Tiempo: req.body.test3Tiempo,
     variante: req.body.variante,
     test3Punt: req.body.puntos3,
     test4Tiempo: req.body.test4Tiempo,
     test4Punt: req.body.puntos4,
     gradoTeorico: req.body.grado
     //userid: req.body._id 
   };
   db_connect.collection("ResultadosTests").insertOne(myobj, function (err, res) {
     if (err) throw err;
     response.json(res);
   });
  });
  
// Aqui se recuperan todos los datos de las colecciones.
recordRoutes.route("/record/users").get(function (req, res) {
 let db_connect = dbo.getDb("TestsFisicos");
 db_connect
   .collection("DatosUsuario")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

recordRoutes.route("/record/measures").get(function (req, res) {
  let db_connect = dbo.getDb("TestsFisicos");
  db_connect
    .collection("DatosFisicos")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 recordRoutes.route("/record/results").get(function (req, res) {
  let db_connect = dbo.getDb("TestsFisicos");
  db_connect
    .collection("ResultadosTests")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// Aqui se recupera un dato único por id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("DatosUsuario")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

recordRoutes.route("/record/:idMeasures").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("DatosUsuario")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
 //Aqui se recuperan todos los datos con el userid

 recordRoutes.route("/record/usermeasures").get(function (req, res) {
  let db_connect = dbo.getDb("TestsFisicos");
  let myquery = { userid: ObjectId(req.params.userid) };
  db_connect
    .collection("DatosFisicos")
    .find({"userid":myquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 recordRoutes.route("/record/user/results/:userid").get(function (req, res) {
  let db_connect = dbo.getDb("TestsFisicos");
  let myquery = { userid: ObjectId(req.params.userid)};
  db_connect
    .collection("ResultadosTests")
    .find({"userid":myquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


 
























// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("DatosUsuario")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 





// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("DatosUsuario").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;

recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("DatosUsuario")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });
  
 // This section will help you delete a record
 recordRoutes.route("/results/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("ResultadosTests").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });
  
 module.exports = recordRoutes;