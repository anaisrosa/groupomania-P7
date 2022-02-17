module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: Sequelize.TEXT, 
      allowNull : false
    },
    reported: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  });
  return Comment;
};