'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
