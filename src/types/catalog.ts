/**
 * Nome do item: CatalogStatus
 *
 * Papel no projeto: Representa o estado atual do carregamento dos produtos
 * exibidos pelo componente Catalog.
 *
 * Funcionamento: Define uma união de valores permitidos para que o estado do
 * catálogo seja controlado com segurança pelo TypeScript.
 * - loading: os produtos ainda estão sendo carregados.
 * - success: os produtos foram carregados com sucesso.
 * - error: ocorreu uma falha ao carregar os produtos.
 *
 * Dependências e integrações: É utilizado pelo estado interno de Catalog.tsx
 * para controlar a renderização de carregamento, conteúdo ou erro.
 *
 * Observações: Novos estados devem ser adicionados aqui caso o fluxo de
 * carregamento do catálogo passe a representar outras situações.
 */
export type CatalogStatus = "loading" | "success" | "error";
