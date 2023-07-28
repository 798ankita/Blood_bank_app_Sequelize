'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  }
  User.init({
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
     
   }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamps: true
  });
  return User;
};