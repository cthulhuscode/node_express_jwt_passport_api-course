import { ICategory } from "../interfaces/ICategory";
import boom from "@hapi/boom";
import { sequelize } from "../libs";

const {
  models: { Category },
} = sequelize;

export class CategoriesService {
  async find() {
    const response = await Category.findAll();

    if (!response.length) throw boom.notFound("No categories were found.");

    return response;
  }

  async findOne(id: number) {
    const response = await Category.findByPk(id, { include: ["products"] });

    if (!response) throw boom.notFound("Category not found.");

    return response;
  }

  async create(category: Omit<ICategory, "id">) {
    const newCategory = await Category.create(category);

    if (!category)
      throw boom.internal(
        "An error ocurred while creating the category. Please try again later."
      );

    return newCategory;
  }

  async update(id: number, changes: Omit<ICategory, "id">) {
    const currentCategory = await this.findOne(id);

    const updatedCategory = await currentCategory.update(changes);

    if (!updatedCategory)
      throw boom.internal(
        "An error ocurred while updating the category. Please try again later."
      );

    return updatedCategory;
  }

  async delete(id: number) {
    const category = await this.findOne(id);

    await category.destroy();

    return id;
  }
}
