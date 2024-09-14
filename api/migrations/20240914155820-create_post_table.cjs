'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports =  {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      posterId:{
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id',
        }
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
