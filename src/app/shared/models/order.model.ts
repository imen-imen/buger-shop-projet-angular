export interface OrderItem {
  name: string;
  price: number;
  imageUrl: string;
}

export interface Order {
  date: string;
  items: OrderItem[];
}
