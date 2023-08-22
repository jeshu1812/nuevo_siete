const db = require("../models/index.js");
const User = db.user;
const Bootcamp = db.bootcamp;
const UserBootcamp = db.user_bootcamp;

exports.createUser = (req, res) => {
  const { firstName, lastName, email } = req.body;

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al crear el usuario.",
      });
    });
};

exports.findUserById = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId, {
    include: Bootcamp, 
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al buscar el usuario.",
      });
    });
};

exports.findAllUsers = (req, res) => {
  User.findAll({
    include: Bootcamp, 
  })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al obtener los usuarios.",
      });
    });
};

exports.updateUserById = (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      user
        .save()
        .then(() => {
          res.status(200).send({ message: "Usuario actualizado exitosamente." });
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar el usuario.",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al buscar el usuario.",
      });
    });
};

exports.deleteUserById = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      user
        .destroy()
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar el usuario.",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al buscar el usuario.",
      });
    });
};
