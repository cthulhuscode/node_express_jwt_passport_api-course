"use strict";

import { CustomerSchema, CUSTOMERS_TABLE } from "../models/customer.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable(CUSTOMERS_TABLE, CustomerSchema);
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable(CUSTOMERS_TABLE);
  },
};
