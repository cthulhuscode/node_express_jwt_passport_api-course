import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import boom from "@hapi/boom";

/*
  Se crea un middleware de forma dinámica. Se hace uso de un closure.
  Se retorna una arrow function porque se necesita construir middlewares
  de forma dinámica.
  La función recibe un schema, se le indica dónde encontrar la info
  con property y retorna un middleware de forma dinámica.
*/
export const validatorHandler = (
  schema: Joi.ObjectSchema<any>,
  property: string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /*
      La info puede venir desde el body, params o query
    */
    const data = req[property as keyof Request];

    // abortEarly: false -> to show all the errors instead of only one
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      // throw boom.badRequest(error);
      next(boom.badRequest(error.message));
    }
    next();
  };
};
