import { Router } from "express";
import { login } from "../controllers/auth.controller";
import passport from "passport";

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