import { Router } from "express";
import {
  getOrders,
  getOrder,
  addOrder,
  putOrder,
  patchOrder,
  deleteOrder,
  addProduct,
} from "../controllers/orders.controller";
import {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
  addItemSchema,
} from "../schemas/orders.schemas";
import { validatorHandler } from "../middlewares/validatorHandler";
import { queryProductSchema } from "../schemas/products.schemas";

export const router = Router();

router.post(
  "/:id/products",
  validatorHandler(addItemSchema, "body"),

  addProduct
);
router.get("/:id", validatorHandler(getOrderSchema, "params"), getOrder);
router.put("/:id", validatorHandler(updateOrderSchema, "body"), putOrder);
router.patch("/:id", validatorHandler(updateOrderSchema, "body"), patchOrder);
router.delete(
  "/:id",
  validatorHandler(deleteOrderSchema, "params"),
  deleteOrder
);

router.post("/", validatorHandler(createOrderSchema, "body"), addOrder);
router.get("/", validatorHandler(queryProductSchema, "query"), getOrders);
