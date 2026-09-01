import type { ProductDetailProps } from "../Interfaces/catalog";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ProductDetail({ product, onBack }: ProductDetailProps) {
  return (
    <div className="product-detail">
      <button type="button" className="product-detail__back" onClick={onBack}>
        ← Voltar à coleção
      </button>

      <div className="product-detail__layout">
        <div className="product-detail__media">
          <img src={product.image} alt={`${product.name}, garrafa de whisky`} />
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
