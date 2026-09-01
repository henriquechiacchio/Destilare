import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartContextValue, CartItem } from "../Interfaces/cart";
import type { Product } from "../Interfaces/product";
import { CartContext } from "./cart-context";

const STORAGE_KEY = "destilare-cart";

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart) as CartItem[];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity || 1));

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + safeQuantity } : item,
        );
      }

      return [...currentItems, { ...product, quantity: safeQuantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number | ((currentQuantity: number) => number)) => {
    setItems((currentItems) => {
      const currentQuantity = currentItems.find((item) => item.id === productId)?.quantity ?? 0;
      const nextQuantity = typeof quantity === "function" ? quantity(currentQuantity) : quantity;

      if (nextQuantity <= 0) {
        return currentItems.filter((item) => item.id !== productId);
      }

      return currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

