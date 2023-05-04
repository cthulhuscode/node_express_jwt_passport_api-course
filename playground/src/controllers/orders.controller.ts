import { Request, Response } from "express";
import { IOrder } from "../interfaces";
import { OrdersService } from "../services/orders.service";

const service = new OrdersService();

export const getOrders = async (req: Request, res: Response) => {
  const { size } = req.query;
  let orders: IOrder[] = [];

  if (size) orders = await service.find(+size);
  else orders = await service.find();

  res.status(200).json({ orders });
};

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await service.findOne(+id);
  res.status(200).json({ order });
};

export const addOrder = async (req: Request, res: Response) => {
  const user: any = req.user;

  if (user.sub.customerId) {
    const newOrder = await service.create(user.sub.customerId);
    return res.status(201).json({ order: newOrder, msg: "Order created" });
  }

  res.status(401).json({ msg: "Please log in to create an order." });
};

export const addProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newOrder = await service.addItem({ ...req.body, orderId: id });
  res.status(201).json({ order: newOrder, msg: "Item added to the order" });
};

export const putOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = req.body;

  const updatedOrder = await service.update(+id, order);

  res.status(200).json({ updatedOrder, msg: `Order ${id} modified` });
};

export const patchOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = req.body;

  const updatedOrder = await service.update(+id, order);

  res.status(200).json({ updatedOrder, msg: `Order ${id} modified` });
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await service.delete(+id);

  if (deleted) res.status(200).json({ msg: `Order ${id} deleted` });
  else res.status(500).json({ msg: `Unable to delete order ${id}` });
};
