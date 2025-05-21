import { Router } from "express";
import { Order } from "../types/delivery.interface";

const router = Router();
const _listDelivery: any[] = [];
const API_ORDER_SERVICE = "http://order-service:5000/delivery-created";

async function newRegisterDelivery(order: Order): Promise<boolean> {
  try {
    _listDelivery.push(order);
    return true;
  } catch (error) {
    console.error("Error al evaluar el inventario:", error);
  }
  return false;
}
async function ReportCreatedDelivery(order: Order): Promise<boolean> {
  try {
    const response = await fetch(API_ORDER_SERVICE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const result = await response.json();
    console.log("Respuesta del servidor-Order:", result);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
    return true;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
  return false;
}

router.post("/create-delivery", async (req, res) => {
  const order: Order = {
    id: req.body.id,
    items: req.body.items,
    SN: req.body.SN,
    createdAt: new Date(),
  };
  let StatusInventory = await newRegisterDelivery(order);
  let StatusReportOrder = await ReportCreatedDelivery(order);
  if (StatusInventory && StatusReportOrder) {
    res.status(200).json({ message: "Delivery register and reported" });
  } else {
    res.status(500).json({ message: "Items de inventario no disponibles" });
  }
});

router.get("/", async (req, res) => {
  res.status(200).json({
    message: "delivery-service on operation",
    deliveryQuantity: _listDelivery,
  });
});

export default router;
