'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImageRelation extends Model {
    static associate(models) {
    }
  };
  ProductImageRelation.init({
    productId: { type: DataTypes.INTEGER },
    imageId: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'ProductImageRelation',
  });
  return ProductImageRelation;
};