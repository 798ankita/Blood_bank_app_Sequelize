const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../config/index");
const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.user = require("./user_model")(sequelize,DataTypes);
  // db.superUser = require("./superUser")(sequelize,DataTypes);
  db.sequelize.sync();
  console.log("All models were synchronized successfully.");
  module.exports = db;