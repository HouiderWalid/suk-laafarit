'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubCategorie extends Model {
    static associate(models) {
      this.belongsToMany(models.Image, { through: models.ProductSubCatImgRelation, foreignKey: 'productSubCatId', as: 'images' })
      this.belongsTo(models.ProductCategorie, { foreignKey: 'productCategorieId' })
      this.hasMany(models.Product, { foreignKey: 'productSubCatId', as: 'products' })
    }
  };
  ProductSubCategorie.init({
    productCategorieId: {
      type: DataTypes.INTEGER
    },
    subCategorieName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductSubCategorie',
  });
  return ProductSubCategorie;
};