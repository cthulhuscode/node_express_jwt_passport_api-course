import { Request, Response, NextFunction } from "express";
import { Boom } from "@hapi/boom";
import {
  BaseError,
  ValidationError,
  ForeignKeyConstraintError,
} from "sequelize";

// export function logErrors(
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log(err);
//   next(err);
// }

export function errorHandler(
  err:
    | Error
    | Boom
    | BaseError
    | ValidationError
    | ForeignKeyConstraintError
    | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorResponse: { status: number; message: string };

  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    errorResponse = {
      status: +statusCode,
      message: payload.message,
    };
  } else if (
    err instanceof BaseError ||
    err instanceof ValidationError ||
    err instanceof ForeignKeyConstraintError
  ) {
    const _err: any = err;

    if (_err.errors) {
      errorResponse = {
        status: 400,
        message: _err.errors[0].message,
      };
    } else if (_err?.parent?.detail) {
      errorResponse = {
        status: 400,
        message: _err.parent.detail,
      };
    } else {
      errorResponse = {
        status: 500,
        message: "Server error :c",
      };
      console.log(err);
    }
  } else {
    console.log(err);
    errorResponse = {
      status: 500,
      message: "Server error :c",
    };
  }

  res.status(errorResponse.status).json({ message: errorResponse.message });
}
