import type { Product } from "./product";

export interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}
