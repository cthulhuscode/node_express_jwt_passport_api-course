import { Router } from "express";
import {
  changePassword,
  login,
  recoverAccount,
} from "../controllers/auth.controller";
import passport from "passport";
import { getAuthenticatedUser } from "../controllers/users.controller";
import { validatorHandler } from "../middlewares";
import { changePasswordSchema, recoverySchema } from "../schemas/auth.schemas";

export const router = Router();

/**
 * It's not necessary to create a validation schema neither a service
 * because the passport-local strategy already does it for us.
 */

router.post(
  "/login",

  passport.authenticate("local", { session: false }),
  login
);

router.post(
  "/recovery",
  validatorHandler(recoverySchema, "body"),
  recoverAccount
);

router.post(
  "/change-password",
  validatorHandler(changePasswordSchema, "body"),
  changePassword
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getAuthenticatedUser
);
