'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, { through: models.ProductImageRelation, foreignKey: 'imageId', as: 'products' })
      this.belongsToMany(models.ProductCategorie, { through: models.ProductCatImgRelation, foreignKey: 'imageId', as: 'productCategories' })
      this.belongsToMany(models.ProductSubCategorie, { through: models.ProductSubCatImgRelation, foreignKey: 'imageId', as: 'productSubCategories' })
    }
  };
  Image.init({
    imageName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imageExtension: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};