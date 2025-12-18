import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/layout/Navbar";
import { BrowsePage } from "./pages/BrowsePage";
import { CheckoutPage } from "./pages/CheckoutPage";



function FullstoryRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const w = window as any;

    const FS = w.FS;

    const pageName =
      location.pathname === "/"
        ? "Browse: Products"
        : location.pathname === "/checkout"
          ? "Checkout"
          : `Unknown: ${location.pathname}`;

    if (typeof FS === "function") {
      FS("setProperties", { type: "page", pageName });
      return;
    }

    // Fallback: some sandboxes expose methods directly
    if (FS && typeof FS.setPageName === "function") {
      FS.setPageName(pageName);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
          <Navbar />

          {/* Page naming on route change */}
          <FullstoryRouteTracker />

          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

