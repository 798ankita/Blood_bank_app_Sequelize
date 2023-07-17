const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('blood_bank_management', 'root', '', {
    host: 'localhost',
    logging: false ,
    dialect: 'mysql'
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.user = require("../models/user_model")(sequelize,DataTypes);
  db.sequelize.sync();
  console.log("All models were synchronized successfully.");
  module.exports = db;