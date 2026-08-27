import type { ProductCardProps } from "../Interfaces/catalog";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <img className="product-card__image" src={product.image} alt={`${product.name}, garrafa de whisky`} />
      <div className="product-card__content">
        <div className="product-card__heading">
          <div>
            <p className="product-card__category">{product.category}</p>
            <h3>{product.name}</h3>
          </div>
          <strong>{currencyFormatter.format(product.price)}</strong>
        </div>
        <p className="product-card__description">{product.description}</p>
        <dl className="product-card__details">
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
    </article>
  );
}

export default ProductCard;
