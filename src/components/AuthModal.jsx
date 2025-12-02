import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const { login, register, socialLogin } = useAuth();
  const { showNotification } = useNotification();

  // Update isLogin when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
    }
  }, [isOpen, initialMode]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      login(formData.email, formData.password);
      showNotification('success', 'You have successfully logged in!');
    } else {
      register(formData.name, formData.email, formData.password);
      showNotification('success', 'Account created successfully! You are now logged in.');
    }
    
    onClose();
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const handleSocialLogin = (provider) => {
    socialLogin(provider);
    showNotification('success', `You have successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-6 rounded-t-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{isLogin ? 'Login to Your Account' : 'Create New Account'}</h3>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 ${
                        errors.name ? 'border-blue-500' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-blue-400 text-sm mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 ${
                      errors.email ? 'border-blue-500' : 'border-gray-600'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-blue-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isLogin ? 'Password' : 'Create password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 ${
                      errors.password ? 'border-blue-500' : 'border-gray-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="text-blue-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 ${
                      errors.confirmPassword ? 'border-blue-500' : 'border-gray-600'
                    }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-blue-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {isLogin && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02]"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center space-x-3 py-3 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors bg-gray-900 text-gray-300"
              >
                <FaGoogle className="text-blue-500" />
                <span className="font-semibold">Sign in with Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="w-full flex items-center justify-center space-x-3 py-3 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors bg-gray-900 text-gray-300"
              >
                <FaFacebook className="text-blue-600" />
                <span className="font-semibold">Sign in with Facebook</span>
              </button>
            </div>

            <p className="text-center mt-6 text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;

