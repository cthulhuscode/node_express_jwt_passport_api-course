import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export const login = async (req: Request, res: Response) => {
  let user: any = req.user!;

  user = {
    userId: user.sub.userId,
    customerId: user.sub.customerId,
    role: user.role,
  };

  const data = service.signToken(user);

  res.status(200).json({ ...data });
};

export const recover = async (req: Request, res: Response) => {
  const { email } = req.body;

  const response = await service.sendEmail(email);

  res.status(200).json({ ...response });
};
