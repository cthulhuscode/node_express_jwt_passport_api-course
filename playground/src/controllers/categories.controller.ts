import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";

const service = new CategoriesService();

export const getCategories = async (req: Request, res: Response) => {
  const categories = await service.find();

  res.status(200).json({ categories });
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await service.findOne(+id);
  res.status(200).json({ category });
};

export const addCategory = async (req: Request, res: Response) => {
  const newCategory = await service.create(req.body);
  res.status(201).json({ category: newCategory, msg: "Category created" });
};

export const putCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = req.body;

  const updatedCategory = await service.update(+id, category);

  res.status(200).json({ updatedCategory, msg: `Category ${id} modified` });
};

export const patchCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = req.body;

  const updatedCategory = await service.update(+id, category);

  res.status(200).json({ updatedCategory, msg: `Category ${id} modified` });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await service.delete(+id);

  if (deleted) res.status(200).json({ msg: `Category ${id} deleted` });
  else res.status(500).json({ msg: `Unable to delete category ${id}` });
};
