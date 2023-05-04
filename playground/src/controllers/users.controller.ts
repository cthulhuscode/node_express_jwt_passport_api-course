import { Request, Response } from "express";
import { UsersService } from "../services";

const service = new UsersService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await service.find();

  res.status(200).json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await service.findOne(+id);
  res.status(200).json({ user });
};

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  const user: any = req.user;

  if (user.sub.userId) {
    const authUser = await service.findOne(+user.sub.userId);
    res.status(200).json({ user: authUser });
  }

  res.status(401).json({ msg: "There is currently no authenticated user." });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await service.create(req.body);
  res.status(201).json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await service.update(+req.params.id, req.body);
  res.status(200).json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = await service.delete(+req.params.id);
  res.status(200).json({ message: `The user ${id} was deleted successfully.` });
};
