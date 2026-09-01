import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartContextValue, CartItem } from "../Interfaces/cart";
import type { Product } from "../Interfaces/product";
import { CartContext } from "./cart-context";

/** Chave usada para persistir os itens do carrinho no armazenamento do navegador. */
const STORAGE_KEY = "destilare-cart";

/**
 * Nome do item: readStoredCart
 *
 * Papel no projeto: Recupera os itens do carrinho salvos anteriormente no
 * navegador.
 *
 * Funcionamento: Lê o valor de localStorage, converte o JSON para CartItem[] e
 * retorna uma lista vazia quando não há dados, o ambiente não possui window,
 * o conteúdo é inválido ou a leitura falha.
 *
 * Dependências e integrações: Usa STORAGE_KEY e localStorage para restaurar o
 * estado inicial utilizado por CartProvider.
 *
 * Observações: A função falha de forma segura para não impedir a abertura da
 * aplicação quando o armazenamento não está disponível ou está corrompido.
 */
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

/**
 * Nome do item: CartProvider
 *
 * Papel no projeto: Mantém o estado global do carrinho e fornece suas ações
 * para os componentes da aplicação.
 *
 * Funcionamento: Inicializa os itens a partir do localStorage, salva as
 * alterações automaticamente e expõe operações para adicionar, atualizar,
 * remover e limpar produtos. Também calcula a quantidade total e o subtotal.
 *
 * Dependências e integrações: Usa React hooks, CartContextValue, Product,
 * CartItem e CartContext. Envolve a aplicação no App.tsx e é consumido pelo
 * hook useCart.
 *
 * Observações: Quantidades adicionadas são normalizadas para inteiros maiores
 * ou iguais a um; ao chegar a zero, o produto é removido do carrinho.
 */
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

