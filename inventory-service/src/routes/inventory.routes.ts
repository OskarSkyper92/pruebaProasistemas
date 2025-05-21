import { Router } from "express";
import { Order } from "../types/inventory.interface";
import { InventoryService } from "../services/inventory.service";

const router = Router();
const API_DELIVERY_SERVICE = "http://delivery-service:5002/create-delivery";

async function validateInventory(order: Order): Promise<boolean> {
  try {
    const inventory = InventoryService.getInstance();
    console.log("Inventario actual:", inventory.getProducts());
    const success = inventory.orderProduct(order.items);
    if (success) {
      console.log(`Pedido ${order.id} realizado con éxito `);
      console.log(`Pedido ${order.id} sera despachado`);
      let StatusDelivery = await createDelivery(order);
      if (StatusDelivery) {
        return true;
      }
    } else {
      console.log("No hay suficiente inventario");
      return false;
    }
  } catch (error) {
    console.error("Error al evaluar el inventario:", error);
  }
  return false;
}

async function createDelivery(order: Order): Promise<boolean> {
  try {
    const response = await fetch(API_DELIVERY_SERVICE, {
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
    console.log("Respuesta del servidor-delivery:", result);
    return true;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
  return false;
}

router.post("/validate-inventory", async (req, res) => {
  const order: Order = {
    id: req.body.id,
    items: req.body.items,
    SN: req.body.SN,
    createdAt: new Date(),
  };
  let StatusInventory = await validateInventory(order);
  if (StatusInventory) {
    res.status(200).json({ message: "Done" });
  } else {
    res.status(500).json({ message: "Items de inventario no disponibles" });
  }
});

router.get("/", async (req, res) => {
  res.status(200).json({ message: "inventory-service on operation" });
});

export default router;
