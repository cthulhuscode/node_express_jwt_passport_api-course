import jwt from "jsonwebtoken";
import { config } from "../config";

export function signToken(payload: any) {
  return jwt.sign(payload, config.jwtSecret!);
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.jwtSecret!);
}
