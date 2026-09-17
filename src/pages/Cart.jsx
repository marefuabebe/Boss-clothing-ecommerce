import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag, FaTruck, FaShieldAlt, FaUndo, FaLock } from 'react-icons/fa';
import { products } from '../data/products';
import AuthModal from '../components/AuthModal';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, addToCart, getCartTotal } = useCart();
  const { isLoggedIn } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = getCartTotal();
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = subtotal > 0 ? (isFreeShipping ? 0 : 9.99) : 0;
  const tax = subtotal * 0.08;
  const discount = discountApplied ? subtotal * 0.15 : 0;
  const total = subtotal + shipping + tax - discount;

  // Recommended products (excluding items already in cart)
  const cartIds = cart.map((item) => item.id);
  const recommended = products.filter((p) => !cartIds.includes(p.id)).slice(0, 4);

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('warning', 'Your cart is empty.');
      return;
    }
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    navigate('/checkout');
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BOSS15' || promoCode.trim().toUpperCase() === 'ATELIER') {
      setDiscountApplied(true);
      showNotification('success', 'Promo code applied: 15% off your order.');
    } else {
      showNotification('error', 'Invalid code. Try "BOSS15".');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">

        {/* SECTION 1: Shopping Cart & Checkout Summary */}
        <section>
          {/* Header */}
          <div className="flex items-end justify-between pb-3 mb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Your Cart
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-white">
                Shopping Cart
              </h1>
            </div>
            <span className="text-xs text-gray-400">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart State */
            <div className="bg-[#121218] rounded-2xl border border-white/10 p-8 sm:p-12 text-center max-w-xl mx-auto my-6">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <FaShoppingBag size={24} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-6 max-w-sm mx-auto">
                Find your favorite jackets, shirts, jeans, and shoes to fill your cart.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-xs tracking-wider uppercase shadow-md transition-all active:scale-95"
              >
                <span>Start Shopping</span>
                <FaArrowLeft className="rotate-180 text-xs" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                {/* Free shipping progress */}
                <div className="bg-[#121218] rounded-xl p-3.5 border border-white/10 text-xs">
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-gray-300">
                      {isFreeShipping 
                        ? '✓ You have unlocked Free Express Delivery' 
                        : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Express Delivery`}
                    </span>
                    <span className="text-amber-400 font-semibold">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-[#121218] rounded-xl border border-white/10 divide-y divide-white/5">
                  {cart.map((item) => (
                    <div key={item.id} className="p-3.5 sm:p-4 flex gap-3 sm:gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-top rounded-lg bg-black/40 border border-white/10 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold block">
                          {item.category || 'Clothing'}
                        </span>
                        <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-3 mt-2.5">
                          <div className="flex items-center border border-white/10 rounded-lg bg-black/30">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:text-amber-300 text-gray-400 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus className="text-[9px]" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:text-amber-300 text-gray-400 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <FaPlus className="text-[9px]" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[11px] text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                          >
                            <FaTrash className="text-[10px]" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="text-right flex-shrink-0 pl-2">
                        <span className="text-sm sm:text-base font-bold text-amber-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to="/shop"
                    className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors"
                  >
                    <FaArrowLeft className="text-[10px]" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#121218] rounded-xl p-4 sm:p-5 border border-white/10 sticky top-20 space-y-4">
                  <h2 className="text-base font-bold font-playfair text-white pb-3 border-b border-white/10">
                    Order Summary
                  </h2>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span>Delivery</span>
                      <span>{shipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span>Estimated Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Promo Discount (15%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-white">Estimated Total</span>
                      <span className="text-lg font-bold text-amber-300">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <form onSubmit={handleApplyPromo} className="flex gap-1.5 pt-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. BOSS15)"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-98"
                  >
                    <FaLock size={11} />
                    <span>Proceed to Checkout</span>
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">
                    Safe & Secure Checkout • 100% Quality Guaranteed
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: Recommended For You */}
        <section className="border-t border-white/10 pt-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Recommended For You
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                You Might Also Like
              </h2>
            </div>
            <Link to="/shop" className="text-xs text-amber-300 hover:text-amber-200">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {recommended.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#121218] rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/30 p-2.5 flex flex-col justify-between"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-2"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white truncate">{prod.name}</h4>
                  <p className="text-xs font-bold text-amber-300 mt-0.5">${prod.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => {
                    addToCart(prod);
                    showNotification('success', `${prod.name} added to cart.`);
                  }}
                  className="mt-2.5 w-full py-1.5 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-black text-white text-[11px] font-semibold transition-colors border border-white/10"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Service Guarantees & Care Assurance */}
        <section className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#121218] border border-white/10 text-center">
              <FaTruck className="mx-auto text-amber-400 text-lg mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">Express Delivery</h4>
              <p className="text-[11px] text-gray-400">Fast delivery to your door in Addis Ababa within 1 to 2 days.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#121218] border border-white/10 text-center">
              <FaUndo className="mx-auto text-amber-400 text-lg mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">30-Day Easy Returns</h4>
              <p className="text-[11px] text-gray-400">Exchange any unworn clothes or request easy size adjustments.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#121218] border border-white/10 text-center">
              <FaShieldAlt className="mx-auto text-amber-400 text-lg mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">100% Original Quality</h4>
              <p className="text-[11px] text-gray-400">Genuine clothing crafted with premium fabrics and durable stitching.</p>
            </div>
          </div>
        </section>

      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Cart;
