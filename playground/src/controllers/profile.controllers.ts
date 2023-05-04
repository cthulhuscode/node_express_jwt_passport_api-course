import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";

const service = new OrdersService();

export const getOrders = async (req: Request, res: Response) => {
  const user: any = req.user;

  if (user.sub.userId) {
    const orders = await service.findByUser(user.sub.userId);
    return res.status(200).json({ orders });
  }

  res.status(401).json({ msg: "There is currently no authenticated user." });
};
 