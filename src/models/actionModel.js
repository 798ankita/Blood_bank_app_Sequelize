'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userAction.belongsTo(models.User,{
        foreignKey:"userId"
      })
    }
  }
  userAction.init({
      userId:{
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    bloodBankId:{
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    
    blood_group: {
      type: DataTypes.STRING
  },
    required_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    donation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    action:{
      type: DataTypes.ENUM("donor","patient"),
      allowNull: false
    },
    blood_unit:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  status:{
    type:DataTypes.ENUM("pending", "approved","decline"),
    defaultValue : "pending"
  },
  created_by:{
    type: DataTypes.STRING,
   
  },
  updated_by:{
    type: DataTypes.STRING, 
  }
  }, {
    sequelize,
    modelName: 'userAction',
    tableName: 'user_action',
    paranoid: true,
    timestamps: true
  });
  return userAction;
};