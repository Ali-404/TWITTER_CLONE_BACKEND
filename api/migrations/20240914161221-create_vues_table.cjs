'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('vues', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      viewerId: {
        allowNull: false, 
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id',
        }
      },

      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: 'id',
        }
      }

     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('vues');
  }
};
