"use strict";

import {
  OrderProductSchema,
  ORDERS_PRODUCTS_TABLE,
} from "../models/order-product";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, OrderProductSchema);
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  },
};
