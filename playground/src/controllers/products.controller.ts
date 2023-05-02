import { Request, Response } from "express";
import { ProductsService } from "../services/products.service";

const service = new ProductsService();

export const getProducts = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;

  const products = await service.find(req.query);

  res.status(200).json({ products });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await service.findOne(+id);
  res.status(200).json({ product });
};

export const addProduct = async (req: Request, res: Response) => {
  const newProduct = await service.create(req.body);
  res.status(201).json({ product: newProduct, msg: "Product created" });
};

export const putProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body;

  const updatedProduct = await service.update(+id, product);

  res.status(200).json({ updatedProduct, msg: `Product ${id} modified` });
};

export const patchProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body;

  const updatedProduct = await service.update(+id, product);

  res.status(200).json({ updatedProduct, msg: `Product ${id} modified` });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await service.delete(+id);

  if (deleted) res.status(200).json({ msg: `Product ${id} deleted` });
  else res.status(500).json({ msg: `Unable to delete product ${id}` });
};
