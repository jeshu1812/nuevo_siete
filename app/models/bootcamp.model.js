
module.exports = (sequelize, Sequelize) => {
    const Bootcamp = sequelize.define("bootcamp", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 5,
          max: 20,
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Bootcamp;
  };