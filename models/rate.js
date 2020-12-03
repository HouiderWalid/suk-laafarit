'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' })
      this.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  };
  Rate.init({
    clientId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    rateNote: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};