'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCatImgRelation extends Model {
    static associate(models) {
    }
  };
  ProductCatImgRelation.init({
    productCatId: { type: DataTypes.INTEGER },
    imageId: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'ProductCatImgRelation',
  });
  return ProductCatImgRelation;
};