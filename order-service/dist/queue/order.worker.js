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
// order.worker.ts
const bullmq_1 = require("bullmq");
const redis_config_1 = require("./redis.config");
const API_INVENTORY_SERVICE = "http://inventory-service:5001/validate-inventory";
function sendPostRequest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_INVENTORY_SERVICE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const result = yield response.json();
            console.log("Respuesta del servidor-inventory:", result);
        }
        catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    });
}
const orderWorker = new bullmq_1.Worker('orders', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🛠️ Procesando trabajo:', job.name, job.data);
    // Aquí va tu lógica
    yield sendPostRequest(job.data);
}), {
    connection: redis_config_1.redisConnection,
});
orderWorker.on("completed", (job) => {
    console.log(`✅ Pedido ${job.id} completado`);
});
orderWorker.on("failed", (job, err) => {
    console.error(`❌ Pedido ${job === null || job === void 0 ? void 0 : job.id} falló:`, err);
});
//# sourceMappingURL=order.worker.js.map