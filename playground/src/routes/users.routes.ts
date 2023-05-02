import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controller";
import { validatorHandler } from "../middlewares/validatorHandler";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/users.schemas";

export const router = Router();

router.get("/:id", validatorHandler(getUserSchema, "params"), getUser);
router.delete("/:id", validatorHandler(deleteUserSchema, "params"), deleteUser);
router.put(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  updateUser
);
router.get("/", getUsers);
router.post("/", validatorHandler(createUserSchema, "body"), createUser);
