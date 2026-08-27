import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Destilare, início">
        <span className="brand__seal" aria-hidden="true">D</span>
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
    </header>
  );
}

export default Header;