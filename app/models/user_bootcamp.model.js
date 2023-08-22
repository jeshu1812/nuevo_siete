module.exports = (sequelize, Sequelize) => {
  const UserBootcamp = sequelize.define("user_bootcamp", {
 
  });

  UserBootcamp.associate = (models) => {
    UserBootcamp.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    UserBootcamp.belongsTo(models.Bootcamp, {
      foreignKey: {
        name: "bootcampId",
        allowNull: false,
      },
    });
  };

  return UserBootcamp;
};
