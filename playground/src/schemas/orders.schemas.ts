import Joi from "joi";

const id = Joi.number().integer().positive();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer().positive();
const productId = Joi.number().integer().positive();
const amount = Joi.number().integer().min(1);

export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const updateOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const getOrderSchema = Joi.object({
  id: id.required(),
});

export const deleteOrderSchema = Joi.object({
  id: id.required(),
});

export const addItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
});
