import { Request, Response } from "express";
import { CustomersService } from "../services";

const service = new CustomersService();

export const getCustomers = async (req: Request, res: Response) => {
  const customers = await service.find();

  res.status(200).json({ customers });
};

export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await service.findOne(+id);
  res.status(200).json({ customer });
};

export const createCustomer = async (req: Request, res: Response) => {
  const customer = await service.create(req.body);
  res.status(201).json({ customer });
};

export const updateCustomer = async (req: Request, res: Response) => {
  const customer = await service.update(+req.params.id, req.body);
  res.status(200).json({ customer });
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const id = await service.delete(+req.params.id);
  res
    .status(200)
    .json({ message: `The customer ${id} was deleted successfully.` });
};
