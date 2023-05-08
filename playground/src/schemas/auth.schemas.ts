import Joi from "joi";
import { verifyRecoveryToken } from "../utils/jwt";

const email = Joi.string().email().trim().required();
const password = Joi.string().min(4).trim().required();
const token = Joi.string()
  .custom(
    (value, helper) =>
      !verifyRecoveryToken(value) &&
      helper.message({ custom: "Invalid token." })
  )
  .required();

export const changePasswordSchema = Joi.object({
  password,
  token,
});

export const recoverySchema = Joi.object({
  email,
});
