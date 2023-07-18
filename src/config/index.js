/************* */

const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize(
  'blood_bank_management',
  'root', 
  '', 
  {
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
   module.exports = sequelize ;