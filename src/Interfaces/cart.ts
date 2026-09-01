import type { Product } from "./product";

/**
 * Nome do item: CartItem
 *
 * Papel no projeto: Representa um produto armazenado no carrinho de compras.
 *
 * Funcionamento: Reutiliza todos os dados de Product e acrescenta quantity,
 * que informa quantas unidades do produto foram adicionadas.
 *
 * Dependências e integrações: É utilizado pelo contexto do carrinho e pelos
 * componentes responsáveis por exibir e alterar seus itens.
 *
 * Observações: A quantidade deve ser tratada como um valor positivo pelas
 * operações do carrinho.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Nome do item: CartContextValue
 *
 * Papel no projeto: Define os dados e as operações disponibilizados
 * globalmente pelo contexto do carrinho.
 *
 * Funcionamento: Expõe os itens atuais, os valores derivados e as funções
 * usadas para adicionar, atualizar, remover ou limpar produtos.
 *
 * Dependências e integrações: É implementada pelo CartContext e consumida por
 * componentes como o cabeçalho, o drawer e os detalhes do produto.
 *
 * Observações: updateQuantity aceita um novo valor ou uma função que calcula
 * o valor a partir da quantidade atual.
 */
export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number | ((currentQuantity: number) => number)) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}
