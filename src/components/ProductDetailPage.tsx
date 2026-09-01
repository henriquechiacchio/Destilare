import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../Interfaces/product";
import ProductDetail from "./ProductDetail";

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
        onAddToCart={(selectedProduct) => addItem(selectedProduct)}
      />
    </section>
  );
}

export default ProductDetailPage;
