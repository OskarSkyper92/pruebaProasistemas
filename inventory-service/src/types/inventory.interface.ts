export interface Order {
  id: string;
  items: OrderItem[];
  SN: string;
  createdAt: Date;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
}

export interface OrderItem {
  name:string;
  productId: number;
  quantity: number;
}
