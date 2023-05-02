import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customers.controller";
import { validatorHandler } from "../middlewares/validatorHandler";
import {
  createCustomerSchema,
  deleteCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from "../schemas/customer.schemas";

export const router = Router();

router.get("/:id", validatorHandler(getCustomerSchema, "params"), getCustomer);
router.delete(
  "/:id",
  validatorHandler(deleteCustomerSchema, "params"),
  deleteCustomer
);
router.put(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomer
);
router.get("/", getCustomers);
router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  createCustomer
);
