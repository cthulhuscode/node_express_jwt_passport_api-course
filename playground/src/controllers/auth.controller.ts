import { Request, Response } from "express";
import { signToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
  const user: any = req.user!;

  // Generate tokenx
  const payload = {
    sub: user.id,
    role: user.role,
  };
  const token = signToken(payload);

  res.status(200).json({ user, token });
};
