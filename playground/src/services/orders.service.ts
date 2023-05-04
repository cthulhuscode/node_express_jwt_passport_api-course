import boom from "@hapi/boom";
import { sequelize } from "../libs";
import { IOrder } from "../interfaces/IOrder";
import { User } from "../db";
import { IOrderProduct } from "../interfaces";

const {
  models: { Order, OrderProduct },
} = sequelize;

export class OrdersService {
  async find(size?: number | undefined) {
    const response: any = await Order.findAll({
      include: [
        {
          association: "customer",
          include: [
            {
              association: "user",
              model: User,
              as: "user",
              attributes: ["id", "email", "role", "createdAt"],
            },
          ],
        },
      ],
    });

    if (!response.length) throw boom.notFound("There is not any order yet");

    if (size && size >= 1 && size <= 100) return response.slice(0, size);

    return response;
  }

  async findOne(id: number) {
    const order = await Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: [
            {
              association: "user",
              model: User,
              as: "user",
              attributes: ["id", "email", "role", "createdAt"],
            },
          ],
        },
        "items",
      ],
    });

    if (!order) throw boom.notFound("The order wasn't found");

    return order;
  }

  async findByUser(userId: number) {
    const orders = await Order.findAll({
      where: { "$customer.user.id$": userId }, // Filtrate by columns in associations customer -> user . id
      include: [
        {
          association: "customer",
          include: [
            {
              association: "user",
              model: User,
              as: "user",
              attributes: ["id", "email", "role", "createdAt"],
            },
          ],
        },
        "items",
      ],
    });

    if (!orders) throw boom.notFound("No orders were found.");

    return orders;
  }

  async create(customerId: number) {
    const newOrder = await Order.create({ customerId });

    if (!newOrder)
      throw boom.internal(
        "An error occurred while creating the order. Please try again later."
      );

    return newOrder;
  }

  async addItem(data: Partial<IOrderProduct>) {
    const { orderId, productId, amount } = data;

    const productExistsInOrder: any = await OrderProduct.findOne({
      where: { order_id: orderId, product_id: productId },
    });

    if (productExistsInOrder) {
      const newAmount = productExistsInOrder.amount + amount;
      const updatedItem = await productExistsInOrder.update({
        amount: newAmount,
      });

      if (!updatedItem)
        throw boom.internal(
          "An error occurred while adding items to the order. Please try again later."
        );

      return updatedItem;
    } else {
      const newItem = await OrderProduct.create(data);

      if (!newItem)
        throw boom.internal(
          "An error occurred while adding items to the order. Please try again later."
        );

      return newItem;
    }
  }

  async update(id: number, changes: Omit<IOrder, "id">) {
    const currentOrder = await this.findOne(id);

    let updatedOrder = await currentOrder.update(changes);

    if (!updatedOrder)
      throw boom.internal(
        "An error occurred while updating the order. Please try again later."
      );

    // Reload data
    updatedOrder = await this.findOne(id);

    return updatedOrder;
  }

  async delete(id: number) {
    const order = await this.findOne(id);

    await order.destroy();

    return id;
  }
}
