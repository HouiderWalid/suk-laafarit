'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      this.hasMany(models.Employee, { foreignKey: 'staffId', as: 'employees' });
      this.belongsToMany(models.Permission, {
        through: models.PermissionStaffRelation,
        as: 'permissions',
        foreignKey: 'staffId'
      })
    }
  };
  Staff.init({
    staffName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};