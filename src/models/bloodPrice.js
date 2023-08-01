"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bloodPricePerUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    models.bloodBank.hasOne(bloodPricePerUnit);
    bloodPricePerUnit.belongsTo(models.bloodBank);
    }
  }

  bloodPricePerUnit.init(
    {
      AB_positive: {
        type: DataTypes.INTEGER,
      },
      A_positive: {
        type: DataTypes.INTEGER,
      },
      B_positive: {
        type: DataTypes.INTEGER,
      },
      O_positive: {
        type: DataTypes.INTEGER,
      },
      AB_negative: {
        type: DataTypes.INTEGER,
      },
      A_negative: {
        type: DataTypes.INTEGER,
      },
      B_negative: {
        type: DataTypes.INTEGER,
      },
      O_negative: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "bloodPricePerUnit",
      tableName: "bloodPricePerUnit",
      paranoid: true,
      timestamps: true,
    }
  );
  return bloodPricePerUnit;
};
