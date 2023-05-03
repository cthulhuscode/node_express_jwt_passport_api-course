import { config } from "../config";
import { NextFunction, Request, Response } from "express";

const boom = require("@hapi/boom");

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("Please log in to have access."));
  }
}
