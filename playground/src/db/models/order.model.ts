import { Model, DataTypes, Sequelize, NOW } from "sequelize";
import { CUSTOMERS_TABLE } from "./customer.model";

export const ORDERS_TABLE = "orders";

export const OrderSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    field: "customer_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMERS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
  },
  totalPrice: {
    type: DataTypes.VIRTUAL,
    get(): number {
      const object = this as any;
      if ((object?.items?.length as any) > 0) {
        return object.items.reduce(
          (total: number, item: any) =>
            total + item.price * item.OrderProduct.amount,
          0
        );
      }
      return 0;
    },
  },
};

export class Order extends Model {
  // models
  static associate(models: Model[] | any) {
    // Customers relationship N-1
    this.belongsTo(models.Customer, {
      as: "customer",
      foreignKey: "customerId",
    });

    this.belongsToMany(models.Product, {
      as: "items",
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}
