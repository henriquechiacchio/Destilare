import "./App.css";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";

function Storefront() {
  return (
    <main className="storefront">
      <section className="storefront__hero" aria-labelledby="storefront-title">
        <p className="eyebrow">Curadoria de pequenos lotes</p>
        <h1 id="storefront-title">Destilare</h1>
        <p className="storefront__intro">
          Whiskys escolhidos para quem aprecia o tempo, o carvalho e a conversa
          que começa no primeiro gole.
        </p>
        <a className="text-link" href="#catalogo">
          Explorar a coleção <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="collection-preview" id="catalogo" aria-labelledby="collection-title">
        <div>
          <p className="eyebrow">A coleção</p>
          <h2 id="collection-title">Uma carta para descobrir devagar.</h2>
        </div>
        <p className="collection-preview__note">
          Nosso catálogo está sendo preparado para receber a primeira seleção
          Destilare.
        </p>
      </section>
    </main>
  );
}

function HowItWasMade() {
  return (
    <main className="how-it-was-made" aria-labelledby="how-title">
      <p className="eyebrow">Bastidores da construção</p>
      <h1 id="how-title">Como fiz</h1>
      <p className="how-it-was-made__intro">
        Esta página vai reunir o vídeo e as decisões técnicas da Destilare:
        catálogo externo, front-end em React com TypeScript e publicação
        estática.
      </p>
      <div className="video-placeholder" aria-label="Espaço reservado para o vídeo da apresentação">
        <span className="video-placeholder__mark" aria-hidden="true">▶</span>
        <p>Vídeo da apresentação em breve</p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-shell">
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

        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="/como-fiz" element={<HowItWasMade />} />
        </Routes>

        <footer className="site-footer">
          <span>Destilare · desde 2026</span>
          <span>Uma boa história pede tempo.</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
