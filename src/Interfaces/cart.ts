import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number | ((currentQuantity: number) => number)) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}
