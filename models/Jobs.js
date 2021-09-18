const Sequelize = require("sequelize");
const db = require("../config/database");

const Job = db.define('job',{
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contact: {
    type: Sequelize.STRING
  },
})

module.exports = Job
