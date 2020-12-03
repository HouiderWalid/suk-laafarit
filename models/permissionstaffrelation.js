'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionStaffRelation extends Model {
    static associate(models) {
    }
  };
  PermissionStaffRelation.init({
    staffId: { type: DataTypes.INTEGER },
    permissionId: { type: DataTypes.INTEGER },
    someotheratt: {type: DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'PermissionStaffRelation',
  });
  return PermissionStaffRelation;
};