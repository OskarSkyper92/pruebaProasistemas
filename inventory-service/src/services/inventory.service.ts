import { OrderItem, Product } from "../types/inventory.interface";

export class InventoryService {
  private static instance: InventoryService;
  private products: Product[] = [
    { id: 1, name: "Resma", quantity: 100 },
    { id: 2, name: "Lapiz", quantity: 200 },
    { id: 3, name: "Borrador", quantity: 150 },
  ];

  private constructor() {}

  static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  orderProduct(orderItems: OrderItem[]): boolean {
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
  restockProduct(id: number, amount: number): void {
    const product = this.getProductById(id);
    if (product) {
      product.quantity += amount;
    }
  }
}
