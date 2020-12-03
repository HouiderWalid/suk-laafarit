'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      this.belongsTo(models.Staff, { foreignKey: 'staffId' })
    }
  };
  Employee.init({
    staffId: {
      type: DataTypes.INTEGER
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    employeePassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employeeEmail: {
      type: DataTypes.STRING,
      unique: true
    },
    isEmployeeEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    employeeEmailVerifiedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};