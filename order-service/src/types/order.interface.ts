export interface Order {
  id: string;
  items: Items[];
  SN: string;
  createdAt: Date;
}

export interface Items {
  name: string;
  id: number;
}
