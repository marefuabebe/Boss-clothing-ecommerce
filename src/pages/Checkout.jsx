import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
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
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'Region is required';
      if (!formData.zip.trim()) newErrors.zip = 'Postal code is required';
    }

    if (step === 2 && paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required';
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
      // Simulate API call
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
            <CheckCircle className="mx-auto text-blue-500 mb-6" size={80} />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Thank you for your purchase, {formData.firstName}!
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-6 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Checkout</h2>
            <p className="text-blue-50">Complete your purchase in a few easy steps</p>
          </div>

          {/* Steps */}
          <div className="flex justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {currentStep > step ? <CheckCircle className="text-sm" /> : <span className="font-bold">{step}</span>}
                </div>
                <div className="ml-4">
                  <p className={`font-semibold transition-colors ${
                    currentStep >= step ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                  }`}>
                    {step === 1 && 'Information'}
                    {step === 2 && 'Payment'}
                    {step === 3 && 'Review'}
                  </p>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentStep > step ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <User className="text-blue-500" size={24} />
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <MapPin className="text-blue-500" size={24} />
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Address *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Region *
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            <option value="">Select Region</option>
                            <option value="Addis Ababa">Addis Ababa</option>
                            <option value="Oromia">Oromia</option>
                            <option value="Amhara">Amhara</option>
                            <option value="Tigray">Tigray</option>
                          </select>
                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.zip ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <CreditCard className="text-blue-500" size={24} />
                      Payment Method
                    </h2>
                    
                    {errors.paymentMethod && (
                      <p className="text-red-500 text-sm mb-4">{errors.paymentMethod}</p>
                    )}
                    
                    <div className="space-y-4">
                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          paymentMethod === 'card' ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="w-5 h-5 text-blue-600"
                          />
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white">Credit/Debit Card</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pay with Visa, Mastercard, or American Express</p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('ethiopian')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          paymentMethod === 'ethiopian' ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={paymentMethod === 'ethiopian'}
                            onChange={() => setPaymentMethod('ethiopian')}
                            className="w-5 h-5 text-blue-600"
                          />
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white">Ethiopian Payment Options</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pay with CBE Birr, Telebirr, or other local methods</p>
                          </div>
                        </div>
                      </div>

                      {paymentMethod === 'ethiopian' && (
                        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4 border border-gray-200 dark:border-gray-700">
                          <h6 className="font-semibold text-gray-900 dark:text-white">Complete Payment</h6>
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                              <img src="/images/cbe.jpg" alt="CBE" className="h-10" />
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Commercial Bank of Ethiopia</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Account: 1000311656598</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Name: Boss Clothes PLC</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                              <img src="/images/telebirr.jpeg" alt="Telebirr" className="h-10" />
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Telebirr</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Merchant: Boss Clothes</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Code: 09-94-15-61-35</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  errors.cardExpiry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                              />
                              {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength={4}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  errors.cardCvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                              />
                              {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Order</h4>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Shipping Information</h5>
                        <p className="text-gray-600 dark:text-gray-300">{formData.firstName} {formData.lastName}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.email}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.phone}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.address}, {formData.city}, {formData.state}, {formData.zip}</p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Payment Method</h5>
                        <p className="text-gray-600 dark:text-gray-300">
                          {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Ethiopian Payment'}
                        </p>
                        {paymentMethod === 'card' && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Card ending in {formData.cardNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeft size={20} />
                    <span>Back</span>
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={loading}
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-blue-500/50'
                  }`}
                >
                  {loading ? 'Processing...' : currentStep === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                <h5 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h5>
                
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-blue-500">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-3 border-t-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-blue-500">${total.toFixed(2)}</span>
                    </div>
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