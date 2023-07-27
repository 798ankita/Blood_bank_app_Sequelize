'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: DataTypes.STRING
       },
       username: {
         type: DataTypes.STRING,
         allowNull: false
       },
       password: {
         type: DataTypes.STRING,
     },
       contact: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       address: {
         type: DataTypes.STRING,
         allowNull: false
       },
       state:{
         type: DataTypes.STRING,
       },
       city:{
         type: DataTypes.STRING,
       },
       email: {
         type: DataTypes.STRING,
         allowNull: false
       },
      role:{
       type:DataTypes.ENUM("user","blood_bank","super_user"),
      },
     blood_group:{
       type:DataTypes.STRING,
     },
     status:{
       type:DataTypes.ENUM("active", "deactivate"),
       defaultValue : "active"
     },
     created_by:{
       type: DataTypes.STRING,
      
     },
     updated_by:{
       type: DataTypes.STRING,
       
     },
     deletedAt:{
      type: Sequelize.STRING,
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};