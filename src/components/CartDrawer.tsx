import type { CartDrawerProps } from "../Interfaces/cartDrawer";
import CartItem from "./CartItem";
import { useCart } from "../context/useCart";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "is-visible" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`cart-drawer ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <div className="cart-drawer__header">
          <div>
            <p className="eyebrow">Seu pedido</p>
            <h2>Carrinho</h2>
          </div>
          <button type="button" className="cart-drawer__close" onClick={onClose} aria-label="Fechar carrinho">
            Fechar
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Seu carrinho ainda está vazio.</p>
            <span>Adicione alguns rótulos para montar sua seleção.</span>
          </div>
        ) : (
          <>
            <ul className="cart-list" aria-live="polite">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={(productId) => updateQuantity(productId, (currentQuantity) => currentQuantity + 1)}
                  onDecrease={(productId) => updateQuantity(productId, (currentQuantity) => Math.max(0, currentQuantity - 1))}
                  onRemove={removeItem}
                  onCloseCart={onClose}
                />
              ))}
            </ul>

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Total de itens</span>
                <strong>{itemCount}</strong>
              </div>
              <div className="cart-summary__row cart-summary__row--total">
                <span>Subtotal</span>
                <strong>{currencyFormatter.format(subtotal)}</strong>
              </div>

              <button type="button" className="cart-summary__clear" onClick={clearCart}>
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
