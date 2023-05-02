import { Model, DataTypes, Sequelize, NOW } from "sequelize";
import { ORDERS_TABLE } from "./order.model";
import { PRODUCTS_TABLE } from "./product.model";

export const ORDERS_PRODUCTS_TABLE = "orders_products";

export const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: "order_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDERS_TABLE, // the other table
      key: "id", // the other table's id
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTS_TABLE, // the other table
      key: "id", // the other table's id
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
  },
};

export class OrderProduct extends Model {
  static associate(models: Model[] | any) {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDERS_PRODUCTS_TABLE,
      timestamps: false,
    };
  }
}
