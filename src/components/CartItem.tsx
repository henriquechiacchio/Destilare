import { useRef } from "react";
import { Link } from "react-router-dom";
import type { CartItemProps } from "../Interfaces/cartItem";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * Nome do item: CartItem
 *
 * Papel no projeto: Apresenta um produto individual dentro do carrinho lateral.
 *
 * Funcionamento: Exibe imagem, nome, categoria, preço total do item e controles
 * de quantidade. O bloqueio de ações rápidas evita duplo acionamento em um
 * intervalo muito curto.
 *
 * Dependências e integrações: Usa CartItemProps, useRef, Link do React Router e
 * os callbacks fornecidos pelo CartDrawer.
 *
 * Observações: O link leva à página de detalhes e os botões interrompem a
 * propagação do evento para não disparar ações do elemento pai.
 */
function CartItem({ item, onIncrease, onDecrease, onRemove, onCloseCart }: CartItemProps) {
  const productImage = `${import.meta.env.BASE_URL}${item.image.replace(/^\/+/, "")}`;
  const lastTapRef = useRef(0);

  const handleQuickAction = (callback: () => void) => {
    const now = Date.now();
    if (now - lastTapRef.current < 180) {
      return;
    }

    lastTapRef.current = now;
    callback();
  };

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
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleQuickAction(() => onDecrease(item.id));
              }}
              aria-label={`Diminuir quantidade de ${item.name}`}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleQuickAction(() => onIncrease(item.id));
              }}
              aria-label={`Aumentar quantidade de ${item.name}`}
            >
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
