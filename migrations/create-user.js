'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      /*group_id: {
        type: Sequelize.INTEGER,
        refrences: {
          model: 'Groups',
          key: 'id',
          as: 'group_id'
        }
      },*/
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      userpassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      useremail: {
        type: Sequelize.STRING,
        unique: true
      },
      useremailverified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailverifiedAt:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};