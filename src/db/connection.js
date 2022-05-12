const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_USERPASSWORD,
  {
    dialect: "mysql",
    storage: "./session.mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
global.sequelize= sequelize;
