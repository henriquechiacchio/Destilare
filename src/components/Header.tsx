import { Link, NavLink } from "react-router-dom";

function Header() {
  const logoPath = `${import.meta.env.BASE_URL}logosfundo.png`;

  return (
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
      </div>
    </header>
  );
}

export default Header;