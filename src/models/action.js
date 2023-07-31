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
      
      models.User.hasMany(userAction, {
        foreignKey: 'bloodbankId'
      });
      userAction.belongsTo( models.User);
  }
  }
  userAction.init({

    blood_group: {
      type: DataTypes.STRING
  },
  action:{
    type: DataTypes.ENUM("donor","patient"),
    allowNull: false
  },
  bloodBank:{
    type: DataTypes.STRING,
    allowNull:false
  },
    required_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    donation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    blood_unit:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  status:{
    type:DataTypes.ENUM("pending", "approved","decline","cancelled"),
    defaultValue : "pending"
  },
  created_by:{
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