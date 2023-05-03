import boom from "@hapi/boom";
import { sequelize } from "../libs";
import { IUser } from "../interfaces";

const {
  models: { User },
} = sequelize;

export class UsersService {
  async find() {
    const response = await User.findAll({
      include: "customer",
    });

    if (!response.length) throw boom.notFound("There are not any user yet.");

    return response;
  }

  async findOne(id: number) {
    if (!id) throw boom.badRequest("Invalid id.");

    const response = await User.findByPk(id, {
      include: "customer",
    });

    if (!response) throw boom.notFound("The user wasn't found.");

    return response;
  }

  async findByEmail(email: string) {
    if (!email) throw boom.badRequest("Invalid email.");

    const response = await User.scope("withPassword").findOne({
      where: { email },
      include: ["customer"],
    });

    if (!response) throw boom.notFound("The user wasn't found.");

    return response;
  }

  async create(data: Partial<IUser>) {
    const newUser = await User.create(data);

    if (!newUser)
      throw boom.internal("An error ocurred while creating the user");

    delete newUser.dataValues.password;

    return newUser;
  }
  async update(id: number, changes: Partial<IUser>) {
    const user = await this.findOne(id);

    const updatedUser = await user.update(changes);

    if (!updatedUser)
      throw boom.internal(
        "An error ocurred while updating the user. Please try again later."
      );

    return updatedUser;
  }
  async delete(id: number) {
    const user = await this.findOne(id);

    await user.destroy();

    return id;
  }
}
