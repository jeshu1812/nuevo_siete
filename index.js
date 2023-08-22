const express = require("express");
const app = express();
const db = require("./app/models");
const userController = require("./app/controllers/user.controller.js"); 
const bootcampController = require("./app/controllers/bootcamp.controller.js"); 
//const userBootcampController = require("./app/controllers/bootcamp.controller.js");

const PORT = process.env.PORT || 3001;


db.sequelize.sync().then(() => {
  console.log("Conexión exitosa a la base de datos.");
});

app.use(express.json());


app.post("/users", userController.createUser);
app.get("/users/:id", userController.findUserById);
app.get("/users", userController.findAllUsers);
app.put("/users/:id", userController.updateUserById);
app.delete("/users/:id", userController.deleteUserById);

app.post("/bootcamps", bootcampController.createBootcamp);
app.post("/bootcamps/:id/users/:userId", bootcampController.addUserToBootcamp);
app.get("/bootcamps/:id", bootcampController.findBootcampById);
app.get("/bootcamps", bootcampController.findAllBootcamps);

//app.post("/bootcamps/:bootcampId/users/:userId", userBootcampController.addUserToBootcamp);


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
