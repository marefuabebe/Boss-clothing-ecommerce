import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { PersistentNotificationProvider } from './context/PersistentNotificationContext.jsx'; // Add this
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <PersistentNotificationProvider> {/* Add this wrapper */}
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow pb-16 lg:pb-0 pt-20 lg:pt-24">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/notifications" element={<Notifications />} />
                  </Routes>
                </main>
                <Footer />
                <MobileNav />
                <ScrollToTop />
              </div>
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </PersistentNotificationProvider> {/* Close the wrapper */}
    </Router>
  );
}

export default App;