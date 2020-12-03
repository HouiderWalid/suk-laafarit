'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      this.belongsTo(models.PaymentCard, { foreignKey: "paymentCardId" })
      this.belongsTo(models.Basket, { foreignKey: "basketId" })
    }
  };
  Payment.init({
    basketId: {
      type: DataTypes.INTEGER
    },
    paymentCardId: {
      type: DataTypes.INTEGER
    },
    paymentType: {
      // 0 : Delivery, 1 : Credit Card
      type: DataTypes.ENUM('Delivery', 'CreditCard'),
      defaultValue: 'Delivery'
    },
    paymentDeliveryDate:{
      type: DataTypes.DATEONLY
    },
    paymentConfirmation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};