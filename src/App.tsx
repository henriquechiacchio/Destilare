import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HowItWasMade from "./components/HowItWasMade";
import ProductDetailPage from "./components/ProductDetailPage";
import Storefront from "./components/Storefront";

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

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-shell">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
