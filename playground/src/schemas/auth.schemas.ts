import Joi from "joi";
import { verifyToken } from "../utils/jwt";

const password = Joi.string().min(4).trim().required();
const token = Joi.string()
  .custom(
    (value, helper) =>
      !verifyToken(value) && helper.message({ custom: "Invalid token." })
  )
  .required();

export const changePasswordSchema = Joi.object({
  password,
  token,
});
