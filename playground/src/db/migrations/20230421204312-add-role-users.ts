"use strict";

import { UserSchema, USER_TABLE } from "../models/user.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addColumn(USER_TABLE, "role", UserSchema.role);
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.removeColumn(USER_TABLE, "role");
  },
};
