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
import { validatorHandler } from "../middlewares/validator.handler";
import passport from "passport";

export const router = Router();

router.get("/:id", validatorHandler(getCategorySchema, "params"), getCategory);
router.put("/:id", validatorHandler(updateCategorySchema, "body"), putCategory);
router.patch(
  "/:id",
  validatorHandler(updateCategorySchema, "body"),
  patchCategory
);
router.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  deleteCategory
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createCategorySchema, "body"),
  addCategory
);
router.get("/", getCategories);
