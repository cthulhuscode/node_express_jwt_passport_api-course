"use strict";

import { ProductSchema, PRODUCTS_TABLE } from "../models/product.model";
import { CategoriesSchema, CATEGORIES_TABLE } from "../models/category.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addColumn(
      PRODUCTS_TABLE,
      "category_id",
      ProductSchema.categoryId
    );
    await queryInterface.addColumn(
      PRODUCTS_TABLE,
      "description",
      ProductSchema.description
    );
    await queryInterface.addColumn(
      CATEGORIES_TABLE,
      "image",
      CategoriesSchema.image
    );
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.removeColumn(PRODUCTS_TABLE, "category_id");
    await queryInterface.removeColumn(PRODUCTS_TABLE, "description");
    await queryInterface.removeColumn(CATEGORIES_TABLE, "image");
  },
};
