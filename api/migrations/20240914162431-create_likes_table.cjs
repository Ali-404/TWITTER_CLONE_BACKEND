'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('likes', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      likerId: {
        allowNull: false, 
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id',
        }
      },

     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};
