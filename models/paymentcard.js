'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentCard extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' })
    }
  };
  PaymentCard.init({
    clientId: {
      type: DataTypes.INTEGER
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardCVV: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardExpirationMonth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardExpirationYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PaymentCard',
  });
  return PaymentCard;
};