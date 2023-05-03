import boom from "@hapi/boom";
import { sequelize } from "../libs";
import { ICustomer, IUser } from "../interfaces";
import { hashPassword } from "../utils/bcrypt";
const {
  models: { Customer, User },
} = sequelize;

export class CustomersService {
  async find() {
    const response = await Customer.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "role", "createdAt"],
        },
      ],
    });

    if (!response.length)
      throw boom.notFound("There are not any customer yet.");

    return response;
  }

  async findOne(id: number) {
    if (!id) throw boom.badRequest("Invalid id.");

    const response = await Customer.findByPk(id);

    if (!response) throw boom.notFound("The customer wasn't found.");

    return response;
  }
  async create(data: Partial<ICustomer> | any) {
    /**
     * Thanks to the associations is possible to create
     * new rows even for associated tables. For example,
     * create a new user for a new client.
     * This endpoint creates a new customer and a new user.
     */
    const newCustomer: any = await Customer.create(data, {
      include: ["user"],
    });

    if (!newCustomer)
      throw boom.internal("An error ocurred while creating the customer");

    delete newCustomer.dataValues.user.dataValues.password;

    return newCustomer;
  }
  async update(id: number, changes: Partial<ICustomer>) {
    const customer = await this.findOne(id);

    const updatedCustomer = await customer.update(changes);

    if (!updatedCustomer)
      throw boom.internal(
        "An error ocurred while updating the user. Please try again later."
      );

    return updatedCustomer;
  }
  async delete(id: number) {
    const customer = await this.findOne(id);

    await customer.destroy();

    return id;
  }
}
