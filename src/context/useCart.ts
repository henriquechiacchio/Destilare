import { useContext } from "react";
import { CartContext } from "./cart-context";

/**
 * Nome do item: useCart
 *
 * Papel no projeto: Oferece uma forma simples e tipada de acessar o carrinho
 * dentro dos componentes React.
 *
 * Funcionamento: Lê o valor de CartContext e o retorna quando o componente
 * está dentro de CartProvider. Caso contrário, lança um erro explicativo.
 *
 * Dependências e integrações: Usa o hook useContext e a instância CartContext;
 * pode ser utilizado por qualquer componente descendente do provider.
 *
 * Observações: Todo componente que chamar useCart precisa estar envolvido por
 * CartProvider para receber o contexto corretamente.
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
