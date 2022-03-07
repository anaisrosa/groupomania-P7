module.exports = {
    HOST: "localhost",
    USER: process.env.MYSQL_ID,
    PASSWORD:  process.env.MYSQL_PWD,
    DB: "groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };