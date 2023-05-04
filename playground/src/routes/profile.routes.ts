import passport from "passport";
import { Router } from "express";
import { getOrders } from "../controllers/profile.controllers";

export const router = Router();

router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  getOrders
);
