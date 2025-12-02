import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag, FaTruck, FaUndo, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AuthModal from '../components/AuthModal';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isLoggedIn } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1;
  const discount = subtotal > 100 ? 10 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('warning', 'Your cart is empty! Add items before proceeding to checkout.');
      return;
    }
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white"
        >
          Your Shopping Cart
        </motion.h2>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] py-20"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary opacity-20 rounded-full blur-3xl"></div>
              <div className="relative bg-gray-800 p-12 rounded-full border-2 border-primary/30">
                <FaShoppingBag className="text-8xl text-primary" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-md mb-12"
            >
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                Your Cart is Empty
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up with amazing fashion pieces!
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/50"
              >
                <span>Start Shopping</span>
                <FaArrowLeft className="rotate-180" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8"
            >
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-primary transition-all transform hover:-translate-y-1">
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <FaTruck />
                </div>
                <h4 className="text-white font-semibold mb-2 text-center">Free Shipping</h4>
                <p className="text-gray-400 text-sm text-center">On orders over $100</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-primary transition-all transform hover:-translate-y-1">
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <FaUndo />
                </div>
                <h4 className="text-white font-semibold mb-2 text-center">Easy Returns</h4>
                <p className="text-gray-400 text-sm text-center">30-day return policy</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-primary transition-all transform hover:-translate-y-1">
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <FaLock />
                </div>
                <h4 className="text-white font-semibold mb-2 text-center">Secure Checkout</h4>
                <p className="text-gray-400 text-sm text-center">100% secure payment</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h5 className="text-xl font-bold text-white">Cart Items</h5>
                  <span className="text-gray-400">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
                </div>

                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-700 last:border-0"
                    >
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h6 className="font-bold text-lg mb-2 text-white">{item.name}</h6>
                        <p className="text-gray-400 text-sm mb-2">Size: M</p>
                        <p className="text-gray-400 text-sm mb-4">Color: Blue</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-600 rounded-lg bg-gray-900">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-700 text-gray-300"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus className="text-sm" />
                            </motion.button>
                            <span className="px-4 py-2 min-w-[60px] text-center text-white">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-700 text-gray-300"
                              aria-label="Increase quantity"
                            >
                              <FaPlus className="text-sm" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-blue-400 hover:text-blue-500 p-2 transition-colors"
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </motion.button>
                        </div>
                      </div>
                      <div className="text-right">
                        <h6 className="font-bold text-lg text-white">${(item.price * item.quantity).toFixed(2)}</h6>
                        <p className="text-gray-400 text-sm">${item.price.toFixed(2)} each</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between mt-6 pt-6 border-t border-gray-700">
                  <Link to="/shop" className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors">
                    <FaArrowLeft />
                    <span>Continue Shopping</span>
                  </Link>
                  <button onClick={handleCheckout} className="btn-primary">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-700">
                <h5 className="text-xl font-bold mb-6 text-white">Order Summary</h5>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4 flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-300">This is a gift</span>
                  </label>
                </div>

                <div className="flex space-x-2 mb-6">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500"
                  />
                  <button className="btn-primary px-6">Apply</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Cart;

