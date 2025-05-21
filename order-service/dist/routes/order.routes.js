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
const order_queue_1 = require("../queue/order.queue");
const router = (0, express_1.Router)();
router.post("/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        id: req.body.id,
        items: req.body.items,
        SN: req.body.SN,
        createdAt: new Date(),
    };
    yield (0, order_queue_1.addOrderToQueue)(order);
    res.status(201).json({ message: `Pedido con id: ${order.id} encolado correctamente` });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "order-service on operation" });
}));
router.post("/delivery-created", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        id: req.body.id,
        items: req.body.items,
        SN: req.body.SN,
        createdAt: new Date(),
    };
    res.status(200).json({ message: "delivery-created:", dataOrder: order });
    console.log("message: 'delivery-created:', dataOrder:", order);
}));
exports.default = router;
//# sourceMappingURL=order.routes.js.map