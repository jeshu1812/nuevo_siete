const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "postgres",
    operatorsAliases: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.bootcamp = require("./bootcamp.model.js")(sequelize, Sequelize);
db.user_bootcamp = require("./user_bootcamp.model.js")(sequelize, Sequelize);


db.user.belongsToMany(db.bootcamp, { through: db.user_bootcamp }); 
db.bootcamp.belongsToMany(db.user, { through: db.user_bootcamp }); 

module.exports = db;
