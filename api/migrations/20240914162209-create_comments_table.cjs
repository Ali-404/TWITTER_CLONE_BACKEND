'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      writerId: {
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
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      }

     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
