import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} from "../controllers/products.controller";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} from "../schemas/products.schemas";
import passport from "passport";
import { checkRoles } from "../middlewares";
import { Roles } from "../utils/roles";

export const router = Router();

router.get("/:id", validatorHandler(getProductSchema, "params"), getProduct);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(getProductSchema, "params"), // first validate the id
  validatorHandler(updateProductSchema, "body"),
  putProduct
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  patchProduct
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(deleteProductSchema, "params"),
  deleteProduct
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(createProductSchema, "body"),
  addProduct
);

router.get("/", getProducts);
