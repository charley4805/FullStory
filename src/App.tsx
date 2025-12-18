import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { BrowsePage } from './pages/BrowsePage';
import { CheckoutPage } from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
          <Navbar />
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          {/* TODO: page naming on route change */}
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
