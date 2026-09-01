import { createContext } from "react";
import type { CartContextValue } from "../Interfaces/cart";

/**
 * Nome do item: CartContext
 *
 * Papel no projeto: Disponibiliza a referência compartilhada usada para
 * acessar os dados e as operações do carrinho de compras.
 *
 * Funcionamento: É criado com o contrato CartContextValue e começa com null.
 * O CartProvider fornece o valor real para todos os componentes descendentes.
 *
 * Dependências e integrações: É consumido pelo hook useCart e preenchido pelo
 * componente CartProvider.
 *
 * Observações: O uso direto do contexto deve respeitar a presença de um
 * CartProvider na árvore de componentes.
 */
export const CartContext = createContext<CartContextValue | null>(null);
