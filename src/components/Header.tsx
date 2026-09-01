import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/useCart";

function Header() {
  const logoPath = `${import.meta.env.BASE_URL}logo/logosfundo.webp`;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" to="/" aria-label="Destilare, início">
            <img className="brand__logo" src={logoPath} alt="Logo Destilare" />
            <span>Destilare</span>
          </Link>

          <nav aria-label="Navegação principal">
            <NavLink className={({ isActive }) => isActive ? "is-active" : ""} to="/" end>
              Loja
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "is-active" : ""} to="/como-fiz">
              Como fiz
            </NavLink>
          </nav>

          <button type="button" className="header-cart" onClick={() => setIsCartOpen(true)} aria-label="Abrir carrinho">
            Carrinho
            {itemCount > 0 ? <span className="header-cart__count">{itemCount}</span> : null}
          </button>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;