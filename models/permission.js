'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      this.belongsToMany(models.Staff, {
        through: models.PermissionStaffRelation,
        as: 'staffs',
        foreignKey: 'permissionId'
      });
    }
  };
  Permission.init({
    permissionName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};