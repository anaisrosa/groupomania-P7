module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    reported: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  });

  return Post;
};
