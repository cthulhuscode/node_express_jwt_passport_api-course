import passport from "passport";
import { Router } from "express";
import {
  getCategories,
  addCategory,
  putCategory,
  patchCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categories.controller";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schemas/categories.schemas";
import { validatorHandler, checkRoles } from "../middlewares";
import { Roles } from "../utils/roles";

export const router = Router();

router.get(
  "/:id",
  checkRoles(Roles.Admin, Roles.Customer),
  validatorHandler(getCategorySchema, "params"),
  getCategory
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(updateCategorySchema, "body"),
  putCategory
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(updateCategorySchema, "body"),
  patchCategory
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(getCategorySchema, "params"),
  deleteCategory
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(Roles.Admin),
  validatorHandler(createCategorySchema, "body"),
  addCategory
);
router.get("/", getCategories);
