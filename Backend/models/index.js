const dbConfig = require("../db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);

db.User.hasOne(db.Post, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.Post.belongsTo(db.User);

db.User.hasOne(db.Comment, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
db.Comment.belongsTo(db.User);
// A HasOne B
db.Post.hasOne(db.Comment,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
db.Comment.belongsTo(db.Post);

module.exports = db;
