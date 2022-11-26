const config = require("../config/keys");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    let db_connect = dbo.getDb();
    const user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    usuario: req.body.usuario,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  db_connect.collection("DatosUsuario").insertOne(user, function (err, res) {
    if (err) {
        res.status(500).send({ message: err });
        return;
    }else{
        user.save(err => {
        if (err) {
        res.status(500).send({ message: err });
        return;
     }
    response.json(res);
    console.log("User was registered successfully!");
  });
 };

});
}
exports.signin = (req, res) => {
  User.findOne({
    usuario: req.body.usuario
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};