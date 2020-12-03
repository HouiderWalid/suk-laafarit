'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubCatImgRelation extends Model {
    static associate(models) {
    }
  };
  ProductSubCatImgRelation.init({
    productSubCatId: { type: DataTypes.INTEGER },
    imageId: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'ProductSubCatImgRelation',
  });
  return ProductSubCatImgRelation;
};