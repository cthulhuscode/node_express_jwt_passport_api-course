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
  getOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
  addItemSchema,
} from "../schemas/orders.schemas";
import { validatorHandler } from "../middlewares/validator.handler";
import { queryProductSchema } from "../schemas/products.schemas";
import passport from "passport";

export const router = Router();

router.get("/:id", validatorHandler(getOrderSchema, "params"), getOrder);

router.post(
  "/:id/products",
  validatorHandler(addItemSchema, "body"),
  addProduct
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateOrderSchema, "body"),
  putOrder
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateOrderSchema, "body"),
  patchOrder
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteOrderSchema, "params"),
  deleteOrder
);

router.post("/", passport.authenticate("jwt", { session: false }), addOrder);

router.get("/", validatorHandler(queryProductSchema, "query"), getOrders);
