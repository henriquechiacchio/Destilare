import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/useCart";

/**
 * Nome do item: Header
 *
 * Papel no projeto: Apresenta a identidade da Destilare, a navegação principal
 * e o acesso ao carrinho em todas as páginas.
 *
 * Funcionamento: Usa links do React Router, controla a abertura do CartDrawer
 * e exibe a quantidade total de itens obtida pelo hook useCart.
 *
 * Dependências e integrações: Usa useState, Link, NavLink, CartDrawer e
 * useCart; depende dos assets de logo e das rotas configuradas na aplicação.
 *
 * Observações: NavLink aplica o estado visual de rota ativa e o contador só é
 * renderizado quando há itens no carrinho.
 */
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