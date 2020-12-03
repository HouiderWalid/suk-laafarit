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
    clientId: {
        type: DataTypes.INTEGER
    },  
    productId: {
        type: DataTypes.INTEGER
    },
    commandQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'ProductBasketRelation',
  });
  return ProductBasketRelation;
};