import { Router } from "express";
import { Order } from "../types/order.interface";
import { addOrderToQueue } from "../queue/order.queue";

const router = Router();

router.post("/create-order", async (req, res) => {
  const order: Order = {
    id: req.body.id,
    items: req.body.items,
    SN: req.body.SN,
    createdAt: new Date(),
  };

  await addOrderToQueue(order);

  res.status(201).json({ message: `Pedido con id: ${order.id} encolado correctamente` });
});

router.get("/", async (req, res) => {
  res.status(200).json({ message: "order-service on operation" });
});

router.post("/delivery-created", async (req, res) => {
  const order: Order = {
    id: req.body.id,
    items: req.body.items,
    SN: req.body.SN,
    createdAt: new Date(),
  };
  res.status(200).json({ message: "delivery-created:", dataOrder: order });
  console.log("message: 'delivery-created:', dataOrder:", order);
});

export default router;
