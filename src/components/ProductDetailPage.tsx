import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import type { Product } from "../Interfaces/product";
import ProductDetail from "./ProductDetail";

/**
 * Nome do item: ProductDetailPage
 *
 * Papel no projeto: Coordena a rota de detalhes e conecta o produto carregado
 * ao componente visual ProductDetail.
 *
 * Funcionamento: Lê o id da URL, carrega o catálogo JSON, localiza o produto e
 * renderiza estados de carregamento, erro ou detalhe. Também encaminha o
 * retorno para a coleção e a adição ao carrinho.
 *
 * Dependências e integrações: Usa hooks do React, useParams e useNavigate do
 * React Router, useCart, Product e ProductDetail.
 *
 * Observações: O estado isMounted evita atualizar o estado após a desmontagem
 * da página durante o carregamento assíncrono.
 */
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      setStatus("loading");

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/products.json`);
        if (!response.ok) throw new Error("Falha ao carregar o catálogo");

        const products: Product[] = await response.json();

        if (isMounted) {
          setCatalog(products);
          setStatus("success");
        }
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    }

    void loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const product = useMemo(
    () => catalog.find((item) => item.id === id) ?? null,
    [catalog, id],
  );

  if (status === "loading") {
    return (
      <section className="catalog" aria-live="polite">
        <p className="catalog-state">Carregando rótulo...</p>
      </section>
    );
  }

  if (status === "error" || !product) {
    return (
      <section className="catalog">
        <div className="catalog-state catalog-state--error">
          <p>Não foi possível localizar este rótulo.</p>
          <button type="button" onClick={() => navigate("/")}>Voltar para a coleção</button>
        </div>
      </section>
    );
  }

  return (
    <section className="catalog">
      <ProductDetail
        product={product}
        onBack={() => navigate("/")}
        onAddToCart={(selectedProduct, quantity) => addItem(selectedProduct, quantity)}
      />
    </section>
  );
}

export default ProductDetailPage;
