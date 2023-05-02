import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Product, ProductSchema } from "./product.model";
import { CategoriesSchema, Category } from "./category.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Order, OrderSchema } from "./order.model";
import { OrderProduct, OrderProductSchema } from "./order-product";

/**
 * The models are gonna be initiated in this function
 */
export function setupModels(sequelize: Sequelize) {
  // Initialize models
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategoriesSchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  // Set the table relationships
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  // OrderProduct.associate(sequelize.models);
}
