"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
class InventoryService {
    constructor() {
        this.products = [
            { id: 1, name: "Resma", quantity: 100 },
            { id: 2, name: "Lapiz", quantity: 200 },
            { id: 3, name: "Borrador", quantity: 150 },
        ];
    }
    static getInstance() {
        if (!InventoryService.instance) {
            InventoryService.instance = new InventoryService();
        }
        return InventoryService.instance;
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        return this.products.find((p) => p.id === id);
    }
    orderProduct(orderItems) {
        // Verificar si todos los productos tienen suficiente inventario
        const isStockAvailable = orderItems.every((item) => {
            const product = this.getProductById(item.productId);
            return product && product.quantity >= item.quantity;
        });
        if (!isStockAvailable) {
            return false; // No hay suficiente inventario para uno o más productos
        }
        // Descontar inventario
        orderItems.forEach((item) => {
            const product = this.getProductById(item.productId);
            if (product) {
                product.quantity -= item.quantity;
            }
        });
        return true;
    }
    // Reabastecer producto
    restockProduct(id, amount) {
        const product = this.getProductById(id);
        if (product) {
            product.quantity += amount;
        }
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map