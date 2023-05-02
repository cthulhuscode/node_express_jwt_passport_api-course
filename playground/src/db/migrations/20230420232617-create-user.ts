"use strict";

import { UserSchema, USER_TABLE } from "../models/user.model";
import { ProductSchema, PRODUCTS_TABLE } from "../models/product.model";
import { CategoriesSchema, CATEGORIES_TABLE } from "../models/category.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable(USER_TABLE);
  },
};
