import type { Product } from "./product";

/**
 * Nome do item: ProductDetailProps
 *
 * Papel no projeto: Define os dados e as ações disponíveis na tela de detalhes
 * de um produto.
 *
 * Funcionamento: product fornece o conteúdo detalhado, onBack retorna à tela
 * anterior e onAddToCart, quando informada, adiciona uma quantidade ao
 * carrinho.
 *
 * Dependências e integrações: É utilizada pelo componente ProductDetail e se
 * integra ao modelo Product e às operações do contexto do carrinho.
 *
 * Observações: onAddToCart é opcional para que a tela também possa ser usada em
 * contextos que não exibem a ação de compra.
 */
export interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}
