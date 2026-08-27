import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HowItWasMade from "./components/HowItWasMade";
import Header from "./components/Header";
import Storefront from "./components/Storefront";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-shell">
        <Header />

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
