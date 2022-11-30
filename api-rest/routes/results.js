const express = require ("express");
const router = express.Router ();
const ResultsController = require ("../controllers/results");

//Definir Rutas
router.get("/prueba-results", ResultsController.pruebaResults);

//Exportar router
module.exports = router;