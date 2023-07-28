'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bloodBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasOne(bloodBank);
      bloodBank.belongsTo(models.User);
  }
    }
    
  bloodBank.init({
    name: {
      type: DataTypes.STRING
  },
    logo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
  status:{
    type:DataTypes.ENUM("active","inactive"),
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
    modelName: 'bloodBank',
    tableName: 'bloodBanks',
    paranoid: true,
    timestamps: true
  });
  return bloodBank;
};