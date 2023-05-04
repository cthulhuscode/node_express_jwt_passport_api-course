import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controller";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/users.schemas";
import passport from "passport";

export const router = Router();

router.get("/:id", validatorHandler(getUserSchema, "params"), getUser);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteUserSchema, "params"),
  deleteUser
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  updateUser
);

router.post("/", validatorHandler(createUserSchema, "body"), createUser);

router.get("/", getUsers);
