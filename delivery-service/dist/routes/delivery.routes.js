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
const router = (0, express_1.Router)();
const _listDelivery = [];
const API_ORDER_SERVICE = "http://order-service:5000/delivery-created";
function newRegisterDelivery(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            _listDelivery.push(order);
            return true;
        }
        catch (error) {
            console.error("Error al evaluar el inventario:", error);
        }
        return false;
    });
}
function ReportCreatedDelivery(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_ORDER_SERVICE, {
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
            console.log("Respuesta del servidor-Order:", result);
            yield new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
            return true;
        }
        catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
        return false;
    });
}
router.post("/create-delivery", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        id: req.body.id,
        items: req.body.items,
        SN: req.body.SN,
        createdAt: new Date(),
    };
    let StatusInventory = yield newRegisterDelivery(order);
    let StatusReportOrder = yield ReportCreatedDelivery(order);
    if (StatusInventory && StatusReportOrder) {
        res.status(200).json({ message: "Delivery register and reported" });
    }
    else {
        res.status(500).json({ message: "Items de inventario no disponibles" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "delivery-service on operation",
        deliveryQuantity: _listDelivery,
    });
}));
exports.default = router;
//# sourceMappingURL=delivery.routes.js.map