"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports", {
      type: "foreign key",
      name: "city_fkey_constraints",
      fields: ["cityID"],
      references: {
        table: "Cities", // name of Target model
        field: "id", // key in Target model that we're referencing
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "city_fkey_constraints");
  },
};

/**
 * Query to check if constraint has applied
 * select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME= 'airports' AND CONSTRAINT_NAME ='flights'
 */
