import type { Product } from "./product";

/**
 * Nome do item: ProductCardProps
 *
 * Papel no projeto: Define os dados e a ação de interação recebidos pelo card
 * de um produto no catálogo.
 *
 * Funcionamento: product fornece as informações exibidas no card e onSelect,
 * quando informada, é chamada ao selecionar o produto.
 *
 * Dependências e integrações: É utilizada pelo componente ProductCard e pelo
 * catálogo, que decide o que fazer após a seleção.
 *
 * Observações: onSelect é opcional para permitir o uso do card apenas como
 * elemento de apresentação.
 */
export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}
