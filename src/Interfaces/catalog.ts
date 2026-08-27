import type { CatalogStatus } from "../types/catalog";
import type { Product } from "./product";

export interface ProductCardProps {
  product: Product;
}

export interface CatalogStateProps {
  status: CatalogStatus;
  hasSearch: boolean;
  onRetry: () => void;
}
