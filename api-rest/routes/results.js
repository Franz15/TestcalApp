const express = require ("express");
const router = express.Router ();
const ResultsController = require ("../controllers/results");
const check = require("../middlewares/auth");

//Definir Rutas
router.get("/prueba-results", ResultsController.pruebaResults);
router.post("/save", check.auth, ResultsController.saveResults);
router.get("/detail/:id",check.auth, ResultsController.detail);
router.delete("/remove/:id",check.auth, ResultsController.remove);
router.get("/list", check.auth, ResultsController.listResults);
router.get("/grade/:id", check.auth, ResultsController.sameGrade);
router.get("/result", check.auth, ResultsController.lastResult);


//Exportar router
module.exports = router;