/**
 * Nome do item: CartDrawerProps
 *
 * Papel no projeto: Define as propriedades recebidas pelo painel lateral do
 * carrinho de compras.
 *
 * Funcionamento: isOpen controla a visibilidade do painel e onClose informa
 * ao componente pai como fechar o drawer.
 *
 * Dependências e integrações: É utilizada pelo componente CartDrawer e pela
 * tela que controla a abertura do carrinho.
 *
 * Observações: O componente pai é responsável por manter o estado de abertura
 * e fornecer a função de fechamento.
 */
export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
