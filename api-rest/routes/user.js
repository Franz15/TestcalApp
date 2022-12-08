const express = require ("express");
const router = express.Router ();
const UserController = require ("../controllers/user");
const check = require ("../middlewares/auth");
const multer = require("multer");
const user = require("../models/user");


//Configuración de subida
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb (null, "./uploads/avatars/");
    },
    filename: (req, file,cb)=>{
        cb (null, "avatar-"+Date.now()+"-"+req.user.id);
    }
});

const uploads = multer({storage});

//Definir Rutas
router.get("/prueba-user", check.auth, UserController.pruebaUser);
router.post ("/register", UserController.register);
router.post ("/login", UserController.login);
router.get("/profile/:id",check.auth, UserController.profileUser);
router.put("/update", check.auth, UserController.update);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.upload);
router.get("/avatar/:file", UserController.avatar);

//Exportar router
module.exports = router;