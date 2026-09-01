import { useEffect, useRef, useState } from "react";
import type { ProductDetailProps } from "../Interfaces/productDetail";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * Nome do item: ProductDetail
 *
 * Papel no projeto: Exibe a página completa de informações e compra de um
 * produto selecionado.
 *
 * Funcionamento: Mostra imagem, descrição, preço, origem e notas, controla a
 * quantidade escolhida e chama onAddToCart ao adicionar o produto. Também
 * apresenta uma confirmação temporária após a ação.
 *
 * Dependências e integrações: Recebe ProductDetailProps, usa hooks do React e
 * é renderizado pela página ProductDetailPage.
 *
 * Observações: A quantidade mínima é um e ações repetidas rapidamente são
 * ignoradas para evitar duplicidade acidental.
 */
function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const lastTapRef = useRef(0);

  const productImage = `${import.meta.env.BASE_URL}${product.image.replace(/^\/+/, "")}`;

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setNotice(""), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const handleQuickAction = (callback: () => void) => {
    const now = Date.now();
    if (now - lastTapRef.current < 180) {
      return;
    }

    lastTapRef.current = now;
    callback();
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      handleQuickAction(() => {
        onAddToCart(product, quantity);
        setNotice(`${quantity} ${quantity === 1 ? "item adicionado" : "itens adicionados"} ao carrinho.`);
      });
    }
  };

  return (
    <div className="product-detail">
      <button type="button" className="product-detail__back" onClick={onBack}>
        ← Voltar à coleção
      </button>

      <div className="product-detail__layout">
        <div className="product-detail__media">
          <img src={productImage} alt={`${product.name}, garrafa de whisky`} />
        </div>

        <div className="product-detail__content">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>

          <div className="product-detail__meta">
            <span className="product-detail__price">{currencyFormatter.format(product.price)}</span>
            <span className="product-detail__origin">{product.origin}</span>
          </div>

          <p className="product-detail__description">{product.detailedDescription ?? product.description}</p>

          <dl className="product-card__details product-detail__details">
            <div>
              <dt>Idade</dt>
              <dd>{product.ageStatement}</dd>
            </div>
            <div>
              <dt>Origem</dt>
              <dd>{product.origin}</dd>
            </div>
          </dl>

          <ul className="product-card__notes" aria-label="Notas de degustação">
            {product.tastingNotes.map((note) => <li key={note}>{note}</li>)}
          </ul>

          <div className="product-detail__actions">
            <div className="product-detail__quantity" aria-label={`Quantidade de ${product.name}`}>
              <span>Quantidade</span>
              <div className="product-detail__quantity-controls">
                <button
                  type="button"
                  aria-label={`Diminuir quantidade de ${product.name}`}
                  onClick={() => handleQuickAction(() => setQuantity((current) => Math.max(1, current - 1)))}
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => {
                    const nextValue = Number(event.target.value);

                    if (!Number.isNaN(nextValue) && nextValue >= 1) {
                      setQuantity(nextValue);
                    }

                    if (event.target.value === "") {
                      setQuantity(1);
                    }
                  }}
                  aria-label={`Quantidade de ${product.name}`}
                />
                <button
                  type="button"
                  aria-label={`Aumentar quantidade de ${product.name}`}
                  onClick={() => handleQuickAction(() => setQuantity((current) => current + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <button type="button" className="product-detail__cta" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
          </div>

          {notice ? <p className="product-detail__notice" role="status" aria-live="polite">{notice}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
