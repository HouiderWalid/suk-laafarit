'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsToMany(models.Image, { through: models.ProductImageRelation, foreignKey: 'productId', as: 'images' })
      this.belongsToMany(models.Basket, { through: models.ProductBasketRelation, foreignKey: 'productId', as: 'baskets' })
      this.belongsTo(models.ProductSubCategorie, { foreignKey: 'productSubCatId' })
      this.hasMany(models.Rate, { foreignKey: 'productId', as: 'rates' })
      this.hasMany(models.Favorite, { foreignKey: 'productId', as: 'favorites' })
      this.hasMany(models.Comment, { foreignKey: 'productId', as: 'comments' })
    }
  };
  Product.init({
    productSubCatId: {
      type: DataTypes.INTEGER
    },
    productCode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productBrand: {
      type: DataTypes.STRING
    },
    productStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    productPrice: {
      type: DataTypes.DOUBLE
    },
    productDescription: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};