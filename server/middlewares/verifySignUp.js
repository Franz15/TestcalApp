const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    let db_connect = dbo.getDb();
    
    // Username
    let myquery = { usuario: ObjectId(req.body.usuario) };
    db_connect
      .collection("DatosUsuario")
      .findOne(myquery, function (err, result) {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
      
          if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
 
    // Email
    let myquery = { usuario: ObjectId(req.body.email) };
    db_connect
        .collection("DatosUsuario")
        .findOne(myquery, function (err, result) {
            if (err) {
                res.status(500).send({ message: err });
                return;
              }
          
              if (user) {
                res.status(400).send({ message: "Failed! Username is already in use!" });
                return;
        }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;