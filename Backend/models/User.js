module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    pseudo: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
