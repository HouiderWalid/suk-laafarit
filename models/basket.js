'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, { through: models.ProductBasketRelation, foreignKey: 'basketId', as: 'products' })
      this.belongsTo(models.Client, { foreignKey: 'clientId' })
    }
  };
  Basket.init({
    basketClientId: {
      type: DataTypes.INTEGER
    },
    basketName: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};