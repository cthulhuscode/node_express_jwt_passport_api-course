import jwt from "jsonwebtoken";
import { config } from "../config";

export function signToken(payload: any) {
  return jwt.sign(payload, config.loginJwtSecret!);
}

export function verifyLoginToken(token: string) {
  return jwt.verify(token, config.loginJwtSecret!);
}

export function verifyRecoveryToken(token: string) {
  return jwt.verify(token, config.recoveryJwtSecret!);
}
