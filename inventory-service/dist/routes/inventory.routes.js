"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_service_1 = require("../services/inventory.service");
const router = (0, express_1.Router)();
const API_DELIVERY_SERVICE = "http://delivery-service:5002/create-delivery";
function validateInventory(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventory = inventory_service_1.InventoryService.getInstance();
            console.log("Inventario actual:", inventory.getProducts());
            const success = inventory.orderProduct(order.items);
            if (success) {
                console.log(`Pedido ${order.id} realizado con éxito `);
                console.log(`Pedido ${order.id} sera despachado`);
                let StatusDelivery = yield createDelivery(order);
                if (StatusDelivery) {
                    return true;
                }
            }
            else {
                console.log("No hay suficiente inventario");
                return false;
            }
        }
        catch (error) {
            console.error("Error al evaluar el inventario:", error);
        }
        return false;
    });
}
function createDelivery(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_DELIVERY_SERVICE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const result = yield response.json();
            console.log("Respuesta del servidor-delivery:", result);
            return true;
        }
        catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
        return false;
    });
}
router.post("/validate-inventory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        id: req.body.id,
        items: req.body.items,
        SN: req.body.SN,
        createdAt: new Date(),
    };
    let StatusInventory = yield validateInventory(order);
    if (StatusInventory) {
        res.status(200).json({ message: "Done" });
    }
    else {
        res.status(500).json({ message: "Items de inventario no disponibles" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "inventory-service on operation" });
}));
exports.default = router;
//# sourceMappingURL=inventory.routes.js.map