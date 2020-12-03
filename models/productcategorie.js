'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategorie extends Model {
    static associate(models) {
      this.hasMany(models.ProductSubCategorie, { foreignKey: 'productCategorieId', as: 'subCategories' })
      this.belongsToMany(models.Image, { through: models.ProductCatImgRelation, foreignKey: 'productCatId', as: 'images' })
    }
  };
  ProductCategorie.init({
    categorieName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductCategorie',
  });
  return ProductCategorie;
};