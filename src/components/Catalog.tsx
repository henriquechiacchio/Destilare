import { useEffect, useState } from "react";
import type { CatalogStateProps } from "../Interfaces/catalog";
import type { Product } from "../Interfaces/product";
import type { CatalogStatus } from "../types/catalog";
import ProductCard from "./ProductCard";

function normalize(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

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

function Catalog() {
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [status, setStatus] = useState<CatalogStatus>("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      setStatus("loading");
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}products.json`, { signal: controller.signal });
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

  const normalizedSearch = normalize(searchTerm.trim());
  const filteredProducts = catalog.filter((product) => {
    if (!normalizedSearch) return true;
    return [product.name, product.category, product.description].some((value) => normalize(value).includes(normalizedSearch));
  });

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
      </div>
      {status === "success" && filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <CatalogState status={status} hasSearch={Boolean(normalizedSearch)} onRetry={() => setRetryCount((count) => count + 1)} />
      )}
    </section>
  );
}

export default Catalog;
