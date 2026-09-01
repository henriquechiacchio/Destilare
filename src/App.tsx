import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HowItWasMade from "./components/HowItWasMade";
import ProductDetailPage from "./components/ProductDetailPage";
import Storefront from "./components/Storefront";
import { CartProvider } from "./context/CartContext";

/**
 * Nome do item: AppRoutes
 *
 * Papel no projeto: Define a estrutura compartilhada e as rotas principais da
 * aplicação Destilare.
 *
 * Funcionamento: Verifica redirecionamentos vindos do fallback 404, renderiza o
 * Header, seleciona a página conforme a URL e mantém o rodapé compartilhado.
 *
 * Dependências e integrações: Usa React Router, Header, Storefront,
 * ProductDetailPage e HowItWasMade.
 *
 * Observações: O parâmetro redirect só é aceito quando começa com "/", evitando
 * que o fluxo navegue para destinos externos.
 */
function AppRoutes() {
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect");

  if (redirect && redirect.startsWith("/")) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="/como-fiz" element={<HowItWasMade />} />
      </Routes>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>Destilare · desde 2026</span>
          <span>Uma boa história pede tempo.</span>
        </div>
      </footer>
    </>
  );
}

/**
 * Nome do item: App
 *
 * Papel no projeto: É o componente raiz que organiza o estado global e o
 * roteamento da aplicação.
 *
 * Funcionamento: Envolve as rotas com CartProvider, configura BrowserRouter
 * com a base de publicação e cria o contêiner visual principal.
 *
 * Dependências e integrações: Usa CartProvider, BrowserRouter, AppRoutes e a
 * variável BASE_URL fornecida pelo Vite.
 *
 * Observações: A ordem dos providers garante que as páginas e componentes
 * consigam acessar o estado do carrinho durante a navegação.
 */
function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="app-shell">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
