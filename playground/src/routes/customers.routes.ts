import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customers.controller";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createCustomerSchema,
  deleteCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from "../schemas/customer.schemas";
import passport from "passport";

export const router = Router();

router.get("/:id", validatorHandler(getCustomerSchema, "params"), getCustomer);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteCustomerSchema, "params"),
  deleteCustomer
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomer
);

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  createCustomer
);

router.get("/", getCustomers);
