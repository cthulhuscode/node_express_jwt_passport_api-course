"use strict";

import { OrderSchema, ORDERS_TABLE } from "../models/order.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable(ORDERS_TABLE, OrderSchema);
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable(ORDERS_TABLE);
  },
};
