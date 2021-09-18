const { Sequelize } = require("sequelize");

module.exports = new Sequelize("codejob", "labber", "labber", {
  host: "localhost",
  dialect: "postgres",
});