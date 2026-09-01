import type { ProductCardProps } from "../Interfaces/productCard";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * Nome do item: ProductCard
 *
 * Papel no projeto: Exibe um resumo visual e informativo de um produto no
 * catálogo.
 *
 * Funcionamento: Monta o caminho da imagem, formata o preço em reais e exibe
 * categoria, descrição, detalhes e notas de degustação. A seleção funciona
 * por clique ou pelas teclas Enter e Espaço.
 *
 * Dependências e integrações: Recebe ProductCardProps e usa o modelo Product;
 * o catálogo fornece onSelect para navegar à página de detalhes.
 *
 * Observações: O artigo possui semântica de botão, foco pelo teclado e rótulo
 * acessível para preservar a navegação por tecnologias assistivas.
 */
function ProductCard({ product, onSelect }: ProductCardProps) {
  const productImage = `${import.meta.env.BASE_URL}${product.image.replace(/^\/+/, "")}`;

  return (
    <article className="product-card" onClick={() => onSelect?.(product)} onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect?.(product);
      }
    }} tabIndex={0} role="button" aria-label={`Abrir detalhes do produto ${product.name}`}>
      <img className="product-card__image" src={productImage} alt={`${product.name}, garrafa de whisky`} />
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
