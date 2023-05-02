import boom from "@hapi/boom";
import { IProduct } from "../interfaces/IProduct";
import { sequelize } from "../libs";
import { Op } from "sequelize";

const {
  models: { Product },
} = sequelize;

interface IQueryParams {
  limit?: number | null;
  offset?: number | null;
  price?: number | null;
  min_price?: number | null;
  max_price?: number | null;
}

export class ProductsService {
  async find(queryParams: IQueryParams) {
    const { limit, offset, price, min_price, max_price } = queryParams;
    const options: any = {
      include: ["category"],
      where: {},
    };

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    // Price filtering
    if (min_price && max_price) {
      options.where.price = {
        [Op.between]: [min_price, max_price],
      };
    } else if (min_price) {
      options.where.price = {
        [Op.gte]: min_price,
      };
    } else if (max_price) {
      options.where.price = {
        [Op.lte]: max_price,
      };
    } else if (price) {
      options.where.price = price;
    }

    const response: any = await Product.findAll(options);

    if (!response.length) throw boom.notFound("There is not any product yet");

    return response;
  }

  async findOne(id: number) {
    const product = await Product.findByPk(id, { include: ["category"] });

    if (!product) throw boom.notFound("The product wasn't found");

    return product;
  }

  async create(product: Omit<IProduct, "id">) {
    const newProduct = await Product.create(product);

    if (!newProduct)
      throw boom.internal(
        "An error occurred while creating the product. Please try again later."
      );

    return newProduct;
  }

  async update(id: number, changes: Omit<IProduct, "id">) {
    const currentProduct = await this.findOne(id);

    const updatedProduct = await currentProduct.update(changes);

    if (!updatedProduct)
      throw boom.internal(
        "An error occurred while updating the product. Please try again later."
      );

    return updatedProduct;
  }

  async delete(id: number) {
    const product = await this.findOne(id);

    await product.destroy();

    return id;
  }
}
