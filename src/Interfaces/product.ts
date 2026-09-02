/**
 * Nome do item: Product
 *
 * Papel no projeto: Define o modelo de dados compartilhado por cada produto
 * exibido e comercializado na aplicação.
 *
 * Funcionamento: Reúne identificação, informações de apresentação, preço,
 * imagem, origem, idade e notas de degustação e detailedDescription.
 *
 * Dependências e integrações: É usado pelos dados do catálogo, pelos cards,
 * pela página de detalhes e pelas operações do carrinho.
 *
 * Observações: O campo id identifica o produto nas rotas e nas operações do
 * carrinho; price deve ser armazenado como número para cálculos monetários.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  price: number;
  image: string;
  ageStatement: string;
  origin: string;
  tastingNotes: string[];
}
