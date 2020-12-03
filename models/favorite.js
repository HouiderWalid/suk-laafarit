'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' })
      this.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  };
  Favorite.init({
    clientId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};