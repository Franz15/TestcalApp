//Importar dependencias y módulos
const bcrypt = require ("bcrypt");
const user = require("../models/user");
const fs = require ("fs");

//Importar modelos
const User = require ("../models/user");

//Importar servicios
const jwt = require ("../services/jwt");


//Acciones de prueba
const pruebaUser =(req,res)=>{
    
    return res.status(200).send({
        message: "Mensaje test user.js",
        usuario: req.user
    });
}

//Registro de usuarios
const register = (req,res) => {
    //Recoger Datos
    let params = req.body;
    //Comprobar que llegan (+validacion)
    if (!params.nombre || !params.apellido || !params.email || !params.user || !params.password){
        return res.status(400).json({
            status: "error",
            message: "campos incompletos",
    });
    }  
    
    //Control usuarios duplicados
    User.find ({ $or:[
        {email: params.email.toLowerCase()},
        {user: params.user.toLowerCase()}

    ]}).exec(async(error, users)=>{

        if(error)return res.status(500).json({status:"error", message:"Error en la consulta"});

        if(users && users.length >=1){
            return res.status(200).send({
                status:"success",
                message: "El usuario ya existe"
            });
        }
            //Cifrar la contraseña
            let hashedPassword = await bcrypt.hash(params.password, 10);
            params.password = hashedPassword;
            //Crear objeto de usuario
            let user_to_save = new User(params);

            //Guardar usuario en la bbdd
           user_to_save.save((error, userStored)=>{
                userStored = user_to_save;
                if(error || !userStored) return res.status(500).send({status: "error", "message": "Error al guardar el usuario"});

                if (userStored){
                    //Devolver resultado
                    return res.status(200).json({
                        status: "success",
                        message:"Usuario registrado correctamente",
                        user: userStored      
                    });
                }
            })       
    })
}

//Login
const login = (req,res)=>{
    //Recoger parámetros
    let params = req.body;

    if (!params.email || !params.password){
        return res.status(400).send({
            status:"error",
            message:"Faltan datos "
        });
    }
    //Buscar si existe en BBDD
    User.findOne({email: params.email})
    .exec((error, user)=>{
        if (error || !user) return res.status(404).send({status: "error", message: "No existe este usuario"});
    
    //Comprobar contraseña
    const pwd = bcrypt.compareSync(params.password, user.password);   
    
    if (!pwd){
        return res.status(404).send({
            status:"error",
            message:"Contraseña incorrecta"
        })
    }
    //Recuperar Token
    const token = jwt.createToken(user);

    //Devolver datos del usuario
    return res.status(200).send({
        status:"success",
        message:"Login",
        user: {
            id: user._id,
            nombre: user.nombre,
            user: user.user
        },
        token
    });
    }); 
}

//Perfil del usuario
const profileUser = (req, res)=>{
    //Recibir el parámetro ID de usuario por la URL
    let params =req.body;

    //Consultas para recuperar los datos de usuario
    User.findOne({id:params._id})
    .select({password: 0, role: 0})
    .exec((error, userProfile)=>{
        console.log(User)
        if(error || !userProfile){
            return res.status (404).send({
                status:"error",
                message: "Usuario no encontrado"

            });
        }

        return res.status (200).send({
            status:"success",
            user: userProfile

        });

    })

}

//Actualizacion de los datos del usuario
const update = (req,res)=>{
    //Recuperar info del usuario a actualizar
    let userId = req.user;
    let userToUpdate = req.body;

   //Eliminar campos sobrantes
    delete userToUpdate.iat;
    delete userToUpdate.exp;


    //Evitar que los campos user o email lleguen vacíos
    if(!userToUpdate.user){
        userToUpdate.user = userId.user;
    } if (!userToUpdate.email){
        userToUpdate.email = userId.email;

    //Comprobar si el user ya existe
    }User.find ({ $or:[
        {email: userToUpdate.email.toLowerCase()},
        {user: userToUpdate.user.toLowerCase()}
        
    ]}).exec(async(error, users)=>{

        if(error)return res.status(500).json({status:"error", message:"Error en la consulta"});

        let userIsSet = false;
        users.forEach(user=>{
            if (user && user._id != userId.id) userIsSet = true;
        });
     
        if(userIsSet){
            return res.status(200).send({
                status:"success",
                message: "El usuario ya existe"
            });
        }
            //Si me llega la password cifrarla
            if (userToUpdate.password){
                let hashedPassword = await bcrypt.hash(userToUpdate.password, 10);
                userToUpdate.password = hashedPassword;
            }
             
            //Buscar y actualizar
            User.findByIdAndUpdate(userId.id, userToUpdate, {new: true},(error, userUpdated)=>{

                if (error || !userUpdated){
                    return res.status(500).json({status: "error", message: "Error al actualizar usuario"});
                }
            
            return res.status (200).send({
                status:"success",
                message: "Actualizacion",
                user1: userToUpdate,
                userId,
                user2: userUpdated
            });
        });
  });

}

//Subir imágenes al avatar
const upload =(req, res)=>{

    //Recoger el fichero de imagen y comprobar que existe
    if (!req.file){
        return res.status(404).send({
            status: "error",
            message: "No se encuentra imagen"
        });
    }
    //Conseguir nombre del archivo
    let image = req.file.originalname;
    
    // Sacar la extensión del archivo
    let imageSplit = image.split("\.");
    let extension = imageSplit.pop().toLowerCase();
    
    //Comprobar extensión
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif"){
        
        //Si no es válida, borrar archivo
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);
        return res.status (400).send({
            status: "error",
            message: "Extensión inválida"
        })

    }

    //Si es válida, guardar imagen en BBDD
    User.findOneAndUpdate(req.user.id, {image: req.file.filename}, {new: true},(error, userUpdated)=>{
        if (error || !userUpdated){
            return res.status(500).send({
                status: "error",
                message: "Error en la subida del avatar"
            })
        }
        
        
        //Devolver resultado
        return res.status(200).send({
            status: "success",
            user: userUpdated
        });
    })

    
}

const avatar =(req,res)=>{
    //Sacar el parámetro de la URL
    const file = req.params.file;

    //Montar el path real de la imagen
    const filePath = "./uploads/avatars/"+file;

    //Comprobar que existe
    
    //Devolver resultado
    return res.status(200).send({
        status: "success",
        
    });

}
//Exportar acciones
module.exports = {
    pruebaUser,
    register,
    login,
    profileUser,
    update,
    upload,
    avatar
}