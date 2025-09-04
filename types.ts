
export enum View {
  DASHBOARD = 'DASHBOARD',
  POS = 'POS',
  ORDERS = 'ORDERS',
  PRODUCTS = 'PRODUCTS',
  SETTINGS = 'SETTINGS',
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  MOBILE_WALLET = 'Mobile Wallet',
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}
