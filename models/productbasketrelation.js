'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductBasketRelation extends Model {
    static associate(models) {
      
    }
  };
  ProductBasketRelation.init({
    basketId: {
        type: DataTypes.INTEGER
    },
    productId: {
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductBasketRelation',
  });
  return ProductBasketRelation;
};