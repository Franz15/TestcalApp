//Importar dependencias
const connection = require ("./database/connection");
const express = require ("express");
const cors = require ("cors");

console.log ("API funcionando");

//Conexión a Base de Datos
connection();

//Crear servidor Node
const app = express();
const puerto = 5555;

//Configurar CORS
app.use(cors());

//Convertir los datos del body a objetos .js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cargar config rutas
const UserRoutes = require("./routes/user");
const MeasuresRoutes = require("./routes/measures");
const ResultsRoutes = require ("./routes/results");

app.use ("/api/user", UserRoutes);
app.use ("/api/measures", MeasuresRoutes);
app.use ("/api/results", ResultsRoutes);

//Poner servidor a escuchar peticiones HTTP
app.listen (puerto,()=>{
    console.log("Servidor NODE corriendo en el puerto: ",puerto);
});
