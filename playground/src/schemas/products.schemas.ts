import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15).label("nombre").messages({
  "string.base": "'nombre' debe ser de tipo texto",
  "string.empty": "'nombre' no puede ser un campo vacío",
});
const description = Joi.string().min(3);
const price = Joi.number().integer();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
// Query params
const limit = Joi.number().integer().positive();
const offset = Joi.number().integer().positive();
const min_price = Joi.number().integer().positive();
const max_price = Joi.number().integer().positive();

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const deleteProductSchema = Joi.object({
  id: id.required(),
});

export const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  min_price,
  max_price: max_price.when("min_price", {
    is: Joi.number().integer(),
    then: Joi.required(),
  }), // If min_price is passed, then max_price is required
});
