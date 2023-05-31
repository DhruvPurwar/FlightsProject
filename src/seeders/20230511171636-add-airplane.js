"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("airplanes", [
      {
        modelNumber: "airbusB-566",
        capacity: 230,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbusB-536",
        capacity: 130,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("airplanes", {
      [Op.or]: [{ modelNumber: "Airbus-A890" }, { modelNumber: "Airbus-A990" }],
    });
  },
};
