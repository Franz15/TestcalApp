const express = require ("express");
const router = express.Router ();
const MeasuresController = require ("../controllers/measures");

//Definir Rutas
router.get("/prueba-measures", MeasuresController.pruebaMeasures);

//Exportar router
module.exports = router;