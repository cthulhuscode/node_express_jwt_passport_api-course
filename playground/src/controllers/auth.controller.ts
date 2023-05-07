import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Roles } from "../utils/roles";

const service = new AuthService();

export const login = async (req: Request, res: Response) => {
  let user: any = req.user!;

  user = {
    userId: user.id,
    customerId: user.role === Roles.Admin ? null : user.customer.id,
    role: user.role,
  };

  const data = service.signToken(user);

  res.status(200).json({ ...data });
};

export const recoverAccount = async (req: Request, res: Response) => {
  const { email } = req.body;

  const response = await service.sendPasswordRecovery(email);

  res.status(200).json({ ...response });
};

export const changePassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const response = await service.changePassword(password, token);

  res.status(200).json({ ...response });
};
