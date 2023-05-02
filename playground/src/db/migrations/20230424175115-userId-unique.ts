"use strict";

import { DataTypes } from "sequelize";
import { CustomerSchema, CUSTOMERS_TABLE } from "../models/customer.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addConstraint(CUSTOMERS_TABLE, {
      fields: ["user_id"],
      type: "unique",
      name: "unique_user_id",
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.removeConstraint(CUSTOMERS_TABLE, "unique_user_id");
  },
};
