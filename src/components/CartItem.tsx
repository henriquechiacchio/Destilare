import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "../Interfaces/cart";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCloseCart?: () => void;
}

function CartItem({ item, onIncrease, onDecrease, onRemove, onCloseCart }: CartItemProps) {
  const productImage = `${import.meta.env.BASE_URL}${item.image.replace(/^\/+/, "")}`;

  return (
    <li className="cart-item">
      <img className="cart-item__image" src={productImage} alt={item.name} />

      <div className="cart-item__info">
        <div className="cart-item__header">
          <div>
            <p className="cart-item__category">{item.category}</p>
            <Link
              className="cart-item__link"
              to={`/produto/${item.id}`}
              aria-label={`Abrir detalhes de ${item.name}`}
              onClick={onCloseCart}
            >
              <h3>{item.name}</h3>
            </Link>
          </div>
          <button type="button" className="cart-item__remove" onClick={() => onRemove(item.id)} aria-label={`Remover ${item.name} do carrinho`}>
            Remover
          </button>
        </div>

        <div className="cart-item__footer">
          <div className="cart-item__controls" aria-label={`Quantidade de ${item.name}`}>
            <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Diminuir quantidade de ${item.name}`}>
              −
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Aumentar quantidade de ${item.name}`}>
              +
            </button>
          </div>

          <strong>{currencyFormatter.format(item.price * item.quantity)}</strong>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
