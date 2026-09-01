import { createContext } from "react";
import type { CartContextValue } from "../Interfaces/cart";

export const CartContext = createContext<CartContextValue | null>(null);
