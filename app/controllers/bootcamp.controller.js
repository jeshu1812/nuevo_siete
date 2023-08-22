const db = require("../models/index.js");
const Bootcamp = db.bootcamp;
const User = db.user;
const UserBootcamp = db.user_bootcamp;

exports.createBootcamp = (req, res) => {
  const { title, cue, description } = req.body;

  Bootcamp.create({
    title: title,
    cue: cue,
    description: description,
  })
    .then((bootcamp) => {
      res.status(201).send(bootcamp);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al crear el Bootcamp.",
      });
    });
};

exports.addUserToBootcamp = (req, res) => {
  const { userId, bootcampId } = req.params;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      Bootcamp.findByPk(bootcampId)
        .then((bootcamp) => {
          if (!bootcamp) {
            return res.status(404).send({ message: "Bootcamp no encontrado." });
          }

          UserBootcamp.create({
            userId: user.id,
            bootcampId: bootcamp.id,
          })
            .then(() => {
              res.status(201).send({
                message: "Usuario agregado al Bootcamp exitosamente.",
              });
            })
            .catch((error) => {
              res.status(500).send({
                message:
                  error.message ||
                  "Ocurrió un error al agregar el usuario al Bootcamp.",
              });
            });
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Ocurrió un error al buscar el Bootcamp.",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al buscar el usuario.",
      });
    });
};

exports.findBootcampById = (req, res) => {
  const bootcampId = req.params.id;

  Bootcamp.findByPk(bootcampId, {
    include: User, 
  })
    .then((bootcamp) => {
      if (!bootcamp) {
        return res.status(404).send({ message: "Bootcamp no encontrado." });
      }
      res.status(200).send(bootcamp);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al buscar el Bootcamp.",
      });
    });
};

exports.findAllBootcamps = (req, res) => {
  Bootcamp.findAll({
    include: User, 
  })
    .then((bootcamps) => {
      res.status(200).send(bootcamps);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al obtener los Bootcamps.",
      });
    });
};

exports.addUserToBootcamp = (req, res) => {
  const { userId, bootcampId } = req.params;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      Bootcamp.findByPk(bootcampId)
        .then((bootcamp) => {
          if (!bootcamp) {
            return res.status(404).send({ message: "Bootcamp no encontrado." });
          }

          UserBootcamp.create({
            userId: user.id,
            bootcampId: bootcamp.id,
          })
            .then(() => {
              res.status(201).send({
                message: "Usuario agregado al Bootcamp exitosamente.",
              });
            })
            .catch((error) => {
              res.status(500).send({
                message:
                  error.message ||
                  "Ocurrió un error al agregar el usuario al Bootcamp.",
              });
            });
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Ocurrió un error al buscar el Bootcamp.",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Ocurrió un error al buscar el usuario.",
      });
    });
};

