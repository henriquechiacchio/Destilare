import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CatalogStateProps } from "../Interfaces/catalogState";
import type { Product } from "../Interfaces/product";
import type { CatalogStatus } from "../types/catalog";
import ProductCard from "./ProductCard";

/**
 * Nome do item: normalize
 *
 * Papel no projeto: Prepara textos para comparação na busca do catálogo.
 *
 * Funcionamento: Converte o texto para minúsculas em português, separa os
 * caracteres acentuados e remove os diacríticos.
 *
 * Dependências e integrações: É utilizada pelo componente Catalog para
 * comparar o termo pesquisado com os dados dos produtos.
 *
 * Observações: A normalização permite encontrar resultados mesmo quando a
 * busca usa caixa ou acentuação diferente do cadastro.
 */
function normalize(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * Nome do item: CatalogState
 *
 * Papel no projeto: Renderiza mensagens e ações para os estados do catálogo.
 *
 * Funcionamento: Mostra carregamento, erro com opção de tentativa novamente ou
 * mensagem de lista vazia conforme o status e a existência de uma busca.
 *
 * Dependências e integrações: Recebe CatalogStateProps e é usado pelo Catalog
 * quando não há produtos para renderizar.
 *
 * Observações: onRetry só é acionado no estado de erro.
 */
function CatalogState({ status, hasSearch, onRetry }: CatalogStateProps) {
  if (status === "loading") {
    return <p className="catalog-state">Abrindo a carta...</p>;
  }

  if (status === "error") {
    return (
      <div className="catalog-state catalog-state--error">
        <p>Não foi possível carregar a coleção agora.</p>
        <button type="button" onClick={onRetry}>Tentar novamente</button>
      </div>
    );
  }

  return <p className="catalog-state">{hasSearch ? "Nenhum rótulo corresponde à busca." : "A coleção está em atualização."}</p>;
}

/**
 * Nome do item: Catalog
 *
 * Papel no projeto: Carrega, pesquisa e exibe a coleção de produtos da loja.
 *
 * Funcionamento: Busca os produtos no arquivo JSON, controla os estados de
 * carregamento, erro e sucesso, normaliza a busca e filtra por nome, categoria
 * e descrições. Também cria atalhos de busca pelas categorias encontradas.
 *
 * Dependências e integrações: Usa hooks do React, navegação do React Router,
 * Product, CatalogStatus, CatalogState e ProductCard.
 *
 * Observações: AbortController cancela a requisição ao desmontar o componente;
 * retryCount força uma nova tentativa de carregamento.
 */
function Catalog() {
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [status, setStatus] = useState<CatalogStatus>("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      setStatus("loading");
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/products.json`, { signal: controller.signal });
        if (!response.ok) throw new Error("Falha ao carregar o catálogo");
        const products: Product[] = await response.json();
        setCatalog(products);
        setStatus("success");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }

    void loadCatalog();
    return () => controller.abort();
  }, [retryCount]);

  const categories = useMemo(
    () => Array.from(new Set(catalog.map((product) => product.category).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [catalog],
  );

  const normalizedSearch = normalize(searchTerm.trim());
  const filteredProducts = useMemo(() => {
    if (!normalizedSearch) return catalog;

    return catalog.filter((product) => {
      const searchableTerms = [
        product.name,
        product.category,
        product.description,
        product.detailedDescription,
      ];

      return searchableTerms.some((value) => normalize(value).includes(normalizedSearch));
    });
  }, [catalog, normalizedSearch]);

  return (
    <section className="catalog" id="catalogo" aria-labelledby="collection-title">
      <div className="catalog__intro">
        <p className="eyebrow">A coleção</p>
        <h2 id="collection-title">Uma carta para descobrir devagar.</h2>
        <p>Whiskys escolhidos para quem aprecia o tempo, o carvalho e a conversa que começa no primeiro gole.</p>
      </div>
      <div className="catalog__toolbar">
        <label htmlFor="catalog-search">Encontre seu próximo brinde</label>
        <div className="search-field">
          <input id="catalog-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Nome, categoria ou descrição" />
          {searchTerm && <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca">×</button>}
        </div>
        <p className="catalog__count">{status === "success" ? `${filteredProducts.length} ${filteredProducts.length === 1 ? "rótulo encontrado" : "rótulos encontrados"}` : ""}</p>

        {categories.length > 0 && (
          <div className="catalog__categories" aria-label="Categorias do catálogo">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="catalog__category-button"
                onClick={() => setSearchTerm(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
      </div>
      {status === "success" && filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={() => navigate(`/produto/${product.id}`)} />)}
        </div>
      ) : (
        <CatalogState status={status} hasSearch={Boolean(normalizedSearch)} onRetry={() => setRetryCount((count) => count + 1)} />
      )}
    </section>
  );
}

export default Catalog;
