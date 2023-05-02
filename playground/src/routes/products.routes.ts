import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} from "../controllers/products.controller";
import { validatorHandler } from "../middlewares/validatorHandler";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} from "../schemas/products.schemas";

export const router = Router();

router.get("/:id", validatorHandler(getProductSchema, "params"), getProduct);
router.put(
  "/:id",
  validatorHandler(getProductSchema, "params"), // first validate the id
  validatorHandler(updateProductSchema, "body"),
  putProduct
);
router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  patchProduct
);
router.delete(
  "/:id",
  validatorHandler(deleteProductSchema, "params"),
  deleteProduct
);

router.get("/", getProducts);
router.post("/", validatorHandler(createProductSchema, "body"), addProduct);
