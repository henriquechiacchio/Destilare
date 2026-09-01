import type { CatalogStatus } from "../types/catalog";
import type { Product } from "./product";

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export interface CatalogStateProps {
  status: CatalogStatus;
  hasSearch: boolean;
  onRetry: () => void;
}
