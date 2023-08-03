"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class paymentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    models.bloodBank.hasMany(paymentDetail);
    paymentDetail.belongsTo(models.bloodBank);

    models.User.hasMany(paymentDetail);
    paymentDetail.belongsTo(models.User);

    models.userAction.hasOne(paymentDetail);
    paymentDetail.belongsTo(models.userAction);

    }
  }

  paymentDetail.init(
    {
      total_amount: {
        type: DataTypes.STRING
      },
      payment_mode: {
        type: DataTypes.STRING,
      },
      status:{
        type:DataTypes.ENUM("pending","approved","rejected")
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: "paymentDetail",
      tableName: "payment_detail",
      paranoid: true,
      timestamps: true,
    }
  );
  return paymentDetail;
};
