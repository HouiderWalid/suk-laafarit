'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      this.hasMany(models.Basket, { foreignKey: 'clientId', as: 'baskets' })
      this.hasMany(models.PaymentCard, { foreignKey: 'clientId', as: 'paymentCards'})
      this.hasMany(models.Rate, { foreignKey: 'clientId', as: 'rates' })
      this.hasMany(models.Favorite, { foreignKey: 'clientId', as: 'favorites' })
      this.hasMany(models.Comment, { foreignKey: 'clientId', as: 'comments' })
    }
  };
  Client.init({
    clientUserName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    clientPassword: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    clientEmail: {
      type: DataTypes.STRING,
      unique: true
    },
    clientFullName: {
      type: DataTypes.STRING
    },
    clientCountry: {
      type: DataTypes.STRING
    },
    clientCity: {
      type: DataTypes.STRING
    },
    clientAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientMoreData: {
      type: DataTypes.STRING
    },
    clientPhoneNumber: {
      type: DataTypes.INTEGER
    },
    isClientEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    clientEmailVerifiedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};