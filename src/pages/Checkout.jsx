import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, MapPin, User, ChevronLeft } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [cart, orderPlaced, navigate]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
      if (!formData.email.trim()) newErrors.email = 'Email required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Invalid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone required';
      if (!formData.address.trim()) newErrors.address = 'Address required';
      if (!formData.city.trim()) newErrors.city = 'City required';
      if (!formData.state) newErrors.state = 'Region required';
      if (!formData.zip.trim()) newErrors.zip = 'Postal code required';
    }

    if (step === 2 && paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date required';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV required';
    }

    if (step === 2 && !paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) return;

    if (!isLoggedIn) {
      alert('Please login to place an order');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handlePlaceOrder();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121218] rounded-2xl border border-white/10 p-6 sm:p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold font-playfair text-white mb-2">
            Order Confirmed
          </h2>
          <p className="text-xs text-gray-300 mb-1">
            Thank you, <span className="text-amber-300 font-semibold">{formData.firstName}</span>.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            A confirmation email has been dispatched to <span className="text-white">{formData.email}</span>.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 px-4 rounded-full bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-md"
            >
              Return to Atelier Home
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="w-full py-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs uppercase tracking-wider transition-colors"
            >
              Explore More Pieces
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#121218] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header - Compact */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                VIP Checkout
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                Secure Atelier Checkout
              </h1>
            </div>
            <span className="text-xs text-emerald-400 font-medium hidden sm:inline">
              ✓ 256-Bit SSL Encrypted
            </span>
          </div>

          {/* Stepper - Compact */}
          <div className="flex justify-between p-3 sm:p-4 bg-black/30 border-b border-white/10 text-xs">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    currentStep >= step 
                      ? 'bg-amber-400 text-black shadow-sm' 
                      : 'bg-white/10 text-gray-500'
                  }`}
                >
                  {currentStep > step ? '✓' : step}
                </div>
                <span className={`ml-2 text-xs font-semibold hidden sm:inline ${
                  currentStep >= step ? 'text-white' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Shipping'}
                  {step === 2 && 'Payment'}
                  {step === 3 && 'Review'}
                </span>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-3 rounded ${
                    currentStep > step ? 'bg-amber-400' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Checkout Grid - Compact Padding */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
            {/* Step Content */}
            <div className="lg:col-span-2 space-y-4">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-2">
                    <User size={16} className="text-amber-400" />
                    <span>Client & Delivery Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                      />
                      {errors.firstName && <p className="text-red-400 text-[10px] mt-0.5">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                      />
                      {errors.lastName && <p className="text-red-400 text-[10px] mt-0.5">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                      />
                      {errors.email && <p className="text-red-400 text-[10px] mt-0.5">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+251 ..."
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                      />
                      {errors.phone && <p className="text-red-400 text-[10px] mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Bole Subcity, House No..."
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                    />
                    {errors.address && <p className="text-red-400 text-[10px] mt-0.5">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Addis Ababa"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                      />
                      {errors.city && <p className="text-red-400 text-[10px] mt-0.5">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Region *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400/60 cursor-pointer"
                      >
                        <option value="">Select...</option>
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Oromia">Oromia</option>
                        <option value="Amhara">Amhara</option>
                        <option value="Tigray">Tigray</option>
                        <option value="International">International</option>
                      </select>
                      {errors.state && <p className="text-red-400 text-[10px] mt-0.5">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Postal Code *</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="1000"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                      />
                      {errors.zip && <p className="text-red-400 text-[10px] mt-0.5">{errors.zip}</p>}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-2">
                    <CreditCard size={16} className="text-amber-400" />
                    <span>Select Payment Method</span>
                  </div>

                  {errors.paymentMethod && (
                    <p className="text-red-400 text-xs">{errors.paymentMethod}</p>
                  )}

                  <div className="space-y-2.5">
                    {/* Ethiopian Payment Option */}
                    <div
                      onClick={() => setPaymentMethod('ethiopian')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'ethiopian'
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={paymentMethod === 'ethiopian'}
                          onChange={() => setPaymentMethod('ethiopian')}
                          className="accent-amber-400"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">Telebirr & CBE Birr</p>
                          <p className="text-[11px] text-gray-400">Instant direct transfer via Commercial Bank of Ethiopia or Telebirr</p>
                        </div>
                      </div>

                      {paymentMethod === 'ethiopian' && (
                        <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-black/40 rounded-lg border border-white/10 flex items-center gap-2">
                            <img src="/images/cbe.jpg" alt="CBE" className="w-8 h-8 rounded object-cover" />
                            <div>
                              <p className="text-[11px] font-semibold text-white">CBE Account</p>
                              <p className="text-[10px] text-amber-300 font-mono">1000311656598</p>
                              <p className="text-[9px] text-gray-400">Boss Clothes PLC</p>
                            </div>
                          </div>
                          <div className="p-2.5 bg-black/40 rounded-lg border border-white/10 flex items-center gap-2">
                            <img src="/images/telebirr.jpeg" alt="Telebirr" className="w-8 h-8 rounded object-cover" />
                            <div>
                              <p className="text-[11px] font-semibold text-white">Telebirr Merchant</p>
                              <p className="text-[10px] text-amber-300 font-mono">09-94-15-61-35</p>
                              <p className="text-[9px] text-gray-400">Boss Clothes</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Credit Card Option */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-amber-400"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">Credit / Debit Card</p>
                          <p className="text-[11px] text-gray-400">Visa, MasterCard, American Express</p>
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5 text-xs">
                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Card Number *</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="4000 1234 5678 9010"
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                            />
                            {errors.cardNumber && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] text-gray-400 mb-1">Expiry Date *</label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-gray-400 mb-1">CVV *</label>
                              <input
                                type="text"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-2">
                    <CheckCircle size={16} className="text-amber-400" />
                    <span>Review & Authorize Order</span>
                  </div>

                  <div className="p-3.5 bg-black/30 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Deliver to:</span>
                      <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Address:</span>
                      <span className="text-white text-right">{formData.address}, {formData.city}, {formData.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Contact:</span>
                      <span className="text-white">{formData.phone} • {formData.email}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2">
                      <span className="text-gray-400 font-medium">Payment Mode:</span>
                      <span className="text-amber-300 font-semibold">{paymentMethod === 'card' ? 'Credit Card' : 'Telebirr / CBE'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft size={13} />
                    <span>Previous</span>
                  </button>
                )}
                
                <button
                  onClick={handleNextStep}
                  disabled={loading}
                  className="ml-auto px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : currentStep === 3 ? 'Authorize Order' : 'Continue'}
                </button>
              </div>
            </div>

            {/* Sidebar Summary - Compact */}
            <div className="lg:col-span-1">
              <div className="bg-black/30 rounded-xl p-4 border border-white/10 space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold pb-2 border-b border-white/10">
                  Cart Items ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-white/5">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-2.5">
                      <img src={item.image} alt={item.name} className="w-10 h-12 rounded object-cover object-top flex-shrink-0" />
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-semibold text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-300">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-white">{shipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-base font-bold text-amber-300">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          if (!isLoggedIn) {
            navigate('/cart');
          }
        }} 
      />
    </div>
  );
};

export default Checkout;