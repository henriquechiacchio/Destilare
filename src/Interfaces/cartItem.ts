import type { CartItem as CartItemType } from "./cart";

/**
 * Nome do item: CartItemProps
 *
 * Papel no projeto: Define os dados e ações necessários para renderizar um
 * produto dentro do carrinho.
 *
 * Funcionamento: Recebe o item e callbacks para aumentar, diminuir, remover e
 * fechar o carrinho após a navegação para o detalhe do produto.
 *
 * Dependências e integrações: Usa CartItemType, fornecido pelo contexto do
 * carrinho, e é consumida pelo componente CartItem.
 *
 * Observações: As callbacks recebem o id do produto para alterar o item correto.
 */
export interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCloseCart?: () => void;
}
