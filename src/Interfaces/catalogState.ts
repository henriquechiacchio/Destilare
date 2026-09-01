/**
 * Nome do item: CatalogStateProps
 *
 * Papel no projeto: Define as propriedades da área que apresenta os estados
 * de carregamento, sucesso e erro do catálogo.
 *
 * Funcionamento: status identifica o estado atual, hasSearch informa se há
 * uma busca ativa e onRetry permite tentar o carregamento novamente.
 *
 * Dependências e integrações: É utilizada pelo catálogo para renderizar a
 * mensagem e as ações adequadas a cada situação.
 *
 * Observações: Os valores de status devem permanecer alinhados ao fluxo de
 * carregamento implementado no catálogo.
 */
export interface CatalogStateProps {
  status: "loading" | "success" | "error";
  hasSearch: boolean;
  onRetry: () => void;
}
